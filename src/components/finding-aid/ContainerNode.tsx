
import React from 'react';
import TreeNode from './TreeNode';

interface ContainerNodeProps {
  title: string;
  containerType: string;
  containerNumber: string;
  children: React.ReactNode;
}

const ContainerNode: React.FC<ContainerNodeProps> = ({
  title,
  containerType,
  containerNumber,
  children
}) => {
  return (
    <TreeNode 
      type="container" 
      title={title} 
      containerType={containerType} 
      containerNumber={containerNumber}
    >
      {children}
    </TreeNode>
  );
};

export default ContainerNode;
