import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
