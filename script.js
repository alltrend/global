// Define time zones with their UTC offsets
const timeZones = {
    'newyork': { name: 'America/New_York', offset: -5 },
    'london': { name: 'Europe/London', offset: 0 },
    'tokyo': { name: 'Asia/Tokyo', offset: 9 },
    'sydney': { name: 'Australia/Sydney', offset: 11 },
    'dubai': { name: 'Asia/Dubai', offset: 4 },
    'singapore': { name: 'Asia/Singapore', offset: 8 },
    'losangeles': { name: 'America/Los_Angeles', offset: -8 },
    'hongkong': { name: 'Asia/Hong_Kong', offset: 8 }
};

// Function to format time with leading zeros
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to get time for specific timezone
function getTimeInTimeZone(tzName) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const tzTime = new Date(utc + 3600000 * timeZones[tzName].offset);
    return tzTime;
}

// Function to update all clocks
function updateClocks() {
    // Update world clocks
    for (const [key, tz] of Object.entries(timeZones)) {
        const time = getTimeInTimeZone(key);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        
        const clockElement = document.getElementById(`clock-${key}`);
        if (clockElement) {
            clockElement.textContent = formatTime(hours, minutes, seconds);
        }
    }
    
    // Update local time
    const now = new Date();
    const localHours = now.getHours();
    const localMinutes = now.getMinutes();
    const localSeconds = now.getSeconds();
    
    const localTimeElement = document.getElementById('local-time');
    const localDateElement = document.getElementById('local-date');
    
    if (localTimeElement) {
        localTimeElement.textContent = formatTime(localHours, localMinutes, localSeconds);
    }
    
    if (localDateElement) {
        localDateElement.textContent = formatDate(now);
    }
}

// Update clocks immediately and then every second
updateClock();
setInterval(updateClocks, 1000);

// Add some console logging for debugging
console.log('Digital Clock loaded successfully!');
console.log('Updating time zones:', Object.keys(timeZones));