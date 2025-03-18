
import React from 'react';
import ReadMore from '@/components/ui/read-more';

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
          <div key={index} className="mb-3 md:mb-4">
            <ReadMore 
              text={paragraph} 
              maxLength={600}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionOverview;
