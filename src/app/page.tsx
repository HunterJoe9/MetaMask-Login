"use client"
import ethers from "ethers";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Home() {
  const [account, setAccount] = useState<String>("")
  const [balance, setBalance] = useState<Number>()

  const connect = async() => {
    if(window.ethereum !== 'undefined'){
      try{

        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(res[0]);
        
        const getBalance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [res[0].toString(), 'latest'],
        })
        setBalance(Number(getBalance));
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" border-red-600 border-2 p-2" onClick={connect}>
      {account ? (
        // 연결된 경우, 지갑 주소 표시
        <div>
          <p>Connected Account: {account.substring(0,6) + ' ... ' + account.slice(-4)}</p>
          {/* <p>Balance: {balance !== undefined ? balance.toString() + ' ETH' : '0 ETH'}</p> */}
        </div>
      ) : (
        // 연결되지 않은 경우, "Connect Wallet" 버튼 표시
        <div className="" onClick={connect}>
          Connect Wallet
        </div>
      )}
      </div>
    </div>
  )
}
