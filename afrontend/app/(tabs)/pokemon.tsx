import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NamedApiResource, Pokemon } from '@/api/pokemonApi';
import { usePokemonDetail, usePokemonList } from '@/hooks/usePokemon';

const getPokemonId = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
}

export default function PokemonScreen() {
    const [offset, setOffset] = useState(0);
    const [allPokemon, setAllPokemon] = useState<NamedApiResource[]>([]);
    const LIMIT = 20;

    const { 
        data: pokemonList, 
        loading: pokemonListLoading, 
        error: pokemonListError 
    } = usePokemonList(LIMIT, offset);

    useEffect(() => {
        if (pokemonList && pokemonList.results) {
            // Add new pokemon to our list
            setAllPokemon(prev => {
                const newPokemon = pokemonList.results.filter(
                    pokemon => !prev.some(p => p.name === pokemon.name)
                );
                return [...prev, ...newPokemon];
            });
        }
    }, [pokemonList]);

    const handleLoadMore = () => {
        if (!pokemonListLoading && pokemonList?.next) {
            setOffset(offset + LIMIT);
        }
    };

    const renderFooter = () => {
        if (!pokemonListLoading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" />
                <ThemedText style={styles.footerText}>Loading more Pokemon...</ThemedText>
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            {pokemonListLoading && offset === 0 && <ThemedText>Loading...</ThemedText>}
            {pokemonListError && <ThemedText>Error: {pokemonListError.toString()}</ThemedText>}
            {allPokemon.length > 0 && (
                <FlatList
                    data={allPokemon}
                    renderItem={({ item }) => <PokemonItem item={item} />}
                    keyExtractor={(item) => getPokemonId(item.url)}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 8,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        marginTop: 10,
    }
});


const PokemonItem = ({ item }: { item: NamedApiResource }) => {
    const {
        data: pokemon,
        loading: pokemonLoading,
        error: pokemonError
    } = usePokemonDetail(parseInt(getPokemonId(item.url)));
    
    return (
        <ThemedView style={pokemonStyles.pokemonItem}>
            <ThemedText style={pokemonStyles.pokemonName}>{item.name}</ThemedText>
            {pokemonLoading && <ThemedText>Loading...</ThemedText>}
            {pokemonError && <ThemedText>Error: {pokemonError}</ThemedText>}
            {pokemon && (<Image 
                source={{ uri: pokemon.sprites.front_default }} 
                style={pokemonStyles.pokemonImage} />
            )}
        </ThemedView>
    );
};

const { width } = Dimensions.get('window');
const pokemonStyles = StyleSheet.create({
    pokemonItem: {
        width: (width - 48) / 2,
        margin: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    pokemonImage: {
        width: 100,
        height: 100,
    },
});
