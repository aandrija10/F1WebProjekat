// <auto-generated />
using System;
using Back.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Back.Migrations
{
    [DbContext(typeof(FormulaContext))]
    partial class FormulaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Back.Models.Sampionat", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Godina")
                        .HasColumnType("int")
                        .HasColumnName("Godina");

                    b.HasKey("ID");

                    b.ToTable("Sampionat");
                });

            modelBuilder.Entity("Back.Models.Trka", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Lokacija")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Lokacija_Trke");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv_Trke");

                    b.Property<int?>("SampionatID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SampionatID");

                    b.ToTable("Trka");
                });

            modelBuilder.Entity("Back.Models.Vozac", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Ime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Ime");

                    b.Property<int>("Pozicija")
                        .HasColumnType("int")
                        .HasColumnName("Pozicija");

                    b.Property<string>("Prezime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Prezime");

                    b.Property<string>("Tim")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Tim");

                    b.Property<int?>("TrkaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("TrkaID");

                    b.ToTable("Vozac");
                });

            modelBuilder.Entity("Back.Models.Trka", b =>
                {
                    b.HasOne("Back.Models.Sampionat", "Sampionat")
                        .WithMany("TrkeSezona")
                        .HasForeignKey("SampionatID");

                    b.Navigation("Sampionat");
                });

            modelBuilder.Entity("Back.Models.Vozac", b =>
                {
                    b.HasOne("Back.Models.Trka", "Trka")
                        .WithMany("Vozaci")
                        .HasForeignKey("TrkaID");

                    b.Navigation("Trka");
                });

            modelBuilder.Entity("Back.Models.Sampionat", b =>
                {
                    b.Navigation("TrkeSezona");
                });

            modelBuilder.Entity("Back.Models.Trka", b =>
                {
                    b.Navigation("Vozaci");
                });
#pragma warning restore 612, 618
        }
    }
}
