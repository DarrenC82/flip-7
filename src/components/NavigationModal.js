import React from 'react';
import '../styles/navigation-modal.css';

const NavigationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title">Leave Game?</h2>
        <p>Are you sure you want to leave?</p>
        <div className="modal-buttons">
          <button className="modal-btn cancel-btn" onClick={onCancel} aria-label="Stay in game">
            Stay
          </button>
          <button className="modal-btn confirm-btn" onClick={onConfirm} aria-label="Leave game">
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
