import { useState, useCallback, useRef } from 'react';

export const useRequest = (fn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cancel = useRef(false);

  const fetchFn = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        const response = await fn(...args);
        // If the source or target change during fetch, discard result.
        if (!cancel.current) {
          setData(response);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        cancel.current = false;
      }
    },
    [fn]
  );

  const cancelRequest = useCallback(() => {
    cancel.current = true;
  }, []);

  return { loading, error, data, fetchFn, cancelRequest };
};
