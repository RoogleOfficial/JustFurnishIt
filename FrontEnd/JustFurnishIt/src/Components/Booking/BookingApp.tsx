import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import categoryData from '../Design Category/category.json';
import { RootState } from '../../Redux/Store/Store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAvailableTimes, getDesignerName } from '../../Services/BookingService';

interface BookingDTO {
  customerId: number;
  designerId: number;
  designId: number;
  appointmentDate: string; // ISO string
  notes: string;
  isConfirmed: boolean;
  
}

const BookingApp: React.FC=()=> {
  const { slug } = useParams<{ slug: string }>(); // Capture the slug and designId from the URL

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1); // For progress bar
  const [designerName, setDesignerName] = useState<string>(''); // New state for designer name
  const [customerId, setCustomerId] = useState<number>(1); // Assuming logged-in customerId is 1
  const [notes, setNotes] = useState<string>(''); // For additional notes
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { userDetails } = useSelector((state: RootState) => state.auth);

 const customerEmail=userDetails?.email;
 const customerName="Rohit"
  
// Example designer ID
  const location = useLocation();
  const { design } = location.state || {}; 
  const designerId = design?.designerId; // Retrieve design data from state
  const navigate = useNavigate(); // Used for navigation
  const category = categoryData.find(c => c.id === design.category)?.title || 'Unknown Category';

  // Fetch available times when the date is selected
  useEffect(() => {
    setCustomerId(Number(userDetails?.UserId));
    if (selectedDate) {
      const fetchAvailableTimes = async () => {
        try {
          const dateStr = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          const response = await getAvailableTimes(designerId,dateStr)
          setAvailableTimes(response);
          setStep(2); // Move to step 2 once the available times are fetched
        } catch (error) {
          console.error('Error fetching available times:', error);
        }
      };
      fetchAvailableTimes();
    }
  }, [selectedDate, designerId]);
  useEffect(() => {
    const fetchDesignerName = async () => {
      try {
        const response = await getDesignerName(design?.designId)
        setDesignerName(response.designerName);
      } catch (error) {
        console.error('Error fetching designer name:', error);
      }
    };

    if (design?.designId) {
      fetchDesignerName();
    }
  }, [design?.designId]);
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3); // Move to step 3 after time selection
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage('Please select a date and time.');
      return;
    }

    const [time, period] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    else if (period === 'AM' && hours === 12) hours = 0;

    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes, 0, 0);
    const formattedAppointmentDate = appointmentDate.toISOString();

    const bookingDTO = {
      customerId,
      designerId,
      designId: design?.designId,
      designName:design?.designName,
      appointmentDate: formattedAppointmentDate,
      notes,
      isConfirmed: false,
      customerEmail:customerEmail , 
      customerName: customerName, 
    };

    try {
      // Send the booking DTO to the backend
      await axios.post<BookingDTO>('https://localhost:7000/gateway/booking', bookingDTO);
      toast.success(`Booking created successfully! and Email has been sent to ${customerEmail}`);
      navigate(-1); // Redirects back to the previous page
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage('The selected time slot is already booked. Please choose another time.');
        toast.error(errorMessage);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="min-h-screen py-[5rem] bg-gray-100 p-8">
  {/* Breadcrumb */}
  <nav className="text-sm text-gray-500 my-4">
    <Link to="/" className="text-red-500 no-underline hover:text-red-500">Home</Link> /
    <Link to="/design-ideas" className="text-red-500 ml-1 no-underline hover:text-red-500">Design Ideas</Link> /
    <Link to={`/design-ideas/${slug}`} className="text-red-500 ml-1 no-underline">{category}</Link> /
    <span className="ml-1 text-black">Appointment</span>
  </nav>

  {/* Progress Bar */}
  <div className="w-full max-w-7xl mx-auto py-5 flex justify-between items-center mb-8">
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} flex items-center justify-center`}>
        1
      </div>
      <span className="text-sm mt-2">Date</span>
    </div>
    <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'} mx-2`}></div>
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} flex items-center justify-center`}>
        2
      </div>
      <span className="text-sm mt-2">Time</span>
    </div>
    <div className={`flex-1 h-1 ${step === 3 ? 'bg-blue-500' : 'bg-gray-300'} mx-2`}></div>
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full ${step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} flex items-center justify-center`}>
        3
      </div>
      <span className="text-sm mt-2">Summary</span>
    </div>
  </div>

  <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
    {/* Left Section: Calendar */}
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-lg font-bold mb-4">Select Date</h2>
      <div className='px-[4rem]'>
        <DatePicker 
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          minDate={new Date()}
          className="w-full"
        />
      </div>
    </div>

    {/* Middle Section: Available Times */}
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 mb-4 lg:mb-0 lg:mr-4">
      <h2 className="text-lg font-bold mb-4">Available Times</h2>
      <div className={`grid grid-cols-2 gap-4 ${!selectedDate ? 'opacity-50 pointer-events-none' : ''}`}>
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <button
              key={index}
              className={`p-2 rounded border ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => handleTimeSelect(time)}
              disabled={!selectedDate}
            >
              {time}
              {selectedTime === time && <FaCheckCircle className="ml-2 inline" />}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Select a date to see available times.</p>
        )}
      </div>
    </div>

    {/* Right Section: Appointment Summary */}
    <div className={`w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 ${!selectedTime ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-lg font-bold mb-4">Appointment Summary</h2>
      <p>
        <strong>Designer:</strong> {designerName || 'Not Available'}
      </p>
      <p>
        <strong>Design:</strong> {design.designName}
      </p>
      <p>
        <strong>Date:</strong> {selectedDate ? selectedDate.toDateString() : 'Not selected'}
      </p>
      <p>
        <strong>Time:</strong> {selectedTime || 'Not selected'}
      </p>

      {/* Notes Field */}
      <div className="mt-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes:</label>
        <textarea
          id="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional information"
        />
      </div>

      <button
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
        onClick={handleConfirmBooking}
        disabled={!selectedTime}
      >
        Confirm
      </button>
    </div>
  </div>
</div>

  );
};

export default BookingApp;
