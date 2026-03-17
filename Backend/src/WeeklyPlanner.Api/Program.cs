using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// 1. CORS – allowed origins from config (set in Azure App Service → Configuration)
var allowedOrigins = builder.Configuration
    .GetSection("AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (allowedOrigins.Length > 0)
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        else
            // Development fallback
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
    });
});

// 2. Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. DbContext – CosmosDB (endpoint + key from Azure App Service Configuration)
var cosmosEndpoint = builder.Configuration["CosmosDB:Endpoint"]
    ?? throw new InvalidOperationException("CosmosDB:Endpoint is not configured.");
var cosmosKey = builder.Configuration["CosmosDB:Key"]
    ?? throw new InvalidOperationException("CosmosDB:Key is not configured.");
const string databaseName = "WeeklyPlannerDB";

builder.Services.AddDbContext<WeeklyPlannerDbContext>(options =>
    options.UseCosmos(cosmosEndpoint, cosmosKey, databaseName));

var app = builder.Build();

// 4. Ensure Cosmos DB + containers are created on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WeeklyPlannerDbContext>();
    await db.Database.EnsureCreatedAsync();
}

// 5. Swagger (enabled in all environments for easy testing after deploy)
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// 6. CORS before MapControllers
app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
