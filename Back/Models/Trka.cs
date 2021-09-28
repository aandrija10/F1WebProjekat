using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Back.Models {


    [Table("Trka")]
    public class Trka {
        
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv_Trke")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Lokacija_Trke")]
        [MaxLength(255)]
        public string Lokacija { get; set; }
        
        public virtual List<Vozac> Vozaci { get; set; }
        
        [JsonIgnore]
        public Sampionat Sampionat { get; set; }
    }
}