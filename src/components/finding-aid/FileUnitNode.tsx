
import React, { useEffect } from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface FileUnitNodeProps {
  title: string;
  status: FileUnitStatus;
  naid?: string;
  containerId?: string;
  children?: React.ReactNode;
  searchTerm?: string;
  statusFilter?: 'all' | FileUnitStatus;
  isVisible?: boolean;
}

const FileUnitNode: React.FC<FileUnitNodeProps> = ({
  title,
  status,
  naid,
  containerId,
  children,
  searchTerm,
  statusFilter,
  isVisible = true
}) => {
  // Enhanced debugging information to track the children structure
  const hasChildren = Boolean(children && React.Children.count(children) > 0);
  const childCount = React.Children.count(children || []);
  
  console.log(`FileUnitNode "${title}" - hasChildren: ${hasChildren}, childCount: ${childCount}`);
  
  // Log when searchTerm changes to see if props are updating
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '') {
      console.log(`FileUnitNode "${title}" - searchTerm changed to: "${searchTerm}"`);
    }
  }, [searchTerm, title]);
  
  return (
    <TreeNode 
      type="file-unit" 
      title={title} 
      fileUnitStatus={status}
      naid={naid}
      containerId={containerId}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      isVisible={isVisible}
    >
      {/* Explicitly pass all children */}
      {children}
    </TreeNode>
  );
};

export default FileUnitNode;
