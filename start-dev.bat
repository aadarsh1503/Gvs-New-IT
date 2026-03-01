@echo off
echo Starting GVS Staff Management System...
echo.

echo Starting Backend Server...
start "GVS Backend" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "GVS Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
