/*
getWindowDimensions() comes from the stack overflow found below. Thank you!
https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
*/


import React from 'react';

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: 100,
    height: 100
  });

  React.useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}