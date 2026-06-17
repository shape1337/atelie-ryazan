Развёртывание (VPS / VDS) — шаги для Reg.ru / Timeweb / Beget

1) Выбор: возьмите VDS/VPS с Ubuntu 22.04 и доступом по SSH.

2) Подготовка сервера:

```bash
ssh root@your_server_ip
apt update && apt install -y nginx docker.io docker-compose git
```

3) Установка MySQL:
- Можно использовать Docker: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=atelie -p 3306:3306 -d mysql:8`;
или установить через пакеты: `apt install mariadb-server` и настроить БД.

4) Развёртывание backend (Node.js):

- Склонируйте репозиторий на сервер: `git clone ...` или загрузите файлы.
- Установите Node.js (LTS): `curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt install -y nodejs`
- В корне `backend` создайте `.env` с данными доступа к MySQL и запустите
  `npm install` и `npm start`.

Рекомендация: запустить backend в Docker или с помощью `pm2`.

5) Развёртывание frontend:

- Соберите SPA: `cd frontend && npm install && npm run build`.
- Содержимое `dist` можно отдавать через `nginx` как статический сайт.

6) Настройка Nginx (пример):

```
server {
  listen 80;
  server_name yourdomain.ru;

  location /api/ {
    proxy_pass http://127.0.0.1:4000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    root /var/www/atelie_frontend; # папка с dist
    try_files $uri $uri/ /index.html;
  }
}
```

7) SSL и домен:
- Привяжите домен в панели регистратора и укажите A-запись на IP сервера.
- Установите certbot и получите сертификат: `apt install certbot python3-certbot-nginx` затем `certbot --nginx`.

8) Тесты и проверка:
- Проверьте работу `GET /api/services` и отправку `POST /api/appointments`.

Если у вас только shared hosting без Node.js, рекомендую перевести backend в FaaS/Serverless или использовать хостинг с поддержкой Node.js. Для простоты лучше выбрать VDS с Docker.

Beget.com — шаги и рекомендации

Если вы будете выкладывать сайт на Beget (shared-hosting или VDS у Beget), предпочтителен следующий подход в зависимости от вашего тарифа:

- **Shared (обычный хостинг) — рекомендованный метод для простого сайта:**
  - Соберите фронтенд локально: в [frontend](frontend) выполните `npm run build`.
  - Зайдите в панель управления Beget -> Файловый менеджер или подключитесь по SFTP (рекомендуется WinSCP / FileZilla). Данные для SFTP доступны в панели Beget.
  - Загрузите содержимое сборки (`frontend/dist` или `frontend/dist/*`) в корневую папку домена (чаще всего `/www/yourdomain.ru/`).
  - Для SPA добавьте правило перенаправления на `index.html` (если на сервере стоит Apache, создайте `.htaccess` в корне сайта):

    ```apache
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    ```

  - В панели Beget в разделе «Базы данных» создайте MySQL базу и пользователя. Запишите хост, имя БД, логин и пароль — они потребуются backend.
  - Backend на shared-хостинге: часто shared-планы не дают возможности полноценно запустить Node.js-приложение. Варианты:
    - Разместить backend на отдельном VPS/VDS (можно у Beget или другого провайдера) и в фронтенде использовать абсолютные URL к API (например `https://api.yourdomain.ru/api/...`).
    - Использовать внешние платформы для backend (DigitalOcean, Render, Railway и т.п.) и подключать к их сервису MySQL или к вашей БД.

- **Если у вас тариф Beget VDS/VPS:**
  - Можно развернуть Node.js и MySQL прямо на сервере (аналогично разделу выше про Ubuntu): установить Node.js, настроить systemd/pm2 и nginx как reverse-proxy.

Практические шаги для Beget (shared) — коротко:

1. Собрать фронтенд:

```powershell
cd frontend
npm install
npm run build
```

2. Загрузить `dist` в корень домена через SFTP (пример для FileZilla/WinSCP):

- Host: yourdomain.ru (или IP)
- User/Password: из панели Beget -> FTP/SFTP
- Путь приема: `/www/yourdomain.ru/`

3. Создать MySQL базу в панели Beget: Панель → Базы данных → Создать базу. Запишите параметры и используйте их в backend/.env.

4. Backend: если не можете запустить Node.js на shared, разверните backend отдельно (VPS) и в `frontend/src`/компонентах замените вызовы к `/api/...` на полный URL `https://api.yourdomain.ru/api/...` или добавьте переменную окружения с базовым URL.

5. SSL: Beget поддерживает Let's Encrypt в панели — включите SSL для домена, либо загрузите свои сертификаты.

Советы и ограничения:
- Если вы хотите, чтобы backend и база находились на Beget и у вас shared-план, уточните в техподдержке Beget, доступен ли запуск Node.js-демонов — на многих тарифах это недоступно.
- Самый простой и устойчивый вариант: фронтенд — на Beget (статика), backend — на небольшом VPS (у Beget или другого провайдера). Это даст гибкость и сохранит возможности MySQL на Beget (если хотите использовать их MySQL, откройте доступ с IP VPS/сервиса или используйте удалённую БД).
- При использовании удалённой БД: в панели Beget в настройках базы укажите, что подключение будет с внешнего хоста, и добавьте IP сервера в белый список (если требуется).

Готов дополнить раздел примером `.env` для продакшна, конфигурацией nginx для проксирования API, либо подготовить `Docker Compose` для развертывания backend+MySQL на VDS Beget — скажите, что предпочитаете.
