@echo off
echo Starting Todo Application...
echo.
echo Step 1: Starting Backend Server (SQLite version)...
start "Backend Server" cmd /k "cd backend && .\venv\Scripts\activate.bat && python main_sqlite.py"

timeout /t 3

echo Step 2: Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm.cmd start"

echo.
echo Application is starting up!
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
