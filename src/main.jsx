import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./index.css";
import "@fontsource/playfair-display";
import "@fontsource/poppins";
import "@fontsource/inter";
import { Toaster } from "react-hot-toast";

//redux
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    <Toaster position="top-right" />
  </Provider>
);

