import React from 'react';
import ReactDOM from 'react-dom/client';
import APIProvider from "provider/APIProvider";
import Root from "./router/Root";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <APIProvider>
      <Root />
    </APIProvider>
  // </React.StrictMode>
);
