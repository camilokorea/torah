using TorahBackend.Application.DTO;

namespace TorahBackend.Application.Interfaces
{
    public interface ILibroService
    {
        Task <List<LibroInfo>> List();

        Task<LibroDetalle> Get(string id);
    }
}
