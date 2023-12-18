import React, { useEffect, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTasksAsync,
    createTaskAsync,
    selectAllTasks,
} from './store/tasksSlice';
import Task from "./type.ts";


const TaskItem: React.FC<{ task: Task; onUpdate: (status: boolean) => void; onDelete: () => void }> = ({
                                                                                                           task,
                                                                                                           onUpdate,
                                                                                                           onDelete,
                                                                                                       }) => (
    <li key={task.id}>
        <input type="checkbox" checked={task.status} onChange={() => onUpdate(task.status)} />
        {task.title} <button onClick={onDelete}>Delete</button>
    </li>
);

const App: React.FC = () => {
    const dispatch = useDispatch();
    const tasks: Task[] = useSelector(selectAllTasks);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    const handleCreateTask = () => {
        if (newTaskTitle.trim() !== '') {
            dispatch(createTaskAsync({ title: newTaskTitle, status: false }));
            setNewTaskTitle('');
        }
    };

    const handleUpdateTaskStatus = (status: boolean) => {
    };

    const handleDeleteTask = () => {
    };

    return (
        <div>
            <div>
                <h2>Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} onUpdate={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
                    ))}
                </ul>
            </div>
            <div>
                <h2>Create Task</h2>
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTaskTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateTask();
                        }
                    }}
                />
                <button onClick={handleCreateTask}>Create Task</button>
            </div>
        </div>
    );
};

export default App;
