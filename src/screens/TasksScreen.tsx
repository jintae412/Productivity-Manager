import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CreateTaskModal, TaskList } from '../components';
import { selectAllTasks, toggleComplete } from '../features';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootTabScreenProps } from '../navigation/types';

export function TasksScreen(_props: RootTabScreenProps<'Tasks'>) {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectAllTasks);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TaskList
                tasks={tasks}
                onToggleComplete={(id) => dispatch(toggleComplete(id))}
            />
            <CreateTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    fabText: {
        color: '#FFFFFF',
        fontSize: 28,
        lineHeight: 32,
        fontWeight: '400',
    },
});
