
import React, { useState } from 'react';
import TreeNode from './TreeNode';
import { FileUnitStatus } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isRestrictionsOpen, setIsRestrictionsOpen] = useState(false);

  // Check if search is active to force open state
  React.useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '') {
      setIsOpen(true);
    }
  }, [searchTerm]);

  // Create a summary of restrictions for the collapsed view
  const restrictionsSummary = () => {
    const parts = [];
    if (accessRestriction) parts.push(`Access: ${accessRestriction}`);
    if (useRestriction) parts.push(`Use: ${useRestriction}`);
    return parts.join(' • ');
  };

  const hasRestrictions = accessRestriction || useRestriction;

  return (
    <div id={id} className="border border-gray-200 rounded-md mb-4 bg-white overflow-hidden">
      {/* Series Header - Always visible */}
      <div className="p-3 pb-1">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      {/* Series Metadata - Always visible */}
      {!hideMetadata && finalDescription && (
        <div className="px-3 py-1 text-sm text-muted-foreground">
          <div className="mb-2">{finalDescription}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {extent && (
              <div>
                <span className="font-medium text-foreground">Extent: </span>
                {extent}
              </div>
            )}
            {date && (
              <div>
                <span className="font-medium text-foreground">Date: </span>
                {date}
              </div>
            )}
          </div>
          {arrangement && (
            <div className="mb-2">
              <span className="font-medium text-foreground">System of Arrangement: </span>
              {arrangement}
            </div>
          )}
          
          {/* Collapsible Restrictions Section */}
          {hasRestrictions && (
            <div className="mb-2 p-2 bg-blue-50/20 border border-blue-100 rounded-sm">
              <Collapsible
                open={isRestrictionsOpen}
                onOpenChange={setIsRestrictionsOpen}
              >
                <CollapsibleTrigger className="flex items-center w-full text-left text-sm">
                  <div className="flex items-center gap-1 font-medium">
                    {isRestrictionsOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                    )}
                    <span className="text-foreground">Restrictions: </span>
                    {!isRestrictionsOpen && (
                      <span className="text-sm font-normal">{restrictionsSummary()}</span>
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-1 pl-5">
                  {accessRestriction && (
                    <div className="mb-1">
                      <span className="font-medium text-foreground">Access Restriction: </span>
                      {accessRestriction}
                      {specificAccessRestriction && (
                        <div className="ml-4 text-xs mt-1 text-slate-600">
                          {specificAccessRestriction}
                        </div>
                      )}
                    </div>
                  )}
                  {useRestriction && (
                    <div>
                      <span className="font-medium text-foreground">Use Restriction: </span>
                      {useRestriction}
                      {specificUseRestriction && (
                        <div className="ml-4 text-xs mt-1 text-slate-600">
                          {specificUseRestriction}
                        </div>
                      )}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      )}

      {/* Collapsible Section for Children Content */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="border-t border-gray-200"
      >
        <CollapsibleTrigger className="flex items-center w-full p-2 text-left hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 text-sm font-medium px-1">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
            <span className={cn(
              "transition-colors",
              isOpen ? "text-primary" : "text-gray-600"
            )}>
              Series Content
            </span>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pb-2">
          <div className="pl-4 pt-2">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SeriesSection;
