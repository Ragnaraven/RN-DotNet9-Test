import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetails () {
    const { id } = useLocalSearchParams();
    
    return (
        <View>
            <Text>Details for {id}</Text>
        </View>
    )
}