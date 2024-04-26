---
title: Деплой(загрузка) бота на бесплатный сервер python-anywhere
description: Инструкция как задеплоить и запустить бота на бесплатном сервисе
order: 8
slug: 6d403ca8-5389-429d-a108-f8f3b8303c34
---

1. Зарегистрируемся на сайте https://www.pythonanywhere.com
2. Установим библиотеку `aiohttp-socks`
3. Синхронизируем набор установленных пакетов с файлом `requirements.txt`:
    ```bash
    pip freeze > requirements.txt
    ```
    Виртуальное окружение должно быть активировано во время этого.
4. Добавим в `.env` файл следующее:
    ```env
    PROXY = "http://proxy.server:3128"
    DEV = 1
    ```
5. Добавим код в файл `config.py` 
    ```python
    dev = getenv('DEV')
    if not bool(dev):
            from aiogram.client.session.aiohttp import AiohttpSession

            print("Production ready")
            session = AiohttpSession(proxy=getenv('PROXY'))
            bot = Bot(token=getenv('BOT_TOKEN'), session=session)
    else:
            bot = Bot(token=getenv('BOT_TOKEN'))`
    ```
6. Теперь можно сделать коммит и запушить изменения на гитхаб

7. На сайте pythonanywhere нужно открыть консоль, и через нее склонировать ваш репозиторий с ботом. 
    Также в консоли создается виртуальное окружение, устанавливаются зависимости:


    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

    Файл `.env` загружается отдельно как файл.

8. В файле `.env` строка меняется строка `DEV = 0`

9. Можно запускать бот.
