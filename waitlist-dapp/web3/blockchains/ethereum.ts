import Web3 from "web3";

let web3: Web3

if(typeof window !== "undefined"){
    let currentWindow: any = window
    if(typeof currentWindow.ethereum !== "undefined"){
        // We are in the browser and metamask is running.
        currentWindow.ethereum.request({ method: "eth_requestAccounts" })
        web3 = new Web3(currentWindow.ethereum)
    } else {
        // Metamask not installed on the broswer
        const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com')
        web3 = new Web3(provider)
    }
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com')
    web3 = new Web3(provider)
}

export default web3