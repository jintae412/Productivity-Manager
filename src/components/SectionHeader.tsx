import { StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string;
    subtitle?: string;
}

export function SectionHeader({ title, subtitle }: Props) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingBottom: 8,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: '#8E8E93',
    },
    subtitle: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
});
