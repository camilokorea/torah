using Microsoft.AspNetCore.Mvc;
using TorahBackend.Application.DTO;
using TorahBackend.Application.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace TorahBackend.WebApi.Controllers
{
    public class AuthController: ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public AuthController(IUsuarioService usuarioService) 
        { 
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Correo y contraseña son requeridos." });

            var user = await _usuarioService.GetUsuario(request.Email);

            StringBuilder hash = new StringBuilder();

            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();

            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(request.Password));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2")); //lowerCase; X2 if uppercase desired
            }

            if (user == null || hash.ToString() != user.Password)
                return Unauthorized(new { message = "Credenciales incorrectas." });

            var token = _usuarioService.GenerateJwtToken(user);

            return Ok(new { token });
        }
    }
}
