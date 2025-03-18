
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { FOIARecord } from './types';

interface DataTableProps {
  records: FOIARecord[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  totalCount: number;
  searchQuery: string;
}

const DataTable: React.FC<DataTableProps> = ({ 
  records, 
  isLoading, 
  isError, 
  error, 
  totalCount,
  searchQuery 
}) => {
  if (isLoading) {
    return <p className="text-gray-500">Loading records...</p>;
  }

  if (isError) {
    return (
      <div className="text-red-500 mb-4">
        <p>Error: {error?.message}</p>
        <p className="text-sm">Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Showing {records.length} of {totalCount} records
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Case Number</TableHead>
              <TableHead>Subject(s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                  No records found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.foia_number || 'N/A'}</TableCell>
                  <TableCell>{record.scope || record.title || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DataTable;
