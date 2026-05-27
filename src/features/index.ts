export { store } from './store';
export type { RootState, AppDispatch } from './store';

export { addTask, updateTask, toggleComplete, deleteTask } from './tasks/tasksSlice';
export type { Task, NewTask, TaskUpdate } from './tasks/types';
export {
	selectAllTasks,
	selectAllTags,
	selectTaskById,
	selectCompletedTasks,
	selectPendingTasks,
	selectTasksDueOn,
} from './tasks/selectors';

export { addHabit, toggleHabitToday, editHabit, removeHabit } from './habits/habitsSlice';
export type { Habit, NewHabit, HabitEdit } from './habits/types';
export {
	selectAllHabits,
	selectHabitById,
	selectCompletedHabitsToday,
	selectPendingHabitsToday,
} from './habits/selectors';
