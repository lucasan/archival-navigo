
import React from 'react';
import { FolderOpen, Lock, Scan } from 'lucide-react';
import { FileUnitStatus } from './types';

interface StatusIconProps {
  status: FileUnitStatus;
  showLabel?: boolean;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, showLabel = false }) => {
  const renderIcon = () => {
    switch (status) {
      case 'open':
        return <FolderOpen size={16} className="text-green-600" />;
      case 'closed':
        return <Lock size={16} className="text-red-600" />;
      case 'digitized':
        return <Scan size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'digitized':
        return 'Digitized';
      default:
        return '';
    }
  };

  return (
    <span className={`flex-none flex items-center text-sm gap-1 status-${status}`}>
      {renderIcon()}
      {showLabel && (
        <span className="ml-1 text-xs hidden md:inline">
          {getStatusText()}
        </span>
      )}
    </span>
  );
};
