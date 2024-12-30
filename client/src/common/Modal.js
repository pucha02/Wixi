import React, { useEffect } from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  isOpenSearch,
  className = null,
}) => {
  useEffect(() => {
    if (isOpen && !isOpenSearch) {
      document.body.style.overflow = "hidden";
    } else if (isOpen && isOpenSearch) {
      document.body.style.overflow = ""; 
    } else {
      document.body.style.overflow = "";
    }

    // Чистка эффекта при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isOpenSearch]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};
