import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiFileText, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/Store';
import Spinner from '../../Spinner/Spinner';
import { getUserByCustomerId } from '../../../Services/BookingService';

interface CustomerBooking {
  bookingId: number;
  designerName: string;
  designName: string;
  bookingDate: string;
  appointmentDate: string;
  notes: string;
  isCompleted: boolean; // Field to track completed status
  designerId: number;
  designId: number;
}

const CustomerBookingCards: React.FC = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const customerId = Number(userDetails?.UserId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, [customerId]);

  const fetchBookings = async () => {
    try {
      const response = await getUserByCustomerId(customerId);
      setBookings(response);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);

    }
  };

  const handleFeedbackClick = (booking: CustomerBooking) => {
    navigate(`/dashboard/feedback`, { state: { userId: customerId, designId: booking.designId, designerId: booking.designerId } });
  };
  if (loading) {
    return <div>< Spinner /></div>;
  }
  return (
    <div className="p-6 pt-[6.5rem] bg-gray-100 min-h-screen">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">My Bookings</h2>
    
    {bookings.length === 0 ? (
      <p className="text-center text-gray-500 text-xl">No bookings found</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{booking.designName}</h3>
            <p className="text-gray-600 flex items-center mb-2">
              <FiUser className="mr-2 text-gray-500" />
              <span className="font-semibold">Designer :</span> {booking.designerName}
            </p>
            <p className="text-gray-600 flex items-center mb-2">
              <FiCalendar className="mr-2 text-gray-500" /> 
              <span className="font-semibold">Booking Date :</span>{' '}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 flex items-center mb-2">
              <FiClock className="mr-2 text-gray-500" />
              <span className="font-semibold">Appointment Date :</span>{' '}
              {new Date(booking.appointmentDate).toLocaleString()}
            </p>
            {booking.notes && (
              <p className="text-gray-600 flex items-center mb-4">
                <FiFileText className="mr-2 text-gray-500" />
                <span className="font-semibold">Notes : </span>{' ' + booking.notes}
              </p>
            )}
            
            <p className={`mt-4 text-center font-semibold ${booking.isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
              {booking.isCompleted ? (
                <span className="flex items-center justify-center">
                  <FiCheckCircle className="mr-2" /> Completed
                </span>
              ) : (
                'In Progress'
              )}
            </p>
  
            {booking.isCompleted && (
              <button
                onClick={() => handleFeedbackClick(booking)}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Give Feedback
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default CustomerBookingCards;
