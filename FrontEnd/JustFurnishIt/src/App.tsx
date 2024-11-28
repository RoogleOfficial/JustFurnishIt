

import "./App.css";
import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router";
import Header from "./Components/Common/Header";
import DesignList from "./Pages/DesignList";
import SignupPage from "./Components/Accounts/RegisterForm";
import LoginPage from "./Components/Accounts/LoginForm";
import AboutUs from "./Pages/AboutUs";
import HowItsWork from "./Pages/HowItsWork";
import MultiStepForm from "./Components/EstimateQuotation/MultiStageForm";
import Dashboard from "./Components/Dashboard/Dashbord";
import EditProfile from "./Components/Dashboard/Setting/Setting";
import MyProfile from "./Components/Dashboard/Setting/Profile";
import ContactUsPage from "./Components/Common/ContactUs/ContactUs";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/Store/Store";
import { useDispatch } from "react-redux";
import { setCredentials } from "./Redux/Slicer/AuthSlice";
import { useEffect } from "react";
import OpenRoute from "./Components/Auth/OpenRoute";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import AdminDashboard1 from "./Components/Dashboard/Admin/AdminDashboard1";
import UserList from "./Components/Dashboard/Admin/UserList";
import DesignerList from "./Components/Dashboard/Admin/DesignerList";
import ApproveDesignerList from "./Components/Dashboard/Admin/ApproveDesignerList";
import AddDesignMultiStepForm from "./Components/Design/AddDesign/MultistepForm";
import NotFound from "./Components/Common/Error";
import ViewWishlist from "./Components/Dashboard/CustomerDashboard/ViewWishlist";
import CustomerBookingCards from "./Components/Dashboard/CustomerDashboard/CustomerBookingCards";
import BookingCard from "./Components/Dashboard/Designer/BookingCard";
import DesignListData from "./Components/Dashboard/Designer/DesignList";
import DesignDetails from "./Components/Dashboard/Designer/DesignDetails";
import DesignerDashboardHome from "./Components/Dashboard/Designer/DesignerHome";
import AdminRoute from "./Components/Auth/AdminRoute";
import ForgotPassword from "./Components/Accounts/ForgotPassword";
import ResetPassword from "./Components/Accounts/ResetPassword";
import FeedbackForm from "./Components/FeedBack/FeedBackForm";
import AuthPrivateRoute from "./Components/Auth/Authorized";
import ReviewList from "./Components/Dashboard/Designer/ReviewList";
import DesignerIsApproved from "./Components/Auth/DesignerIsApproved";
import EditDesignMultiStepForm from "./Components/Design/EditDesign/MultistepForm";

function App() {
  

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  // Hydrate Redux state from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserDetails = localStorage.getItem("userDetails");

    if (savedToken && savedUserDetails) {
      const userDetails = JSON.parse(savedUserDetails);
      dispatch(setCredentials({ token: savedToken, userDetails }));
    }
  }, [dispatch]);

  return (
    <>
      <Header />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/design-ideas/*" element={<DesignList />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-its-work" element={<HowItsWork />} />
        
        <Route
          path="/contactus"
          element={
            
              <ContactUsPage />
           
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupPage />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/resetpassword"
          element={
            <OpenRoute>
              <ResetPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/estimateQuotation/:id"
          element={
            <AuthPrivateRoute requiredRole="user">
              <MultiStepForm />
            </AuthPrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >


          <>
          {userDetails?.role === "designer" &&( <Route index element={<Navigate to="designerDashboard" />} />)}
           

            <Route
              path="/dashboard/uploaddesign"
              element={
                <DesignerIsApproved requiredRole="designer">
                  <AddDesignMultiStepForm />
                </DesignerIsApproved>
              }
            />
             <Route
              path="/dashboard/editDesign/:id"
              element={
                <DesignerIsApproved requiredRole="designer">
                  <EditDesignMultiStepForm />
                </DesignerIsApproved>
              }
            />
         
            <Route
              path="/dashboard/reviews"
              element={
                <DesignerIsApproved requiredRole="designer">
                  <ReviewList />
                </DesignerIsApproved>
              }
            />
            <Route
              path="/dashboard/myAppoinments"
              element={
                <DesignerIsApproved requiredRole="designer">
                  <BookingCard />
                </DesignerIsApproved>
              }
            />
            <Route
              path="/dashboard/myDesign"
              element={
                <DesignerIsApproved requiredRole="designer">
                  <DesignListData />
                </DesignerIsApproved>
              }
            />
            <Route
              path="/dashboard/myDesign/:designId"
              element={<DesignDetails />}
            />
            <Route
              path="/dashboard/designerDashboard"
              element={<DesignerDashboardHome />}
            />
          </>

          {userDetails?.role === "admin" && (
            <>
              <Route index element={<Navigate to="adminDashboard" />} />
              <Route
                path="/dashboard/adminDashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard1 />
                  </AdminRoute>
                }
              />
              <Route path="/dashboard/user" element={<UserList />} />
              <Route path="/dashboard/designers" element={<DesignerList />} />
              <Route
                path="/dashboard/pending-approvals"
                element={<ApproveDesignerList />}
              />
            </>
          )}
          {userDetails?.role === "user" && (
            <>
              <Route index element={<Navigate to="wishlist" />} />
              <Route
                path="/dashboard/wishlist"
                element={
                  <ViewWishlist customerId={Number(userDetails?.UserId)} />
                }
              />
              <Route
                path="/dashboard/booking"
                element={<CustomerBookingCards />}
              />
              <Route path="/dashboard/feedback" element={<FeedbackForm />} />
            </>
          )}

          <Route path="/dashboard/setting" element={<EditProfile />} />
          <Route path="/dashboard/profile" element={<MyProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
