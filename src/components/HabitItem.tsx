import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Habit } from '../features/habits/types';

interface Props {
    habit: Habit;
    onToggleToday: (id: string) => void;
}

function isCompletedToday(habit: Habit): boolean {
    const today = new Date().toISOString().slice(0, 10);
    return habit.lastCompletedDate === today;
}

export function HabitItem({ habit, onToggleToday }: Props) {
    const done = isCompletedToday(habit);

    return (
        <View style={styles.row}>
            <Pressable
                style={[styles.checkbox, done && styles.checkboxDone]}
                onPress={() => onToggleToday(habit.id)}
            >
                {done && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
            <Text style={[styles.name, done && styles.nameDone]}>{habit.name}</Text>
            <View style={styles.streakBadge}>
                <Text style={styles.streakText}>{habit.streak}🔥</Text>
            </View>
        </View>
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
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    name: {
        flex: 1,
        fontSize: 16,
        color: '#1C1C1E',
    },
    nameDone: {
        color: '#8E8E93',
    },
    streakBadge: {
        marginLeft: 8,
    },
    streakText: {
        fontSize: 14,
        color: '#1C1C1E',
    },
});
