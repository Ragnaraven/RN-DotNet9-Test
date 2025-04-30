using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using ProfileAPI.Models;

namespace ProfileAPI.Controllers;

/// <summary>
/// Controller for accessing Pokemon data from the PokeAPI
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PokemonController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public PokemonController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpGet]
    [ResponseCache(Duration = 3600, VaryByQueryKeys = new[] { "limit", "offset" })]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PokemonResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPokemon([FromQuery] int limit = 20, [FromQuery] int offset = 0)
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            var pokemonResponse = JsonSerializer.Deserialize<PokemonResponse>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return Ok(pokemonResponse);
        }
        catch(Exception ex)
        {
            return StatusCode(500, "Error fetching pokemon");
        }
    }

    [HttpGet("{id}")]
    [ResponseCache(Duration = 3600, VaryByQueryKeys = new[] { "id" })]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PokemonResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPokemonById([FromRoute] int id)
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{id}");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            var pokemon = JsonSerializer.Deserialize<Pokemon>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return Ok(pokemon);
        }
        catch(Exception ex)
        {
            return StatusCode(500, "Error fetching pokemon");
        }
    }
}
 