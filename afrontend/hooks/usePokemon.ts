import { useState, useEffect } from 'react';
import { pokemonApi, PokemonResponse, Pokemon } from '../api/pokemonApi';

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