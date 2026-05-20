export interface Habit {
    id: string;
    name: string;
    streak: number;
    lastCompletedDate: string | null;
}

export type NewHabit = Pick<Habit, 'name'>;
export type HabitEdit = Pick<Habit, 'id' | 'name'>;
