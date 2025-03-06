
import React from 'react';
import { ExternalLink, File, Package, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TreeNodeBase } from './types';
import { StatusIcon } from './StatusIcon';

interface NodeContentProps extends TreeNodeBase {
  containerNumber?: string;
  containerType?: string;
  fileUnitStatus?: 'open' | 'closed' | 'digitized';
  toggleExpand: () => void;
  isExpanded: boolean;
  hasChildren: boolean;
  matchesSearch: boolean;
}

export const NodeContent: React.FC<NodeContentProps> = ({
  type,
  title,
  externalUrl,
  thumbnailUrl,
  containerType,
  containerNumber,
  fileUnitStatus,
  toggleExpand,
  isExpanded,
  hasChildren,
  matchesSearch,
  searchTerm
}) => {
  return (
    <div 
      className={cn(
        'tree-node flex flex-wrap md:flex-nowrap items-center gap-2 w-full',
        {
          'tree-node-series': type === 'series',
          'tree-node-container': type === 'container',
          'tree-node-file': type === 'file-unit',
          'tree-node-item': type === 'item',
          'bg-yellow-50': matchesSearch && searchTerm && searchTerm.trim() !== '',
        }
      )}
    >
      {/* Node icon/expand button */}
      <NodeIcon 
        type={type} 
        hasChildren={hasChildren} 
        isExpanded={isExpanded} 
        toggleExpand={toggleExpand} 
      />

      {/* Thumbnail for items - Improved for mobile */}
      {type === 'item' && thumbnailUrl && (
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] flex-none overflow-hidden rounded-md border mr-1 sm:mr-2">
          <img 
            src={thumbnailUrl} 
            alt={`Thumbnail for ${title}`} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Title and content - Improved for mobile with better wrapping */}
      <div className="flex-1 min-w-0 break-words">
        {type === 'item' && externalUrl ? (
          <a 
            href={externalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-1 sm:gap-1.5 font-medium text-primary hover:underline text-sm sm:text-base break-words"
          >
            <span className="break-words">{title}</span>
            <ExternalLink size={12} className="flex-none opacity-70 group-hover:opacity-100 transition-opacity sm:size-14 mt-1" />
          </a>
        ) : (
          <span className={cn(
            "break-words w-full inline-block",
            type === 'series' && "font-bold text-base sm:text-lg",
            type === 'container' && "font-medium",
          )}>
            {title}
            {type === 'container' && containerType && containerNumber && (
              <span className="text-muted-foreground ml-1 sm:ml-2 text-xs sm:text-sm">
                ({containerType} {containerNumber})
              </span>
            )}
          </span>
        )}
      </div>

      {/* Status icon for file units */}
      {type === 'file-unit' && fileUnitStatus && (
        <div className="ml-auto flex-none">
          <StatusIcon status={fileUnitStatus} showLabel={false} showLabelOnHover />
        </div>
      )}
    </div>
  );
};

// Helper component for node icons
interface NodeIconProps {
  type: 'series' | 'container' | 'file-unit' | 'item';
  hasChildren: boolean;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const NodeIcon: React.FC<NodeIconProps> = ({ type, hasChildren, isExpanded, toggleExpand }) => {
  if (hasChildren) {
    return (
      <button 
        onClick={toggleExpand}
        className="flex-none w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isExpanded ? "Collapse" : "Expand"}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
    );
  } else {
    return (
      <span className="w-5 h-5 flex-none flex items-center justify-center">
        {type === 'item' && <File size={16} className="text-muted-foreground" />}
        {type === 'container' && <Package size={16} className="text-muted-foreground" />}
      </span>
    );
  }
};
