import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootTabParamList = {
    Today: undefined;
    Tasks: undefined;
    Habits: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
    BottomTabScreenProps<RootTabParamList, T>;

export type TasksStackParamList = {
    TasksList: undefined;
    TaskForm: { taskId?: string };
};

export type TasksStackScreenProps<T extends keyof TasksStackParamList> =
    NativeStackScreenProps<TasksStackParamList, T>;
