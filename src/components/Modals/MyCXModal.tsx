import React from 'react';
import { MyCVModal } from './MyCVModal';

interface MyCXModalProps {
  onClose: () => void;
  onGoToContact?: () => void;
}

export const MyCXModal: React.FC<MyCXModalProps> = ({ onClose, onGoToContact = () => {} }) => {
  return <MyCVModal onClose={onClose} onGoToContact={onGoToContact} />;
};

export default MyCXModal;
