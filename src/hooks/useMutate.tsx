import { useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { HTTP_TYPES } from '@/utils/constants';
import http from '@/services/http';

interface IProps {
  url: string;
}

function useMutation<Resource>({ url }: IProps) {
  const [loading, setLoading] = useState(false);

  const mutate = async (
    body: object,
    method?: HTTP_TYPES,
    customHeaders?: object,
    requestUrl?: string
  ) => {
    setLoading(true);

    const headers = {
      headers: {
        ...customHeaders,
      },
    };
    try {
      const response = await http[method || HTTP_TYPES.POST](
        requestUrl || url,
        body,
        headers
      );
      setLoading(false);
      return {
        success: true,
        data: response?.data?.data as Resource,
        errors: null,
      };
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
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

  return { loading, mutate };
}

export { useMutation };
