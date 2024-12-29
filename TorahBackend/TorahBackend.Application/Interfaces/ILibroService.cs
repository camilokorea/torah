using TorahBackend.Application.DTO;

namespace TorahBackend.Application.Interfaces
{
    public interface ILibroService
    {
        Task <List<LibroInfo>> ObtenerLibros();
    }
}
