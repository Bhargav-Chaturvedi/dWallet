import { useState,useEffect } from "react";
import "./Main.css";

function Accounts({web3,setAddress}) {
  const [provider,setProvider]=useState(null);
  const [balance,setBalance]=useState("0");
  const [account,setAccount]=useState("none");

  useEffect(()=>{
    async function allAccounts(){
      try{
        const select= document.querySelector("#selectNumber");
        setProvider("Ganache");
        const options= await web3.eth.getAccounts();
        for(let i=0;i<options.length;i++){
          let opt=options[i];
          let element=document.createElement("option");
          element.textContent=opt;
          element.value=opt;
          select.appendChild(element);
        }
      }catch{
        setProvider("Not connected");
      }
    }
    web3 && allAccounts();
  },[web3])
  async function selectAccount(){
    let selectedAccount=document.querySelector("#selectNumber").value;
    if(selectedAccount && selectedAccount!="Select an account"){
      setAddress(selectedAccount);
      const accountBalance= await web3.eth.getBalance(selectedAccount);
      const etherBalance=web3.utils.fromWei(accountBalance,"ether");
      setBalance(etherBalance);
      setAccount(selectedAccount);
    }
  }
  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
        <option>Select an account</option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance} ether</span>
      <br></br>
      <span className="provider">Provider: {provider}</span>
    </>
  );
}

export default Accounts;
