﻿using Microsoft.AspNetCore.Mvc;
using TorahBackend.Application.Interfaces;

namespace TorahBackend.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class LibroController: ControllerBase
    {
        private readonly ILibroService _libroService;

        public LibroController(ILibroService libroService) { 
            _libroService = libroService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var libros = await _libroService.List();
            return Ok(libros);
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get(string id)
        {
            var libro = await _libroService.Get(id);

            if (libro == null) {
                return NotFound(new { message = $"El recurso con ID {id} no fue encontrado." });
            }

            return Ok(libro);
        }
    }
}