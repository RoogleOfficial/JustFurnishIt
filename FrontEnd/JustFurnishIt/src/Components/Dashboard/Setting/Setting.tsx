import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import ChangeProfilePicture from "./UpdateImage";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import UpdateDesigner from "../Designer/AdditionalInfoEdit";
import { getUserById, updateUserProfile } from "../../../Services/AccountServices";
import { ProfileFormValues } from "../../../Types/AuthTypes";

interface User {
  userId: number;
  firstName: string;
  profilePictureUrl?: string;
}

const genders = ["Male", "Female", "Others"];

const EditProfile: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const userid = userDetails?.UserId ?? 1;
  const [userId] = useState<number>(Number(userid)); // Simulate user ID
  const [loading, setLoading] = useState<boolean>(true);
  const [userProps, setUserProps] = useState<User | null>(null); // State for user data

  const [role, setRole] = useState<string>(""); // To store user's role
  const [password, setPassword] = useState<string>(""); // To store user's password
 console.log(setPassword);
 console.log(setRole);
 
 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue, // To set the values in the form fields
    formState: { errors },
  } = useForm<ProfileFormValues>();

  const submitProfileForm: SubmitHandler<ProfileFormValues> = async (data) => {
    const payload = {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: Number(data.phoneNumber),
      profilePictureUrl: data.profilePictureUrl,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      role,
      password,
    };

    try {
      await updateUserProfile(userId, payload);
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const fetchUserData = async (id: number) => {
    try {
      const userData = await getUserById(id);
      if (userData) {
        // Convert numbers to strings where necessary
        setValue("firstName", userData.firstName || "");
        setValue("lastName", userData.lastName || "");
        setValue("email", userData.email || "");
        setValue(
          "phoneNumber",
          userData.phoneNumber ? String(userData.phoneNumber) : ""
        );
        setValue("dateOfBirth", userData.dateOfBirth.split("T")[0]);
        setValue("city", userData.city || "");
        setValue("state", userData.state || "");
        setValue(
          "postalCode",
          userData.postalCode ? String(userData.postalCode) : ""
        );
        setValue("country", userData.country || "");
        setValue("streetAddress", userData.streetAddress || "");
        setValue("gender", userData.gender || "");
        setValue("profilePictureUrl", userData?.profilePictureUrl || "");
        // Default to empty string if not provided
      }

      const userData1: User = {
        userId: userData?.userId ?? 0,
        firstName: userData?.firstName ?? "",
        profilePictureUrl:
          userData?.profilePictureUrl ?? "https://via.placeholder.com/150",
      };
      setUserProps(userData1);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adding dummy user data instead of fetching from API
  useEffect(() => {
    const fetchDummyUserData = () => {
      const dummyUser: User = {
        userId: 2,
        firstName: "John",
        profilePictureUrl: "https://via.placeholder.com/150",
      };

      // Populate the form fields with dummy data
      setValue("firstName", dummyUser.firstName);
      setValue("lastName", "");
      setValue("email", "");
      setValue("phoneNumber", "");
      setValue("dateOfBirth", "");
      setValue("city", "");
      setValue("state", "");
      setValue("postalCode", "");
      setValue("country", "");
      setValue("streetAddress", "");
      setValue("gender", "");
      setValue("profilePictureUrl", "https://via.placeholder.com/150");

      // Set the dummy user data to pass it to ChangeProfilePicture
      setLoading(false); // Stop loading after dummy data is loaded
    };
    fetchDummyUserData();

    fetchUserData(userId);
  }, [userId, setValue]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while dummy data is being added
  }

  return (
    <div className=" w-full md:w-11/12 mx-auto flex flex-col md:gap-y-6 rounded-lg md:pb-[5rem]   p-1  md:pt-[5rem]">
      {/* Pass the dummy userProps to ChangeProfilePicture */}
      {userProps && <ChangeProfilePicture userProps={userProps} />}
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className=" xl:w-3/5 w-full mx-auto flex flex-col gap-y-6 rounded-lg border border-gray-300 bg-white p-3 md:p-8 shadow-4xl">
          <h2 className="text-lg font-semibold text-black">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-black font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-red-500">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-black font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-red-500">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black font-medium">
              Email
            </label>
            <input
              disabled
              type="email"
              id="email"
              placeholder="Enter email"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your email.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-black font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter phone number"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your phone number.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dateOfBirth" className="text-black font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              placeholder="Enter date of birth"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your date of birth.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="text-black font-medium">
              Gender
            </label>
            <select
              id="gender"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("gender", { required: true })}
            >
              <option value="">Select gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please select your gender.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="streetAddress" className="text-black font-medium">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              placeholder="Enter street address"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("streetAddress", { required: true })}
            />
            {errors.streetAddress && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your street address.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-black font-medium">
             City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your City.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="state" className="text-black font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("state", { required: true })}
            />
            {errors.state && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your state.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-black font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("country", { required: true })}
            />
            {errors.city && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your country.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="postalCode" className="text-black font-medium">
              Postal code
            </label>
            <input
              type="text"
              id="coupostalCodentry"
              placeholder="Enter postalCode"
              className="form-input rounded-md border border-gray-300 bg-white p-3 text-black"
              {...register("postalCode", { required: true })}
            />
            {errors.city && (
              <span className="-mt-1 text-[12px] text-red-500">
                Please enter your postalCode.
              </span>
            )}
          </div>
          {/* Additional fields like email, phoneNumber, dateOfBirth, etc. */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="cursor-pointer rounded-md bg-gray-900 py-2 px-5 font-semibold text-white hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" onclick={() => {}} />
          </div>
        </div>
      </form>
      {
        userDetails?.role === "designer" && (<UpdateDesigner designerId={Number(userid)}/>)
      }
          
    </div>
  );
};

export default EditProfile;
