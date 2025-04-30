var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Add ResponseCaching service
builder.Services.AddResponseCaching();

// Add memory cache for in-memory caching
builder.Services.AddMemoryCache();

// Add HttpClient for external API requests
builder.Services.AddHttpClient();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Always enable OpenAPI for testing
app.MapOpenApi();

app.UseHttpsRedirection();
app.UseRouting();

// Add response caching middleware (must be before endpoints)
app.UseResponseCaching();

app.UseCors("AllowAll");

// Map controller endpoints
app.MapControllers();

app.Run();