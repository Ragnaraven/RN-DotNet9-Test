import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { Icons } from "@/constants/icons";

export default function TabsLayout () {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                borderRadius: 100,
                marginHorizontal: 20,
                marginBottom: 20,
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image source={Icons.home} style={{ width: size, height: size }} />
                )
            }}
        />
        <Tabs.Screen
            name="pokedex"
            options={{
                title: "Pokedex",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image source={Icons.pokedex} style={{ width: size, height: size }} />
                )
            }}
        />
        <Tabs.Screen
            name="saved"
            options={{
                title: "Saved",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image source={Icons.saved} style={{ width: size, height: size }} />
                )
            }}
        />
        <Tabs.Screen
            name="regions"
            options={{
                title: "Regions",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image source={Icons.regions} style={{ width: size, height: size }} />
                )
            }}
        />
    </Tabs>
    );
}