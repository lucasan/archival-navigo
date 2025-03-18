
import React from 'react';
import TreeNode from './TreeNode';

interface ItemNodeProps {
  title: string;
  thumbnailUrl: string;
  externalUrl?: string;
  naid?: string;
  scopeContent?: string;
  searchTerm?: string;
  statusFilter?: 'all' | 'open' | 'closed' | 'digitized';
}

const ItemNode: React.FC<ItemNodeProps> = ({
  title,
  thumbnailUrl,
  externalUrl,
  naid,
  scopeContent,
  searchTerm = '',
  statusFilter
}) => {
  // If NAID is provided but externalUrl isn't, create a NAC link
  const finalExternalUrl = naid && !externalUrl 
    ? `https://catalog.archives.gov/id/${naid}`
    : externalUrl || '#';

  return (
    <TreeNode 
      type="item" 
      title={title} 
      thumbnailUrl={thumbnailUrl}
      externalUrl={finalExternalUrl}
      naid={naid}
      scopeContent={scopeContent}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    />
  );
};

export default ItemNode;
