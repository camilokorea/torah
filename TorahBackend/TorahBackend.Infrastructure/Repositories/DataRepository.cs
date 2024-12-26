using TorahBackend.Application.Interfaces;
using MongoDB.Driver;
using TorahBackend.Domain.Entities;

namespace TorahBackend.Infrastructure.Repositories
{
    public class DataRepository: IDataRepository
    {
        private readonly string _connectionString;
        private readonly IMongoDatabase? _database;
        private readonly IMongoCollection<Libro>? _libroCollection;
        private readonly ITorahJsonRepository _torahJsonRepository;

        public DataRepository(string connectionString, ITorahJsonRepository torahJsonRepository)
        {
            try
            {
                _connectionString = connectionString;

                _torahJsonRepository = torahJsonRepository;

                var mongoUrl = MongoUrl.Create(connectionString);
                var mongoClient = new MongoClient(mongoUrl);

                _database = mongoClient.GetDatabase(mongoUrl.DatabaseName);

                _libroCollection = _database.GetCollection<Libro>("Libro");
            }
            catch
            {
                throw;
            }
        }

        public async Task DataSeed() 
        {
            try {
                var existingLibros = await _libroCollection.Find(_ => true).ToListAsync();

                if (existingLibros.Count < 1) 
                {
                    var libros = await _torahJsonRepository.LoadData();

                    await _libroCollection.InsertManyAsync(libros);
                }
            }
            catch {
                throw;
            }
        }
    }
}
