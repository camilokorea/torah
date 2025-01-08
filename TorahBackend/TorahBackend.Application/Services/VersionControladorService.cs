using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TorahBackend.Application.Interfaces;

namespace TorahBackend.Application.Services
{
    public class VersionControladorService: IVersionControladorService
    {
        private readonly IDataRepository _dataRepository;

        public VersionControladorService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public async Task IncrementarVersion() 
        {
            try
            {
                await _dataRepository.IncremetarVersion();
            }
            catch
            {
                throw;
            }
        }
    }
}
