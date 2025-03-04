using TorahBackend.Application.Interfaces;
using TorahBackend.Domain.Entities;
using TorahBackend.Application.DTO;

namespace TorahBackend.Application.Services
{
    public class GlosarioService: IGlosarioService
    {
        private readonly IDataRepository _dataRepository;
        public GlosarioService(IDataRepository dataRepository) 
        {
            _dataRepository = dataRepository;
        }

        public async Task<List<GlosarioDTO>> List() 
        {
            try
            {
                var list = new List<GlosarioDTO>();
                var glosarioRecords = await _dataRepository.ListGlosario();

                if (glosarioRecords != null)
                {
                    glosarioRecords.ForEach(glosario => 
                    {
                        list.Add(new GlosarioDTO
                        {
                            Id = glosario.Id,
                            Contenido = glosario.Contenido,
                        });
                    });
                }

                return list;
            }
            catch
            {
                throw;
            }
        }
        public async Task Actualizar(string? id, string? contenido)
        {
            try
            {
                await _dataRepository.UpdateGlosario(id, contenido);
            }
            catch
            {
                throw;
            }
        }

    }
}
