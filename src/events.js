// src/events.js

import web3 from 'web3';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = ['YOUR_ABI'];

let contract;

async function connectToContract() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
    }

    contract = new web3.eth.Contract(contractABI, contractAddress);
}

async function retrieveEvents() {
    await connectToContract();
    return await contract.methods.getAllEvents().call();
}

async function filterFilteredEvents(filter) {
    await connectToContract();
    return await contract.methods.getFilteredEvents(filter).call();
}

async function sortAlphabetically() {
    await connectToContract();
    return await contract.methods.sortAlphabetically().call();
}

async function sortByPriceDesc() {
    await connectToContract();
    return await contract.methods.sortByPriceDesc().call();
}

async function sortByPriceAsc() {
    await connectToContract();
    return await contract.methods.sortByPriceAsc().call();
}

export { retrieveEvents, filterFilteredEvents, sortAlphabetically, sortByPriceDesc, sortByPriceAsc };