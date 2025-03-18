
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SeriesMetadataProps {
  description?: string;
  extent?: string;
  arrangement?: string;
  date?: string;
  accessRestriction?: string;
  specificAccessRestriction?: string;
  useRestriction?: string;
  specificUseRestriction?: string;
}

export const SeriesMetadata: React.FC<SeriesMetadataProps> = ({ 
  description, 
  extent, 
  arrangement, 
  date,
  accessRestriction,
  specificAccessRestriction,
  useRestriction,
  specificUseRestriction
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!description && !extent && !arrangement && !date && !accessRestriction && !useRestriction) {
    return null;
  }

  const hasRestrictions = accessRestriction || useRestriction;

  // Create a summary of restrictions for the collapsed view
  const restrictionsSummary = () => {
    const parts = [];
    if (accessRestriction) parts.push(`Access: ${accessRestriction}`);
    if (useRestriction) parts.push(`Use: ${useRestriction}`);
    return parts.join(' • ');
  };

  return (
    <div className="mt-2 mb-4 ml-3 md:ml-5 pl-1 text-xs sm:text-sm text-muted-foreground border-l">
      {/* Collapsible restrictions notice */}
      {hasRestrictions && (
        <Alert className="mb-3 bg-blue-50/20 border-blue-100 py-2 px-3">
          <AlertDescription className="text-slate-700 text-xs">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="flex items-center">
                <CollapsibleTrigger className="flex items-center text-xs hover:underline cursor-pointer">
                  {isOpen ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />}
                  <span className="font-medium">{restrictionsSummary()}</span>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                {accessRestriction && specificAccessRestriction && (
                  <div className="mt-1 pl-4">
                    <span className="text-xs text-slate-600">{specificAccessRestriction}</span>
                  </div>
                )}
                {useRestriction && specificUseRestriction && (
                  <div className="mt-1 pl-4">
                    <span className="text-xs text-slate-600">{specificUseRestriction}</span>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </AlertDescription>
        </Alert>
      )}
      
      {description && (
        <div className="mb-2">
          {description}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {extent && (
          <div className="mb-2">
            <span className="font-medium text-foreground">Extent: </span>
            {extent}
          </div>
        )}
        {date && (
          <div className="mb-2">
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
    </div>
  );
};
