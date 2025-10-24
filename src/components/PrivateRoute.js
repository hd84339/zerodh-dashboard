import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (!hasToken) {
      // Ask opener (landing) for token
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage({ type: 'REQUEST_TOKEN' }, 'https://zerodh-frontend.netlify.app');
        }
      } catch (e) {}

      const onMessage = (event) => {
        if (event.origin !== 'https://zerodh-frontend.netlify.app') return;
        const data = event.data || {};
        if (data.type === 'AUTH_TOKEN' && data.token) {
          localStorage.setItem('token', data.token);
          if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
          setHasToken(true);
        }
      };

      window.addEventListener('message', onMessage);

      // Wait up to 2 seconds for token to arrive
      const t = setTimeout(() => {
        window.removeEventListener('message', onMessage);
      }, 2000);

      return () => {
        clearTimeout(t);
        window.removeEventListener('message', onMessage);
      };
    }
  }, [hasToken]);

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
