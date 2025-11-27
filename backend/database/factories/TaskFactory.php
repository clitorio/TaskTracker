<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'in_progress', 'completed']);
        $completed_on = null;

        if($status == 'completed'){
            $completed_on = fake()->date;
        }

        return [
            'title' => fake()->realText(random_int(25, 50)),
            'description' => fake()->realText(random_int(50, 150)),
            'status' => $status,
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'completed_on' => $completed_on,
            'due_date' => fake()->dateTimeBetween('now', '+1 year')
        ];
    }
}
