import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-container animate-slide-down">
      <div className="toast-pill">
        <Sparkles size={15} className="toast-icon" />
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
};
