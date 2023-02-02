import { useState } from 'react';

const useFetch = (baseURL) => {
  const [loading, setLoading] = useState(false);

  const get = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/${url}`, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      });

      if (!response.ok) throw new Error('API call failed.');

      const { data } = await response.json();
      return data;

    } catch (error) {
      return error?.message || 'Something went wrong. Please try again later.';

    } finally {
      setLoading(false);
    }
  }

  const post = async (url, body) => {
    setLoading(true);

    try {
        const response = await fetch(`${baseURL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        await response.json();
        
    } catch (error) {
        return error?.message || 'Something went wrong. Please try again later.';
        
    } finally {
        setLoading(false);
    }
  }

  return { loading, get, post };
}

export default useFetch;
