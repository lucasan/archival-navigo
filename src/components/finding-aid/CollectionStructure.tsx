import React from 'react';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import TreeNode from './TreeNode';

interface CollectionStructureProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CollectionStructure: React.FC<CollectionStructureProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-3 sm:p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Collection Structure</h3>
      
      <SearchControls 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />
      
      <div className="space-y-2 text-sm md:text-base overflow-x-auto">
        <div id="series-1">
          <TreeNode 
            type="series" 
            title="Series I: Personal Correspondence, 1770-1826"
            seriesDescription="A comprehensive collection of Madison's personal letters to family members, friends, and colleagues."
            seriesExtent="12 boxes (5.2 linear feet)"
            seriesArrangement="Chronological by year, then alphabetical by correspondent"
            seriesDate="1770-1826"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <TreeNode 
              type="container" 
              title="Box 1" 
              containerType="Box" 
              containerNumber="1"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 1: Family Letters" 
                fileUnitStatus="digitized"
              >
                <TreeNode 
                  type="item" 
                  title="Letter to Dolley Madison, June 15, 1789" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
                <TreeNode 
                  type="item" 
                  title="Letter from Father, August 3, 1782" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
              </TreeNode>
            </TreeNode>
            
            <TreeNode 
              type="container" 
              title="Box 2" 
              containerType="Box" 
              containerNumber="2"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 2: Correspondence with Friends" 
                fileUnitStatus="closed"
              >
                <TreeNode 
                  type="item" 
                  title="Letter from Thomas Jefferson, May 12, 1790" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </div>

        <div id="series-2">
          <TreeNode 
            type="series" 
            title="Series II: Political Documents, 1780-1817"
            seriesDescription="Documents related to Madison's political career, including Constitutional Convention notes and presidential papers."
            seriesExtent="24 boxes (10.5 linear feet)"
            seriesArrangement="By document type, then chronological"
            seriesDate="1780-1817"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <TreeNode 
              type="container" 
              title="Box 3" 
              containerType="Box" 
              containerNumber="3"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 1: Constitutional Convention Notes" 
                fileUnitStatus="open"
              >
                <TreeNode 
                  type="item" 
                  title="Notes on the Constitutional Convention, May-September 1787" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
                <TreeNode 
                  type="item" 
                  title="Draft of Federalist No. 10, November 1787" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
              </TreeNode>
            </TreeNode>
            
            <TreeNode 
              type="container" 
              title="Box 4" 
              containerType="Box" 
              containerNumber="4"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 2: Presidential Papers" 
                fileUnitStatus="digitized"
              >
                <TreeNode 
                  type="item" 
                  title="First Inaugural Address, March 4, 1809" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
                <TreeNode 
                  type="item" 
                  title="War of 1812 Documents" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </div>

        <div id="series-3">
          <TreeNode 
            type="series" 
            title="Series III: Financial Records, 1780-1836"
            seriesDescription="Madison's personal and estate financial records, including accounts, receipts, and property documents."
            seriesExtent="8 boxes (3.5 linear feet)"
            seriesArrangement="By record type, then chronological"
            seriesDate="1780-1836"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <TreeNode 
              type="container" 
              title="Box 5" 
              containerType="Box" 
              containerNumber="5"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 1: Estate Accounts" 
                fileUnitStatus="closed"
              >
                <TreeNode 
                  type="item" 
                  title="Montpelier Estate Ledger, 1810-1820" 
                  thumbnailUrl="/placeholder.svg"
                  externalUrl="#"
                />
              </TreeNode>
            </TreeNode>
            
            <TreeNode 
              type="container" 
              title="Oversized Drawer 1" 
              containerType="Drawer" 
              containerNumber="1"
            >
              <TreeNode 
                type="file-unit" 
                title="File Unit 2: Personal Expenses" 
                fileUnitStatus="open"
              />
            </TreeNode>
          </TreeNode>
        </div>
      </div>
    </div>
  );
};

export default CollectionStructure;
