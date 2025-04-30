using System.Collections.Generic;

namespace ProfileAPI.Models;

public class PokemonResponse
{
    public int Count { get; set; }
    public string Next { get; set; } = "";
    public string Previous { get; set; } = "";
    public List<PokemonLinkResponse> Results { get; set; } = new();
}

public class PokemonLinkResponse
{
    public string Name { get; set; } = "";
    public string Url { get; set; } = "";
}