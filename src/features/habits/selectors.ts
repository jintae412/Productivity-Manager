import type { RootState } from '../store';

export const selectAllHabits = (state: RootState) => state.habits.items;

export const selectHabitById = (id: string) => (state: RootState) =>
    state.habits.items.find((h) => h.id === id);

export const selectCompletedHabitsToday = (state: RootState) => {
    const today = new Date().toISOString().slice(0, 10);
    return state.habits.items.filter((h) => h.lastCompletedDate === today);
};

export const selectPendingHabitsToday = (state: RootState) => {
    const today = new Date().toISOString().slice(0, 10);
    return state.habits.items.filter((h) => h.lastCompletedDate !== today);
};
