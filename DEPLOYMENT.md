# انتشار Cyber Guess

## توسعه
```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

در ترمینال دوم:
```bash
npm run dev
```

## Build فرانت‌اند
برای build:
```bash
npm run build
```

بعد از build، Laravel از فایل‌های ساخته‌شده در `public/build` استفاده می‌کند.

## MySQL
در `.env` این موارد را تنظیم کن:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cyber_guess
DB_USERNAME=root
DB_PASSWORD=
```

## نکته
فایل `.env` را روی GitHub منتشر نکن.
