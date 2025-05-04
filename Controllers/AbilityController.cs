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
public class AbilityController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public AbilityController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }
    
    [HttpGet("{name}")]
    [ResponseCache(Duration = 3600, VaryByQueryKeys = new[] { "name" })]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PokemonResponse))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAbilityByName([FromRoute] string name)
    {
        var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/ability/{name}/");
        var data = await ControllerHelper.handleResponse<PokemonAbility>(response);
        return Ok(data);
    }
}
 