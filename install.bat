@echo off
echo ========================================
echo GVS Staff Management System - Setup
echo ========================================
echo.

echo Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Backend installation failed!
    pause
    exit /b %errorlevel%
)
echo Backend dependencies installed successfully!
echo.

echo Installing Frontend Dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo Frontend installation failed!
    pause
    exit /b %errorlevel%
)
echo Frontend dependencies installed successfully!
echo.

cd ..
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the application:
echo 1. Run the database initialization script:
echo    mysql -h 92.112.181.224 -u gvsemployees -p GVSemployees ^< server/database/init.sql
echo.
echo 2. Start the backend server:
echo    cd server
echo    npm run dev
echo.
echo 3. In a new terminal, start the frontend:
echo    cd client
echo    npm run dev
echo.
echo 4. Open browser to: http://localhost:5173
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo ========================================
pause
