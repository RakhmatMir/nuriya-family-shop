#!/usr/bin/env bash
# Обновить бота на сервере: запускать с ПК из папки сайта —  bash bot/deploy.sh
# Копирует код бота и запасную копию каталога, ставит библиотеки, перезапускает (если токен уже вписан).
set -euo pipefail
cd "$(dirname "$0")/.."
DEST=/opt/projects/nuriya-shop-bot
ssh server "mkdir -p $DEST/data"
scp -q bot/main.py bot/orders.py bot/requirements.txt bot/.env.example bot/nuriya-shop-bot.service server:$DEST/
scp -q js/products.js server:$DEST/products.js
ssh server "set -e; cd $DEST
  [ -d .venv ] || python3 -m venv .venv
  .venv/bin/pip install -q -r requirements.txt
  [ -f .env ] || cp .env.example .env
  chmod 600 .env
  cp nuriya-shop-bot.service /etc/systemd/system/ && systemctl daemon-reload
  if grep -qE '^BOT_TOKEN=.+:.+' .env; then systemctl enable --now nuriya-shop-bot && systemctl restart nuriya-shop-bot && echo 'Бот перезапущен'; else echo 'Токена ещё нет — бот не запущен'; fi"
