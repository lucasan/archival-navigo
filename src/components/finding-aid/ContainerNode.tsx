
import React from 'react';
import TreeNode from './TreeNode';

interface ContainerNodeProps {
  title: string;
  containerType: string;
  containerNumber: string;
  children?: React.ReactNode;
  searchTerm?: string;
  statusFilter?: 'all' | 'open' | 'closed' | 'digitized';
  isVisible?: boolean;
}

const ContainerNode: React.FC<ContainerNodeProps> = ({
  title,
  containerType,
  containerNumber,
  children,
  searchTerm,
  statusFilter,
  isVisible
}) => {
  return (
    <TreeNode 
      type="container" 
      title={title} 
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
