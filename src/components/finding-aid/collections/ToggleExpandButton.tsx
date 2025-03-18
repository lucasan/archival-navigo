
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTreeContext } from '../TreeContext';

const ToggleExpandButton: React.FC = () => {
  const { expandAll, toggleExpandAll } = useTreeContext();
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleExpandAll}
      className="ml-auto flex items-center gap-1"
    >
      {expandAll ? (
        <>
          <ChevronUp size={16} />
          <span>Collapse All</span>
        </>
      ) : (
        <>
          <ChevronDown size={16} />
          <span>Expand All</span>
        </>
      )}
    </Button>
  );
};

export default ToggleExpandButton;
