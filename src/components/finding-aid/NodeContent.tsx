
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
        'tree-node flex items-center gap-2',
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

      {/* Thumbnail for items */}
      {type === 'item' && thumbnailUrl && (
        <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px] flex-none overflow-hidden rounded-md border mr-2">
          <img 
            src={thumbnailUrl} 
            alt={`Thumbnail for ${title}`} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Title and content */}
      <div className="flex-1 min-w-0">
        {type === 'item' && externalUrl ? (
          <a 
            href={externalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <span className="truncate">{title}</span>
            <ExternalLink size={14} className="flex-none opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <span className={cn(
            "truncate",
            type === 'series' && "font-bold text-lg",
            type === 'container' && "font-medium",
          )}>
            {title}
            {type === 'container' && containerType && containerNumber && (
              <span className="text-muted-foreground ml-2 text-sm">
                ({containerType} {containerNumber})
              </span>
            )}
          </span>
        )}
      </div>

      {/* Status icon for file units */}
      {type === 'file-unit' && fileUnitStatus && (
        <div className="ml-2">
          <StatusIcon status={fileUnitStatus} showLabel />
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
