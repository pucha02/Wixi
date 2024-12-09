import React from "react";
import { UserProfileTabButton } from "../UserProfileTabButton/UserProfileTabButton";
import './UserProfileMenu.css';

const UserProfileMenu = ({ tabs, activeTab, onTabChange }) => (
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
  </div>
);

export default UserProfileMenu;
