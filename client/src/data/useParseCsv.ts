import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useToast } from '@/hooks/use-toast';

interface UseParseCsvOptions {
  transformRow?: (row: any) => any;
}

export function useParseCsv<T>(url: string, options?: UseParseCsvOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            try {
              if (results.errors && results.errors.length > 0) {
                throw new Error(`CSV parsing error: ${results.errors[0].message}`);
              }
              
              const transformedData = options?.transformRow 
                ? results.data.map(options.transformRow) 
                : results.data;
              
              setData(transformedData as T[]);
              setLoading(false);
            } catch (err) {
              const error = err instanceof Error ? err : new Error('Unknown error parsing CSV');
              setError(error);
              setLoading(false);
              toast({
                title: "Error parsing CSV data",
                description: error.message,
                variant: "destructive",
              });
            }
          },
          error: (err) => {
            const error = new Error(`CSV parsing error: ${err.message}`);
            setError(error);
            setLoading(false);
            toast({
              title: "Error parsing CSV data",
              description: error.message,
              variant: "destructive",
            });
          }
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error fetching CSV');
        setError(error);
        setLoading(false);
        toast({
          title: "Error fetching CSV data",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchCsv();
  }, [url, options, toast]);

  return { data, loading, error };
}
