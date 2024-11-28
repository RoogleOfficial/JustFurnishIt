import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiFileText,
  FiMail,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import Spinner from "../../Spinner/Spinner";
import { completeBooking, getBookingByDesignerId } from "../../../Services/BookingService";


interface Booking {
  bookingId: number;
  designName: string;
  bookingDate: string;
  appointmentDate: string;
  customerName: string;
  customerEmail: string;
  notes: string;
  isCompleted: boolean;
}

const BookingCard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookingByDesignerId(designerId)
      setLoading(false);
      setBookings(response);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };
  if (loading) {
    return <div>< Spinner /></div>;
  }
  const handleCompleteBooking = async (bookingId: number) => {
    try {
      await completeBooking(bookingId);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, isCompleted: true }
            : booking
        )
      );
      console.log("Booking marked as completed");
    } catch (error) {
      console.error("Error marking booking as completed:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {bookings.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
            My Bookings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {booking.designName}
                </h3>
                <p className="text-gray-600 flex items-center mb-2">
                  <FiCalendar className="mr-2 text-gray-500" />
                  <span className="font-semibold">Booking Date :</span>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 flex items-center mb-2">
                  <FiClock className="mr-2 text-gray-500" />
                  <span className="font-semibold">Appointment Date :</span>{" "}
                  {new Date(booking.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-600 flex items-center mb-2">
                  <FiUser className="mr-2 text-gray-500" />
                  <span className="font-semibold">Customer Name :</span>{" "}
                  {booking.customerName}
                </p>
                <p className="text-gray-600 flex items-center mb-2">
                  <FiMail className="mr-2 text-gray-500" />
                  <span className="font-semibold">Email : </span>{" "}
                  {booking.customerEmail}
                </p>

                {booking.notes && (
                  <p className="text-gray-600 flex items-center mb-4">
                    <FiFileText className="mr-2 text-gray-500" />
                    <span className="font-semibold">Notes : </span>
                    {" " + booking.notes}
                  </p>
                )}

                {/* Complete button (only shown if the booking is not completed) */}
                {!booking.isCompleted ? (
                  <button
                    onClick={() => handleCompleteBooking(booking.bookingId)}
                    className="mt-4 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    <FiCheckCircle className="mr-2" />
                    Mark as Complete
                  </button>
                ) : (
                  <p className="mt-4 text-center text-green-600 font-semibold">
                    Completed
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-[70vw] h-[90vh] flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-400">No Bookings Found</h1>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
