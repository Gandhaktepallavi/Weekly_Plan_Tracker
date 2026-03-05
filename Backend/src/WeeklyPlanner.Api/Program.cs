using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;
using WeeklyPlanner.Application.Services;
using WeeklyPlanner.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2️⃣ Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3️⃣ Services
builder.Services.AddScoped<IBacklogService, BacklogService>();
builder.Services.AddScoped<IWeeklyPlanService, WeeklyPlanService>();

// 4️⃣ Database (Cosmos DB)
builder.Services.AddDbContext<WeeklyPlannerDbContext>(options =>
    options.UseCosmos(
        builder.Configuration["Cosmos:AccountEndpoint"],
        builder.Configuration["Cosmos:AccountKey"],
        builder.Configuration["Cosmos:DatabaseName"]
    ));

var app = builder.Build();

// 5️⃣ Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 6️⃣ Middleware
app.UseCors("AllowAngular");
app.UseHttpsRedirection();

app.MapControllers();

app.Run();