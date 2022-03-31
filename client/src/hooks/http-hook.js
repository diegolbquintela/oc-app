import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // handling when user changes pages before
  // request is completed
  const activeHttpRequests = useRef([]);

  // handling infinite loops with useCallback
  const sendRequest = useCallback(
    async (url, method, headers = {}, body = null) => {
      setIsLoading(true);
      //
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        // keeping all but the controller that was used on
        // this request
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        // handling 400 or 500 errors
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
    setErrorMessage('');
  };

  // component unmounts
  // cleanup
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    errorMessage,
    sendRequest,
    clearError,
  };
};
