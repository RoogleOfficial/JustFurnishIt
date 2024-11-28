using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking_Service.Migrations
{
    /// <inheritdoc />
    public partial class iscomplete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsConfirmed",
                table: "Bookings",
                newName: "IsCompleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Bookings",
                newName: "IsConfirmed");
        }
    }
}
