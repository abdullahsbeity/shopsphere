<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return User::select('id', 'name', 'email', 'is_admin', 'created_at')
            ->latest()
            ->get();
    }

    public function toggleAdmin(User $user)
    {
        $user->update([
            'is_admin' => !$user->is_admin,
        ]);

        return response()->json([
            'message' => $user->is_admin
                ? 'User is now an admin.'
                : 'User is now a customer.',
            'user' => $user,
        ]);
    }



}
