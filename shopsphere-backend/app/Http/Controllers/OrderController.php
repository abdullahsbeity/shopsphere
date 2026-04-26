<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return Order::where('user_id', $request->user()->id)
            ->with('items.product')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_email' => 'required|email',
            'shipping_phone' => 'nullable|string|max:50',
            'shipping_address' => 'required|string',
        ]);

        return DB::transaction(function () use ($request, $data) {
            $cartItems = CartItem::where('user_id', $request->user()->id)
                ->with('product')
                ->get();

            if ($cartItems->isEmpty()) {
                return response()->json([
                    'message' => 'Cart is empty.',
                ], 422);
            }

            $total = 0;
            $orderItems = [];

            foreach ($cartItems as $cartItem) {
                $product = Product::where('id', $cartItem->product_id)
                    ->where('is_active', true)
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($product->stock < $cartItem->quantity) {
                    return response()->json([
                        'message' => $product->name . ' does not have enough stock.',
                    ], 422);
                }

                $subtotal = $product->price * $cartItem->quantity;
                $total += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $cartItem->quantity,
                    'price' => $product->price,
                    'subtotal' => $subtotal,
                ];

                $product->decrement('stock', $cartItem->quantity);
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total' => $total,
                'status' => 'pending',
                'shipping_name' => $data['shipping_name'],
                'shipping_email' => $data['shipping_email'],
                'shipping_phone' => $data['shipping_phone'] ?? null,
                'shipping_address' => $data['shipping_address'],
            ]);

            $order->items()->createMany($orderItems);

            CartItem::where('user_id', $request->user()->id)->delete();

            return $order->load('items.product');
        });
    }
}