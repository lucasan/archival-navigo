
import React from 'react';

interface SeriesMetadataProps {
  description?: string;
  extent?: string;
  arrangement?: string;
  date?: string;
}

export const SeriesMetadata: React.FC<SeriesMetadataProps> = ({ 
  description, 
  extent, 
  arrangement, 
  date 
}) => {
  if (!description && !extent && !arrangement && !date) {
    return null;
  }

  return (
    <div className="mt-2 mb-4 ml-3 md:ml-5 pl-1 text-xs sm:text-sm text-muted-foreground border-l">
      {description && (
        <div className="mb-2">
          <span className="font-medium text-foreground">Description: </span>
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
