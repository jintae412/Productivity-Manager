import { StyleSheet, Text, View } from 'react-native';
import type { RootTabScreenProps } from '../navigation/types';

export function HabitsScreen(_props: RootTabScreenProps<'Habits'>) {
    return (
        <View style={styles.container}>
        <Text>Habits</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
