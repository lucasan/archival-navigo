
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type TreeContextType = {
  expandAll: boolean;
  toggleExpandAll: () => void;
  setExpandAll: (value: boolean) => void; // Add direct setter for more control
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(prev => !prev);
  };

  return (
    <TreeContext.Provider value={{ expandAll, toggleExpandAll, setExpandAll }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = (): TreeContextType => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};
