let streaks = [];

document.getElementById('addStreak').addEventListener('click', showAddStreakForm);
document.getElementById('submitStreak').addEventListener('click', addStreak);
document.getElementById('closeForm').addEventListener('click', hideAddStreakForm);
document.getElementById('closeViewStreak').addEventListener('click', hideViewStreakModal);

function showAddStreakForm() {
    document.getElementById('addStreakForm').style.display = 'block';
}

function hideAddStreakForm() {
    document.getElementById('addStreakForm').style.display = 'none';
}

function addStreak() {
    const name = document.getElementById('streakName').value;
    const image = document.getElementById('streakImage').value;
    const date = document.getElementById('streakDate').value;

    if (name && image && date) {
        streaks.push({ name, image, date });
        updateStreakList();
        hideAddStreakForm();
        showMessage('Streak added successfully!');
    } else {
        showMessage('Please fill in all fields!');
    }
}

function updateStreakList() {
    const streakList = document.getElementById('streakList');
    streakList.innerHTML = '';

    if (streaks.length === 0) {
        streakList.innerHTML = '<p>No activities added yet</p>';
    } else {
        streaks.forEach((streak, index) => {
            const streakItem = document.createElement('div');
            streakItem.className = 'streak-item';
            streakItem.innerHTML = `
                <img src="${streak.image}" alt="${streak.name}">
                <div class="streak-details">
                    <h3>${streak.name}</h3>
                    <p>Started: ${streak.date}</p>
                    <button onclick="viewStreak(${index})">View</button>
                    <button onclick="deleteStreak(${index})">Delete</button>
                </div>
            `;
            streakList.appendChild(streakItem);
        });
    }
}

function viewStreak(index) {
    const streak = streaks[index];
    const days = calculateDays(streak.date);
    
    document.getElementById('viewStreakName').textContent = streak.name;
    document.getElementById('viewStreakDays').textContent = `Streak: ${days} days`;
    document.getElementById('viewStreakModal').style.display = 'block';
}

function hideViewStreakModal() {
    document.getElementById('viewStreakModal').style.display = 'none';
}

function deleteStreak(index) {
    streaks.splice(index, 1);
    updateStreakList();
    showMessage('Streak deleted successfully!');
}

function calculateDays(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function showMessage(msg) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = msg;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

updateStreakList();

