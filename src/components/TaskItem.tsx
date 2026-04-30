import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../features/tasks/types';

interface Props {
    task: Task;
    onToggleComplete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete }: Props) {
    const dueLabel = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : null;

    return (
        <Pressable
            style={styles.row}
            onPress={() => onToggleComplete(task.id)}
        >
            <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.text}>
                <Text style={[styles.title, task.completed && styles.titleDone]}>
                    {task.title}
                </Text>
                {dueLabel && <Text style={styles.due}>{dueLabel}</Text>}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#D1D1D6',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#C7C7CC',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: {
        backgroundColor: '#34C759',
        borderColor: '#34C759',
    },
    checkmark: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700',
    },
    text: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#1C1C1E',
    },
    titleDone: {
        color: '#8E8E93',
        textDecorationLine: 'line-through',
    },
    due: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
});
