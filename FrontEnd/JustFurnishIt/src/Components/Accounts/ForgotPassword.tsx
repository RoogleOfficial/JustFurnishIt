import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router';
import { forgotPassword } from '../../Services/AuthServices';
import {ForgotPasswordDetails} from '../../Types/AuthTypes'


const ForgotPassword: React.FC = () => {
  const initialValues: ForgotPasswordDetails = { email: '' };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const onSubmit = async (values: ForgotPasswordDetails, { setSubmitting }: any) => {
    try {
      // Call the forgotPassword service function
      const response = await forgotPassword({ email: values.email });
      toast.success(response.message); // Show success message
      navigate("/");
    } catch (error: any) {
      toast.error(error.message); // Show error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')]">
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[25rem] mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
