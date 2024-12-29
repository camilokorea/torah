using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TorahBackend.Application.DTO;
using TorahBackend.Application.Interfaces;

namespace TorahBackend.Application.Services
{
    public class LibroService: ILibroService
    {
        private readonly IDataRepository _dataRepository;
        public LibroService(IDataRepository dataRepository) {
            _dataRepository = dataRepository;
        }

        public async Task<List<LibroInfo>> ObtenerLibros()
        {
            try { 
                var list = new List<LibroInfo>();

                var librosRecords = await _dataRepository.ObtenerLibros();

                if (librosRecords != null) 
                {
                    if (librosRecords.Count > 0) 
                    {
                        librosRecords.ForEach(libro => {
                            list.Add(new LibroInfo { 
                                Id = libro.Id,
                                Abreviacion = libro.Abreviacion,
                                Nombre=libro.Nombre
                            });
                        });
                    }
                }

                return list;
            }
            catch { 
                throw;
            }
        }
    }
}
