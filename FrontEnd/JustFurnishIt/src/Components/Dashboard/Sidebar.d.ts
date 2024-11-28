import React from "react";
type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
