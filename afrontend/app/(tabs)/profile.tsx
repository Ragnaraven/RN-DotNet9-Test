import { Platform, ScrollView, StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
    const textColor = useThemeColor({}, 'text');

    return (
        <ScrollView style={styles.pageContainer} contentContainerStyle={styles.pageContainerContent}>
            <OSInfoComponent />
            <View style={[styles.profileCard, { borderColor: textColor }]}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/favicon.png')} style={[styles.profileImage, { borderColor: textColor }]} />
                    <View style={styles.profileTextContainer}>
                        <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>NAME HERE</ThemedText>
                        <ThemedText style={{ fontSize: 16, fontWeight: 'normal', fontStyle: 'italic' }}>Title Here</ThemedText>
                    </View>
                </View>
                <ScrollView>
                    <ThemedText style={{ fontSize: 12, fontWeight: 'normal' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue, metus sed porttitor sagittis, lacus risus iaculis tortor, eu tempus turpis enim ut erat. Morbi accumsan lacus vitae viverra maximus. Suspendisse aliquam iaculis ipsum vel ornare. Suspendisse aliquam, dui a tincidunt porttitor, neque purus porttitor ex, vitae lobortis augue diam quis enim. Nulla ultrices sapien in lorem mattis lobortis. Suspendisse rutrum faucibus lectus at dictum. Duis lobortis elit semper lorem pulvinar iaculis. In molestie, elit sed congue consequat, metus sem blandit dolor, eget tincidunt enim lorem ut erat. Sed interdum tortor consequat nibh pulvinar, in vestibulum lacus convallis. Nam non lorem commodo, scelerisque nulla a, sollicitudin libero. Vestibulum id ullamcorper est, volutpat placerat dolor. Pellentesque a posuere enim.</ThemedText>
                </ScrollView>
                <View style={styles.footer}>
                    <IconSymbol name="mail" size={16} color={textColor} />
                    <ThemedText>Contact Info: <ThemedText style={{ fontSize: 12, fontWeight: 'normal', textDecorationLine: 'underline' }}>example@example.com</ThemedText></ThemedText>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        height: '100%',
    },
    pageContainerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    profileCard: {
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        width: 300,
        height: 400,
        borderRadius: 16,
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        gap: 8
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1
    },
    profileTextContainer: {
        flexDirection: 'column',
        gap: 8
    },
    footer: {
        flexDirection: 'row',
        gap: 8,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const OSInfoComponent = () => {
    return (<View>
        <ThemedText>Profile screen</ThemedText>
        <View style={osInfoStyles.platformContainer}>
            <ThemedText>Platform:</ThemedText> 
            <View style={osInfoStyles.osContainer}>
                <ThemedText style={osInfoStyles.osText}>
                    {Platform.OS}
                </ThemedText>
            </View>
        </View>  
    </View>);
}

const osInfoStyles = StyleSheet.create({
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