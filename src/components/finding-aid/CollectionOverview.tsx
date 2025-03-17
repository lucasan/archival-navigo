
import React from 'react';

interface CollectionOverviewProps {
  description: string[];
  showTitle?: boolean;
}

const CollectionOverview: React.FC<CollectionOverviewProps> = ({ 
  description,
  showTitle = true 
}) => {
  return (
    <section className="mb-4 sm:mb-6 md:mb-8">
      {showTitle && (
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Scope and Content Note</h2>
      )}
      <div className="prose prose-sm sm:prose-base prose-slate max-w-none">
        {description.map((paragraph, index) => (
          <p key={index} className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default CollectionOverview;
