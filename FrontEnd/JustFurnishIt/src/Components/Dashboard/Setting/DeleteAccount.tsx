import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDeleteAccount() {
    setIsDeleting(true);
    try {
      // Logic for deleting the account goes here
      console.log("Deleting account...");
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/account-deleted");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting account: ", error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="xl:w-3/5 w-full mx-auto flex flex-col md:gap-y-6 rounded-lg  bg-richblack-800 md:p-8">
      <div className="my-10 flex flex-col lg:flex-row gap-x-5 items-center rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="md:w-3/5 w-full hidden md:block text-pink-25">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain paid courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "I want to delete my account."}
          </button>
        </div>
      </div>
    </div>
  );
}
