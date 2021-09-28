using Microsoft.EntityFrameworkCore;

namespace Back.Models {

    public class FormulaContext : DbContext {
        
        public DbSet<Trka> Trke { get; set; }
        public DbSet<Vozac> Vozaci { get; set; }
        public DbSet<Sampionat> Sampionati { get; set; }

        public FormulaContext(DbContextOptions options) : base(options) {
            
        }
    }
}