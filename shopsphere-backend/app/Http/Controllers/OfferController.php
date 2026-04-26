<?php

namespace App\Http\Controllers;

use App\Models\Offer;

class OfferController extends Controller
{
    public function index()
    {
        return Offer::where('is_active', true)
            ->latest()
            ->limit(3)
            ->get();
    }
}