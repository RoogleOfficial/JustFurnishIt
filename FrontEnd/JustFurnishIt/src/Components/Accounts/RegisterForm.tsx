import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaPaintBrush } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import logo from '../../assets/Logoo.png';
import { UserData } from '../../Types/AuthTypes';
import { registerUser } from '../../Services/AuthServices';
import { createCustomer } from '../../Services/CustomerServices';
import { CreateDTO } from '../../Types/DesignerTypes';
import { createDesigner } from '../../Services/DesignerService';


// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  otp: Yup.string(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and privacy policy'),
});

const SignupPage: React.FC = () => {
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [showOtpButton, setShowOtpButton] = useState(false);
  const idDto: CreateDTO = { userId: 0 };

  const navigate = useNavigate();

  const handleSubmit = async (values: Omit<UserData, 'role'>) => {
    if (otpVerified) {
    try {
      const userData: UserData = { ...values, role };
      const response = await registerUser(userData);
      const resData = response?.message;
      const splittedData = resData.split(',');
      const userId = Number(splittedData[0]);
      idDto.userId = userId;

      if (role === 'user') {
        await createCustomer(idDto);
      } else if (role === 'designer') {
        await createDesigner(idDto);
      }

      toast.success("User registered successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  else{
    toast.error("Verify OTP...");
  }
  };

  const handleSendOtp = async (email: string) => {
    try {
      await axios.post(
        'https://localhost:7002/api/Otp/SendOtp',
        JSON.stringify(email),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setOtpSent(true);
      setOtpError('');
      toast.success(`OTP sent to ${email}`);
    } catch (err: any) {
      toast.error(err.message);
      setOtpError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpChange = async (value: string) => {
    if (value.length === 6) {
      try {
        const response = await axios.post(
          'https://localhost:7002/api/Otp/VerifyOtp',
          JSON.stringify(value),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.status === 200) {
          setOtpVerified(true);
          setOtpError('');
          toast.success('OTP verified successfully');
          setShowOtpButton(false);
        } else {
          setOtpError('Incorrect OTP');
        }
      } catch (error: any) {
        toast.error('Error verifying OTP');
        setOtpError('Failed to verify OTP. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center pt-[4.5rem] justify-center h-[100vh] bg-gray-100 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')] p-1">
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl flex flex-col md:flex-row overflow-hidden h-full m-[3rem]">
        <div className="w-full md:w-[50%] p-6 h-full overflow-y-auto">
          <div className="flex items-center mb-3">
            <img src={logo} className="mr-2 w-[40px] h-[40px] mb-2" alt="Logo" />
            <h2 className="text-3xl font-bold">JustFurnishIt</h2>
          </div>
          <h2 className="text-2xl font-bold mb-4">Create your JustFurnishIt account</h2>

          <Formik
            initialValues={{
              firstName: '', lastName: '', email: '', password: '', confirmPassword: '', terms: false, otp: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="flex justify-center space-x-8 mb-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer ${role === 'user' ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-500 border-gray-300'}`}
                      onClick={() => setRole('user')}
                    >
                      <FaUser />
                    </div>
                    <p className="mt-2 font-semibold text-gray-700">User</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer ${role === 'designer' ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-500 border-gray-300'}`}
                      onClick={() => setRole('designer')}
                    >
                      <FaPaintBrush />
                    </div>
                    <p className="mt-2 font-semibold text-gray-700">Designer</p>
                  </div>
                </div>

                {/* First and Last Name */}
                <div className="flex gap-4">
                  <div className="w-full">
                    <label htmlFor="firstName" className="text-s font-medium mb-1 block">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={`p-2 border rounded w-full ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1 h-2.5" />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="text-s font-medium mb-1 block">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className={`p-2 border rounded w-full ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1 h-2.5" />
                  </div>
                </div>

                {/* Email and OTP */}
                <div className="flex flex-col relative">
                  <label htmlFor="email" className="text-s font-medium mb-1">Email address</label>
                  <Field
                    type="email"
                    name="email"
                    className={`p-2 border rounded w-full ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('email', e.target.value);
                      setShowOtpButton(!!e.target.value);
                    }}
                    onBlur={() => !values.email && setShowOtpButton(false)}
                    disabled={otpVerified}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  {showOtpButton && (
                    <button
                      type="button"
                      onClick={() => handleSendOtp(values.email)}
                      disabled={otpSent && !otpVerified}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 mt-3 rounded focus:outline-none"
                      style={{ fontSize: '0.875rem', fontWeight: '600' }}
                    >
                      {otpSent ? 'Resend OTP' : 'Get OTP'}
                    </button>
                  )}
                </div>

                {/* OTP Field */}
                {otpSent && !otpVerified && (
                  <div className="mb-4">
                    <Field
                      type="text"
                      name='otp'
                      placeholder="Enter OTP"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOtpChange(e.target.value);
                        setFieldValue("otp", e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300"
                    />
                    {otpError && <div className="text-red-500 text-sm mt-1">{otpError}</div>}
                  </div>
                )}

                {/* Password and Confirm Password */}
                <div className="flex gap-4">
                  <div className="w-full relative">
                    <label htmlFor="password" className="text-s font-medium mb-1 block">Password</label>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className={`p-2 border rounded w-full ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 cursor-pointer">
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 h-7" />
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="confirmPassword" className="text-s font-medium mb-1 block">Confirm Password</label>
                    <Field
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className={`p-2 border rounded w-full ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-10 cursor-pointer">
                      {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1 h-7" />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <Field type="checkbox" name="terms" className="mr-2" />
                  <label htmlFor="terms" className="text-sm">By signing up, you agree to our Terms and privacy policy</label>
                  <ErrorMessage name="terms" component="div" className="text-red-500 text-sm ml-2" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit" data-cy="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                  // disabled={!otpVerified}
                >
                  Sign up
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Signup Illustration */}
        <div className="hidden md:block md:w-[60%] h-full">
          <img
            src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713138/Register_ec9gzs.jpg"
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
