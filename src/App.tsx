import React from "react";
import "./assets/styles/global.css";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <AuthProvider>
      <ReactNotification />
      <Routes />
    </AuthProvider>
  );
}

export default App;
