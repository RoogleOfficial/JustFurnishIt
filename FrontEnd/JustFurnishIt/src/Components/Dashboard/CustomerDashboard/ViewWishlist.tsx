import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Spinner from '../../Spinner/Spinner';
import { deleteWishlistItem, getWishlistByCustomerId } from '../../../Services/CustomerServices';
import { DesignDataInfo } from '../../../Types/DesignTypes';
import { WishlistItem } from '../../../Types/CustomerModel';
import { getDesignById } from '../../../Services/DesignService';
// TypeScript type for wishlist item

// TypeScript type for design data

const ViewWishlist: React.FC<{ customerId: number }> = ({ customerId }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [designs, setDesigns] = useState<DesignDataInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch wishlist from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistResponse = await getWishlistByCustomerId(customerId);
        setWishlist(wishlistResponse);
      } catch (err) {
        setError('Failed to fetch wishlist');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [customerId]);
  // Fetch design details for the items in the wishlist
  useEffect(() => {
    const fetchDesignDetails = async () => {
      try {
        const designIds = wishlist.map((item) => item.designId);
        // Fetch design details for each designId in the wishlist
        const designPromises = designIds.map((designId) =>
          getDesignById(designId)
        );
        const designResponses = await Promise.all(designPromises);
        setDesigns(designResponses.map((res) => res));
      } catch (err) {
        setError('Failed to fetch design details');
      }
    };
    if (wishlist.length > 0) {
      fetchDesignDetails();
    }
  }, [wishlist]);
  const handleRemoveFromWishlist = async (designId: number) => {
    try {
      // Find the corresponding wishlist item
      const wishlistItem = wishlist.find((item) => item.designId === designId);
      if (wishlistItem) {
        // Send DELETE request to remove the item from the wishlist
        await deleteWishlistItem(customerId,wishlistItem.wishListId);
        // Update the wishlist state by removing the deleted item
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.designId !== designId));
        console.log('Item removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };
  if (loading) {
    return <div>< Spinner /></div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container mx-auto w-full px-20 py-[6.5rem] max-w-screen-2xl">
      <h2 className="text-4xl font-bold mb-5">Your Wishlist</h2>
      {designs.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {designs.map((design) => (
            <div
              key={design.designId}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
            >
              {/* Filled heart button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  className="group bg-white border border-transparent rounded-full p-2 shadow transition-all duration-300 hover:bg-red-500"
                  onClick={() => handleRemoveFromWishlist(design.designId)}
                >
                  <FaHeart className="h-6 w-6 text-red-500 fill-current group-hover:text-white transition-all duration-300" />
                </button>
              </div>
              <div className="no-underline">
                <img
                  className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                  src={design.imageLink}
                  alt={design.designName}
                />
                <div className="p-4 flex-grow">
                <p className="text-lg text-gray-900 mb-0 font"><strong>{design.designName}</strong></p>

                  <p className="text-sm text-gray-500 mb-0">Size: {design.dimension}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ViewWishlist;