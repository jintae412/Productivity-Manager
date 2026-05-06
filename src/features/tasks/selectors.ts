import type { RootState } from '../store';

export const selectAllTasks = (state: RootState) => state.tasks.items;

export const selectTaskById = (id: string) => (state: RootState) =>
	state.tasks.items.find((t) => t.id === id);

export const selectCompletedTasks = (state: RootState) =>
  	state.tasks.items.filter((t) => t.completed);

export const selectPendingTasks = (state: RootState) =>
  	state.tasks.items.filter((t) => !t.completed);

export const selectTasksDueOn = (date: string) => (state: RootState) =>
  	state.tasks.items.filter((t) => t.dueDate === date && !t.completed);

export const selectAllTags = (state: RootState): string[] => {
    const tagSet = new Set<string>();
    for (const task of state.tasks.items) {
        for (const tag of task.tags) {
            tagSet.add(tag);
        }
    }
    return Array.from(tagSet).sort();
};
