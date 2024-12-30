
using TorahBackend.Domain.Entities;

namespace TorahBackend.Application.Interfaces
{
    public interface IDataRepository
    {
        Task DataSeed();
        Task<Usuario> GetUsuario(string email);
        Task<List<Libro>> ListLibros();
        Task<Libro> ListLibro(string id);
    }
}
