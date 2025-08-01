#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd server && node index.js &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server..."
cd .. && npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

echo "Servers are running:"
echo "Backend: http://localhost:3002"
echo "Frontend: http://localhost:8080 (or available port)"
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait
