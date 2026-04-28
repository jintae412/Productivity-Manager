export interface Task {
    id: string;
    title: string;
    notes: string;
    dueDate: string | null;
    completed: boolean;
    createdAt: string;
    tags: string[];
}

export type NewTask = Omit<Task, 'id' | 'completed' | 'createdAt'>;
export type TaskUpdate = Partial<Omit<Task, 'id'>> & { id: string };
