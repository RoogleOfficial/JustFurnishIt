import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router";
import DesignCategoryDetails from "../Components/Design Category/DesignCategoryDetails";
import DesignDetail from "../Components/Design Category/DesignDetail";
import DesignCategory from "../Components/Design Category/DesignCategory";
import BookingApp from "../Components/Booking/BookingApp";
import MultiStepForm from "../Components/EstimateQuotation/MultiStageForm";
import Footer from "../Components/Common/Footer";
import PrivateRoute from "../Components/Auth/PrivateRoute";

import AuthPrivateRoute from "../Components/Auth/Authorized";
import Spinner from "../Components/Spinner/Spinner";

function DesignList() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate loading time, replace this with actual data loading if needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Example: 3-second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner /> // Show the spinner while loading is true
      ) : (
        <>
      <Routes>
        {/* Design category list */}
        <Route path="/" element={<DesignCategory />} />

        {/* Design category details */}
        <Route path="/:slug" element={<DesignCategoryDetails />} />

        {/* Design details within a specific category */}
        <Route path=":slug/:designId" element={<DesignDetail />} />

        <Route
          path=":slug/:designId/appointment"
          element={
            <PrivateRoute>
              <AuthPrivateRoute requiredRole="user">
                <BookingApp />
              </AuthPrivateRoute>
            </PrivateRoute>
          }
          />

        <Route
          path=":slug/estimateQuote/:id"
          element={
            <PrivateRoute>
              <AuthPrivateRoute requiredRole="user">
                <MultiStepForm />
              </AuthPrivateRoute>
            </PrivateRoute>
          }
          />
      </Routes>

      {/* Outlet allows nested routes to render here */}
      <Outlet />
      <Footer />
      </>
      )}
    </div>
  );
}

export default DesignList;
