import React from "react";
import { Outlet } from "react-router";

type MainContentProps = {
  isOpen: boolean;
 
};

const MainContentTab: React.FC<MainContentProps> = ({ isOpen}) => {
  return (
    <div
      className={`flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-10 pr-2"} min-h-screen transition-all duration-300 dark-bg-slate-800`}
    >
        <Outlet/>
    </div>
  );
};

export default MainContentTab;
