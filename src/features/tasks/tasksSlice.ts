import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, NewTask, TaskUpdate } from './types';

interface TasksState {
	items: Task[];
}

const initialState: TasksState = {
  	items: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<NewTask>) {
			const newTask: Task = {
				...action.payload,
				id: crypto.randomUUID(),
				completed: false,
				createdAt: new Date().toISOString(),
			};
			state.items.push(newTask);
		},

		updateTask(state, action: PayloadAction<TaskUpdate>) {
			const { id, ...changes } = action.payload;
			const task = state.items.find((t) => t.id === id);
			if (task) {
				Object.assign(task, changes);
			}
		},

		toggleComplete(state, action: PayloadAction<string>) {
			const task = state.items.find((t) => t.id === action.payload);
			if (task) {
				task.completed = !task.completed;
			}
		},

		deleteTask(state, action: PayloadAction<string>) {
			state.items = state.items.filter((t) => t.id !== action.payload);
		},
	},
});

export const { addTask, updateTask, toggleComplete, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
