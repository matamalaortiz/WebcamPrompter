import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 dark:bg-black/70 bg-zinc-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative dark:bg-zinc-900/90 bg-white/90 backdrop-blur rounded-xl p-6 shadow-xl max-w-2xl w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export default Modal;