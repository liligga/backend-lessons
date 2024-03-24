---
title: 'Создание бота и первые обработчики'
description: 'Создание бота, первые обработчики, отправка сообщений'
slug: 'be84b6fc-6061-40e8-8dc4-ff4b1c3486f9'
order: 1
menu: [{title: 'Вступление', path: '#начало'}, {title: 'Создание бота', path: '#создание бота'}, ]
---

##### Вступление
Привет! Сегодня вы узнаете, как создавать телеграм бота на Python при помощи пакета [aiogram](https://docs.aiogram.dev/en/latest/install.html)
Для начала, нужно ввести некоторые понятия:
- бот - это аккаунт на платформе Telegram, которые автоматизирован, обрабатывает разные команды и сообщения
- команда - это сообщение в Telegram, которе начинается обычно с символов `/` и `!` (символ `#` - нельзя)
- бот также часто используется для автоматизаций разных процессов или вместо сайта-визитки:
    - генерация картинок
    - регистрация на мероприятие
    - администрирование групп
    - организация сотрудников компании, служебные боты
    - часто служит заменой сайта, чтобы отобразить товары, услуги, информацию
    - и т.д.

Создадим проект. Для этого просто создадим папку где нам удобно. В этой папке будут размещаться файлы нашего проекта и папка с виртуальным окружением(обычно `venv`). 

###### Создание файла `.gitignore`
Далее создадим файл `.gitignore` и заполним его особенным образом: мы сгенерируем его наполнение. Этот шаг очень важен, и часто те, кто игнорирует эти инструкции, в последующем будут иметь не самые приятные последствия в проекте. Так вот, перейдем на [gitignore.io](https://gitignore.io) и введем в поиске просто `Python`:

![Сайт gitignore.io](/python/1_0.png)

Кстати, при переходе на сайт происходит перенаправление, так и должно быть. Нажимаем на кнопку "Create" и для нас генерируется полноценный `.gitignore` файл на все случаи жизни. Почему бы просто не написать его вручную? Потому что можно что-то упустить, особенно когда ты новичок, и много не знаешь, как например для чего `.env` файлы и т.д. Итак, файл сгенерирован, можно скопировать всё из браузера и вставить в новосозданный `.gitignore` в нашем проекте.

В скопированном файле `.gitignore` нужно найти строку `#.idea/` и разкомментировать её, это для пользователей PyCharm.

##### Создание бота
Чтобы создать бота, в первую очередь нужно обратиться к главному боту под ником `@botfather`. Это служебный бот, при помощи которого можно создавать ботов, менять их настройки и многое другое.

![Поиск @botfather](/python/1_1.png)

Далее этого бота нужно запустить, нажав кнопку "START". Если это не первое ваше общение с этим ботом(как и слюбым другим), то кнопки старт не будет. Вводим команду `/newbot` для создания нашего с вами бота:
![Сздание нового бота через @botfather](/python/1_2.png)

@botfather просит придумать имя для вашего бота. Имя(название) - это не ник, это то, что отображается в списке чатов или поиске жирным шрифтом. У @botfather это "BotFather". Нашему боту мы поставим "Супер-Пупер бот", можно ставить пробелы:
![Название бота](/python/1_3.png)

Далее @botfather просит ввести ник нашего бота. Здесь есть два правила:
- ник должен быть уникальным
- ник **не должен** содержать специальные символы и **должен** заканчиваться на `_bot` или `Bot`

Ниже скриншоты, как могут выглядеть сообщения @botfather если какое-либо из этих правил нарушено:

![Ошибка в нике бота](/python/1_4.png)

![Ошибка в нике бота](/python/1_5.png)

![Ошибка в нике бота](/python/1_6.png)

Мы выберем ник `my_super_duper_python_bot`, кстати, собачку при вводе нового имени бота здесь вводить не нужно:

![Ник бота](/python/1_7.png)

Как видно выше, @botfather, помимо всего прочего, отправил нам ссылку на чат с нашим ботом и также предоставил нам токен. Токен можно скопировать просто нажав на него. 
А что такое этот такое? Токен для бота, это как для обычного пользователя связка "логин-пароль" на любом сайте или в любом приложении. 
По этому токену сервера Telegram будут понимать, какой именно бот, может из миллионов других ботов, к ним обращается. 
Для каждого бота существует свой уникальный токен, который нужно хранить в укромном месте рядом с ботом. На гитхаб токен ни в коем случае не должен попасть, поэтому нельзя делать ни одного гит-коммита до того, пока не создадим правильный и полный `.gitignore`
Токен бота можно менять.
Итак, токен мы скопировали, теперь нам нужно его поместить в файл `.env` в папке проекта следующим образом:

![Токен бота в файле .env](/python/1_8.png)

##### Первый скрипт

 Для начала нам потребуется установить несколько пакетов:
```bash
pip install aiogram python-dotenv
```

Первый пакет - aiogram, собственно, для написания кода нашего бота. Мы будем использовать третью версию aiogram. Второй пакет для того, чтобы подгрузить скрытый токен из файла `.env`, сгенерированный для нашего бота. 
Далее создадим файл `main.py`(main - основной, это основной файл, точка входа, через который мы будем запускать наш бот) и заполним его следующим кодом:


```python
import asyncio
from aiogram import Bot, Dispatcher, types
from dotenv import load_dotenv
from os import getenv


load_dotenv()
bot = Bot(getenv('BOT_TOKEN'))
dp = Dispatcher()

async def main():
    # запуск бота
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
```

Это первый скрипт, бот просто запускается, в консоли пусто, как будто ничего не происходит. Если не было никаких ошибок - всё хорошо, бот запущен, он ждет сообщений от серверов Telegram. Он пока не умеет обрабатывать никакие сообщения и команды, но он работает так или иначе. Если его остановить, бот перестанет работать.

##### Первый обработчик

Запишем в наш скрипт первый обработчик сообщений, который будет принимать сообщения от пользователей и в ответ отправлять то же самое:
```python
@dp.message()
async def echo(message: types.Message):
    await message.answer(message.text)
```
###### Декораторы

Первая строчка(`@dp.message()`) - декоратор. При помощи таких декораторов можно регулировать, какие сообщения и команды бот будет обрабатывать в тех или иных функциях. 
Да, разные функции(обработчики) должны реагировать на разные сообщения и команды боту. 
Например, одна функция реагирует на команду `/start`, другая на сообщения `Напитки`, третья - на нажатие на кнопку `Заказать пиццу` и т.д. 
Данный декоратор предоставляется самой библиотекой aiogram, также существуют декораторы, которые есть и в самом языке python. 
Декоратор `@dp.message()` говорит о том, что асинхронная функция строчкой ниже будет обрабатывать все входящие сообщения адресованные нашему боту. И да, декораторы в python всегда пишутся над конкретной функции или классом, в данном случае декоратор сигнализирует, что асинхронная функция echo будет обрабатывать как-то все входящие сообщения. Если закомментировать этот декоратор, то бот перестанет реагировать на сообщения.

###### Типы данных, type hinting

Код `echo(message: types.Message)` означает, что функция echo будет принимать аргумент, у которого тип `Message`. 
Этот тип не просто из самого python как `int` или `str`. Он определен в библиотеке aiogram. 
У него есть свои методы и свойства. Один из методов - `answer()`, он вызывается в функции echo, и служит для того, чтоб отрпавить текстовый ответ тому, кто написал сообщение нашему боту. 
А одно из свойств типа `message` - это `text`, которое из себя представляет текст входящего сообщения.

##### Обработчики команд

Команды - простые текстовые сообщения боту, которые начинаются с `/`. Напишем обработчик команды `/start`:

```python
from aiogram.filters import Command

@dp.message(Command('start'))
async def start(message: types.Message):
    await message.answer(f'Привет, {message.from_user.full_name}!')
```

Отличие декоратора в коде выше от декоратора функции echo в том, что этот теперь отлавливает сообщение `/start`. 
Также в коде выше видно, что бот в этой функции будет обращаться к пользователю по его имени, которое можно взять из свойств объекта message. Вообще говоря, можно получить еще чуть больше информации об отправителе помимо его имени, достаточно посмотреть что входит в `message.from_user`(например при помощи `print()` в терминал)


###### Подключение логирования

Иногда полезно видеть, что происходит с ботом, запускается ли он вообще, кто и какие сообщения отправляет нашему боту и тд. Для этого добавим следующий код:

```python
import logging

# часть кода пропущена для краткости

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
```

Это называется логированием, т.е. процесс записи информации о том, что проиходит в программе или системе. Логировать можно любое событие, такое как ошибки, предупреждения, информация о выполнении функций и т.д.

##### Отправка файлов

Наш бот также может отправлять разные файлы, картинки, видео, документы и тд. Существует несколько способов это сделать, здесь мы рассмотрим самый простой: отправка картинок из локальной папки. Для начала создадим в проекте папку для картинок - `images`, и положим туда картинку `cat.jpeg`. Следующий код будет отправлять эту картинку если получит от пользователя входящее сообщение с командой `/pic`:

```python
@dp.message(Command('pic'))
async def send_picture(message: types.Message):
    file = types.FSInputFile('images/cat.jpeg')
    await message.answer_photo(file, caption='Котик')
```

Из кода выше следует заметить, как открывается картинка и как она отправляется. Теперь мы уже не используем метод `answer()`, который служит для отправки пользователю тектовых сообщений, а именно `answer_photo()`. Существует целый набор методом объекта message для отправки разных видов сообщений, все они имеют разную сигнатуру, то есть принимают разные параметры. Вот некоторые из них:
- `message.answer()`
- `message.answer_photo()`
- `message.answer_video()`
- `message.answer_audio()`
- `message.answer_document()`
- `message.answer_sticker()`
- `message.answer_location()`
- `message.answer_venue()`
- `message.answer_contact()`

Также существует зеркальный набот методов, подобных методу `reply()`(в ответе видна часть сообщения, на которое отправляется ответ):
- `message.reply()`
- `message.reply_photo()`
- `message.reply_video()`
- `message.reply_audio()`
- `message.reply_document()`
- `message.reply_sticker()`
- `message.reply_location()`
- `message.reply_venue()`
- `message.reply_contact()`

###### Общий способ отправлять сообщения

Вообще метод `answer()` - это синтактический сахар, т.е. легкая запись, для более общего способа отправлять сообщения при помощи экземпляра класса `Bot`:

```python
await bot.send_message(chat_id=message.chat.id, text='Привет, я бот')
```

Это то же самое что и 
```python
await message.answer('Привет, я бот')
```

А метод `reply()` аналогичен коду:
```python
await bot.send_message(
    chat_id=message.chat.id,
    text='Привет, я бот', 
    reply_to_message_id=message.message_id
)
```

##### Меню бота

Каждый бот может иметь своё меню с командами, такое, как например у @botfather. Меню нудно для быстрого введения команд и доступа ко всему списку команд
Есть способ задать меню через изменения настроек в @botfather. Так же есть способ задать меню бота через код.
Можно делать отдельные команды меню доступными только в личной переписке с ботом, а другие только в групповом чате(боты могут состоять в группах Telegram
и даже заниматься администрироваем этих групп, например банить при использовании нецензурной речи).

Пример кода для создания меню бота:
```python
async def main():
    await bot.set_my_commands([
        types.BotCommand('start', 'Запустить бота'),
        types.BotCommand('help', 'Помощь'),
        types.BotCommand('pic', 'Получить картинку')
    ])

    # запуск бота:
    await dp.start_polling(bot)
```