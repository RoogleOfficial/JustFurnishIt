using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Design_Services.Migrations
{
    /// <inheritdoc />
    public partial class Initial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Designs",
                columns: table => new
                {
                    DesignId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesignName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    PricePerSquareFeet = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DesignerId = table.Column<int>(type: "int", nullable: false),
                    MaterialsUsed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Dimension = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Style = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SpecialFeatures = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designs", x => x.DesignId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Designs");
        }
    }
}
