## System Design
1. I would optimize the frontend with code-splitting, lazy loading, and caching.
2. By utilizing laravel queues with a robust driver like Redis. Create jobs for reminders and dispatch them asynchronously also run queue workers in the background.
3. Through eloquent relationships and eager loading, use caching for repeated queries and limit large dataset loads.