import React from "react";
import { UserProfileTabButton } from "../UserProfileTabButton/UserProfileTabButton";

const UserProfileMenu = ({
  tabs,
  activeTab,
  onTabChange,
  handleLogout,
  navigate,
  setUser,
}) => (
  <div className="tab-list">
    {tabs.map((tab) => (
      <UserProfileTabButton
        key={tab.id}
        label={tab.label}
        src={tab.src}
        isActive={activeTab === tab.id}
        onClick={() => (tab.onClick ? tab.onClick() : onTabChange(tab.id))} // Вызываем `onClick`, если он задан
      />
    ))}
    <UserProfileTabButton
      onClick={() => handleLogout(setUser, navigate)}
      label={"ВИЙТИ"}
    />
  </div>
);

export default UserProfileMenu;
