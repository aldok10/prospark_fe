<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    /**
     * Get the SPA view.
     */
    public function __invoke()
    {
        return view('app');
    }
}
