import React from "react";
type MenuItemProps = {
    icon: React.ElementType;
    name: string;
    isOpen: boolean;
    path: string;
    isLogout?: boolean;
};
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
