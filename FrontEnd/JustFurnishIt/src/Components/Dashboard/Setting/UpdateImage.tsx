import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../../Common/IconBtn";
import { updateProfilePhoto, uploadImage } from "../../../Services/AccountServices";
import { ProfilePhotoDTO } from "../../../Types/AuthTypes";

interface User {
  userId: number;
  firstName: string;
  profilePictureUrl?: string;
}

interface ChangeProfilePictureProps {
  userProps: User; // User data passed as props from parent component
}

const ChangeProfilePicture: React.FC<ChangeProfilePictureProps> = ({ userProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<User>(userProps); // Initialize with passed prop

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      setMessage(null);

      if (!imageFile) {
        console.error("No file selected.");
        return;
      }

      // Step 1: Upload the image
      const imageUrl = await uploadImage(imageFile);

      if (!imageUrl) {
        console.error("Failed to upload image.");
        return;
      }

      // Step 2: Update the profile photo
      const profilePhotoDto: ProfilePhotoDTO = {
        userID: userData.userId,
        profilePictureUrl: imageUrl,
      };

      await updateProfilePhoto (userData.userId,profilePhotoDto);

      // Update the user's profile picture URL in local state
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePictureUrl: imageUrl,
      }));

      setMessage("Profile photo updated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Failed to update profile photo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 xl:w-3/5 w-full mx-auto flex flex-col gap-y-6 rounded-lg border shadow-lg border-gray-300 bg-white p-8">
      <div className="flex items-center flex-col sm:flex-row gap-x-4">
        <img
          src={(previewSource as string) || userData.profilePictureUrl || 'https://via.placeholder.com/150'}
          alt={`profile-${userData.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2 text-center text-black">
          <p>Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-gray-900 py-2 px-5 font-semibold text-white hover:bg-gray-700"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && (
                <FiUpload className="text-lg text-white" />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
      {message && <p className="text-center text-green-500">{message}</p>}
    </div>
  );
};

export default ChangeProfilePicture;
