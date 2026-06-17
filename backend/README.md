Backend (Express) — быстрое руководство

Установка:

1. Скопируйте `.env.example` в `.env` и заполните креды для MySQL.
2. Установите зависимости:

```bash
cd backend
npm install
```

3. Запустите сервер:

```bash
npm start
```

API:
- `GET /api/services` — получить список услуг
- `POST /api/appointments` — создать запись (body: `name, phone, email, service_id, date_time, comment`)
