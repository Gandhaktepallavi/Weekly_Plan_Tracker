using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;
using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Infrastructure.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2 Controllers + Swagger
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3 Services
builder.Services.AddScoped<IBacklogService, BacklogService>();
builder.Services.AddScoped<IWeeklyPlanService, WeeklyPlanService>();
builder.Services.AddScoped<ITeamMemberService, TeamMemberService>();
builder.Services.AddScoped<ICategorySettingsService, CategorySettingsService>();

// 4 Cosmos DB configuration
var cosmosEndpoint = builder.Configuration["Cosmos:AccountEndpoint"];
var cosmosKey = builder.Configuration["Cosmos:AccountKey"];
var cosmosDatabase = builder.Configuration["Cosmos:DatabaseName"];

builder.Services.AddDbContext<WeeklyPlannerDbContext>(options =>
    options.UseCosmos(
        cosmosEndpoint!,
        cosmosKey!,
        cosmosDatabase!
    ));

var app = builder.Build();

// 5 Swagger
    app.UseSwagger();
    app.UseSwaggerUI();


// 6 Middleware
app.UseCors("AllowAngular");
app.UseHttpsRedirection();

app.MapControllers();

app.Run();
