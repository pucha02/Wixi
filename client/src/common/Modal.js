import './Modal.css'; // Файл стилей для модального окна

export const Modal = ({ show, onClose, children }) => {

  if (!show) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};