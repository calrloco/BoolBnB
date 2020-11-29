<?php

namespace App\Http\Controllers\Logged;

use App\Http\Controllers\Controller;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
  
    public function destroy(Image $image)
    {
        Storage::disk('public')->delete('images', $image->path);
        $image->delete();

        return redirect()->route('host.edit', $image->apartment->id)->with('status', 'Hai cancellato correttamente l\'immagine');
    }
}
