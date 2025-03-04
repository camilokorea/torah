using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TorahBackend.Application.DTO;
using TorahBackend.Application.Interfaces;
using TorahBackend.Domain.Entities;

namespace TorahBackend.Application.Services
{
    public class LibroService: ILibroService
    {
        private readonly IDataRepository _dataRepository;

        private readonly IVersionControladorService _versionControladorService;

        public LibroService(IDataRepository dataRepository, IVersionControladorService versionControladorService) {
            _dataRepository = dataRepository;
            _versionControladorService = versionControladorService;
        }

        public async Task<List<LibroInfo>> List()
        {
            try { 
                var list = new List<LibroInfo>();

                var librosRecords = await _dataRepository.ListLibros();

                if (librosRecords != null) 
                {
                    if (librosRecords.Count > 0) 
                    {
                        librosRecords.ForEach(libro => {
                            list.Add(new LibroInfo { 
                                Id = libro.Id,
                                Abreviacion = libro.Abreviacion,
                                Nombre = libro.Nombre,
                                Testamento = libro.Testamento
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

        public async Task<LibroDetalle> Get(string? id)
        {
            try
            {
                var libroRecord = await _dataRepository.ListLibro(id);

                LibroDetalle libro = new LibroDetalle();

                if (libroRecord != null)
                {
                    libro.Id = libroRecord.Id;
                    libro.Nombre = libroRecord.Nombre;
                    libro.Abreviacion = libroRecord.Abreviacion;
                    libro.Testamento = libroRecord.Testamento;

                    foreach (var item in libroRecord.Capitulos)
                    {
                        libro.Capitulos.Add(new CapituloDetalle
                        {
                            CapituloNumero = item.CapituloNumero,
                            Versiculos = item.Versiculos
                        });
                    }
                }
                else {
                    libro = null;
                }

                return libro;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<LibroDetalle>> GetTorah()
        {
            try
            {
                var libroRecords = await _dataRepository.ListLibros();

                List<LibroDetalle> libros = new List<LibroDetalle>();

                if (libroRecords != null)
                {
                    foreach (var libroRecord in libroRecords)
                    {
                        libros.Add(new LibroDetalle
                        {
                            Id = libroRecord.Id,
                            Nombre = libroRecord.Nombre,
                            Abreviacion = libroRecord.Abreviacion,
                            Testamento = libroRecord.Testamento
                        });

                        foreach (var item in libroRecord.Capitulos)
                        {
                            libros[libros.Count - 1].Capitulos.Add(new CapituloDetalle
                            {
                                CapituloNumero = item.CapituloNumero,
                                Versiculos = item.Versiculos
                            });
                        }
                    }
                }

                return libros;
            }
            catch
            {
                throw;
            }
        }

        public async Task ActualizarNombre(string? id, string? nombre)
        {
            try
            {
                await _dataRepository.UpdateNombreLibro(id, nombre);
                await _versionControladorService.IncrementarVersion();
            }
            catch
            {
                throw;
            }
        }

        public async Task ActualizarAbreviatura(string? id, string? abreviatura)
        {
            try
            {
                await _dataRepository.UpdateAbreviaturaLibro(id, abreviatura);
                await _versionControladorService.IncrementarVersion();
            }
            catch
            {
                throw;
            }
        }

        public async Task ActualizarVersiculo(string? id, int capituloNumero, int versiculoNumero, string? versiculo)
        {
            try
            {
                await _dataRepository.UpdateVersiculoLibro(id, capituloNumero, versiculoNumero, versiculo);
                await _versionControladorService.IncrementarVersion();
            }
            catch
            {
                throw;
            }
        }
    }
}
