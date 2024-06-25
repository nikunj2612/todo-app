import React, { useEffect, useRef } from 'react';

const TableauEmbed = ({ url, options }) => {
  const vizRef = useRef(null);

  useEffect(() => {
    const { tableau } = window;
    console.log('[useEffect] --> ', url, options);
    const initViz = () => {
      if (vizRef.current && !vizRef.current.innerHTML) {
        new tableau.Viz(vizRef.current, url, options);
      }
    };

    initViz();

    return () => {
      if (vizRef.current && vizRef.current.innerHTML) {
        vizRef.current.innerHTML = ''; // Clean up the container
      }
    };
  }, [url, options]);

  return <div ref={vizRef} style={{ width: '100%', height: '600px' }}></div>;
};

export default TableauEmbed;
