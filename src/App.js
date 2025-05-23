import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import whitelist from "./whitelist";

function App() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  useEffect(() => {
    if (account) {
      const isWhitelisted = whitelist.includes(account.toLowerCase());
      setStatus(isWhitelisted ? "whitelisted" : "not whitelisted");
    }
  }, [account]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>NFT Whitelist Checker</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>
          {status === "whitelisted"
            ? "✅ You are whitelisted!"
            : "❌ You are NOT whitelisted."}
        </p>
      )}
    </div>
  );
}

export default App;
