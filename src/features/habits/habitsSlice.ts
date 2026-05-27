import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Habit, HabitEdit, NewHabit } from './types';

interface HabitsState {
    items: Habit[];
}

const initialState: HabitsState = {
    items: [],
};

function todayISO(): string {
    return new Date().toISOString().slice(0, 10);
}

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit(state, action: PayloadAction<NewHabit>) {
            state.items.push({
                id: uuidv4(),
                name: action.payload.name,
                streak: 0,
                lastCompletedDate: null,
            });
        },

        toggleHabitToday(state, action: PayloadAction<string>) {
            const habit = state.items.find((h) => h.id === action.payload);
            if (!habit) return;

            const today = todayISO();
            if (habit.lastCompletedDate === today) {
                habit.lastCompletedDate = null;
                habit.streak = Math.max(0, habit.streak - 1);
            } else {
                habit.lastCompletedDate = today;
                habit.streak += 1;
            }
        },

        editHabit(state, action: PayloadAction<HabitEdit>) {
            const habit = state.items.find((h) => h.id === action.payload.id);
            if (habit) {
                habit.name = action.payload.name;
            }
        },

        removeHabit(state, action: PayloadAction<string>) {
            state.items = state.items.filter((h) => h.id !== action.payload);
        },
    },
});

export const { addHabit, toggleHabitToday, editHabit, removeHabit } = habitsSlice.actions;

export default habitsSlice.reducer;
