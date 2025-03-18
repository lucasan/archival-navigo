
import React from 'react';
import TreeNode from './TreeNode';

interface ContainerNodeProps {
  title: string;
  containerType: string;
  containerNumber: string;
  containerId?: string;
  children?: React.ReactNode;
  searchTerm?: string;
  statusFilter?: 'all' | 'open' | 'closed' | 'digitized';
  isVisible?: boolean;
}

const ContainerNode: React.FC<ContainerNodeProps> = ({
  title,
  containerType,
  containerNumber,
  containerId,
  children,
  searchTerm = '',
  statusFilter,
  isVisible
}) => {
  // If containerId is provided, use it as the title directly
  const displayTitle = containerId ? `Container ID ${containerId}` : title;
  
  return (
    <TreeNode 
      type="container" 
      title={displayTitle} 
      containerType={containerType} 
      containerNumber={containerNumber}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      isVisible={isVisible}
    >
      {children}
    </TreeNode>
  );
};

export default ContainerNode;
