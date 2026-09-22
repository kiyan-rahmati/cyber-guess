# CYBER GUESS — Laravel Web Game

نسخه مدرن پروژه با Laravel 12 + PHP 8.2+ + Vue 3 + Vite + MySQL.

## اجرا در ویندوز

پیش‌نیازها:
- PHP 8.2+
- Composer
- Node.js 20+
- MySQL

### 1) نصب وابستگی PHP
```bash
composer install
```

### 2) تنظیم محیط
```bash
copy .env.example .env
php artisan key:generate
```

در `.env` اطلاعات MySQL را تنظیم کن:
```env
DB_DATABASE=cyber_guess
DB_USERNAME=root
DB_PASSWORD=
```

### 3) ساخت دیتابیس
در MySQL/phpMyAdmin یک دیتابیس با نام `cyber_guess` بساز، سپس:
```bash
php artisan migrate
```

### 4) نصب فرانت‌اند
```bash
npm install
```

### 5) اجرا
ترمینال اول:
```bash
php artisan serve
```

ترمینال دوم:
```bash
npm run dev
```

بعد:
`http://127.0.0.1:8000`

## ساختار مهم
- `resources/js/app.js` → منطق بازی و Vue
- `resources/css/app.css` → طراحی Cyberpunk
- `routes/web.php` → مسیرها
- `app/Http/Controllers/` → Backend
- `app/Models/Player.php` → مدل بازیکن
- `database/migrations/` → جدول MySQL
- `resources/views/game.blade.php` → صفحه اصلی

لول‌ها:
1. 1 تا 10
2. 1 تا 50
3. 1 تا 100
4. 1 تا 1000
5. 1 تا 1,000,000

باز شدن مرحله‌ها در localStorage ذخیره می‌شود و جدول بازیکنان در MySQL است.
