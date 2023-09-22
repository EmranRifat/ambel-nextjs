import { useState, useEffect } from 'react';

function Toast({ message, type = 'success' }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div className={`toast ${isVisible ? 'visible' : ''} ${type}`}>
      {message}
    </div>
  );
}

export default Toast;