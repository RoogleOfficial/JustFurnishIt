import { useEffect, useState } from "react"
import HeroSection from "../Components/Common/AboutUs/HeroSection"
import HowItStarted from "../Components/Common/AboutUs/HowItStarted"
import MissionAndVision from "../Components/Common/AboutUs/MissionAndVisin"
import Statistics from "../Components/Common/AboutUs/Statistics"
import Footer from "../Components/Common/Footer"
import Spinner from "../Components/Spinner/Spinner"

function AboutUs() {

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
        <HeroSection/>
          <HowItStarted/>
          <MissionAndVision/>
          <Statistics/>
          <Footer/> 
        </>
      )}
      </div>
    )
  }
  
  export default AboutUs