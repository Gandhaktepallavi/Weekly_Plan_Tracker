# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files first (for better caching)
COPY src/WeeklyPlanner.Api/*.csproj src/WeeklyPlanner.Api/
COPY src/WeeklyPlanner.Application/*.csproj src/WeeklyPlanner.Application/
COPY src/WeeklyPlanner.Domain/*.csproj src/WeeklyPlanner.Domain/
COPY src/WeeklyPlanner.Infrastructure/*.csproj src/WeeklyPlanner.Infrastructure/

RUN dotnet restore src/WeeklyPlanner.Api/WeeklyPlanner.Api.csproj

# Copy everything else
COPY src/ ./src/

WORKDIR /src/src/WeeklyPlanner.Api
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WeeklyPlanner.Api.dll"]