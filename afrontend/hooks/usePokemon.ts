import { useState, useEffect } from 'react';
import {pokemonApi, PokemonResponse, Pokemon, PokemonAbility, PokemonTypeSlot} from '../api/pokemonApi';

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
    const [data, setData] = useState<PokemonResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        async function fetchPokemon() {
            try {
                const response = await pokemonApi.getPokemon(limit, offset);

                // Only update the state if the component is still mounted
                if (isMounted) {
                    setData(response);
                    setLoading(false);
                }
            } catch (err) {
                // Only update the state if the component is still mounted
                if (isMounted) {
                    setError(err as string);
                }
            }
            finally {
                // Only update the state if the component is still mounted
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, [limit, offset]);

    return { data, loading, error };
}   

export const usePokemonDetail = (id: number) => {
    const [data, setData] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchPokemon() {
            try {
                const response = await pokemonApi.getPokemonById(id);
                if (isMounted) {
                    setData(response);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as string);
                }
            }
            finally {   
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return { data, loading, error };
}

export const usePokemonType = (name: string) => {
    const [data, setData] = useState<PokemonTypeSlot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchAbilities() {
            try {
                const response = await pokemonApi.getTypeByName(name);
                if (isMounted) {
                    setData(response);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as string);
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchAbilities();

        return () => {
            isMounted = false;
        };
    }, [name]);

    return { data, loading, error };
}


export const usePokemonAbility = (name: string) => {
    const [data, setData] = useState<PokemonAbility | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchAbilities() {
            try {
                const response = await pokemonApi.getAbilityByName(name);
                if (isMounted) {
                    setData(response);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as string);
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchAbilities();

        return () => {
            isMounted = false;
        };
    }, [name]);

    return { data, loading, error };
}


