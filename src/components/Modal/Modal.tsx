"use client";
import React from "react";
import styles from "./Modal.module.sass";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Modal;
