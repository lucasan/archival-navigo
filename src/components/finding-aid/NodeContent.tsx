
import React from 'react';
import { ExternalLink, File, Package, ChevronRight, ChevronDown, Sparkle, Archive, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TreeNodeBase } from './types';
import { StatusIcon } from './StatusIcon';

interface NodeContentProps extends TreeNodeBase {
  containerNumber?: string;
  containerType?: string;
  fileUnitStatus?: 'open' | 'closed' | 'digitized';
  naid?: string;
  containerId?: string;
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
  naid,
  containerId,
  toggleExpand,
  isExpanded,
  hasChildren,
  matchesSearch,
  searchTerm,
  scopeContent
}) => {
  // Explicit handler for the entire node click
  const handleNodeClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      toggleExpand();
    }
  };

  // Determine if this node directly matches the search term
  const directMatch = searchTerm && 
                     searchTerm.trim() !== '' && 
                     title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div>
      <div 
        className={cn(
          'tree-node flex flex-wrap md:flex-nowrap items-center gap-2 w-full p-1.5 rounded-md transition-colors',
          {
            'tree-node-series': type === 'series',
            'tree-node-container': type === 'container',
            'tree-node-file': type === 'file-unit',
            'tree-node-item': type === 'item',
            'bg-yellow-50 border border-yellow-200': directMatch,
            'bg-blue-50/50': isExpanded && hasChildren && type !== 'item' && !directMatch,
          }
        )}
        onClick={handleNodeClick}
        style={hasChildren ? { cursor: 'pointer' } : undefined}
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {/* Node icon/expand button */}
        <NodeIcon 
          type={type} 
          hasChildren={hasChildren} 
          isExpanded={isExpanded} 
          toggleExpand={toggleExpand} 
        />

        {/* Search match indicator */}
        {directMatch && (
          <Sparkle size={16} className="text-amber-500 flex-none animate-pulse" />
        )}

        {/* Thumbnail for items */}
        {type === 'item' && thumbnailUrl && (
          <div 
            className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] flex-none overflow-hidden rounded-md border mr-1 sm:mr-2"
            onClick={(e) => e.stopPropagation()} // Prevent triggering parent's onClick
          >
            <img 
              src={thumbnailUrl} 
              alt={`Thumbnail for ${title}`} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Title and content */}
        <div className="flex-1 min-w-0 break-words">
          {type === 'item' && externalUrl ? (
            <a 
              href={externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex items-start gap-1 sm:gap-1.5 font-medium text-primary hover:underline text-sm sm:text-base break-words",
                directMatch && "font-semibold text-amber-700"
              )}
              onClick={(e) => e.stopPropagation()} // Prevent triggering parent's onClick
            >
              <span className="break-words">{title}</span>
              <ExternalLink size={14} className="flex-none opacity-70 group-hover:opacity-100 transition-opacity mt-0.5" />
            </a>
          ) : (
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <span className={cn(
                  "break-words inline-block",
                  directMatch && "font-semibold text-amber-700",
                  type === 'series' && "font-bold text-base sm:text-lg",
                  type === 'container' && "font-medium",
                )}>
                  {title}
                </span>
                
                {/* Status icon for file units - moved to title line */}
                {type === 'file-unit' && fileUnitStatus && (
                  <div className="flex-none ml-2">
                    <StatusIcon status={fileUnitStatus} showLabel={false} showLabelOnHover />
                  </div>
                )}
              </div>
              
              {/* NAID and Container ID for file units */}
              {type === 'file-unit' && (naid || containerId) && (
                <div className="flex flex-col gap-y-1 text-xs text-muted-foreground mt-1">
                  {naid && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Archive size={14} className="text-slate-400" />
                        <span>
                          NAID: <span className="font-medium text-slate-700">{naid}</span>
                        </span>
                      </div>
                      {/* Move the NAC link to its own line below NAID */}
                      <a 
                        href={`https://catalog.archives.gov/id/${naid}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center ml-5 mt-0.5"
                        onClick={(e) => e.stopPropagation()} // Prevent triggering parent's onClick
                      >
                        <span>View in NAC</span>
                        <ExternalLink size={10} className="ml-0.5 opacity-70" />
                      </a>
                    </div>
                  )}
                  {containerId && (
                    <div className="flex items-center gap-1">
                      <Tag size={14} className="text-slate-400" />
                      <span>Container: <span className="font-medium text-slate-700">{containerId}</span></span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Scope Content for items - display below the main content */}
      {type === 'item' && scopeContent && (
        <div className="pl-7 pr-2 mt-1 mb-2 text-sm text-slate-700">
          {scopeContent}
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Critical to prevent double-firing
          toggleExpand();
        }}
        className={cn(
          "flex-none w-5 h-5 flex items-center justify-center transition-colors",
          "text-muted-foreground hover:text-foreground",
          isExpanded && "text-primary"
        )}
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

