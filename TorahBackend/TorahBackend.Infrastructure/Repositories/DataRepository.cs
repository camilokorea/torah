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
        private readonly IMongoCollection<Usuario>? _usuarioCollection;
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

                _usuarioCollection = _database.GetCollection<Usuario>("Usuario");
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

                var existingUsers = await _usuarioCollection.Find(_ => true).ToListAsync();

                if (existingUsers.Count < 1) {
                    await _usuarioCollection.InsertOneAsync(new Usuario {
                        Email="admin@admin.com",
                        Password= "a5a2b5f65bcd9bde0a3943774e4cc2fc"
                    });
                }
            }
            catch {
                throw;
            }
        }

        public async Task<Usuario> GetUsuario(string email) {
            try {
                var usuario = await _usuarioCollection.FindAsync(x => x.Email == email).Result.SingleOrDefaultAsync();
                return usuario;
            }
            catch { 
                throw;  
            }
        }

        public async Task<List<Libro>> ListLibros()
        {
            try
            {
                var libros = await _libroCollection.FindAsync(_ => true);
                return libros.ToList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Libro> ListLibro(string id)
        {
            try
            {
                var libro = await _libroCollection.FindAsync(_x => _x.Id == id);
                return libro.SingleOrDefault();
            }
            catch
            {
                throw;
            }
        }

        public async Task UpdateNombreLibro(string id, string nombre) 
        {
            try
            {
                var filter = Builders<Libro>.Filter.Eq(x => x.Id, id);

                var update = Builders<Libro>.Update.Set(x => x.Nombre, nombre);

                await _libroCollection.UpdateOneAsync(filter, update);
            } 
            catch 
            {
                throw;
            }
        }
    }
}
