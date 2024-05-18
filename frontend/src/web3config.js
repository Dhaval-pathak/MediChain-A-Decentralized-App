import Web3 from 'web3';
// const {Web3} = require("web3")
// const Web3 = require("web3")
const initWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      return web3;
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    console.error('No Ethereum provider detected');
  }
};
export { initWeb3 };