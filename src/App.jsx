import './App.css';
import Conversation from './Conversation';
import { Header } from './Header';


import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import { MsalProvider } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

export default function App() {
  
  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <Header />
        <Conversation />
      </div>
    </MsalProvider>
  );
}

