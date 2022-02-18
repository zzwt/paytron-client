import { useState, useCallback } from 'react';

export const useRequest = (fn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchFn = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await fn(...args);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { loading, error, data, fetchFn };
};
