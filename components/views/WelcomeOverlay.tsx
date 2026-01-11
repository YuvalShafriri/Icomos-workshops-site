import React from 'react';
import { Modal } from '../common';
import { AboutView } from './AboutView';

export interface WelcomeOverlayProps {
  onClose: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onClose }) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      maxWidth="max-w-2xl"
      title={
        /* We can keep the simpler title here for the modal, or use null and let AboutView handle it. 
           However, Modal usually expects a title prop. Let's keep a minimal title for the desktop overlay.
        */
        <div className="text-right w-full">אודות המערכת</div>
      }
    >
      <AboutView />
    </Modal>
  );
};

export default WelcomeOverlay;
