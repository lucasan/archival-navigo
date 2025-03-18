
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
  // Join all paragraphs into a single text with line breaks
  const combinedDescription = description.join('\n\n');
  
  return (
    <section className="mb-4 sm:mb-6 md:mb-8">
      {showTitle && (
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Scope and Content Note</h2>
      )}
      <div className="prose prose-sm sm:prose-base prose-slate max-w-none">
        <ReadMore 
          text={combinedDescription} 
          maxLength={600}
        />
      </div>
    </section>
  );
};

export default CollectionOverview;
