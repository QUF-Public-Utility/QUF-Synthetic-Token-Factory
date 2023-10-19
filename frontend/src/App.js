import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    setWeb3(web3);

    // Load Contract
    const networkId = await web3.eth.net.getId();
    const networkData = SyntheticTokenFactory.networks[networkId];
    if(networkData) {
      const abi = SyntheticTokenFactory.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
    } else {
      window.alert('SyntheticTokenFactory contract not deployed to detected network.');
    }
  };

  return (
    <div className="App">
      <h1>Synthetic Token Factory</h1>
      <p>Your account: {account}</p>
      {/* Add your frontend logic here */}
    </div>
  );
}

export default App;
