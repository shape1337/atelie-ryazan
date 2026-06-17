Развёртывание на VDS (Ubuntu) с использованием Docker Compose

Шаги ниже предполагают, что у вас есть VDS/VPS с Ubuntu 20.04/22.04 и доступ по SSH.

1) Подготовка сервера

```bash
ssh root@SERVER_IP
apt update && apt upgrade -y
# Установим необходимые пакеты
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER

# Установка docker-compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

Перезайдите в сессию SSH, чтобы применились группы пользователя, или перезагрузите сервер.

2) Клонирование проекта и подготовка

```bash
cd /srv
git clone <your-repo-url> atelie
cd atelie
cp .env.example .env
# Отредактируйте .env и задайте реальные пароли
nano .env
```

3) Запуск контейнеров

```bash
docker-compose up -d --build
```

Проверить логи:

```bash
docker-compose logs -f backend
docker-compose logs -f web
```

4) Настройка SSL

Вариант A — использовать certbot на хосте (рекомендуется для гибкости):

```bash
apt install -y certbot
# Остановите временно nginx из контейнера, если он использует 80/443
docker-compose stop web
certbot certonly --standalone -d yourdomain.ru -d www.yourdomain.ru
# После получения сертификата запустите web обратно
docker-compose start web
```

Затем смонтируйте сертификаты в контейнер nginx, отредактировав `docker-compose.yml` и `nginx/default.conf` для использования `ssl_certificate` и `ssl_certificate_key`.

Вариант B — воспользоваться Docker image с автоматическим получением сертификатов (например, nginx-proxy + companion). Это сложнее, но удобно для нескольких сайтов.

5) Дополнительные советы
- Резервное копирование базы: используйте `docker exec` + `mysqldump` для регулярных дампов.
- Обновления: при изменениях в коде выполняйте `docker-compose pull` (если используете registry) или `docker-compose up -d --build`.
- Мониторинг: используйте `docker ps` и `docker logs` для диагностики.

Если хотите, подготовлю systemd unit для автоматического запуска docker-compose в случае перезагрузки, пример nginx-конфиг с SSL и инструкцию по бекапу БД.
