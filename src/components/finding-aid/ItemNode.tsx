
import React from 'react';
import TreeNode from './TreeNode';

interface ItemNodeProps {
  title: string;
  thumbnailUrl: string;
  externalUrl: string;
}

const ItemNode: React.FC<ItemNodeProps> = ({
  title,
  thumbnailUrl,
  externalUrl
}) => {
  return (
    <TreeNode 
      type="item" 
      title={title} 
      thumbnailUrl={thumbnailUrl}
      externalUrl={externalUrl}
    />
  );
};

export default ItemNode;
