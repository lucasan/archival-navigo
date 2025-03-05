
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Check, Minus, ExternalLink, File } from 'lucide-react';
import { cn } from '@/lib/utils';

type TreeNodeProps = {
  title: string;
  type: 'series' | 'file-unit' | 'item';
  isDigitized?: boolean;
  children?: React.ReactNode;
  thumbnailUrl?: string;
  externalUrl?: string;
  level?: number;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  title,
  type,
  isDigitized,
  children,
  thumbnailUrl,
  externalUrl,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
            )}>
              {title}
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

      {hasChildren && isExpanded && (
        <div className="ml-5 border-l pl-1 mt-1 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
