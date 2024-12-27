using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TorahBackend.Application.Interfaces;
using TorahBackend.Domain.Entities;

namespace TorahBackend.Application.Services
{
    public class UsuarioService: IUsuarioService
    {
        private readonly IDataRepository _dataRepository;
        private readonly string _jwtToken;
        public UsuarioService(IDataRepository dataRepository, string jwtToken) {
            _dataRepository = dataRepository;
            _jwtToken = jwtToken;
        }

        public async Task<Usuario> GetUsuario(string email)
        {
            try { 
                return await _dataRepository.ObtenerUsuario(email);
            }
            catch {
                throw;
            }
        }

        public string GenerateJwtToken(Usuario usuario) 
        {
            try {
                var key = Encoding.ASCII.GetBytes(_jwtToken);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id),
                    new Claim(ClaimTypes.Email, usuario.Email)
                }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch { throw; }
        }
    }
}
