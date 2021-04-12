using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Executor> Executors { get; set; }
        public DbSet<WorkTask> Tasks { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}