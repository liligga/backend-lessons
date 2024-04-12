---
title: Интеграция Баз Данных в Aiogram бот
description: Интреграция Sqlite в Aiogram бот
order: 4
slug: 56fa1071-33a9-4c2b-a817-e0a080e026fa
---

1. Проверить `.gitignore` на упоминание БД
    - можно убрать название БД, оставить только расширение `*.db`,`*.sqlite`, `*.sqlite3`
    - очень важно, чтоб база данных не загружалась на github.com(почему?)
    - ДО добавлении файлов в индекс git(команда `git add .`), нужно проверять, какие файлы git отслеживает(команда `git status`)
    - ДО коммита также нужно проверять, какие файлы git отслеживает(команда `git status`)

2. Подготовка к работе с БД:
    - `pip install aiosqlite` - установка библиотеки для асинхронной работы с БД
    - создаём **пакет** `db` в основной папке проекта
    - в пакете `db` создаём **модули** `queries.py` и `database.py`

3. Один класс со всеми запросами
    <details>
    <summary>код</summary>

    ```python
    class Queries:
        CREATE_SURVEY_TABLE = """
            CREATE TABLE IF NOT EXISTS surveys (
                ...
            )
        """
        DROP_BOOKS_TABLE ="DROP TABLE IF EXISTS books"
        CREATE_BOOKS_TABLE = """
            CREATE TABLE IF NOT EXISTS books (
                ...
            )
        """
    ```
    - запросы в этом классе хранятся как константы, что удобно

    </details>

4. Класс для работы с БД в асинхронном режиме, создается в модуле `database.py`:
    <details>
    <summary>код</summary>

    ```python
    import aiosqlite
    from db.queries import Queries


    class Database:
        def __init__(self, path: str) -> None:
            self.path = path

        async def create_tables(self) -> None:
            async with aiosqlite.connect(self.path) as db:
                await db.execute(Queries.CREATE_SURVEY_TABLE)
                await db.commit()
    ```
    это начало, далее он будет изменяться

    </details>

5. Сделаем так, чтобы при запуске бота создавалось подключение к БД. В файл `config.py` добавим:
```python
from db.database import Database
from pathlib import Path

database = Database(Path('__file__').parent / 'db.sqlite')
```
а в файле `main.py` добавим функцию `on_startup` и сделаем ее выполнение обязательным при запуске бота:
```python
async def on_startup(bot: Bot) -> None:
    await database.create_tables()


async def main():
    # перед запуском
    dp.startup.register(on_startup)
    #
```

6. Как записывались запросы в БД при помощи обычного sqlite3?

- для добавления данных в таблицу
- для получения всех данных из таблицы
- для получения одной записи из таблицы

7. Добавим метод в класс `Database` для выполнения каких-либо *изменений* в БД
    <details>
    <summary>код</summary>

    ```python
    class Database:
        async def execute(self, query: str, params: tuple | None = None) -> None:
            async with aiosqlite.connect(self.path) as db:
                await db.execute(query, params or ())
                await db.commit()
    ```

    </details>

8. И метод для *получения* данных из БД

    <details>
    <summary>код</summary>

    ```python
    class Database:
        async def fetch(self, query: str, params: tuple | None = None, fetch_type: str = 'all'):
            async with aiosqlite.connect(self.path) as db:
                db.row_factory = aiosqlite.Row
                data = await db.execute(query, params or ())

                if fetch_type == 'all':
                    result = await data.fetchall()
                    return [dict(row) for row in result]

                if fetch_type == 'one':
                    result = await data.fetchone()
                    return dict(result)
    ```

    </details>

9. Перепишем запросы к БД в пункте 6 при помощи записанных выше функций

