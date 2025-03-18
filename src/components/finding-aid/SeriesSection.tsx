
import React from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';

interface SeriesSectionProps {
  id: string;
  title: string;
  scopeContent?: string;
  description?: string; // Add backwards compatibility for description prop
  extent?: string;
  arrangement?: string;
  date?: string;
  accessRestriction?: string;
  specificAccessRestriction?: string;
  useRestriction?: string;
  specificUseRestriction?: string;
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
  children: React.ReactNode;
  hideMetadata?: boolean;
}

const SeriesSection: React.FC<SeriesSectionProps> = ({
  id,
  title,
  scopeContent,
  description, // Handle both scopeContent and description
  extent,
  arrangement,
  date,
  accessRestriction,
  specificAccessRestriction,
  useRestriction,
  specificUseRestriction,
  searchTerm,
  statusFilter,
  hideMetadata = false,
  children
}) => {
  // Use scopeContent if provided, otherwise fall back to description
  const finalDescription = scopeContent || description;

  return (
    <div id={id}>
      <TreeNode 
        type="series" 
        title={title}
        seriesDescription={hideMetadata ? undefined : finalDescription}
        seriesExtent={hideMetadata ? undefined : extent}
        seriesArrangement={hideMetadata ? undefined : arrangement}
        seriesDate={hideMetadata ? undefined : date}
        seriesAccessRestriction={hideMetadata ? undefined : accessRestriction}
        seriesSpecificAccessRestriction={hideMetadata ? undefined : specificAccessRestriction}
        seriesUseRestriction={hideMetadata ? undefined : useRestriction}
        seriesSpecificUseRestriction={hideMetadata ? undefined : specificUseRestriction}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        {children}
      </TreeNode>
    </div>
  );
};

export default SeriesSection;
