
import { useState, useEffect } from 'react';
import { supabase, getBushFaFoiaData } from '@/integrations/supabase/client';
import { FOIARecord } from '@/components/foia/types';

export const useDirectCheck = () => {
  const [directCheckDone, setDirectCheckDone] = useState(false);
  const [directData, setDirectData] = useState<FOIARecord[] | null>(null);
  const [directCheckError, setDirectCheckError] = useState<string | null>(null);

  const runDirectCheck = async () => {
    setDirectCheckDone(false);
    setDirectData(null);
    setDirectCheckError(null);
    
    try {
      // Skip trying direct table access and go straight to RPC
      const { data: rpcData, error: rpcError } = await getBushFaFoiaData();
      
      if (!rpcError && rpcData) {
        setDirectData(rpcData as FOIARecord[]);
      } else {
        setDirectCheckError(`RPC error: ${rpcError?.message || 'No data returned'}`);
      }
    } catch (e) {
      setDirectCheckError(`Unexpected error: ${(e as Error).message}`);
    } finally {
      setDirectCheckDone(true);
    }
  };

  useEffect(() => {
    runDirectCheck();
  }, []);

  return {
    directCheckDone,
    directData,
    directCheckError,
    runDirectCheck
  };
};
