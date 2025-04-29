import { Platform, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Profile screen</ThemedText>
            <View style={styles.platformContainer}>
                <ThemedText>Platform:</ThemedText> 
                <View style={styles.osContainer}>
                    <ThemedText style={styles.osText}>
                        {Platform.OS}
                    </ThemedText>
                </View>
            </View>
            
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    platformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    osContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        ...Platform.select({
            web: {
                backgroundColor: 'white',
            },
            android: {
                backgroundColor: '#3DDC84', // Android green
            },
            ios: {
                backgroundColor: '#C0C0C0', // Apple Silver
            },
        }),
    },
    osText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 1,
        ...Platform.select({
            web: {
                color: 'black',
            },
            android: {
                color: 'white',
            },
            ios: {
                color: 'black', // Silver background with black text for better contrast
            },
        }),
    },
});