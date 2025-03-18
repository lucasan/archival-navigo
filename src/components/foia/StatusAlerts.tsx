
import React from 'react';
import { AlertCircle, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface StatusAlertsProps {
  schemaInfo: any;
  directCheckDone: boolean;
  directData: any[] | null;
  directCheckError: string | null;
  refetch: () => void;
  onRetryDirectCheck: () => void;
}

const StatusAlerts: React.FC<StatusAlertsProps> = ({
  schemaInfo,
  directCheckDone,
  directData,
  directCheckError,
  refetch,
  onRetryDirectCheck
}) => {
  return (
    <>
      {schemaInfo && (
        <Alert className="mb-6 bg-purple-50">
          <Database className="h-4 w-4" />
          <AlertTitle>Database Schema Information</AlertTitle>
          <AlertDescription>
            <div className="text-xs overflow-auto max-h-32">
              {schemaInfo.error ? (
                <div className="text-red-500">
                  Error retrieving schema: {schemaInfo.error}
                </div>
              ) : (
                <pre>{JSON.stringify(schemaInfo, null, 2)}</pre>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {directCheckDone && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Connectivity Check</AlertTitle>
          <AlertDescription>
            {directCheckError ? (
              <div className="text-red-500">
                Error: {directCheckError}
              </div>
            ) : (
              <>
                Direct database check: {directData ? `Found ${directData.length} records` : 'No records found'}
                {directData && directData.length > 0 && (
                  <p className="text-sm mt-2">
                    First record: {directData[0].foia_number || 'N/A'} - {directData[0].scope || directData[0].title || 'N/A'}
                  </p>
                )}
              </>
            )}
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetryDirectCheck}
              >
                Retry Direct Check
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
              >
                Retry Query
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default StatusAlerts;
