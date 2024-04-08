---
title: Диалоги в Aiogram
description: Создание диалогов в боте при помощи FSM
order: 3
slug: aaaaa
---

1. Создадим класс с состояниями
   ```python
    from aiogram.fsm.state import State, StatesGroup
    from aiogram.fsm.context import FSMContext


    class BookSurvey(StatesGroup):
        name = State()
        age = State()
        gender = State()
        genre = State()
        author = State()
   ```
2. Первый обработчик, в котором запускается диалог
   ```python
    async def start_survey(message: types.Message, state: FSMContext):
        await state.set_state(BookSurvey.name)
        await message.answer("Как вас зовут?")
   ```
3. Второй обработчик, в котором обрабатываается ответ на первый вопрос и задается следующий
   ```python
    @router.message(BookSurvey.name)
    async def process_name(message: types.Message, state: FSMContext):
        await state.set_state(BookSurvey.age)
        await message.answer("Сколько вам лет?")
   ```

