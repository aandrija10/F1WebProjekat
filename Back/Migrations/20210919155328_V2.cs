using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SampionatID",
                table: "Trka",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Sampionat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Godina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sampionat", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trka_SampionatID",
                table: "Trka",
                column: "SampionatID");

            migrationBuilder.AddForeignKey(
                name: "FK_Trka_Sampionat_SampionatID",
                table: "Trka",
                column: "SampionatID",
                principalTable: "Sampionat",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trka_Sampionat_SampionatID",
                table: "Trka");

            migrationBuilder.DropTable(
                name: "Sampionat");

            migrationBuilder.DropIndex(
                name: "IX_Trka_SampionatID",
                table: "Trka");

            migrationBuilder.DropColumn(
                name: "SampionatID",
                table: "Trka");
        }
    }
}
