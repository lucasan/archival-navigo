
import React from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface SeriesSectionProps {
  id: string;
  title: string;
  description: string;
  extent: string;
  arrangement: string;
  date: string;
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
  children: React.ReactNode;
  hideMetadata?: boolean;
}

const SeriesSection: React.FC<SeriesSectionProps> = ({
  id,
  title,
  description,
  extent,
  arrangement,
  date,
  searchTerm,
  statusFilter,
  hideMetadata = false,
  children
}) => {
  return (
    <div id={id}>
      <TreeNode 
        type="series" 
        title={title}
        seriesDescription={hideMetadata ? undefined : description}
        seriesExtent={hideMetadata ? undefined : extent}
        seriesArrangement={hideMetadata ? undefined : arrangement}
        seriesDate={hideMetadata ? undefined : date}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        {children}
      </TreeNode>
    </div>
  );
};

export default SeriesSection;
