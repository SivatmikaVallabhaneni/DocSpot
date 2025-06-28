import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Placeholder for notification logic (e.g., listen for API responses)
    // Could be enhanced with a global state (e.g., Redux)
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return message ? (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow">
      {message}
    </div>
  ) : null;
};

export default Notification;