document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in, otherwise redirect to welcome page
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = 'welcome.html';
        return; // Stop execution if not logged in
    }

    // DOM Elements
    const banEndDateElement = document.getElementById('ban-end-date');
    const timeRemainingElement = document.getElementById('time-remaining');
    const banLieButton = document.getElementById('ban-lie');
    const banChoresButton = document.getElementById('ban-chores');
    const banAttitudeButton = document.getElementById('ban-attitude');
    const banManualButton = document.getElementById('ban-manual');
    const manualBanSection = document.getElementById('manual-ban-section');
    const manualBanDaysInput = document.getElementById('manual-ban-days');
    const applyManualBanButton = document.getElementById('apply-manual-ban');
    const banHistoryList = document.getElementById('ban-history-list');
    const logoutButton = document.getElementById('logout-button'); // New logout button

    // Constants for localStorage keys
    const BAN_END_DATE_KEY = 'gameBanEndDate';
    const BAN_HISTORY_KEY = 'gameBanHistory';

    let banEndDate = null; // Stores the Date object of the ban end
    let banHistory = []; // Stores an array of ban objects

    // --- Helper Functions ---

    /**
     * Loads ban data from localStorage.
     */
    function loadBanData() {
        const storedEndDate = localStorage.getItem(BAN_END_DATE_KEY);
        if (storedEndDate) {
            banEndDate = new Date(storedEndDate);
        } else {
            banEndDate = null;
        }

        const storedHistory = localStorage.getItem(BAN_HISTORY_KEY);
        if (storedHistory) {
            banHistory = JSON.parse(storedHistory);
        } else {
            banHistory = [];
        }
    }

    /**
     * Saves ban data to localStorage.
     */
    function saveBanData() {
        localStorage.setItem(BAN_END_DATE_KEY, banEndDate ? banEndDate.toISOString() : '');
        localStorage.setItem(BAN_HISTORY_KEY, JSON.stringify(banHistory));
    }

    /**
     * Updates the display of the current ban status and time remaining.
     */
    function updateBanStatusDisplay() {
        const now = new Date();

        if (banEndDate && banEndDate > now) {
            // Active ban
            const timeDiff = banEndDate.getTime() - now.getTime();
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            banEndDateElement.textContent = `Banned until: ${banEndDate.toLocaleString()}`;
            timeRemainingElement.textContent = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            // No active ban or ban expired
            banEndDateElement.textContent = 'No active ban.';
            timeRemainingElement.textContent = '';
            banEndDate = null; // Clear expired ban
            saveBanData(); // Save cleared ban status
        }
    }

    /**
     * Adds a new ban duration to the current ban end date.
     * @param {number} days - Number of days to add to the ban.
     * @param {string} reason - The reason for the ban.
     */
    function addBan(days, reason) {
        const now = new Date();
        let currentBanEnd = banEndDate || now; // If no active ban, start from now

        // Ensure the new ban extends from the current ban end date, or from now if current ban is in the past
        if (currentBanEnd < now) {
            currentBanEnd = now;
        }

        const newBanEnd = new Date(currentBanEnd.getTime() + days * 24 * 60 * 60 * 1000);
        banEndDate = newBanEnd;

        // Add to history
        banHistory.push({
            date: now.toISOString(),
            reason: reason,
            durationDays: days,
            newEndDate: newBanEnd.toISOString()
        });

        saveBanData();
        updateBanStatusDisplay();
        renderBanHistory();
    }

    /**
     * Renders the ban history list.
     */
    function renderBanHistory() {
        banHistoryList.innerHTML = ''; // Clear existing list
        if (banHistory.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No ban history yet.';
            banHistoryList.appendChild(listItem);
            return;
        }

        // Sort history by date, newest first
        const sortedHistory = [...banHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedHistory.forEach(ban => {
            const listItem = document.createElement('li');
            const banDate = new Date(ban.date).toLocaleDateString();
            const banReason = ban.reason;
            const banDuration = ban.durationDays;

            listItem.innerHTML = `
                <span class="date">${banDate}</span>
                <span class="reason">${banReason} (${banDuration} days)</span>
            `;
            banHistoryList.appendChild(listItem);
        });
    }

    // --- Event Listeners ---
    banLieButton.addEventListener('click', () => addBan(banLieButton.dataset.days, 'Lying'));
    banChoresButton.addEventListener('click', () => addBan(banChoresButton.dataset.days, 'Not doing chores'));
    banAttitudeButton.addEventListener('click', () => addBan(banAttitudeButton.dataset.days, 'Bad attitude'));

    banManualButton.addEventListener('click', () => {
        manualBanSection.style.display = manualBanSection.style.display === 'none' ? 'block' : 'none';
        manualBanDaysInput.value = ''; // Clear input when toggling
    });

    applyManualBanButton.addEventListener('click', () => {
        const days = parseInt(manualBanDaysInput.value, 10);
        if (isNaN(days) || days <= 0) {
            console.error('Invalid number of days for manual ban.'); // Keep this console.error for dev purposes
            return;
        }
        addBan(days, 'Manual ban');
        manualBanSection.style.display = 'none'; // Hide manual section after applying
    });

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser'); // Clear logged-in state
        window.location.href = 'welcome.html'; // Redirect to welcome page
    });

    // --- Initial Load and Interval for Status Update ---
    loadBanData();
    updateBanStatusDisplay();
    renderBanHistory();

    // Update ban status every second
    setInterval(updateBanStatusDisplay, 1000);
});
