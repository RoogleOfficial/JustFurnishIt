import React from "react";
import { Link } from "react-router-dom";

type MenuItemProps = {
  icon: React.ElementType;
  name: string;
  isOpen: boolean;
  path: string;
  isLogout?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  name,
  path,
  isOpen,
  isLogout,
}) => {
  return (
    <Link to={path}>
      <div
        className={`m-2 flex cursor-pointer items-center space-x-4 rounded-md px-4 py-3 text-gray-400 duration-500 hover:bg-teal-700 hover:text-white ${
          isLogout ? "justify-center" : "justify-start"
        }`}
      >
        <Icon className="text-xl" />
        {isOpen && <span className="text-[14px] overflow-hidden">{name}</span>}
      </div>
    </Link>
  );
};

export default MenuItem;
