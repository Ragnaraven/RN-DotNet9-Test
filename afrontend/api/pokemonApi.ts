import { Platform } from "react-native";

// In a real app, you would get this from environment variables
// or a configuration file based on the build environment
const API_BASE_URL = __DEV__ 
  ? (Platform.OS === 'android' ? "http://10.0.2.2:5012" : "http://localhost:5012")
  : "https://your-production-api.com";

export const backendUrl = `${API_BASE_URL}/api`;

export interface PokemonResponse 
{
    count: number;
    next: string;
    previous: string;
    results: NamedApiResource[];
}

export interface NamedApiResource {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonTypeSlot[];
    abilities: PokemonAbility[];
    cries: PokemonCries;
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}

export interface PokemonAbility {
    ability: NamedApiResource;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: PokemonSpritesOther;
}

export interface PokemonSpritesOther {
    "official-artwork": PokemonSpritesOfficialArtwork;
}

export interface PokemonSpritesOfficialArtwork {
    front_default: string;
    front_shiny: string;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedApiResource;
}

export interface PokemonTypeSlot {
    slot: number;
    type: NamedApiResource;
}



export const pokemonApi = {
    getPokemon: async (limit: number = 20, offset: number = 0): Promise<PokemonResponse> => {
        const response = await fetch(`${backendUrl}/pokemon?limit=${limit}&offset=${offset}`);
        return response.json();
    },
    
    getPokemonById: async (id: number): Promise<Pokemon> => {
        const response = await fetch(`${backendUrl}/pokemon/${id}`);
        return response.json();
    },

    getAbilityByName: async (name: string): Promise<PokemonAbility> => {
        const response = await fetch(`${backendUrl}/ability/${name}`);
        return response.json();
    },

    getTypeByName: async (name: string): Promise<PokemonTypeSlot> => {
        const response = await fetch(`${backendUrl}/type/${name}`);
        return response.json();
    }
}










