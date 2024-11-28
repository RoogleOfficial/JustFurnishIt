import {
  FaHome,
  FaUser,
  FaCog,
  FaFileUpload,
  FaCalendarCheck ,
  FaThList ,
  FaHeart,
  FaUserCheck,
  FaAddressBook,
  FaUserFriends,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";


type MenuItem = {
  icon: React.ElementType;
  name: string;
  path: string,
  role: string,
  isLogout?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    icon:FaHeart ,
    name: "Wish List",
    path: "/dashboard/wishlist",
    role: "user"
  } ,
  {
    icon:FaAddressBook,
    name:"Upcoming Booking",
    path:"/dashboard/booking",
    role:"user"
  },
  {
    icon: FaHome,
    name: "Home",
    path: "/dashboard/adminDashboard",
    role: "admin"
  },
  {
    icon: FaUserFriends,
    name: "View users",
    path: "/dashboard/user",
    role: "admin"
  },
  {
    icon: FaUser,
    name: "View Designers",
    path: "/dashboard/designers",
    role: "admin"
  },
  {
    icon: FaUserCheck ,
    name: "Approve Designers",
    path: "/dashboard/pending-approvals",
    role: "admin"
  },


  {
    icon: FaHome,
    name: "Home",
    path: "/dashboard/designerDashboard",
    role: "designer"
  },
  {
    icon: FaThList ,
    name: "My Design",
    path: "/dashboard/myDesign",
    role: "designer"
  },
  {
    icon: FaFileUpload ,
    name: "Upload Design",
    path: "/dashboard/uploaddesign",
    role: "designer"
  },
  {
    icon: FaCalendarCheck ,
    name: "My Appointments",
    path: "/dashboard/myAppoinments",
    role: "designer"
  },
  {
    icon: MdRateReview,
    name: "Reviews",
    path: "/dashboard/reviews",
    role: "designer"
  },
  {
    icon: FaUser,
    name: "Profile",
    path: "/dashboard/profile",
    role: "open"
  },
  
  {
    icon: FaCog,
    name: "Settings",
    path: "/dashboard/setting",
    role: "open"
  },


];