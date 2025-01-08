using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TorahBackend.Application.DTO;
using TorahBackend.Application.Interfaces;

namespace TorahBackend.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class VersionControladorController : ControllerBase
    {
        private readonly IVersionControladorService _versionControladorService;

        public VersionControladorController(IVersionControladorService versionControladorService)
        {
            _versionControladorService = versionControladorService;
        }
    }
}
