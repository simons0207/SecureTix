// App.js

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Modify from './components/Modify';
import SeatChart from './components/SeatChart';

// ABIs
import TokenMaster from './abis/TokenMaster.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [filteredOccasions, setFilteredOccasions] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);

    const totalOccasions = await tokenMaster.totalOccasions();
    const occasions = [];

    for (let i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      occasions.push(occasion);
    }

    setOccasions(occasions);
    setFilteredOccasions(occasions); // Initialize with all occasions

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  // 🔍 Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    if (query === '') {
      setFilteredOccasions(occasions);
    } else {
      const filtered = occasions.filter((occasion) =>
        occasion.name.toLowerCase().startsWith(query)
      );
      setFilteredOccasions(filtered);
    }
  };

  return (
    <div>
      <header>
        <Navigation
          account={account}
          setAccount={setAccount}
          tokenMaster={tokenMaster}
          provider={provider}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />

        <h2 className="header__title">
          <strong>Event</strong> Tickets
        </h2>
      </header>

      {/* ✅ Now using filteredOccasions instead of full occasions */}
      <Modify
        occasions={filteredOccasions}
        toggle={toggle}
        setToggle={setToggle}
        setOccasion={setOccasion}
      />

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}

export default App;
