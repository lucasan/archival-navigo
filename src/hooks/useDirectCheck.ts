
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      console.log("%c[DEBUG] Trying standard table access", "background: #222; color: #bada55;");
      
      // Try the direct RPC approach to access bush_fa.foia schema
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_bush_fa_foia_data');
      
      console.log("%c[DEBUG] Direct query response:", "background: #222; color: #bada55;", { 
        data: rpcData, 
        error: rpcError,
        count: rpcData?.length || 0
      });
      
      if (rpcData) {
        console.log("%c[DEBUG] Result type:", "background: #222; color: #bada55;", Array.isArray(rpcData) ? "Array" : typeof rpcData);
        console.log("%c[DEBUG] Result count:", "background: #222; color: #bada55;", Array.isArray(rpcData) ? rpcData.length : 0);
        
        if (Array.isArray(rpcData) && rpcData.length > 0) {
          console.log("%c[DEBUG] First record:", "background: #222; color: #bada55;", rpcData[0]);
        } else {
          console.log("%c[DEBUG] No records found in direct query", "background: #222; color: #bada55;");
        }
        
        setDirectData(rpcData as FOIARecord[]);
      } else if (rpcError) {
        setDirectCheckError(`Error: ${rpcError.message}`);
      } else {
        setDirectCheckError("No data returned and no error");
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
