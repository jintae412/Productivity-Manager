import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    children: React.ReactNode;
}

export function ScreenContainer({ children }: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
            styles.container,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        >
        {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 16,
    },
});
