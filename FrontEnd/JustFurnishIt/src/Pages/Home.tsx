
import RoomGrid from '../Components/Home/RoomGrid'
import BeforeAfterSlider from '../Components/Home/BeforeAfterSlider'
import InfiniteImageSlider from '../Components/Home/InfiniteImageSlider'
import FAQSection from '../Components/Home/FAQSection'
import Hero from '../Components/Home/Hero'
import HomeSection from '../Components/Home/HomeSection'
import Footer from '../Components/Common/Footer'

function Home() {
  return (
    <div>
        <Hero/>
        <HomeSection/>
        <RoomGrid/>
        <BeforeAfterSlider/>
        <InfiniteImageSlider/>
        <FAQSection/>
        <Footer/>
    </div>
  )
}

export default Home