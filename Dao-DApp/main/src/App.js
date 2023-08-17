import React, { useState, useEffect } from 'react';
import Dao from "./contracts/Dao.json";
import './App.css';
import Web3 from "web3";
import { act } from 'react-dom/test-utils';
import Icon from './Icon';
import { icons } from 'lucide-react';

function App() {
  const [state,setState] = useState({
    web3: null,
    contract: null
  });

  const [balance,setBalance] = useState(null);
  const [accounts,setAccount] = useState([]); 

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    async function initializeWeb3() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedId = Dao.networks[networkId];
      const contract = new web3.eth.Contract(
        Dao.abi, deployedId.address
      );
      setState({ web3: web3, contract: contract });
      console.log(contract);
    }
    provider && initializeWeb3();
  }, []);

  // console.log(state);
  async function getAccounts(){  
    const {web3}=state;  
    const accounts=await web3.eth.getAccounts();
    // const account=accounts.map;
    // console.log(accounts);
    setAccount(accounts)
  } 
  
  // useEffect(()=>{
  //   const {contract}= state;
  //   async function readContract(){
  //   const value =await contract.methods.getterstate().call();
  //   // console.log(value);
  //   setBalance(value)
  //   }
  //   contract && readContract();
    
  // },[state]);
  
  // async function writeContract(){
  //   const {contract}= state;
  //   const data= document.querySelector("#data").value;
  //   await contract.methods.setterstate(data)
  //   .send({from:"0x77df420555d68D5280c3A6D472C13c9713EA0B72"});
  // }

  return(
    <div className="App">
      <button onClick={getAccounts}>Get Account</button>
      {/* <button onClick={readContract}>Value</button> */}
      
      <p>These are the accounts: 
        <Icon name="Home" />;
        {accounts.map((account)=>{
          return <li key={account}>{account}</li>;
        })}
      </p>

      {/* <br></br>
      <p>This is Value: {data}</p>                                                                        
      <input type="text" id="data"></input>
      <br></br>
      <button onClick={writeContract}>Set Value</button>    */}
    </div>
  );
}

export default App;
