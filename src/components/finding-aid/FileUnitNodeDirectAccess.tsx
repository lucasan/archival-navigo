
import React from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface FileUnitNodeDirectAccessProps {
  title: string;
  status: FileUnitStatus;
  children?: React.ReactNode;
  searchTerm?: string;
  statusFilter?: 'all' | FileUnitStatus;
  isVisible?: boolean;
}

const FileUnitNodeDirectAccess: React.FC<FileUnitNodeDirectAccessProps> = ({
  title,
  status,
  children,
  searchTerm,
  statusFilter,
  isVisible = true
}) => {
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

export default FileUnitNodeDirectAccess;
