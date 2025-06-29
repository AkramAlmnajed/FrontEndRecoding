import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AspectDataProvider } from './components/context/AspectsDataContext';
import { MarkerProvider } from './components/context/MarkersContext';
import { UserProvider } from "./components/context/UserProvider";
import './index.css';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <MarkerProvider>
        <AspectDataProvider>
          <App />
        </AspectDataProvider>
      </MarkerProvider>
    </UserProvider>
  </React.StrictMode>
);


reportWebVitals();
