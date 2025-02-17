// src/pages/dashboard.js
import { events } from '../events';
import { events } from '../events';

function loadEvents() {
    events.retrieveEvents().then(events => {
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = "";
        
        events.forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.className = "event-item";
            eventElement.innerHTML = `
                <h3>${event.eventName}</h3>
                <p>Event Type: ${event.eventType}</p>
                <p>Date: ${event.date}</p>
                <p>Time: ${event.startTime} - ${event.endTime}</p>
                <p>Location: ${event.location}</p>
                <p>Ticket Price: ${event.ticketPrice} ETH</p>
            `;
            eventList.appendChild(eventElement);
        });
    }).catch(error => console.error("Failed to retrieve events:", error));
}

function filterEvents() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const eventList = document.getElementById('eventList');

    // Implement filtering logic based on searchInput.value
    // For example, if searchInput.value is not empty, filter events by eventName
    if (searchInput.value.trim()) {
        // Filter events based on search input
        eventList.innerHTML = '';
        events.filterFilteredEvents(searchInput.value).forEach(event => {
            // Render filtered event
        });
    }

    // Reset filter if sortSelect changes
    sortSelect.addEventListener('change', () => {
        resetFilters();
    });
}

function sortEvents() {
    const sortSelect = document.getElementById('sortSelect');
    const eventList = document.getElementById('eventList');

    // Implement sorting logic based on sortSelect.value
    switch(sortSelect.value) {
        case 'alphabetical':
            eventList.innerHTML = '';
            events.sortAlphabetically().forEach(event => {
                // Render sorted event
            });
            break;
        case 'priceHighLow':
            eventList.innerHTML = '';
            events.sortByPriceDesc().forEach(event => {
                // Render sorted event
            });
            break;
        case 'priceLowHigh':
            eventList.innerHTML = '';
            events.sortByPriceAsc().forEach(event => {
                // Render sorted event
            });
            break;
        default:
            resetFilters();
    }
}

function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const eventList = document.getElementById('eventList');

    // Reset filters and render all events
    eventList.innerHTML = '';
    events.retrieveEvents().then(events => {
        events.forEach(event => {
            // Render event
        });
    }).catch(error => console.error("Failed to retrieve events:", error));
}

export { loadEvents, filterEvents, sortEvents };