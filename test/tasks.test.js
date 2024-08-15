const request = require('supertest');
const app = require('../app');

describe('GET /tasks', () => {
    it('should return all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        // Assuming tasks is an array
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should return tasks filtered by status', async () => {
        const status = 'pending';
        const res = await request(app).get('/tasks').query({ status });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach(task => {
            expect(task.status).toBe(status)
        });
    });

    it('should return tasks filtered by dueDate', async () => {
        const dueDate = "2024-08-17";
        const res = await request(app).get('/tasks').query({ dueDate });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach(task => {
            expect(task.dueDate).toBe(dueDate)
        });
    });

    // TODO: Add more tests for error scenarios (e.g., invalid query parameters)
    it('should return error on invalid query parameters', async () => {
        const dueDate = "XXXXX";
        const invalidDueDateResponse = await request(app).get('/tasks').query({ dueDate });
        expect(invalidDueDateResponse.statusCode).toBe(400); 

        const status = "XXXXX";
        const invalidStatusResponse = await request(app).get('/tasks').query({ status });
        expect(invalidStatusResponse.statusCode).toBe(400); 
    });
});


describe('GET /tasks/:id', () => {
    it('should return a specific task by id', async () => {

        // create new task
        const newTask = {
            title: 'New Task',
            dueDate: "2024-08-17",
            status: 'pending',
        };
        const createdTaskRes = await request(app).post('/tasks').send(newTask);

        // get and test new tasks
        const id = createdTaskRes.body.id;
        const res = await request(app).get(`/tasks/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', id);

        // remove created task
        await request(app).delete(`/tasks/${id}`)
    });

    it('should return 404 for non-existent task', async () => {
        const id = 9999; // Replace with an invalid ID
        const res = await request(app).get(`/tasks/${id}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Task not found');
    });
});

describe('POST /tasks', () => {
    it('should create a new task', async () => {
        const newTask = {
            title: 'New Task',
            dueDate: "2024-08-17",
            status: 'pending',
        };
        const res = await request(app).post('/tasks').send(newTask);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should return 400 for invalid data', async () => {
        const invalidTask = {};
        const res = await request(app).post('/tasks').send(invalidTask);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('PUT /tasks/:id', () => {
    it('should update tasks', async () => {
        const newTask = {
            title: 'New Task',
            dueDate: "2024-08-17",
            status: 'pending',
        };

        const createRes = await request(app).post('/tasks').send(newTask);

        const id = createRes.body.id;
        const newData = {
            status: 'in progress'
        };

        const updateRes = await request(app).put(`/tasks/${id}`).send(newData);

        // test updated data
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toHaveProperty('status', 'in progress');

        // remove createad data
        await request(app).delete(`/tasks/${id}`);
    });

    it('should return 400 for invalid data', async () => {
        const invalidTask = {};
        const res = await request(app).post('/tasks').send(invalidTask);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('DELETE /tasks/:id', () => {
    it('should delete tasks', async () => {
        const newTask = {
            title: 'New Task',
            dueDate: "2024-08-17",
            status: 'pending',
        };

        const createRes = await request(app).post('/tasks').send(newTask);

        const id = createRes.body.id;
        const deleteRes = await request(app).delete(`/tasks/${id}`);

        // test updated data
        expect(deleteRes.statusCode).toBe(200);        
        // remove createad data
        await request(app).delete(`/tasks/${id}`);
    });

    it('should return 404 for non-existent task', async () => {
        const id = 9999; // Replace with an invalid ID
        const res = await request(app).delete(`/tasks/${id}`);
        expect(res.statusCode).toBe(404);
    });
});