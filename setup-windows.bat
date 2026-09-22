@echo off
title CYBER GUESS - Laravel Setup
echo ==========================================
echo        CYBER GUESS - FIRST SETUP
echo ==========================================
echo.

where php >nul 2>nul || (echo PHP not found. Install PHP 8.2+ and add it to PATH.&pause&exit /b 1)
where composer >nul 2>nul || (echo Composer not found. Install Composer.&pause&exit /b 1)
where npm >nul 2>nul || (echo Node.js/npm not found. Install Node.js 20+.&pause&exit /b 1)

if not exist ".env" copy ".env.example" ".env"

echo [1/5] Installing PHP packages...
call composer install
if errorlevel 1 goto fail

echo [2/5] Generating Laravel key...
php artisan key:generate
if errorlevel 1 goto fail

echo [3/5] Installing frontend packages...
call npm install
if errorlevel 1 goto fail

echo [4/5] Running migrations...
php artisan migrate
if errorlevel 1 goto fail

echo.
echo [5/5] Setup finished!
echo.
echo Start the game with:
echo   php artisan serve
echo.
echo In another terminal:
echo   npm run dev
echo.
pause
exit /b 0

:fail
echo.
echo SETUP FAILED. Check the message above.
pause
exit /b 1
