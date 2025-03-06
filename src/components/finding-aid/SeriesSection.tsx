
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
  children
}) => {
  return (
    <div id={id}>
      <TreeNode 
        type="series" 
        title={title}
        seriesDescription={description}
        seriesExtent={extent}
        seriesArrangement={arrangement}
        seriesDate={date}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        {children}
      </TreeNode>
    </div>
  );
};

export default SeriesSection;
