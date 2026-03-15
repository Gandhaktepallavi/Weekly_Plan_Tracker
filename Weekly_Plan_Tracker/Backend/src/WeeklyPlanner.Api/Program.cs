using Microsoft.EntityFrameworkCore;
using WeeklyPlanner.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// 1. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2. Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. DbContext
builder.Services.AddDbContext<WeeklyPlannerDbContext>(options =>
    options.UseInMemoryDatabase("WeeklyPlanner"));

var app = builder.Build();

// 4. Development tools
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();             // ← HTTPS after CORS


// 5. CRITICAL: CORS BEFORE HTTPS + Routing
app.UseCors("AllowAngular");           // ← BEFORE

app.MapControllers();

app.Run();
