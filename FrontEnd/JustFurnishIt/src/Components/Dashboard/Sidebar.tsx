
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import MenuItem from "./MenuItem";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { menuItems } from "../Constants";
import { useNavigate } from "react-router";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../Common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../Redux/Slicer/AuthSlice";
import toast from "react-hot-toast";
import { RootState } from "../../Redux/Store/Store";

interface ConfirmationModalData {
  text1: string;
  text2?: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalData | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const designer = JSON.parse(localStorage.getItem("designerDetails") || "{}");
  const isApproved = designer?.isApproved === 1; // Check if designer is approved

  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="-z-[20]">
      <div
        className={`fixed left-0 top-0 h-full bg-slate-800 text-white transition-all z-30 flex flex-col duration-300 dark:bg-slate-700 ${
          isOpen ? "w-72" : "w-20 items-center"
        }`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center justify-center py-4">
          <LuLayoutDashboard
            className={`text-2xl text-teal-700 transition-all ${
              isOpen ? "w-12" : "w-8"
            }`}
          />
        </div>

        {/* Menu List */}
        <div className="mt-6 flex-1">
          <div>
            {menuItems.map((item, index) => {
              // Render based on the user role and approval status for designers
              if (
                (userDetails?.role === item.role &&
                  (userDetails.role !== "designer" || isApproved)) || // For designer, check approval
                (item.role === "open" && userDetails?.role !== "admin") // Items open to all non-admins
              ) {
                return (
                  <MenuItem
                    path={item.path}
                    key={index}
                    icon={item.icon}
                    name={item.name}
                    isOpen={isOpen}
                    isLogout={item.isLogout}
                  />
                );
              }
              return null;
            })}
          </div>

          {/* Logout Option */}
          <li
            className="py-4 px-6 cursor-pointer space-x-4 rounded-md px-4 py-3 text-gray-400 duration-500 hover:bg-teal-700 hover:text-white flex items-center gap-2"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => handleLogout(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <span className="text-xl">
              <VscSignOut />
            </span>{" "}
            {isOpen && <span className="text-[14px] overflow-hidden">Logout</span>}
          </li>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="m-2 flex items-center justify-center rounded-md bg-gray-700 p-3 text-2xl font-bold hover:bg-teal-500 duration-300"
        >
          {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
