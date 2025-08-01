@echo off
echo Starting Herb Garden Application...

echo Starting backend server...
start "Backend Server" cmd /k "cd server && node index.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Servers are starting:
echo Backend: http://localhost:3002
echo Frontend: http://localhost:8080 (or available port)
echo.
echo Close the terminal windows to stop the servers.
pause
