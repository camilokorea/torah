using TorahBackend.Application.DTO;

namespace TorahBackend.Application.Interfaces
{
    public interface ILibroService
    {
        Task <List<LibroInfo>> List();

        Task<LibroDetalle> Get(string id);

        Task ActualizarNombre(string id, string nombre);

        Task ActualizarAbreviatura(string id, string abreviatura);
    }
}
