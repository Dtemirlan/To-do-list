import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, deleteTask } from '../tasksAPI';

export interface Task {
    id: string;
    title: string;
    status: boolean;
}

export const fetchTasksAsync = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
    const response = await fetchTasks();
    return Object.values(response.data ?? {}) as Task[];
});

export const createTaskAsync = createAsyncThunk<Task, { title: string; status: boolean }>(
    'tasks/createTask',
    async (task) => {
        const response = await createTask(task);
        return response.data;
    }
);

export const deleteTaskAsync = createAsyncThunk<string, string>('tasks/deleteTask', async (id) => {
    await deleteTask(id);
    return id;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const deletedTaskId = action.payload;
                state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId);
            });
    },
});

export const selectAllTasks = (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks;

export default tasksSlice.reducer;
