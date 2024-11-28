import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import IconBtn from "../../Common/IconBtn";
import { RootState } from "../../../Redux/Store/Store";
import { useSelector } from "react-redux";
import DesignerDisplay from "../Designer/AdditionalInfo";
import { getUserById } from "../../../Services/AccountServices";

interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePictureUrl: string;
  role: string;
  gender: string;
  dateOfBirth: string; // ISO Date string
  createdOn: string; // ISO Date string
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const MyProfile: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const userId = userDetails?.UserId ?? 0;
  
  const [user, setUser] = React.useState<UserProfile>({
    userId: 2,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    password: "",
    profilePictureUrl:
      "https://ui-avatars.com/api/?uppercase=true&name=User",
    role: "",
    gender: "",
    dateOfBirth: "",
    createdOn: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId); // Call the service
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (err) {
        console.error("Error fetching user:", err);}
    };
    fetchUser();
  }, [user.userId]);

  const navigate = useNavigate();

  return (
    <div className="w-full md:w-10/12 pt-[7rem] mx-auto ">
      <h1 className=" w-full mx-auto mb-8 text-3xl md:text-4xl font-medium text-black">
        My Profile
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-between rounded-md border-[1px] border-gray-200 bg-white p-6 md:p-8 md:px-12 gap-y-4 md:gap-y-0 shadow-lg">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.profilePictureUrl}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] md:w-[100px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg md:text-xl font-semibold text-black">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm md:text-base text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="md:block lg:block ">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/setting");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      <div className="w-full my-10 flex flex-col gap-y-6 rounded-lg border border-gray-200 bg-white p-6 md:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-black">
            Profile Information
          </h2>
          <div className="w-full flex justify-end gap-4 lg:gap-4">
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/setting");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        {/* Profile fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            { label: "First Name", value: user.firstName },
            { label: "Last Name", value: user.lastName },
            { label: "Email", value: user.email },
            { label: "Phone Number", value: user.phoneNumber },
            { label: "Date of Birth", value: user.dateOfBirth.split('T')[0] },
            { label: "Gender", value: user.gender },
            { label: "City", value: user.city },
            { label: "State", value: user.state },
            { label: "Country", value: user.country },
            { label: "Postal Code", value: user.postalCode },
            { label: "Street Address", value: user.streetAddress },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-black font-medium">{label}</label>
              <p className="text-gray-500">{value}</p>
            </div>
          ))}
        </div>

     
      </div>
      {
        userDetails?.role === "designer" && (<DesignerDisplay  designerId={Number(userId)}/>)
      }
      
    </div>
  );
};

export default MyProfile;
