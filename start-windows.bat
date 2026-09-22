@echo off
title CYBER GUESS - Laravel
start "Laravel Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
timeout /t 3 >nul
start http://127.0.0.1:8000
