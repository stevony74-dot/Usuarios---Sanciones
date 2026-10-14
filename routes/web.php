<?php

use App\Http\Controllers\MultaController;
use App\Http\Controllers\SuspensionController;
use App\Http\Controllers\TipoUsuarioController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('tipos-usuario', [TipoUsuarioController::class, 'index'])
        ->middleware('can:tipos-usuario.ver')
        ->name('tipos-usuario.index');

    Route::middleware('can:tipos-usuario.gestionar')->group(function () {
        Route::get('tipos-usuario/create', [TipoUsuarioController::class, 'create'])->name('tipos-usuario.create');
        Route::post('tipos-usuario', [TipoUsuarioController::class, 'store'])->name('tipos-usuario.store');
        Route::get('tipos-usuario/{tipoUsuario}/edit', [TipoUsuarioController::class, 'edit'])->name('tipos-usuario.edit');
        Route::put('tipos-usuario/{tipoUsuario}', [TipoUsuarioController::class, 'update'])->name('tipos-usuario.update');
        Route::delete('tipos-usuario/{tipoUsuario}', [TipoUsuarioController::class, 'destroy'])->name('tipos-usuario.destroy');
    });

    Route::get('usuarios', [UsuarioController::class, 'index'])
        ->middleware('can:usuarios.ver')
        ->name('usuarios.index');

    Route::middleware('can:usuarios.gestionar')->group(function () {
        Route::get('usuarios/create', [UsuarioController::class, 'create'])->name('usuarios.create');
        Route::post('usuarios', [UsuarioController::class, 'store'])->name('usuarios.store');
        Route::get('usuarios/{usuario}/edit', [UsuarioController::class, 'edit'])->name('usuarios.edit');
        Route::put('usuarios/{usuario}', [UsuarioController::class, 'update'])->name('usuarios.update');
        Route::delete('usuarios/{usuario}', [UsuarioController::class, 'destroy'])->name('usuarios.destroy');
    });

    Route::get('multas', [MultaController::class, 'index'])
        ->middleware('can:multas.ver')
        ->name('multas.index');

    Route::middleware('can:multas.gestionar')->group(function () {
        Route::get('multas/create', [MultaController::class, 'create'])->name('multas.create');
        Route::post('multas', [MultaController::class, 'store'])->name('multas.store');
        Route::post('multas/{multa}/pagar', [MultaController::class, 'pagar'])->name('multas.pagar');
        Route::post('multas/{multa}/condonar', [MultaController::class, 'condonar'])->name('multas.condonar');
    });

    Route::get('suspensiones', [SuspensionController::class, 'index'])
        ->middleware('can:suspensiones.ver')
        ->name('suspensiones.index');

    Route::middleware('can:suspensiones.gestionar')->group(function () {
        Route::get('suspensiones/create', [SuspensionController::class, 'create'])->name('suspensiones.create');
        Route::post('suspensiones', [SuspensionController::class, 'store'])->name('suspensiones.store');
        Route::post('suspensiones/{suspension}/levantar', [SuspensionController::class, 'levantar'])->name('suspensiones.levantar');
    });
});

require __DIR__.'/settings.php';