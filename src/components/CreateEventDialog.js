// CreateEventDialog.js

import React, { useState } from 'react';

const CreateEventDialog = ({ onSubmit, onClose }) => {
    const [eventName, setName] = useState('');
    const [eventCost, setCost] = useState('');
    const [maxTickets, setMaxTickets] = useState('');
    const [eventDate, setDate] = useState('');
    const [eventTime, setTime] = useState('');
    const [eventLocation, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!eventName || !eventCost || !maxTickets || !eventDate || !eventTime || !eventLocation) {
            alert("Please fill in all fields");
            return;
        }
        if (isNaN(parseInt(maxTickets)) || parseInt(maxTickets) <= 0) {
            alert("Max Tickets must be a positive number");
            return;
        }
        setIsLoading(true);
        onSubmit({
            name: eventName,
            cost: eventCost,
            maxTickets: parseInt(maxTickets),
            date: eventDate,
            time: eventTime,
            location: eventLocation
        }).then(() => {
            setIsLoading(false);
            onClose();
        }).catch(error => {
            setIsLoading(false);
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        });
    };

    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <h2>Create New Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Event Name:
                        <input type="text" value={eventName} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Event Cost (in ETH):
                        <input type="number" step="any" value={eventCost} onChange={(e) => setCost(e.target.value)} required />
                    </label>
                    <label>
                        Max Tickets:
                        <input type="number" value={maxTickets} onChange={(e) => setMaxTickets(e.target.value)} required />
                    </label>
                    <label>
                        Date:
                        <input type="date" value={eventDate} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                    <label>
                        Time:
                        <input type="time" value={eventTime} onChange={(e) => setTime(e.target.value)} required />
                    </label>
                    <label>
                        Location:
                        <input type="text" value={eventLocation} onChange={(e) => setLocation(e.target.value)} required />
                    </label>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Event..." : "Create Event"}
                    </button>
                    <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventDialog;