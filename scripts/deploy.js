require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const PINATA_UPLOAD_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

async function uploadMetadataToPinata(metadata) {
  try {
    const response = await axios.post(PINATA_UPLOAD_URL, metadata, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading metadata:', error);
    return null;
  }
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TM";

  const TokenMaster = await ethers.getContractFactory("TokenMaster");
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`);

  const occasions = [
    { name: "AI Tools and Chatgpt - Workshop", cost: tokens(3), tickets: 0, date: "2025-02-22", time: "18:00", location: "NIT - Calicut, Kerala" },
    { name: "Nrithya - Dance Competion", cost: tokens(1), tickets: 125, date: "2025-06-09", time: "13:00", location: "Jyothi Engineering College - Thrissur, Kerala" },
    { name: "Cyber Privacy Hackathon", cost: tokens(0.25), tickets: 200, date: "2025-06-10", time: "10:00", location: "Christ College - Irinjalkuda, Kerala" },
    { name: "Srishti Exhibition", cost: tokens(5), tickets: 0, date: "2025-06-19", time: "14:30", location: "FISAT - Kochi, Kerala" },
    { name: "Yukthi Exhibition ", cost: tokens(1.5), tickets: 125, date: "2025-06-20", time: "11:00", location: "CUSAT - Kochi, Kerala" },
  ];

  for (let i = 0; i < occasions.length; i++) {
    const metadata = {
      name: `Ticket for ${occasions[i].name}`,
      description: `NFT Ticket for ${occasions[i].name} on ${occasions[i].date} at ${occasions[i].time}, Location: ${occasions[i].location}`,
      attributes: [
        { trait_type: "Event Name", value: occasions[i].name },
        { trait_type: "Event Date", value: occasions[i].date },
        { trait_type: "Event Time", value: occasions[i].time },
        { trait_type: "Location", value: occasions[i].location },
      ],
    };

    const metadataCID = await uploadMetadataToPinata(metadata);
    if (!metadataCID) {
      console.error(`Failed to upload metadata for event: ${occasions[i].name}`);
      continue;
    }
    
    const tokenURI = `https://gateway.pinata.cloud/ipfs/${metadataCID}`;

    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location
    );

    await transaction.wait();
    console.log(`Listed Event ${i + 1}: ${occasions[i].name}, Metadata URL: ${tokenURI}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
