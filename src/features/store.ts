import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habits/habitsSlice';
import tasksReducer from './tasks/tasksSlice';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		habits: habitsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
