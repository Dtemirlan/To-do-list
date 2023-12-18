import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchTasks} from "../tasksAPI.ts";

interface Task {
    id: string;
    title: string;
    status: boolean;
}

interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
    try {
        const response = await fetchTasks();
        return Object.values(response.data ?? {}) as Task[];
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null,
    } as TasksState,
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
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch tasks';
            });
    },
});



export const selectAllTasks = (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks;
export const selectStatus = (state: { tasks: TasksState }) => state.tasks.status;

export default tasksSlice.reducer;
