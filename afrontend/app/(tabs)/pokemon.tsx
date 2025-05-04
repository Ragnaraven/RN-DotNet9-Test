import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {NamedApiResource, Pokemon, PokemonTypeSlot} from '@/api/pokemonApi';
import {usePokemonAbility, usePokemonDetail, usePokemonList, usePokemonType} from '@/hooks/usePokemon';

const getPokemonId = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
}

export default function PokemonScreen() {
    const [pokemon, setPokemon] = useState<NamedApiResource[]>([]);
    const [offset, setOffset] = useState(0);
    const LIMIT = 20;

    const {
        data: pokemonData,
        loading: pokemonLoading,
        error: pokemonError,
    } = usePokemonList(LIMIT, offset);

    useEffect(() => {
        if(pokemonData && pokemonData.results) {
            setPokemon(prevState => {
                const newEntries = pokemonData.results.filter(
                    newPoke => !prevState.some(old => newPoke.url == old.url)
                );
                return [...prevState, ...newEntries];
            });
        }
    }, [pokemonData]);

    const handleLoadMore = () => {
        if(!pokemonLoading && pokemonData?.next) {
            setOffset(prevState => prevState + LIMIT);
        }
    }

    const Footer = () => {
        if(!pokemonLoading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large"/>
                <ThemedText style={styles.footerText}>Loading...</ThemedText>
            </View>
        )
    }

    return (
        <ThemedView style={styles.container}>
            {pokemonError && <ThemedText>{pokemonError.toString()}</ThemedText>}
            {pokemonLoading && <ThemedText>Loading...</ThemedText>}
            {pokemon.length > 0 && (
                <FlatList
                    data={pokemon}
                    renderItem={({ item }) => <PokemonItem item={item} />}
                    keyExtractor={(item) => getPokemonId(item.url)}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<Footer />}
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
            {pokemonLoading && <ThemedText>Loading...</ThemedText>}
            {pokemonError && <ThemedText>Error: {pokemonError}</ThemedText>}
            {pokemon && (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                        <ThemedText style={{ fontWeight: "bold", fontSize: 32 }}>#{pokemon.id}</ThemedText>
                        <ThemedText style={pokemonStyles.pokemonName}>{item.name}</ThemedText>
                        <Image source={{ uri: pokemon.sprites.front_default }}
                               style={pokemonStyles.pokemonImage} />
                    </View>
                    <View>
                        <View>
                            {pokemon.types.map((item, index) => 
                                <PokemonTypeItem item={item} key={index}/>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </ThemedView>
    );
};

const PokemonTypeItem = ({ item }: { item: PokemonTypeSlot }) => {
    const {
        data: type,
        loading: typeLoading,
        error: typeError
    } = usePokemonType(getPokemonId(item.type.url));

    if(typeLoading) return null;

    return (
        <View>
            {}
        </View>
    );
}

const PokemonAbilityItem = ({ item }: { item: NamedApiResource }) => {
    const {
        data: ability,
        loading: abilityLoading,
        error: abilityError
    } = usePokemonAbility(item.name);
    
    if(abilityLoading) return null;
    
    return (
        <View>
            {abilityError && <ThemedText>{item.name}</ThemedText>}
        </View>
    );
}

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
        flexDirection: 'row'
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
