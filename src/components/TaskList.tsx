import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../features/tasks/types';
import { TaskItem } from './TaskItem';

interface Props {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete }: Props) {
    if (tasks.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No tasks</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TaskItem task={item} onToggleComplete={onToggleComplete} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    empty: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 15,
        color: '#8E8E93',
    },
});
