# Project Setup

## 1. Initial Setup

Install all packages:

```bash
npm install
```

## 2. Database setup

Change the database credentials at `config/config.json`:

```json
"development": {
    "username": "task_app",
    "password": "tasks2024",
    "database": "task_management",
    "host": "127.0.0.1",
    "dialect": "mysql"
}
```

Run database migration to create table:

```bash
npm run db:migrate:up
```

You can undo migration with this command:

```bash
npm run db:migrate:undo
```

## 3. Docker container (Optional)

Docker contaner used to run MySQL Service.
If you already have MySQL server, you don't need to run Docker.

Start docker container:

```bash
docker compose up
```

or you can run in deamon mode with `-d` flag.

```bash
docker compose up -d
```

Make sure there are no service running on port `3360` to avoid conflict.

## 4. Running the development server

```bash
npm run start
```

## 5. Running the test

```bash
npm run test
```


# The API endpoints

## POST `/tasks` - Create new task

### Request

- method: POST
- endpoint: `/tasks`
- Headers:
    - Content-Type: application/json
    - Accept: application/json
- Body

    ```json
    {
    "title": "Implementasi Testing dengan Supertest",
    "status": "pending",
    "dueDate": "2024-08-16"
    }
    ```

### Response

- Status: `200 OK`
- Body:

    ```json
    {
    "id": "2f7cabf4-12ef-4778-b31f-6ddb1201dcfa",
    "title": "Implementasi Testing dengan Supertest",
    "status": "pending",
    "dueDate": "2024-08-16",
    "updatedAt": "2024-08-15T13:21:09.075Z",
    "createdAt": "2024-08-15T13:21:09.075Z"
    }
    ```

## GET `/tasks` - Get tasks

### Request

- method: GET
- endpoint: `/tasks`
- Headers:
    - Content-Type: application/json
    - Accept: application/json

Filtering query options:

- `status` string (ex: `pending`, `in progress` `completed`)
- `dueDate` date string (ex: `2024-08-17`)

Example filtering endpoint:

```url
/tasks?status=completed
```

### Response

- Status: `200 OK`
- Body:

    ```json
    [
        {
            "id": "054b8469-dfe7-430e-b27c-9e37fc4b449b",
            "title": "New Task 1",
            "description": null,
            "dueDate": "2024-08-17",
            "status": "pending",
            "createdAt": "2024-08-15T14:20:29.000Z",
            "updatedAt": "2024-08-15T14:20:29.000Z"
        },
        {
            "id": "2f7cabf4-12ef-4778-b31f-6ddb1201dcfa",
            "title": "Implementasi Testing dengan Supertest",
            "description": null,
            "dueDate": "2024-08-16",
            "status": "pending",
            "createdAt": "2024-08-15T13:21:09.000Z",
            "updatedAt": "2024-08-15T13:21:09.000Z"
        },
        {
            "id": "32a887bd-7eb4-492e-a37e-c4fffb7e26d9",
            "title": "New Task 2",
            "description": null,
            "dueDate": "2024-08-17",
            "status": "pending",
            "createdAt": "2024-08-15T14:39:21.000Z",
            "updatedAt": "2024-08-15T14:39:21.000Z"
        }
    ]
    ```

## PUT `/tasks/:id` - Update Tasks

### Request

- method: PUT
- endpoint: `/tasks/:id`
- Headers:
    - Content-Type: application/json
    - Accept: application/json
- Body:

    ```json
    {
    "status": "in progress",
    "dueDate": "2024-08-17"
    }
    ```

### Response

- Status: `200 OK`
- Body:

    ```json
    {
    "id": "ffec65a3-3faf-4049-82c8-1a0060f5bf43",
    "title": "Implementasi Testing dengan Supertest",
    "description": null,
    "dueDate": "2024-08-17",
    "status": "in progress",
    "createdAt": "2024-08-15T13:20:55.000Z",
    "updatedAt": "2024-08-15T13:21:37.000Z"
    }
    ```

## DELETE `/tasks/:id` - Remove task

### Request

- method: DELETE
- endpoint: `/tasks/:id`
- Headers:
    - Content-Type: application/json
    - Accept: application/json

### Response


- Status: `200 OK`
- Body:

```json
{
  "message": "Task deleted!"
}
```