import { StyleSheet, Text, View } from 'react-native';
import type { RootTabScreenProps } from '../navigation/types';

export function TodayScreen(_props: RootTabScreenProps<'Today'>) {
  return (
    <View style={styles.container}>
      <Text>Today</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
