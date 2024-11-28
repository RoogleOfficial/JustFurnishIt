import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';  // Import jwt-decode without destructuring
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/Slicer/AuthSlice'; // Single import
import logo from '../../assets/Logoo.png'
import { loginUser } from '../../Services/AuthServices';
import { DecodedToken, LoginFormValues } from '../../Types/AuthTypes';
import { getDesignerDetails } from '../../Services/DesignerService';




// Validation Schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

// Function to decode JWT and get user details
const getUserDetailsFromToken = (token: string): DecodedToken => {
  const decodedToken = jwtDecode<DecodedToken>(token);
  return decodedToken;
};

// LoginPage component
const LoginPage: React.FC = () => {
  // Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  

  // Handle form submission using the loginUser service
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values); // Call the service

      if (response.data) {
        // If login is successful and token is present
        const token = response.data.toString();
        // Decode the token to get user details
        const userDetails = getUserDetailsFromToken(token);
        // Dispatch action to save credentials in Redux
        dispatch(setCredentials({ token, userDetails }));
        toast.success("Login successful!");
        // Redirect based on role
        if (userDetails.role === "designer") {
          try {
            await getDesignerDetails(userDetails?.UserId, dispatch);
          } catch (error) {
            toast.error("Could not retrieve designer details.");
          }
        }
      } else {
        // Handle cases where the token is missing
        toast.error("Login failed. Invalid credentials or missing token.");
      }
    } catch (error:any) {
      // Handle errors (network issues, server errors, etc.)
      toast.error(error.message);
    }
  };

  // Initial form values using the interface
  const initialValues: LoginFormValues = { email: '', password: '' };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')]">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

        {/* Left section with form */}
        <div className="w-full md:w-2/4 xl:w-1/2 p-6 sm:p-8">
          <div className="flex items-center mb-3">
            <img src={logo} className="mr-2 w-10 h-10" alt="Logo" />
            <h2 className="text-3xl font-bold text-gray-800">JustFurnishIt</h2>
          </div>
          <h2 className="text-2xl font-bold mb-5 text-gray-700">Sign in to your account</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-3">
                {/* Email Field */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium mb-1 text-gray-600">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`p-2 border rounded w-full ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <div className="text-red-500 text-sm mt-0.5 h-3">
                    <ErrorMessage name="email" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-medium mb-1 text-gray-600">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={`p-2 border rounded w-full ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <div className="text-red-500 text-sm mt-0.5 h-3">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                {/* Sign-up and Forgot Password Links */}
            
                <div className="flex justify-between items-center mt-4">
                  <Link to="/signup" className="text-sm text-blue-500 hover:underline">
                    Sign up
                  </Link>
                  <Link to="/forgotpassword" className="text-sm text-blue-500 hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                {/* Sign-in Button */}
               
              
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                >
                  Sign in
                </button>
              
              </Form>
            )}
          </Formik>
        </div>



        {/* Right section with image */}
        <div className="hidden md:block md:w-2/4 xl:w-1/2">
          <img
            src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713138/signup_cx4kf6.webp"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


