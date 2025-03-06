
import React from 'react';
import { TreeNodeBase, FileUnitStatus } from './types';

type ReactElementWithProps = React.ReactElement & {
  props: {
    type: 'series' | 'container' | 'file-unit' | 'item';
    title: string;
    seriesDescription?: string;
    children?: React.ReactNode;
    fileUnitStatus?: FileUnitStatus;
    isVisible?: boolean;
  };
};

// Check if node matches search term
export const nodeMatchesSearch = (
  node: React.ReactElement, 
  searchTerm?: string
): boolean => {
  if (!searchTerm || searchTerm.trim() === '') return true;
  
  const { title, seriesDescription } = node.props;
  const term = searchTerm.toLowerCase();
  
  return title.toLowerCase().includes(term) || 
    (seriesDescription && seriesDescription.toLowerCase().includes(term));
};

// Check if node matches status filter
export const nodeMatchesStatusFilter = (
  node: React.ReactElement, 
  statusFilter?: FileUnitStatus | 'all'
): boolean => {
  if (!statusFilter || statusFilter === 'all') return true;
  
  const { type, fileUnitStatus } = node.props;
  
  return type !== 'file-unit' || fileUnitStatus === statusFilter;
};

// Check if any child items match search term
export const childrenMatchSearch = (
  children: React.ReactNode, 
  searchTerm?: string
): boolean => {
  if (!children || !searchTerm || searchTerm.trim() === '') return false;
  
  const childrenArray = React.Children.toArray(children) as ReactElementWithProps[];
  
  return childrenArray.some(child => 
    child.props.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Recursive function to check if node or any descendants are visible
export const isNodeOrDescendantVisible = (
  node: ReactElementWithProps,
  searchTerm?: string,
  statusFilter?: FileUnitStatus | 'all'
): boolean => {
  // First check if node is explicitly marked as visible (parent matched criteria)
  if (node.props.isVisible === true) {
    return true;
  }
  
  // Base case checks
  const matchesSearch = nodeMatchesSearch(node, searchTerm);
  const matchesFilter = nodeMatchesStatusFilter(node, statusFilter);
  
  // For items, they are visible if they match the criteria
  if (node.props.type === 'item') {
    return matchesSearch && matchesFilter;
  }
  
  // For file units, check both the unit itself and any child items
  if (node.props.type === 'file-unit') {
    // Check direct matches first
    if (matchesSearch && matchesFilter) return true;
    
    // If searching, also check children
    if (node.props.children && searchTerm && searchTerm.trim() !== '') {
      return childrenMatchSearch(node.props.children, searchTerm) && matchesFilter;
    }
    
    return false;
  }
  
  // For series and containers, they're visible if they match or have visible descendants
  if ((searchTerm && searchTerm.trim() !== '' && matchesSearch) || 
      (statusFilter !== 'all' && matchesFilter)) {
    return true;
  }
  
  // Check descendants
  if (node.props.children) {
    const childrenArray = React.Children.toArray(node.props.children) as ReactElementWithProps[];
    return childrenArray.some(child => isNodeOrDescendantVisible(child, searchTerm, statusFilter));
  }
  
  return false;
};

// Determine if a node should be displayed based on visibility rules
export const shouldNodeDisplay = (
  props: TreeNodeBase & {
    fileUnitStatus?: FileUnitStatus;
    children?: React.ReactNode;
    seriesDescription?: string;
  },
  hasVisibleDescendants: () => boolean
): boolean => {
  const { 
    isVisible, 
    searchTerm, 
    statusFilter, 
    type, 
    title, 
    seriesDescription,
    children, 
    fileUnitStatus 
  } = props;
  
  // Base visibility check
  if (!isVisible) return false;
  
  // If no filtering or searching, show everything
  if ((!searchTerm || searchTerm.trim() === '') && (!statusFilter || statusFilter === 'all')) {
    return true;
  }
  
  // Match checks
  const matchesSearch = !searchTerm || searchTerm.trim() === '' || 
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (seriesDescription && seriesDescription.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const matchesStatusFilter = !statusFilter || statusFilter === 'all' || 
    type !== 'file-unit' || 
    fileUnitStatus === statusFilter;
  
  // If this node matches search or filter, show it and all its children
  if ((matchesSearch && searchTerm && searchTerm.trim() !== '') || 
      (matchesStatusFilter && statusFilter !== 'all' && type === 'file-unit')) {
    return true;
  }
  
  // Item visibility
  if (type === 'item') {
    return matchesSearch && matchesStatusFilter;
  }
  
  // File unit visibility
  if (type === 'file-unit') {
    // If searching or filtering, check children too
    if ((searchTerm && searchTerm.trim() !== '') || statusFilter !== 'all') {
      if (children) {
        const fileUnitChildren = React.Children.toArray(children) as ReactElementWithProps[];
        const anyChildMatches = fileUnitChildren.some(child => 
          (searchTerm && child.props.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (statusFilter !== 'all' && matchesStatusFilter)
        );
        return (matchesSearch || anyChildMatches) && matchesStatusFilter;
      }
    }
    return matchesSearch && matchesStatusFilter;
  }
  
  // Series and container visibility
  if (type === 'series' || type === 'container') {
    if ((searchTerm && searchTerm.trim() !== '' && matchesSearch) || 
        (statusFilter !== 'all' && matchesStatusFilter)) {
      return true;
    }
    return hasVisibleDescendants();
  }
  
  return false;
};
