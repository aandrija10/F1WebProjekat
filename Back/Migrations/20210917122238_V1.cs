using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv_Trke = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Lokacija_Trke = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trka", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Vozac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Tim = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Pozicija = table.Column<int>(type: "int", nullable: false),
                    TrkaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vozac", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vozac_Trka_TrkaID",
                        column: x => x.TrkaID,
                        principalTable: "Trka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vozac_TrkaID",
                table: "Vozac",
                column: "TrkaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vozac");

            migrationBuilder.DropTable(
                name: "Trka");
        }
    }
}
