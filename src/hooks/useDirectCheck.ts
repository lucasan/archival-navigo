
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
      
      console.log("%c[DEBUG] Trying standard table access", "background: #222; color: #bada55;");
      const { data, error, count } = await supabase
        .from('foia')
        .select('*', { count: 'exact' });
        
      console.log("%c[DEBUG] Direct query response:", "background: #222; color: #bada55;", { 
        data, 
        error,
        count
      });
      
      if (error) {
        console.error('%c[ERROR] Direct check error:', "background: #222; color: #ff6347;", error);
        setDirectCheckError(`Query error: ${error.message}`);
        
        try {
          console.log("%c[DEBUG] Trying RPC fallback", "background: #222; color: #bada55;");
          
          const { data: rpcData, error: rpcError } = await getBushFaFoiaData();
            
          console.log("%c[DEBUG] RPC fallback response:", "background: #222; color: #bada55;", { 
            data: rpcData, 
            error: rpcError
          });
          
          if (!rpcError && rpcData) {
            setDirectData(rpcData as FOIARecord[]);
          } else {
            setDirectCheckError(`RPC fallback error: ${rpcError?.message || 'No data returned'}`);
          }
        } catch (rpcErr) {
          console.error('%c[ERROR] RPC fallback error:', "background: #222; color: #ff6347;", rpcErr);
          setDirectCheckError(`RPC fallback error: ${(rpcErr as Error).message}`);
        }
      } else {
        console.log("%c[DEBUG] Result type:", "background: #222; color: #bada55;", Array.isArray(data) ? 'Array' : typeof data);
        console.log("%c[DEBUG] Result count:", "background: #222; color: #bada55;", data?.length);
        
        if (Array.isArray(data) && data.length > 0) {
          console.log("%c[DEBUG] First record structure:", "background: #222; color: #bada55;", Object.keys(data[0]));
          console.log("%c[DEBUG] First record data:", "background: #222; color: #bada55;", data[0]);
        } else {
          console.log("%c[DEBUG] No records found in direct query", "background: #222; color: #ff6347;");
        }
        
        setDirectData(data as FOIARecord[]);
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
