using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProfileAPI.Models;

public class Pokemon
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Height { get; set; }
    public int Weight { get; set; }
    public PokemonSprites Sprites { get; set; } = new();
    public List<PokemonStat> Stats { get; set; } = new();
    public List<PokemonTypeSlot> Types { get; set; } = new();
    public List<PokemonAbility> Abilities { get; set; } = new();
    public PokemonCries Cries { get; set; } = new();
}

public class PokemonCries
{
    public string Latest { get; set; } = string.Empty;
    public string Legacy { get; set; } = string.Empty;
}

public class PokemonAbility
{
    public NamedApiResource Ability { get; set; } = new();
    
    [JsonPropertyName("is_hidden")]
    public bool IsHidden { get; set; }
    
    public int Slot { get; set; }
}

public class PokemonSprites
{
    [JsonPropertyName("front_default")]
    public string FrontDefault { get; set; } = string.Empty;
    
    [JsonPropertyName("back_default")]
    public string BackDefault { get; set; } = string.Empty;
    
    [JsonPropertyName("front_shiny")]
    public string FrontShiny { get; set; } = string.Empty;
    
    [JsonPropertyName("back_shiny")]
    public string BackShiny { get; set; } = string.Empty;
    
    [JsonPropertyName("other")]
    public PokemonSpritesOther Other { get; set; } = new();
}

public class PokemonSpritesOther
{
    [JsonPropertyName("official-artwork")]
    public PokemonOfficialArtwork OfficialArtwork { get; set; } = new();
}

public class PokemonOfficialArtwork
{
    [JsonPropertyName("front_default")]
    public string FrontDefault { get; set; } = string.Empty;
    
    [JsonPropertyName("front_shiny")]
    public string FrontShiny { get; set; } = string.Empty;
}

public class PokemonStat
{
    [JsonPropertyName("base_stat")]
    public int BaseStat { get; set; }
    
    [JsonPropertyName("effort")]
    public int Effort { get; set; }
    
    [JsonPropertyName("stat")]
    public NamedApiResource Stat { get; set; } = new();
}

public class PokemonTypeSlot
{
    public int Slot { get; set; }
    
    [JsonPropertyName("type")]
    public NamedApiResource Type { get; set; } = new();
}

public class NamedApiResource
{
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}