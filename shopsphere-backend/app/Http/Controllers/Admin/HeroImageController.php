<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroImageController extends Controller
{
    public function index()
    {
        return HeroImage::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
            'is_active' => 'nullable|boolean',
        ]);

        $data['image'] = $request->file('image')->store('hero-images', 'public');
        $data['is_active'] = $request->boolean('is_active', true);

        return HeroImage::create($data);
    }

    public function update(Request $request, HeroImage $heroImage)
    {
        $data = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $heroImage->update($data);

        return $heroImage;
    }

    public function destroy(HeroImage $heroImage)
    {
        if ($heroImage->image) {
            Storage::disk('public')->delete($heroImage->image);
        }

        $heroImage->delete();

        return response()->json([
            'message' => 'Hero image deleted',
        ]);
    }
}