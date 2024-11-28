using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking_Service.Migrations
{
    /// <inheritdoc />
    public partial class slotRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Slots");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Slots",
                columns: table => new
                {
                    SlotId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesignerId = table.Column<int>(type: "int", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsBooked = table.Column<bool>(type: "bit", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slots", x => x.SlotId);
                });
        }
    }
}
