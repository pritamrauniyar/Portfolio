import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import analytics from './utils/analytics';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Stream Core Web Vitals (CLS, FID, FCP, LCP, TTFB) directly into GA4 telemetry
reportWebVitals((metric) => analytics.trackWebVitals(metric));

