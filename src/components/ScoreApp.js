import React, { useEffect, useState } from 'react';

const ScoreAppWrapper = ({ label }) => {
  const [MFEComponent, setMFEComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMFE = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'http://localhost:3001/remoteEntry.js';
        script.onload = async () => {
          const container = window.mfe_flip7_score;
          if (container) {
            await container.init({});
            const factory = await container.get('./ScoreApp');
            const Component = factory().default;
            setMFEComponent(() => Component);
          } else {
            setError('MFE container not found');
          }
          setLoading(false);
        };
        script.onerror = () => {
          setError('Failed to load MFE');
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        setError('MFE not available');
        setLoading(false);
      }
    };

    loadMFE();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!MFEComponent) return <div>MFE not available</div>;

  return <MFEComponent label={label} />;
};

export default ScoreAppWrapper;