import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const {ethereum}=window;
  const[address,setAddress]=useState('Connect Wallet');

  const requestAccount=async ()=>{
    await ethereum.request({method:'eth_requestAccounts',
      params:[{
        eth_account:{}
      }]
    });
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          onClick={requestAccount}
        >
          {address}
        </a>
      </header>
    </div>
  );
}

export default App;
