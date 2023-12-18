import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dzhaparov-temirlan-js20-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchTasks = () => instance.get('/tasks.json');
export const createTask = (task: { title: string; status: boolean }) => instance.post('/tasks.json', task);
export const updateTask = (id: string, task: { status: boolean }) => instance.put(`/tasks/${id}.json`, task);
export const deleteTask = (id: string) => instance.delete(`/tasks/${id}.json`);
