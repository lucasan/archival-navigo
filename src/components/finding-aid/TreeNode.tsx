
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Check, Minus, ExternalLink, File, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

type TreeNodeProps = {
  title: string;
  type: 'series' | 'container' | 'file-unit' | 'item';
  isDigitized?: boolean;
  children?: React.ReactNode;
  thumbnailUrl?: string;
  externalUrl?: string;
  level?: number;
  seriesDescription?: string;
  seriesExtent?: string;
  seriesArrangement?: string;
  seriesDate?: string;
  containerNumber?: string;
  containerType?: string;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  title,
  type,
  isDigitized,
  children,
  thumbnailUrl,
  externalUrl,
  level = 0,
  seriesDescription,
  seriesExtent,
  seriesArrangement,
  seriesDate,
  containerNumber,
  containerType,
}) => {
  const [isExpanded, setIsExpanded] = useState(type === 'series' || type === 'container');
  const hasChildren = Boolean(children);

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="animate-fade-in">
      <div 
        className={cn(
          'tree-node flex items-center gap-2',
          {
            'tree-node-series': type === 'series',
            'tree-node-container': type === 'container',
            'tree-node-file': type === 'file-unit',
            'tree-node-item': type === 'item',
          }
        )}
      >
        {hasChildren ? (
          <button 
            onClick={toggleExpand}
            className="flex-none w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className="w-5 h-5 flex-none flex items-center justify-center">
            {type === 'item' && <File size={16} className="text-muted-foreground" />}
            {type === 'container' && <Package size={16} className="text-muted-foreground" />}
          </span>
        )}

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

        {type === 'file-unit' && (
          <span className={cn(
            "flex-none flex items-center text-sm ml-2",
            isDigitized ? "digitized" : "not-digitized"
          )}>
            {isDigitized ? <Check size={16} /> : <Minus size={16} />}
            <span className="ml-1 text-xs hidden md:inline">
              {isDigitized ? 'Digitized' : 'Not digitized'}
            </span>
          </span>
        )}
      </div>

      {type === 'series' && (
        <div className="mt-2 mb-4 ml-5 pl-1 text-sm text-muted-foreground border-l">
          {seriesDescription && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Description: </span>
              {seriesDescription}
            </div>
          )}
          {seriesExtent && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Extent: </span>
              {seriesExtent}
            </div>
          )}
          {seriesArrangement && (
            <div className="mb-2">
              <span className="font-medium text-foreground">System of Arrangement: </span>
              {seriesArrangement}
            </div>
          )}
          {seriesDate && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Date: </span>
              {seriesDate}
            </div>
          )}
        </div>
      )}

      {hasChildren && isExpanded && (
        <div className="ml-5 border-l pl-1 mt-1 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
