import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Habit } from '../features/habits/types';
import { HabitItem } from './HabitItem';

interface Props {
    habits: Habit[];
    onToggleToday: (id: string) => void;
}

export function HabitList({ habits, onToggleToday }: Props) {
    if (habits.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No habits</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitItem habit={item} onToggleToday={onToggleToday} />
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
