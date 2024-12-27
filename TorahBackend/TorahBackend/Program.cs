using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TorahBackend.Application.Interfaces;
using TorahBackend.Application.Services;
using TorahBackend.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DbConnection");

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);

var torahJsonRepository = new TorahJsonRepository();

var dataRepository = new DataRepository(connectionString, torahJsonRepository);

var usuarioService = new UsuarioService(dataRepository, builder.Configuration["Jwt:Key"]);

builder.Services.AddScoped<IDataRepository>(provider => dataRepository);

builder.Services.AddScoped<IUsuarioService>(provider => usuarioService);

builder.Services.AddScoped<ITorahJsonRepository>(provider => torahJsonRepository);

// data seed initial torah data
await dataRepository.DataSeed();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
