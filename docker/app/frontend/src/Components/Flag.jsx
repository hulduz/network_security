import React, { useEffect, useState } from 'react';

const Flag = () => {
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Récupérer le token du localStorage
        const response = await fetch('http://localhost:8081/api/flag', {
          headers: { Authorization: token },
        });

        if (!response.ok) {
          const text = await response.json();
          setError(text.message || 'Failed to retrieve the flag');
          return;
        }

        const data = await response.json();
        setFlag(data.flag);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchFlag();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return <div style={{ margin: '2rem auto', textAlign: 'center' }}>{flag ? `The flag is: ${flag}` : 'Loading...'}</div>;
};

export default Flag;
