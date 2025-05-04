using System.Text.Json;

namespace ProfileAPI.Controllers;

public class ControllerHelper
{
    public static async Task<T?> handleResponse<T>(HttpResponseMessage response)
    {
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var deserialized = JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        return deserialized;
    }
}