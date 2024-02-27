import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import http from '@/services/http';

export interface Meta {
  totalPages: number;
  total: number;
}

interface IProps {
  url: string;
  disableOnLoad?: boolean;
  customHeaders?: object;
  page?: number;
  pageSize?: number;
}

function useQuery<Resource>({
  url,
  disableOnLoad,
  customHeaders = {},
}: IProps) {
  const [data, setData] = useState<Resource | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!disableOnLoad) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    const headers = {
      headers: {
        ...customHeaders,
      },
    };
    try {
      const response = await http.get(url, headers);
      setLoading(false);
      // change these based on your api response
      setData(response?.data);
      if (response.data?.meta) {
        setMeta({
          total: response.data?.meta?.total,
          totalPages: response.data?.meta?.totalPages,
        });
      } else {
        setMeta({
          total: 0,
          totalPages: 0,
        });
      }
      return {
        success: true,
        data: response?.data,
        errors: null,
      };
    } catch (err: any) {
      setLoading(false);
      setError(err);
      setMeta({
        total: 0,
        totalPages: 0,
      });
      if (err.status === 403) {
        toast.error("Don't have permissions");
      }
      return {
        success: false,
        data: null,
        errors: err,
      };
    }
  };

  return { error, loading, data, retry: fetchData, meta };
}

export { useQuery };
