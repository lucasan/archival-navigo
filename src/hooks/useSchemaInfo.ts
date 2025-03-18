
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSchemaInfo = () => {
  const [schemaInfo, setSchemaInfo] = useState<any>(null);

  useEffect(() => {
    const checkDatabaseSchema = async () => {
      try {
        console.log("%c[SCHEMA DEBUG] Checking database schema...", "background: #4b0082; color: #ffffff; font-weight: bold;");
        
        try {
          const { data, error } = await supabase.rpc('get_schema_info');
          console.log("%c[SCHEMA DEBUG] RPC result:", "background: #4b0082; color: #ffffff;", { data, error });
          setSchemaInfo({ rpcResult: data, rpcError: error });
        } catch (e) {
          console.log("%c[SCHEMA DEBUG] RPC not available:", "background: #4b0082; color: #ffffff;", e);
        }
        
        const { data: foiaCount, error: foiaError } = await supabase
          .from('foia')
          .select('*', { count: 'exact', head: true });
          
        console.log("%c[SCHEMA DEBUG] Foia table check:", "background: #4b0082; color: #ffffff;", { 
          count: foiaCount, 
          error: foiaError
        });
        
        setSchemaInfo(prev => ({ 
          ...prev, 
          tableCheck: { foia: { count: foiaCount, error: foiaError } } 
        }));
      } catch (e) {
        console.error("%c[SCHEMA DEBUG] Schema check error:", "background: #4b0082; color: #ff6347;", e);
        setSchemaInfo(prev => ({ ...prev, error: (e as Error).message }));
      }
    };
    
    checkDatabaseSchema();
  }, []);

  return schemaInfo;
};
