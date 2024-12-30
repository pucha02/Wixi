import { TabButtonImg } from "../../atoms/UserProfile/TabButtonImg/TabButtonImg";
import TabButton from "../../atoms/UserProfile/TabButton/TabButton";

export const UserProfileTabButton = ({ isActive, onClick, label, src }) => {
  return (
    <div
      className={`tab-button-profile ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <TabButtonImg src={src} />
      <TabButton label={label} />
    </div>
  );
};
