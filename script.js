// It's good practice to ensure the DOM is fully loaded before running scripts that manipulate it
document.addEventListener('DOMContentLoaded', function() {
    const ipDisplay = document.getElementById('ip-display');

    function getIPAddress() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org?format=json', true); // Added 'true' for asynchronous
        xhr.onload = function () {
            if (xhr.status === 200) {
                const ipData = JSON.parse(xhr.responseText);
                const ip = ipData.ip;
                getLocationFromIP(ip);
            } else {
                ipDisplay.textContent = 'Unable to retrieve IP address';
            }
        };
        xhr.onerror = function () {
            ipDisplay.textContent = 'An error occurred while retrieving IP address';
        };
        xhr.send();
    }

    function getLocationFromIP(ip) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://ipapi.co/${ip}/json/`, true); // Added 'true' for asynchronous
        xhr.onload = function () {
            if (xhr.status === 200) {
                const locationData = JSON.parse(xhr.responseText);
                const city = locationData.city;
                const region = locationData.region;
                const country = locationData.country_name;
                ipDisplay.textContent = `Your IP Address: ${ip} (${city}, ${region}, ${country})`;
            } else {
                ipDisplay.textContent = `Your IP Address: ${ip} (Unable to retrieve location)`;
            }
        };
        xhr.onerror = function () {
            ipDisplay.textContent = `Your IP Address: ${ip} (An error occurred while retrieving location)`;
        };
        xhr.send();
    }

    getIPAddress();
});
