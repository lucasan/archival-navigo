
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSchemaInfo = () => {
  const [schemaInfo, setSchemaInfo] = useState<any>(null);

  useEffect(() => {
    const checkDatabaseSchema = async () => {
      try {
        try {
          const { data, error } = await supabase.rpc('get_schema_info');
          setSchemaInfo({ rpcResult: data, rpcError: error });
        } catch (e) {
          console.log("RPC not available");
        }
        
        const { data: foiaCount, error: foiaError } = await supabase
          .from('foia')
          .select('*', { count: 'exact', head: true });
          
        setSchemaInfo(prev => ({ 
          ...prev, 
          tableCheck: { foia: { count: foiaCount, error: foiaError } } 
        }));
      } catch (e) {
        setSchemaInfo(prev => ({ ...prev, error: (e as Error).message }));
      }
    };
    
    checkDatabaseSchema();
  }, []);

  return schemaInfo;
};
