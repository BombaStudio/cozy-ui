import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS Dosyaları
import './theme.css'; // Renk değişkenleri
import './style.css'; // Tailwind direktifleri (@tailwind base vb.)

const rootElement = document.getElementById('root');
// ... geri kalanı aynı
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);