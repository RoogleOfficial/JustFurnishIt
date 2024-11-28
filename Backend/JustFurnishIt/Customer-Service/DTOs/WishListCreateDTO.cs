namespace Customer_Service.DTOs
{
    // Data Transfer Object for creating a new wishlist entry.
    public class WishListCreateDTO
    {
        // The ID of the user who owns the wishlist.
        public int UserId { get; set; }

        // The ID of the design to be added to the wishlist.
        public int DesignId { get; set; }
    }
}
