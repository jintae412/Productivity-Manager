import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodayScreen, HabitsScreen } from '../screens';
import { TasksNavigator } from './TasksNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: true }}>
            <Tab.Screen name="Today" component={TodayScreen} />
            <Tab.Screen name="Tasks" component={TasksNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Habits" component={HabitsScreen} />
        </Tab.Navigator>
    );
}
