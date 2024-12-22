// src/components/PreventNavigation.jsx
import { useEffect } from 'react';

const PreventNavigation = () => {
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event) => {
      // Prevent backspace navigation when no input/textarea is focused
      const isBackspace = event.key === 'Backspace';
      const isArrowLeft = event.key === 'ArrowLeft';
      const isArrowRight = event.key === 'ArrowRight';

      // Block backspace navigation (except when focused on an input/textarea)
      if (isBackspace && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        event.preventDefault(); // Prevent browser from going back
      }

      // Block left and right arrow keys if focused outside of an input/textarea
      if ((isArrowLeft || isArrowRight) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        event.preventDefault(); // Prevent navigation in browser history
      }
    };

    // Add keydown event listener to the window
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // No need to render anything
};

export default PreventNavigation;
