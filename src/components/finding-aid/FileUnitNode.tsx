
import React from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface FileUnitNodeProps {
  title: string;
  status: FileUnitStatus;
  children: React.ReactNode;
}

const FileUnitNode: React.FC<FileUnitNodeProps> = ({
  title,
  status,
  children
}) => {
  return (
    <TreeNode 
      type="file-unit" 
      title={title} 
      fileUnitStatus={status}
    >
      {children}
    </TreeNode>
  );
};

export default FileUnitNode;
