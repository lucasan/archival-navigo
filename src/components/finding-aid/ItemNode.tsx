
import React from 'react';
import TreeNode from './TreeNode';

interface ItemNodeProps {
  title: string;
  thumbnailUrl: string;
  externalUrl: string;
  searchTerm?: string;
  statusFilter?: 'all' | 'open' | 'closed' | 'digitized';
}

const ItemNode: React.FC<ItemNodeProps> = ({
  title,
  thumbnailUrl,
  externalUrl,
  searchTerm = '',
  statusFilter
}) => {
  return (
    <TreeNode 
      type="item" 
      title={title} 
      thumbnailUrl={thumbnailUrl}
      externalUrl={externalUrl}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    />
  );
};

export default ItemNode;
