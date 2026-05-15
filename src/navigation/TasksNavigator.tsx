import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TasksScreen, TaskFormScreen } from '../screens';
import type { TasksStackParamList } from './types';

const Stack = createNativeStackNavigator<TasksStackParamList>();

export function TasksNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TasksList" component={TasksScreen} options={{ title: 'Tasks' }} />
            <Stack.Screen
                name="TaskForm"
                component={TaskFormScreen}
                options={({ route }) => ({
                    title: route.params?.taskId ? 'Edit Task' : 'New Task',
                })}
            />
        </Stack.Navigator>
    );
}
