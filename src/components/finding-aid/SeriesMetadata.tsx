
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
  if (!description && !extent && !arrangement && !date && !accessRestriction && !useRestriction) {
    return null;
  }

  const hasRestrictions = accessRestriction || useRestriction;

  return (
    <div className="mt-2 mb-4 ml-3 md:ml-5 pl-1 text-xs sm:text-sm text-muted-foreground border-l">
      {/* Restrictions banner moved to the top */}
      {hasRestrictions && (
        <Alert className="mb-3 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700 text-xs">
            {accessRestriction && (
              <div className="mt-1">
                <span className="font-medium">Access: </span>
                {accessRestriction} 
                {specificAccessRestriction && <> - {specificAccessRestriction}</>}
              </div>
            )}
            {useRestriction && (
              <div className="mt-1">
                <span className="font-medium">Use: </span>
                {useRestriction}
                {specificUseRestriction && <> - {specificUseRestriction}</>}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {description && (
        <div className="mb-2">
          <span className="font-medium text-foreground">Scope and Content Note: </span>
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

