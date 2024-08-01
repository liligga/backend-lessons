---
title: 'Разделение на файлы'
description: 'Разделение на файлы'
slug: '48ebad29-b084-42d6-82dd-8cd1d0674196'
order: 2
---

##### Вступление

Бот, которому мы добавили уже три обработчика сообщений и команд занимает пока мало места, но если представить большого бота,
с десятками обработчиков, то становится понятно, файл `main.py` станет большим, с ним будет сложно работать, а когда 
в команде будут несколько разработчиков, каждый из  которых работает в отдельной git-ветке, постоянно будут git-конфликты.
Есть принцип "разделяй и властвуй", попробуем его применить к нашему проекту. Создадим несколько папок, с файлом `__init__.py`.
В python принято называть такие директории пакетами. В этих пакетах будут лежать файлы, которые, кстати, принято назвать модулями,
и наш код будет разделен на модули. Работать с модулями будет удобнее, каждый из них будет отвечать только за что-то одно,
какой-то один функционал. Например, какие-то схожие обработчики можно положить в один модуль, для работы с базой данных
какой-то другой модуль. Кстати, названия пакетов и модулей тоже важны, по названию должно быть понятно, за что отвечает пакет 
или модуль.

##### Разделение на папки

Предлагаю следущую структуру:

```bash
project
├── db/
│   └── __init__.py
├── handlers/
│   ├── __init__.py
│   ├── start.py
│   ├── echo.py
│   └── picture.py
├── images/
│   └── cat.jpg
├── .env
├── .gitignore
├── bot_config.py
├── main.py
└── requirements.txt
```
Папка `db` будет для работы с базой данных(коротко БД). В папке `handlers` будут лежать обработчики. В файле `bot.py` 
будет инициализация бота. В файле `main.py` будет основной код для запуска бота, это основной файл, точка входа.

Вынесем первый обработчик для команды `/start` в отдельный файл `handlers/start.py` с некоторыми изменениями:

```python 
from aiogram import Router, types
from aiogram.filters import Command


start_router = Router()


@start_router.message(Command("start"))
async def start(message: types.Message):
    await message.answer("Привет!")
```

В коде выше фигурирует `Router`(маршрутизатор) и его экземляр `start_router` в декораторе вместо `dp`. `Router` - это как младший брат
класса `Dispatcher`, он используется для организации обработчиков. `Dispatcher` считается главным маршрутизатором, 
в него "встраиваются" другие маршрутизаторы. 

Вот как это выглядит в коде:

```python
from handlers.start import start_router


async def main():
    # часть кода пропущена для краткости
    dp.include_router(start_router)

    # запуск бота:
    await dp.start_polling(bot)
```

Теперь обработчик команды `/start` через `start_router` будет привязаны к `dp` и, соответственно, будет работать.
Все остальные обработчики выносятся в сообветственные модули. Экземпляры класса `Router` в этих модулях я называю по имени
модуля, например `start_router`, `echo_router`, `picture_router`. И далее они так же привязываются к `dp`:

```python
from handlers.start import start_router
from handlers.echo import echo_router
from handlers.picture import picture_router


async def main():
    # часть кода пропущена для краткости
    dp.include_router(start_router)
    dp.include_router(picture_router)

    # в самом конце
    dp.include_router(echo_router)

    # запуск бота:
    await dp.start_polling(bot)
```

##### Вынесение конфигурации в отдельный файл

Вынесем в отдельный файл `bot_config.py` конфигурацию. Это важно, потому что при запуске бота. В файл `bot_config.py` пропишем:

```python
from aiogram import Bot, Dispatcher
from dotenv import load_dotenv
from os import getenv

load_dotenv()
bot = Bot(getenv("BOT_TOKEN"))
dp = Dispatcher()
```

И затем в основном файле `main.py` импортируем `bot` и `dp`:

```python
from bot_config import bot, dp
```

Таким образом, файл `main.py` немного разгружен, а ещё если нам где-то в проекте понадобится `bot` или `dp`, мы избежим ошибки циклического импорта.