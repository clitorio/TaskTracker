<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Arr;

class TaskService
{
    public function store($data)
    {
        return Task::create(
            array_merge(
                $data, 
                ['user_id' => auth()->user()->id]
            )
        );
        
    }
    
    public function update($data, $taskId)
    {
        $task = Task::find($taskId);

        if($data['status']=='completed'){
            $data = array_merge($data, ['completed_on' => now()]);
        }

        $task->update($data);

        return $task;
    }

    public function getUserTasks()
    {
        return auth()->user()->tasks()->latest()->get();
    }

    public function filter()
    {
        
    }
}