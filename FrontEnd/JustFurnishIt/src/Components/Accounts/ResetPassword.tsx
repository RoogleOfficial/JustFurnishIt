import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../Services/AuthServices';
import {ResetPasswordValues} from '../../Types/AuthTypes';

// Helper function to extract query parameters from the URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
  const query = useQuery();
  const email = query.get('email');
  const token = query.get('token');
  const navigate = useNavigate();

  const initialValues: ResetPasswordValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const onSubmit = async (values:ResetPasswordValues, { setSubmitting }: any) => {
    try {
      await resetPassword({
        email: email as string,
        token: token as string,
        newPassword: values.newPassword,
      });
      toast.success('Password has been successfully reset!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')]">
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[25rem] mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
