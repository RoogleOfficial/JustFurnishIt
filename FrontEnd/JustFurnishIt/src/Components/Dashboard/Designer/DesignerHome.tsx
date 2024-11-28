import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCalendar,
  faStar,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import DesignTopList from "./DesignTopList";
import { getReviewsByDesignerId } from "../../../Services/FeedBackService";
import ReviewList from "./ReviewList";
import { getDesignsByDesignerId } from "../../../Services/DesignService";
import { getBookingByDesignerId } from "../../../Services/BookingService";

interface Metric {
  title: string;
  value: number | string;
  icon: JSX.Element;
  color: string;
}

const DesignerDashboardHome: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 

  const [designCount, setDesignCount] = useState<string | number>("Loading...");
  const [bookedCount, setBookedCount] = useState<string | number>("Loading...");
  const [reviewCount, setReviewCount] = useState<string | number>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch design count
        let designData = [];
        try {
          const designRes = await getDesignsByDesignerId(designerId)
          designData = designRes;
          setDesignCount(designData.length);

        } catch (error) {
          console.error("Error fetching designs:", error);
          setDesignCount("0");
        }

        // Fetch booking count
        let bookingData = [];
        try {
          const bookingRes = await getBookingByDesignerId(designerId)
          bookingData = bookingRes;
          setBookedCount(bookingData.length);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setBookedCount("0");
        }

        // Fetch review count
        let reviewData:any = [];
        try {
          reviewData = await getReviewsByDesignerId(designerId);
          setReviewCount(reviewData?.length ?? "0");
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setReviewCount("0");
        }

        // Set metrics for the dashboard
        setMetrics([
          {
            title: "Total Designs",
            value:designCount || "0",
            icon: <FontAwesomeIcon icon={faThLarge} />,
            color: "bg-blue-500",
          },
          {
            title: "Total Reviews",
            value:  reviewCount ?? "0", 
            icon: <FontAwesomeIcon icon={faStar} />,
            color: "bg-yellow-500",
          },
          {
            title: "Upcoming Appointments",
            value: bookedCount || "0",
            icon: <FontAwesomeIcon icon={faCalendar} />,
            color: "bg-green-500",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [designCount,bookedCount,reviewCount]);

  return (
    <div className="w-full md:mx-auto md:w-10/12 md:pt-[7rem] p-4 space-y-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md flex items-center ${metric.color} text-white`}
          >
            <div className="text-3xl mr-4">{metric.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to={"/dashboard/uploaddesign"}>
          <button className="w-full flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <span>Upload New Design</span>
          </button>
        </Link>
        <Link to={"/dashboard/myAppoinments"}>
          <button className="w-full flex items-center justify-center p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            <span>View Appointments</span>
          </button>
        </Link>
        <Link to={"/dashboard/reviews"}>
          <button className="w-full flex items-center justify-center p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <span>Check Reviews</span>
          </button>
        </Link>
      </div>

      {/* My Top Designs */}
      <h1 className="text-2xl font-bold ">My Designs</h1>
      <DesignTopList />

      {/* Review List */}
      <ReviewList />
    </div>
  );
};

export default DesignerDashboardHome;
