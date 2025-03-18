
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
      console.log("%c[DEBUG] Performing direct table check...", "background: #222; color: #bada55; font-weight: bold;");
      
      // Skip trying direct table access and go straight to RPC
      console.log("%c[DEBUG] Using RPC to access bush_fa schema", "background: #222; color: #bada55;");
      
      const { data: rpcData, error: rpcError } = await getBushFaFoiaData();
      
      console.log("%c[DEBUG] RPC response:", "background: #222; color: #bada55;", { 
        data: rpcData, 
        error: rpcError
      });
      
      if (!rpcError && rpcData) {
        if (Array.isArray(rpcData) && rpcData.length > 0) {
          console.log("%c[DEBUG] First record structure:", "background: #222; color: #bada55;", Object.keys(rpcData[0]));
          console.log("%c[DEBUG] First record data:", "background: #222; color: #bada55;", rpcData[0]);
        } else {
          console.log("%c[DEBUG] No records found in RPC query", "background: #222; color: #ff6347;");
        }
        
        setDirectData(rpcData as FOIARecord[]);
      } else {
        setDirectCheckError(`RPC error: ${rpcError?.message || 'No data returned'}`);
      }
    } catch (e) {
      console.error('%c[ERROR] Unexpected error in direct check:', "background: #222; color: #ff6347;", e);
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
