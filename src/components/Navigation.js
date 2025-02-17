// Navigation.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CreateEventDialog from './CreateEventDialog';

const Navigation = ({ account, setAccount, tokenMaster, provider }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

    useEffect(() => {
        console.log('Navigation component rendered');
        console.log('Current account:', account);
    }, [account]);

    const connectHandler = async () => {
        try {
            console.log('Attempting to connect wallet');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0]);
            console.log('Connected account:', account);
            setAccount(account);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    };

    const toggleDropdown = () => {
        console.log('Toggling dropdown');
        setShowDropdown(!showDropdown);
    };

    const handleMyEventClick = () => {
        console.log('My Event clicked');
        // Add logic to navigate to My Event page
        setShowDropdown(false);
    };

    const handleCreateNewEventClick = () => {
        console.log('Create new Event clicked');
        setShowDropdown(false);
        setShowCreateEventDialog(true);
    };

    const handleCreateEventSubmit = async (eventData) => {
        try {
            const signer = await provider.getSigner();
            const transaction = await tokenMaster.connect(signer).list(
                eventData.name,
                ethers.utils.parseEther(eventData.cost.toString()),
                eventData.maxTickets,
                eventData.date,
                eventData.time,
                eventData.location
            );
            await transaction.wait();
            console.log('Event created successfully');
            setShowCreateEventDialog(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <nav>
            <div className='nav__brand'>
                <h1>SecureTix</h1>

                <input className='nav__search' type="text" placeholder='Find millions of experiences' />

                <ul className='nav__links'>
                    <li><a href="/">Concerts</a></li>
                    <li><a href="/">Sports</a></li>
                    <li><a href="/">Arts & Theater</a></li>
                    <li><a href="/">More</a></li>
                </ul>
            </div>

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={toggleDropdown}
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    <span className="dropdown-arrow">▼</span>
                    <ul className={`dropdown-menu ${showDropdown ? 'show-dropdown' : ''}`}>
                        <li onClick={handleMyEventClick}>My Event</li>
                        <li onClick={handleCreateNewEventClick}>Create new Event</li>
                    </ul>
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            {showCreateEventDialog && (
                <CreateEventDialog onSubmit={handleCreateEventSubmit} onClose={() => setShowCreateEventDialog(false)} />
            )}
        </nav>
    );
};

export default Navigation;