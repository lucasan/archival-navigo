
import React from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface FileUnitNodeProps {
  title: string;
  status: FileUnitStatus;
  children?: React.ReactNode;
  searchTerm?: string;
  statusFilter?: 'all' | FileUnitStatus;
  isVisible?: boolean;
}

const FileUnitNode: React.FC<FileUnitNodeProps> = ({
  title,
  status,
  children,
  searchTerm,
  statusFilter,
  isVisible = true
}) => {
  // Debug information to track the children structure
  const hasChildren = Boolean(children && React.Children.count(children) > 0);
  console.log(`FileUnitNode "${title}" - hasChildren: ${hasChildren}, childCount: ${React.Children.count(children || [])}`);
  
  return (
    <TreeNode 
      type="file-unit" 
      title={title} 
      fileUnitStatus={status}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      isVisible={isVisible}
    >
      {children}
    </TreeNode>
  );
};

export default FileUnitNode;
