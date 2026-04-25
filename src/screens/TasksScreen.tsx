import { StyleSheet, Text, View } from 'react-native';
import type { RootTabScreenProps } from '../navigation/types';

export function TasksScreen(_props: RootTabScreenProps<'Tasks'>) {
    return (
        <View style={styles.container}>
        <Text>Tasks</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
