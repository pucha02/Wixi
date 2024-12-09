import React, { useState } from "react";
import './UserProfileMenu.css';

const UserProfileMobileMenu = ({ tabs, activeTab, onTabChange, renderContent }) => {
  const [expandedTab, setExpandedTab] = useState(null);

  const toggleExpand = (tabId) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
    onTabChange(tabId); // Устанавливаем активную вкладку
  };

  return (
    <div className="mobile-menu">
      {tabs.map((tab) => (
        <div key={tab.id} className="menu-item">
          <div
            className={`menu-header ${expandedTab === tab.id ? "expanded" : ""}`}
            onClick={() => (tab.onClick ? tab.onClick() : toggleExpand(tab.id))}
          >
            <div className="menu-header-content">
              <img src={tab.src} alt={tab.label} className="menu-icon" />
              <span>{tab.label}</span>
            </div>
            <span className="menu-arrow">{expandedTab === tab.id ? "▲" : "▼"}</span>
          </div>
          {expandedTab === tab.id && (
            <div className="menu-content">
              {renderContent(tab.id)} {/* Вызываем функцию для отображения соответствующего контента */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfileMobileMenu;
