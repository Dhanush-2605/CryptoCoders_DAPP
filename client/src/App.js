import React, { useState, useEffect } from "react";
// import CryptoCoder from "./contracts/CryptoCoder.json";
import CryptoCoder from "./contracts/CryptoCoder.json";
import getWeb3 from "./getWeb3";
import Header from "./header";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [mintText, setMintText] = useState("");
  const [coders, setCoders] = useState([]);

  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error) => {
      console.log("Successfully Minted");
      if (!error) {
        setCoders([...coders, mintText]);
        setMintText("");
      }
    });
  };
  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for (let i = 0; i < totalSupply; i++) {
      let coder = await contract.methods.coders(i).call();
      results.push(coder);
    }
    setCoders(results);
  };
  console.log(coders);
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };
  console.log(account);
  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCoder.networks[networkId];
    if (networkData) {
      const abi = CryptoCoder.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  };

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);
  }, []);

  return (
    <div className="container">
      <Header account={account} />

      <div className="wrapper">
        <div className="img">
          <img
            src="https://avatars.dicebear.com/api/pixel-art/naz.svg"
            alt="icon"
            width="72"
          />
        </div>
        <div>
          <h1>Crypto Coders</h1>
        </div>
        <div className="text">
          <p>
            These are some of the most highly motivated coders in the world! We
            are here to learn coding and apply it to the betterment of
            humanity,We are innovators,inventors and creators
          </p>
        </div>
        <div className="form">
          <input
            type="text"
            onChange={(e) => setMintText(e.target.value)}
            placeholder="e.g.Dhanush"
            value={mintText}
          ></input>
          <button onClick={mint}>Mint</button>
        </div>
        <div className="Coders">
          {coders.map((coder, key) => (
            <div key={key} className="Coder">
              <img
                src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`}
                width="100"
              />
              <div>{coder}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default App;
