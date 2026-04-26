<?php

namespace App\Http\Controllers;

use App\Models\HeroImage;

class HeroImageController extends Controller
{
    public function index()
    {
        return HeroImage::where('is_active', true)
            ->latest()
            ->limit(5)
            ->get();
    }
}