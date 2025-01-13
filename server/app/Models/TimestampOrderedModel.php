<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class TimestampOrderedModel extends EloquentModel
{
    protected static function boot()
    {
        parent::boot();

        // Add global scope to order by created_at DESC
        static::addGlobalScope('orderByCreatedAt', function ($query) {
            $query->orderBy('created_at');
        });
    }
}
