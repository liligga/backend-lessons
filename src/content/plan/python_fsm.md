---
title: Диалоги в Aiogram
description: Создание диалогов в боте при помощи FSM
order: 3
slug: 70110405-138c-46bb-a4b8-9e20ac633b0a
---

1. Создадим класс с состояниями
   ```python
    from aiogram.fsm.state import State, StatesGroup
    from aiogram.fsm.context import FSMContext


    class BookSurvey(StatesGroup):
        name = State() # имя пользователя
        age = State() # возраст пользователя
        gender = State() # пол пользователя
        genre = State() # любимый жанр
        author = State() # любимый автор
   ```

2. Первый обработчик, в котором запускается диалог
   ```python
    async def start_survey(message: types.Message, state: FSMContext):
        await state.set_state(BookSurvey.name)
        await message.answer("Как вас зовут?")
   ```

3. Второй обработчик, в котором обрабатывается ответ на первый вопрос и задается следующий
   ```python
    @router.message(BookSurvey.name)
    async def process_name(message: types.Message, state: FSMContext):
        await state.set_state(BookSurvey.age)
        await message.answer("Сколько вам лет?")
   ```

4. Обработчик возраста пользователя:
   ```python
    @router.message(BookSurvey.age)
    async def process_age(message: types.Message, state: FSMContext):
        await state.set_state(BookSurvey.gender)
        await message.answer("Ваш пол?")
   ```
   и т.д.

5. Добавим сохранение данных:
   ```python
    @router.message(BookSurvey.name)
    async def process_name(message: types.Message, state: FSMContext):
        await state.update_data(name=message.text)
        await state.set_state(BookSurvey.age)
        await message.answer("Сколько вам лет?")
   ```

6. Добавим проверку введенных данных:
   ```python
    @router.message(BookSurvey.age)
    async def process_age(message: types.Message, state: FSMContext):
        if not message.text.isdigit():
            await message.answer("Пожалуйста, введите число")
            return
        await state.update_data(age=message.text)
        await state.set_state(BookSurvey.gender)
        await message.answer("Ваш пол?")
   ```

7. И команду для остановки диалога:
      ```python
      @router.message(Command("stop"))
      async def stop_survey(message: types.Message, state: FSMContext):
          await state.clear()
          await message.answer("Спасибо за уделённое время!")
      ```

#### Вопросы и ответы:


<details>
    <summary>Что такое FSM?</summary>

FSM - Finite State Machine, конечный автомат, модель, которая может находиться в одном из конечного числа
состояний. Автомат умеет переходить из одного состояния в другое.

</details>

<details>
    <summary>Как FSM используется в Aiogram и для чего?</summary>

FSM используется для создания диалогов в боте. Каждый вопрос - это состояние FSM. Переход между вопросами 
осущестляется при переключении состояний. Без механизма FSM было бы сложно делать диалоги.
FSM в Aiogram служит для:

- переключения между вопросами(в диалоге)
- сохранением данных пользователя, которые он вводит в течении диалога

</details>

<details>
    <summary>Для чего могут использоваться диалоги?</summary>

Для опросников, анкет, тестов. Иногда для внесения администратором данных в базу данных и т.д.
То есть любая ситуация, когда требуется получить комплексную информацию от пользователя.

</details>

<details>
    <summary>Что такое State?</summary>

State - состояние диалога, в котором находится конкретный пользователь. С состоянием обычно ассоциируется вопрос,
на который пользователь ответит.

</details>

<details>
    <summary>Как переключать состояние в FSM Aiogram?</summary>

При помощи метода `set_state` можно переключить состояние:

```python
await state.set_state(BookSurvey.name)
```

</details>

<details>
    <summary>Как получить состояние в FSM Aiogram?</summary>

При помощи метода `get_state` можно получить состояние:
```python
await state.get_state()
```

</details>

<details>
    <summary>Как сохранять ответы пользователя во время диалога?</summary>

При помощи метода `update_data` можно сохранить данные между вопросами:
```python
await state.update_data(name=message.text)
```

</details>

<details>
    <summary>Как остановить диалог?</summary>

При помощи метода `clear` можно остановить диалог:
```python
await state.clear()
```

</details>

<details>
    <summary>Как поучить данные, сохраненные во время диалога?</summary>

При помощи метода `get_data` можно получить данные:
```python
data = await state.get_data()
```

</details>
