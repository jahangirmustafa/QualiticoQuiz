using Microsoft.EntityFrameworkCore;
using Qualitico.Data.Entities;

namespace Qualitico.WebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        //public DbSet<SubAdminUser> SubAdminUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}