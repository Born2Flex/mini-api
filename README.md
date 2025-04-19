## Прошу поки не перевіряти! Ми з вами домовились про те що я додам підтримку сесії та OpenID.

Завдання з курсу NodeJS Backend (NestJS)
Тема: "Міні-API для керування нотатками"

Створіть просте RESTful API з використанням NestJS для керування нотатками. API має мати такі ендпоінти:

    GET /notes — отримання списку всіх нотаток.

        Відповідь: INoteListDto

    POST /notes — створення нової нотатки.

        Тіло запиту: ICreateNoteDto

        Відповідь: INoteDto

    GET /notes/:id — отримання конкретної нотатки за ID.

        Відповідь: INoteDto

    PUT /notes/:id — оновлення вмісту існуючої нотатки.

        Тіло запиту: IUpdateNoteDto

        Відповідь: INoteDto

    DELETE /notes/:id — видалення нотатки за ID.

        Відповідь: { success: boolean }
