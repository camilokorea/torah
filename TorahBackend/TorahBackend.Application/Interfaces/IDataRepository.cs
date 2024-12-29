
using TorahBackend.Domain.Entities;

namespace TorahBackend.Application.Interfaces
{
    public interface IDataRepository
    {
        Task DataSeed();
        Task<Usuario> ObtenerUsuario(string email);
        Task<List<Libro>> ObtenerLibros();
    }
}
