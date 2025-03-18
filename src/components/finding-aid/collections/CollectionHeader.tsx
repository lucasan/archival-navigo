
import React from 'react';
import ToggleExpandButton from './ToggleExpandButton';

interface CollectionHeaderProps {
  title: string;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-lg md:text-xl font-medium">{title}</h3>
      <ToggleExpandButton />
    </div>
  );
};

export default CollectionHeader;
