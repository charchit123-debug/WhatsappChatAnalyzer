document.getElementById('chatForm').onsubmit = function(event) {
    event.preventDefault();
    const chatFile = document.getElementById('chatFile').files[0];
    const formData = new FormData();
    formData.append('chatFile', chatFile);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayTotalMessages(data.total_messages);
        displayTopDays(data.top_days);
        displayTopUsersChart(data.top_users);
        displayMediaMessages(data.media_messages);
        displayTopEmojis(data.top_emojis);
        displayActiveHoursChart(data.active_hours);
        displayActiveDays(data.active_days);
        displayWordCloud(data.wordcloud);
    })
    .catch(error => console.error('Error:', error));
};

function displayTotalMessages(totalMessages) {
    document.getElementById('totalMessages').innerText = `Total Messages: ${totalMessages}`;
}

function displayTopDays(topDays) {
    const topDaysContainer = document.getElementById('topDays');
    topDaysContainer.innerHTML = ''; // Clear previous data
    for (const [date, count] of Object.entries(topDays)) {
        const div = document.createElement('div');
        div.innerText = `${date}: ${count} messages`;
        topDaysContainer.appendChild(div);
    }
}

function displayMediaMessages(mediaMessages) {
    const mediaMessagesContainer = document.getElementById('mediaMessages');
    mediaMessagesContainer.innerHTML = ''; // Clear previous data
    for (const [user, count] of Object.entries(mediaMessages)) {
        const div = document.createElement('div');
        div.innerText = `${user}: ${count} media messages`;
        mediaMessagesContainer.appendChild(div);
    }
}

function displayTopEmojis(topEmojis) {
    const topEmojisContainer = document.getElementById('topEmojis');
    topEmojisContainer.innerHTML = ''; // Clear previous data
    for (const [emoji, count] of Object.entries(topEmojis)) {
        const div = document.createElement('div');
        div.innerText = `${emoji}: ${count} times`;
        topEmojisContainer.appendChild(div);
    }
}

function displayActiveHoursChart(activeHours) {
    const hoursLabels = Object.keys(activeHours);
    const hoursValues = Object.values(activeHours);

    const ctx = document.getElementById('activeHoursChart').getContext('2d');
    const activeHoursChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hoursLabels,
            datasets: [{
                label: 'Active Hours',
                data: hoursValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayActiveDays(activeDays) {
    const activeDaysContainer = document.getElementById('activeDays');
    activeDaysContainer.innerHTML = ''; // Clear previous data
    for (const [day, count] of Object.entries(activeDays)) {
        const div = document.createElement('div');
        div.innerText = `${day}: ${count} messages`;
        activeDaysContainer.appendChild(div);
    }
}

function displayWordCloud(wordcloud) {
    const img = document.createElement('img');
    img.src = `data:image/png;base64,${wordcloud}`;
    img.alt = "Word Cloud";
    img.style.width = '100%'; // Adjust width as necessary
    img.style.height = 'auto'; // Maintain aspect ratio
    const wordCloudContainer = document.getElementById('wordCloud');
    wordCloudContainer.innerHTML = ''; // Clear previous image
    wordCloudContainer.appendChild(img);
}

function displayTopUsersChart(topUsers) {
    const topUsersContainer = document.getElementById('topUsers');
    topUsersContainer.innerHTML = ''; // Clear previous data
    for (const [user, count] of Object.entries(topUsers)) {
        const div = document.createElement('div');
        div.innerText = `${user}: ${count} messages`;
        topUsersContainer.appendChild(div);
    }
}
