<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HeroImage extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];

    protected $fillable = [
        'image',
        'is_active',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
} 