// import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import titleContractABI from './titleContractABI.json';
import Web3 from 'web3';
import axios from 'axios';

const TITLE_CONTRACT = `${process.env.REACT_APP_TITLE_CONTRACT}`

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: `${process.env.REACT_APP_INFURA_KEY}`
    }
  }
};

const web3modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions // required
});

/** @return connecting to web3 via modal */
async function connectWeb3() {
  try {
    const connection = await web3modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    return connection
  } catch(err) {
    console.error(err)
    return false
  }
  
}

/** @return if browser is running MetaMask. */
function getMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

/** @return whether MetaMask connected successfuly. */
async function connectMetamask() {
  try {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (err) {
    console.error(err);
    return false;
  }
}

/** @return the first `userAddress` from the list of connected addresses. */
async function getUserAddress() {
  try{
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || "";
  } catch(err) {
    console.error(err);
    return false;
  }
}

async function getNextTokenID() {
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  try {
    const nextTokenID = await contract.methods.nextTokenId().call();
    return nextTokenID;
  } catch (err) {
    console.log(err);
    return false
  }
}

async function getAllTitles() {
  // @ts-ignore
  const walletAddr = await getUserAddress();
  if(!walletAddr){
    alert('select wallet address!');
    return [];
  }
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  try {
    const titleIds = await contract.methods.getAllTitlesList().call();
    
    if (titleIds) {
      let titles = [];
      for(let i=0; i <= titleIds.length-1; i++){
        let titleId = Number(titleIds[i]);
        // let vehicleId = await contract.methods.getTitle(titleId).call();
        let title = await contract.methods.getVehicleURI(titleId).call();
        titles.push(title);
      }
      console.log(titles)
      return titles;
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

async function mintTitle(
  vehicleCID: String, 
  dealerID: Number,
  lenderID: Number, 
  sellerID: Number, 
  dmvID: Number, 
  holds_number: Number
  ) {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  const walletAddr = await getUserAddress();
  if( !walletAddr ) {
    alert('Pleaes confirm wallet address!');
    return;
  }

  try {
    return await contract.methods.mintTitle(walletAddr, vehicleCID, dealerID, lenderID, sellerID, dmvID, holds_number).send({
      from: walletAddr
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

async function getTitleDetail(titleId: number) {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  const walletAddr = await getUserAddress();

  try {
    return await contract.methods.getTitle(titleId).call();
  } catch (err) {
    console.log(err)
    return false
  }
}

async function getVehicleDetail(titleId: number) {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  const walletAddr = await getUserAddress();

  try {
    let vehicleId = await contract.methods.getTitle(titleId-1).call();
    return await contract.methods.getVehicleURI(vehicleId[1]).call();
  } catch (err) {
    console.log(err)
    return false
  }
}

async function getHoldsStatus(title_id: number, holds_number: number) {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  
  try {
    let holds_status: any = [];
    for(let i = 0; i < holds_number; i++) {
      const status = await contract.methods.getHoldsStatus(title_id, i).call();
      holds_status.push({
        status: status[0],
        updateAt: status[1]
      });
    }
    return holds_status;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function updateHoldsStatus(title_id: number, holds_status_id: number, newStatus: boolean) {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(titleContractABI, TITLE_CONTRACT);
  const walletAddr = await getUserAddress();
  if( !walletAddr ) {
    alert('Pleaes confirm wallet address!');
    return;
  }

  try {
    return await contract.methods.updateTitleStatus(title_id, holds_status_id, newStatus).send({
      from: walletAddr
    });
  } catch (err) {
    console.log('an error while updateing holds status', err);
    return false;
  }
}

export { 
  connectWeb3, 
  getUserAddress, 
  getMetaMaskInstalled, 
  connectMetamask,
  mintTitle,
  getAllTitles,
  getTitleDetail,
  getVehicleDetail,
  getNextTokenID,
  getHoldsStatus,
  updateHoldsStatus
};
