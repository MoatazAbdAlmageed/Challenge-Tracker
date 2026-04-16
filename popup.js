document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const addBtn = document.getElementById('add-btn');
  const listView = document.getElementById('list-view');
  const createView = document.getElementById('create-view');
  const detailView = document.getElementById('detail-view');
  
  const challengesContainer = document.getElementById('challenges-container');
  const saveChallengeBtn = document.getElementById('save-challenge');
  const cancelCreateBtn = document.getElementById('cancel-create');
  const backToListBtn = document.getElementById('back-to-list');
  
  const titleInput = document.getElementById('title-input');
  const categoryInput = document.getElementById('category-input');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  
  const currentTitle = document.getElementById('current-title');
  const currentCategory = document.getElementById('current-category');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const tableContainer = document.getElementById('table-container');
  
  const copySummaryBtn = document.getElementById('copy-summary');
  const shareProgressBtn = document.getElementById('share-progress');
  const resetChallengeBtn = document.getElementById('reset-challenge');
  const deleteChallengeBtn = document.getElementById('delete-challenge');
  const exportDataBtn = document.getElementById('export-data');
  const importDataBtn = document.getElementById('import-data');
  const importInput = document.getElementById('import-input');
  const toast = document.getElementById('toast');

  let challenges = [];
  let currentChallengeId = null;

  // Initialize
  loadChallenges();

  // Navigation
  addBtn.addEventListener('click', () => {
    switchView('create');
  });

  cancelCreateBtn.addEventListener('click', () => {
    switchView('list');
    clearForm();
  });

  backToListBtn.addEventListener('click', () => {
    switchView('list');
  });

  function switchView(viewName) {
    listView.classList.add('hidden');
    createView.classList.add('hidden');
    detailView.classList.add('hidden');

    if (viewName === 'list') {
      listView.classList.remove('hidden');
      renderList();
    } else if (viewName === 'create') {
      createView.classList.remove('hidden');
    } else if (viewName === 'detail') {
      detailView.classList.remove('hidden');
    }
  }

  // Data Persistence
  async function loadChallenges() {
    const data = await chrome.storage.local.get('challenges');
    challenges = data.challenges || [];
    renderList();
    updateBadge();
  }

  async function saveChallenges() {
    await chrome.storage.local.set({ challenges });
    updateBadge();
  }

  function updateBadge() {
    const count = challenges.length;
    chrome.action.setBadgeText({ text: count > 0 ? count.toString() : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#6366f1' });
  }

  // Create Challenge
  saveChallengeBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const startStr = startDateInput.value;
    const endStr = endDateInput.value;

    if (!title || !startStr || !endStr) {
      showToast('Please fill all fields');
      return;
    }

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (end < start) {
      showToast('End date cannot be before start date');
      return;
    }

    const days = [];
    let current = new Date(start);
    while (current <= end) {
      days.push({
        date: current.toISOString().split('T')[0],
        completed: false
      });
      current.setDate(current.getDate() + 1);
    }

    const newChallenge = {
      id: Date.now().toString(),
      title,
      category: categoryInput.value.trim() || 'General',
      startDate: startStr,
      endDate: endStr,
      days: days
    };

    challenges.push(newChallenge);
    saveChallenges();
    clearForm();
    switchView('list');
  });

  function clearForm() {
    titleInput.value = '';
    categoryInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
  }

  // Render List
  function renderList() {
    challengesContainer.innerHTML = '';
    
    if (challenges.length === 0) {
      challengesContainer.innerHTML = `
        <div class="empty-state">
          <p>No challenges yet. Start by creating one!</p>
        </div>
      `;
      return;
    }

    challenges.forEach(c => {
      const completed = c.days.filter(d => d.completed).length;
      const total = c.days.length;
      const percent = total > 0 ? (completed / total) * 100 : 0;
      
      const item = document.createElement('div');
      item.className = 'challenge-item';
      item.innerHTML = `
        <div class="challenge-info">
          <span class="category-badge">${c.category || 'General'}</span>
          <h3>${c.title}</h3>
          <p>${completed}/${total} Days (${Math.round(percent)}%)</p>
          <div class="list-progress-bg">
            <div class="list-progress-fill" style="width: ${percent}%"></div>
          </div>
        </div>
        <div class="chevron">›</div>
      `;
      item.addEventListener('click', () => openChallenge(c.id));
      challengesContainer.appendChild(item);
    });
  }

  // Detail View
  function openChallenge(id) {
    currentChallengeId = id;
    const challenge = challenges.find(c => c.id === id);
    if (!challenge) return;

    currentTitle.textContent = challenge.title;
    currentCategory.textContent = challenge.category || 'General';
    renderTable(challenge);
    updateProgress(challenge);
    switchView('detail');
  }

  function renderTable(challenge) {
    let html = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th style="width: 50px; text-align: center;">Done</th>
          </tr>
        </thead>
        <tbody>
    `;

    challenge.days.forEach((day, index) => {
      const dateObj = new Date(day.date);
      const formattedDate = dateObj.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      html += `
        <tr>
          <td>${formattedDate}</td>
          <td style="text-align: center;">
            <input type="checkbox" data-index="${index}" ${day.completed ? 'checked' : ''}>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    tableContainer.innerHTML = html;

    // Checkbox Listeners
    tableContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        challenge.days[index].completed = e.target.checked;
        saveChallenges();
        updateProgress(challenge);
        
        // Completion Check
        if (challenge.days.every(d => d.completed)) {
          showToast(`🎉 Challenge Complete! Thank you for staying consistent!`);
        }
      });
    });
  }

  function updateProgress(challenge) {
    const completed = challenge.days.filter(d => d.completed).length;
    const total = challenge.days.length;
    const percent = total > 0 ? (completed / total) * 100 : 0;
    
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${completed}/${total} Completed (${Math.round(percent)}%)`;
  }

  // Actions
  function generateShareText(challenge) {
    const completed = challenge.days.filter(d => d.completed).length;
    const total = challenge.days.length;
    const percent = Math.round((completed / total) * 100);
    
    let text = `🔥 I'm crushing my "${challenge.title}" challenge!\n\n`;
    text += `📊 Progress: ${completed}/${total} Days (${percent}%)\n`;
    
    // Show a visual bar in text
    const barSize = 10;
    const filled = Math.round((completed / total) * barSize);
    const empty = barSize - filled;
    text += `[${'■'.repeat(filled)}${'□'.repeat(empty)}]\n\n`;
    
    text += `Sent from Challenge Tracker 🚀`;
    return text;
  }

  shareProgressBtn.addEventListener('click', async () => {
    const challenge = challenges.find(c => c.id === currentChallengeId);
    if (!challenge) return;

    const shareData = {
      title: 'Challenge Tracker Progress',
      text: generateShareText(challenge)
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!');
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard if navigator.share isn't available
      navigator.clipboard.writeText(shareData.text).then(() => {
        showToast('Link & stats copied to clipboard!');
      });
    }
  });

  copySummaryBtn.addEventListener('click', () => {
    const challenge = challenges.find(c => c.id === currentChallengeId);
    if (!challenge) return;

    const completed = challenge.days.filter(d => d.completed).length;
    const total = challenge.days.length;
    let text = `📊 Progress for: ${challenge.title}\n`;
    text += `✅ ${completed}/${total} days completed\n\n`;
    
    challenge.days.forEach(day => {
      const status = day.completed ? '✅' : '⬜';
      const d = new Date(day.date);
      text += `${status} ${d.toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('Detailed summary copied!');
    });
  });

  resetChallengeBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress for this challenge?')) {
      const challenge = challenges.find(c => c.id === currentChallengeId);
      if (challenge) {
        challenge.days.forEach(d => d.completed = false);
        saveChallenges();
        renderTable(challenge);
        updateProgress(challenge);
      }
    }
  });

  deleteChallengeBtn.addEventListener('click', () => {
    if (confirm('Delete this challenge permanently?')) {
      challenges = challenges.filter(c => c.id !== currentChallengeId);
      saveChallenges();
      switchView('list');
    }
  });

  // Export/Import Logic
  exportDataBtn.addEventListener('click', () => {
    if (challenges.length === 0) {
      showToast('No data to export!');
      return;
    }

    const dataStr = JSON.stringify(challenges, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `challenge-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('Challenges exported!');
  });

  importDataBtn.addEventListener('click', () => {
    importInput.click();
  });

  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        
        // Basic validation
        if (!Array.isArray(imported)) throw new Error('Invalid format');
        
        if (confirm(`This will append ${imported.length} challenges to your list. Continue?`)) {
          challenges = [...challenges, ...imported];
          // Simple deduplication by ID just in case
          const seen = new Set();
          challenges = challenges.filter(c => {
            const duplicate = seen.has(c.id);
            seen.add(c.id);
            return !duplicate;
          });
          
          await saveChallenges();
          renderList();
          showToast('Data imported successfully!');
        }
      } catch (err) {
        showToast('Error: Invalid JSON file');
        console.error(err);
      }
      // Reset input
      importInput.value = '';
    };
    reader.readAsText(file);
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});
