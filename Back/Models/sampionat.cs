using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.Models 
{

    [Table("Sampionat")]

    public class Sampionat {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Godina")]
        public int Godina { get; set; }

        public virtual List<Trka> TrkeSezona { get; set; }
        
    }
}