// It's good practice to ensure the DOM is fully loaded before running scripts that manipulate it
document.addEventListener('DOMContentLoaded', function() {
    const ipDisplay = document.getElementById('ip-display');
    const countdownDisplay = document.getElementById('countdown');
    const timerDisplay = document.getElementById('timer');

function getLocationFromIP(ip) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://ipapi.co/${ip}/json/`, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const locationData = JSON.parse(xhr.responseText);
            const city = locationData.city;
            const county = locationData.district || locationData.region; // Use district or region as county
            const country = locationData.country_name;

            // Check if the county information is available
            if (county) {
                ipDisplay.textContent = `Your IP: ${ip} in ${city}\nYou under the legal jurisdiction of ${county} Police Department`;
            } else {
                ipDisplay.textContent = `Your IP: ${ip} which is in ${city}, ${country}`;
            }
        } else {
            ipDisplay.textContent = `Your IP Address: ${ip}`;
        }
    };
    xhr.onerror = function() {
        ipDisplay.textContent = `Your IP Address: ${ip}`;
    };
    xhr.send();
}

    function getLocationFromIP(ip) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://ipapi.co/${ip}/json/`, true);
        xhr.onload = function() {
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
        xhr.onerror = function() {
            ipDisplay.textContent = `Your IP Address: ${ip} (An error occurred while retrieving location)`;
        };
        xhr.send();
    }

    getIPAddress();

    // 48-hour countdown timer
    const countdownDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    let countdownStartTime;

    // Check if there's a stored countdown start time in cookies
    const storedCountdownStartTime = getCookie('countdownStartTime');
    if (storedCountdownStartTime) {
        countdownStartTime = new Date(storedCountdownStartTime);
    } else {
        // If no stored countdown start time, start a new countdown
        countdownStartTime = new Date();
        setCookie('countdownStartTime', countdownStartTime.toString(), 2); // Store countdown start time in a cookie for 2 days
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - countdownStartTime.getTime();
        const remainingTime = countdownDuration - timeDifference;

        if (remainingTime <= 0) {
            timerDisplay.textContent = "Time's up!";
            clearInterval(timerInterval);
        } else {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            const milliseconds = Math.floor(remainingTime % 1000);
            timerDisplay.textContent = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
        }
    }

    const timerInterval = setInterval(updateTimer, 1); // Update timer every millisecond

    // Helper functions for setting and getting cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
