// App.jsx
import { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account,setAccount] = useState(null);

   function setAddress(address){
    setAccount(address);
   }
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3("http://127.0.0.1:7545");
        setWeb3(web3);
      } catch (error) {
        alert("Failed to load web3 or connect to Ganache.");
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        <Accounts web3={web3} setAddress={setAddress} />
      </div>
      <div>
        <SendEther web3={web3} account={account}/>
      </div>
    </div>
  );
}

export default App;
