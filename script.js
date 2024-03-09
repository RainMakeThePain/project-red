// script.js
// Get the IP address and location of the user
fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const ipDisplay = document.getElementById('ip-display');
        ipDisplay.textContent = `Your IP Address: ${data.ip} (${data.city}, ${data.region_name}, ${data.country_name})`;
    })
    .catch(error => {
        console.error('Error retrieving IP and location:', error);
    });

// Display the countdown timer
const countdownElement = document.getElementById('countdown');
const targetDate = moment().add(48, 'hours');

const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
};

const setCookie = (name, value, expirationDays) => {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const storedCountdownDate = getCookieValue('countdownDate');
const countdownDate = storedCountdownDate ? moment(storedCountdownDate) : targetDate;

const updateCountdown = () => {
    const currentDate = moment();
    const diffDuration = moment.duration(countdownDate.diff(currentDate));
    const formattedTime = `${diffDuration.days()}d ${diffDuration.hours()}h ${diffDuration.minutes()}m ${diffDuration.seconds()}s`;
    countdownElement.textContent = `Time remaining: ${formattedTime}`;

    if (diffDuration.asMilliseconds() <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'Time's up!';
    } else {
        setCookie('countdownDate', countdownDate.toISOString(), 2); // Store the countdown date in a cookie for 2 days
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
