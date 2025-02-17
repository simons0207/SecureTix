11# NFT - Ticketing System


![Untitled design](https://github.com/user-attachments/assets/a30bdb92-b62e-48c2-9935-5b1735cf4456)







The project focuses on a token based ticketing system with **Non-Fungible Token** with **ERC721** protocol.<br>
This project introduces a decentralized ticketing platform using blockchain and NFTs to eliminate ticket fraud and duplication. Each ticket is minted as a unique NFT, ensuring authenticity and secure ownership. Users can purchase, store, and transfer tickets through MetaMask, benefiting from blockchain’s transparency and security. The system also supports verified resales and potential integration with digital collectibles.<br>The project utilises following technologies: 

* Solidity
* Javascript
*  Hardhat
*  React.js
*  MetaMask


## Installation

* Install [Node.js](https://nodejs.org/en/)
* Install [Metamask wallet](https://metamask.io/download/)

## Steps

_A guide on how to install the tools needed for running the project._<br>
In Terminal:
1. Clone the repository. Move control to that folder 
2. Install dependencies [One time process]

```bash
npm install
```
3. Test the Blockchain
```
npx hardhat test
```
4. Run the Blockchain 
```
npx hardhat node
```

In New Termainal Tab:

5. Deploy the contract
```
npx hardhat run ./scripts/deploy.js --network localhost
```
6. Start the local host
```
npm run start
```

## MetaMask - Connect
 ##### Step - 1
![1](https://github.com/user-attachments/assets/f56065d5-0371-49d8-97a1-c7ddb273743f) 
<br>

##### Step - 2
![2](https://github.com/user-attachments/assets/5ac63dc4-ada7-4e7d-b140-6a278d670592)
##### Step - 3
![3](https://github.com/user-attachments/assets/0994bd59-25fc-475d-9e51-e0b5125efe7d)
**Network name:** Hardhat<br>
**Default RPC URL:**  Check the node inside terminal. Shows a message Started HTTP and WebSocket JSON-RPC server at http://12..................... before the account start.<br>
**Chain ID:** Look config.js file<br>
**Currency symbol:**  ETH<br>

##### Step - 4
Import private key in hardhat node from terminal for Fake Ethers

## Webpage Preview

![preview](https://github.com/user-attachments/assets/e38a4b14-3085-4e79-af5f-2d46a5042832)

### Seat arrangement 
![](https://github.com/user-attachments/assets/272e60c3-0ea9-4b9f-a2c4-6b43a8391c04)

### Ticket purchese 
![](https://github.com/user-attachments/assets/ee3f109d-7eb7-4187-b672-2f1b13eb394b)
### NFT
![](https://github.com/user-attachments/assets/894e6869-75e6-4ac2-9328-75b71db71f24)
