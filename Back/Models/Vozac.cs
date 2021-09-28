using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Back.Models {

    [Table("Vozac")]
    public class Vozac {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Prezime")]
        [MaxLength(255)]
        public string Prezime { get; set; }

        [Column("Tim")]
        [MaxLength(255)]
        public string Tim { get; set; }

        [Column("Pozicija")]
        //validacija je na klijentu
        public int Pozicija { get; set; }

        [JsonIgnore]
        public Trka Trka { get; set; }
    }
}