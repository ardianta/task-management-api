# Project Setup

## 1. Initial Setup

Install all packages:

```bash
npm install
```

## 2. Run the docker container

Run the docker container to run MySQL Service:

```bash
docker compose up
```

Make sure there are no service running on port `3360` to avoid conflict.

## 3. Setup database

Run database migration to create table, run this command:

```bash
npm run db:migrate:up
```

## 4. Running development server

```bash
npm run start
```