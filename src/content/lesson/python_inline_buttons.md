---
title: "Встроенные кнопки в боте"
description: "Встроенные кнопки в ответах бота"
draft: true
slug: "cb51d0a8-8f1b-466c-a0d6-27ee83a7c65f"
order: 2.1
---

##### Вступление

Бот может отправлять сообщения пользователям, в конце которых прикреплены к сообщению кнопки. Это называется `InlineButton`. Такие кнопки скользят при прокрутке вместе с сообщением, к которому они прикреплены. Удобно иметь такие кнопки например как главное меню, прикрепленное к приветственному сообщению, для навигации по разделам бота. Или также удобно иметь такие кнопки для определенного функционала, связанного с индивидуальными товарами/услугами. Случаев использования много, больше чем можно обговорить в рамках урока.

// тут скрин с inline кнопками

Напишем код для создания набора таких кнопок и прикрепления к приветственному сообщению:

```python
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


@start_router.message(Command("start"))
async def start(message: types.Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Наш сайт", url="https://example.com")
            ],
            [
                InlineKeyboardButton(text="Наш инстаграм", url="https://instagram.com/example"),
            ]
            [
                InlineKeyboardButton(text="Товары", callback_data="our_products"),
            ],
            [
                InlineKeyboardButton(text="О нас", callback_data="about_us"),
            ],
            [
                InlineKeyboardButton(text="Контакты", callback_data="contacts"),
            ]
        ]
    )
    await message.answer(
        text="Приветствуем Вас в нашем магазине!\nДля перехода по разделам бота нажмите на кнопку ниже.",
        reply_markup=keyboard
    )
```

Первое, что стоит отметить про код выше - создание клавиатуры(`InlineKeyboardMarkup`), которая служит контейнером для кнопок. Сами же кнопки передаются как вложенные списки в эту клавиатуру через параметр `inline_keyboard`.
Такие кнопки в Telegram используются в для нескольких целей, рассмотрим две самые простые: переход на какой-нибудь сайт и 
запрос обратного вызова(callback query). Запрос обратного вызова может быть обработан 

В коде для создания таких кнопок сначала создают некую клавиатуру(keyboard), как контейнер, и добавляют в нее кнопки.
Как в реально жизни, кнопки не сами по себе, а на клавиатуре. Вот как это выглядит в коде:

```python
from aiogram import types


@start_router.message(Command("start"))
async def start(message: types.Message):
    buttons = [
        [
            types.InlineKeyboardButton("Наш сайт", url="https://google.com"),
            types.InlineKeyboardButton("Наш инстаграм", url="https://instagram.com")
        ],
        [
            types.InlineKeyboardButton("Наш фейсбук", url="https://facebook.com"),
        ]
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
    await message.answer("Привет. Ниже ты можешь выбрать куда перейти", reply_markup=keyboard)
```

Для создания кнопок создается список, в который вложены другие списки, и уже в этих списках лежат наборы кнопок.
Вложенные списки - это горизонтальные ряды с кнопками, и можно регулировать колько кнопок в каждом ряду будет, 
а основной список - как контейнер. У нас в коде выше 2 ряда: верхний с двумя кнопками, а нижний
с одной. Это значит, что первые кнопки(сайт и инста) будут расположены рядом, а третья - чуть ниже них обоих.

// тут скрин с inline кнопками

###### Кнопки с запросом обратного вызова

Кроме ссылки, inline кнопки могут во многих случаях, например - обратный вызов(callback). Через такой запрос можно передать
информацию(data) о том, какая конкретно кнопка была нажата. Обработчик нажатия может отправить в ответ сообщение
или выполнить какое-то другое действие. 

В коде создать такую кнопку, которая будет делать запрос обратного вызова, не сложно:

```python
from aiogram import F, types

async def start(message: types.Message):
    buttons = [
        types.InlineKeyboardButton("Поперейти в магазин", callback_data="shop"),
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
    await message.answer("Привет. Ниже ты можешь выбрать куда перейти", reply_markup=keyboard)

```

Добавляем `callback_data` вместо url, в который передается строковое значение. Теперь напишем обработчик:

```python

@start_router.callback_query(F.data == "shop")
async def shop(callback: types.CallbackQuery):
    await callback.message.answer("Наже представлены категории товаров. Выберите что-нибудь.")
```

Заметим, что декоратор выглядит иначе.

##### Расположение кнопок

Кнопки могут расположены как в ряду, так и в столбце.
Каждый подсписок в `inline_keyboard` - горизонтальный ряд кнопок. Например:

```python
kb = types.InlineKeyboardMarkup(
    inline_keyboard=[
        [
            types.InlineKeyboardButton("Полный перечень товаров", callback_data="shop"),
        ],
        [
            types.InlineKeyboardButton("Вакансии", callback_data="jobs"),
            types.InlineKeyboardButton("Наш сайт", url="https://google.com"),
        ]
    ]
)
```
Будет выглядеть следующим образом:

// тут скрин с inline кнопками
