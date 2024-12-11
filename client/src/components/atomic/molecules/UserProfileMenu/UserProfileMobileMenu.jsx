import React, { useState } from "react";
import './UserProfileMenu.css';

const UserProfileMobileMenu = ({ tabs, activeTab, onTabChange, renderContent, handleLogout, navigate, setUser }) => {
  const [expandedTab, setExpandedTab] = useState(null);

  const toggleExpand = (tabId) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
    onTabChange(tabId); // Устанавливаем активную вкладку
  };

  return (
    <div className="mobile-menu">
      {tabs.map((tab) => (
        <>
          <div key={tab.id} className="menu-item">
            <div
              className={`menu-header ${expandedTab === tab.id ? "expanded" : ""}`}
              onClick={() => (tab.onClick ? tab.onClick() : toggleExpand(tab.id))}
            >
              <div className="menu-header-content">
                <img src={tab.src} alt={tab.label} className="menu-icon" />
                <span>{tab.label}</span>
              </div>
              <span className="menu-arrow">{expandedTab === tab.id ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
                < polyline points="18 15 12 9 6 15"></polyline>
              </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              } </span>
            </div>
            {
              expandedTab === tab.id && (
                <div className="menu-content">
                  {renderContent(tab.id)}

                </div>
              )
            }
          </div >

        </>
      ))}
      <div className="menu-item">
        <div className="menu-header" style={{color:"red"}} onClick={() => handleLogout(setUser, navigate)}>ВИЙТИ</div>
      </div>
    </div >
  );
};

export default UserProfileMobileMenu;
