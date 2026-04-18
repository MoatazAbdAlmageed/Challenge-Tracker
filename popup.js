document.addEventListener('DOMContentLoaded', () => {
  // SVG Icon Definitions (Self-contained for CSP compliance)
  const LUCIDE_ICONS = {
    'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>',
    'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>',
    'list': '<line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line>',
    'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>',
    'sun': '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M22 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
    'plus': '<line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line>',
    'arrow-left': '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>',
    'more-vertical': '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
    'edit-2': '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>',
    'trash-2': '<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>',
    'sun-medium': '<circle cx="12" cy="12" r="4"></circle><path d="M12 3v1"></path><path d="M12 20v1"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="m18.364 5.636-.707.707"></path><path d="m6.343 17.657-.707.707"></path><path d="m5.636 5.636.707.707"></path><path d="m17.657 17.657.707.707"></path>'
  };

  const lucide = {
    createIcons: () => {
      document.querySelectorAll('[data-lucide]').forEach(el => {
        const iconName = el.getAttribute('data-lucide');
        const iconPaths = LUCIDE_ICONS[iconName];
        if (iconPaths) {
          el.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${iconName}">${iconPaths}</svg>`;
        }
      });
    }
  };

  // Elements
  const appTitle = document.getElementById('app-title');
  const fabAdd = document.getElementById('fab-add');
  const themeToggle = document.getElementById('theme-toggle');
  const viewToggle = document.getElementById('view-toggle');
  const listView = document.getElementById('list-view');
  const createView = document.getElementById('create-view');
  const detailView = document.getElementById('detail-view');
  const challengesContainer = document.getElementById('challenges-container');
  const saveChallengeBtn = document.getElementById('save-challenge');
  const cancelCreateBtn = document.getElementById('cancel-create');
  const backToListBtn = document.getElementById('back-to-list');
  const titleInput = document.getElementById('title-input');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const categorySelect = document.getElementById('category-select');
  const categoriesView = document.getElementById('categories-view');
  const manageCategoriesBtn = document.getElementById('manage-categories-btn');
  const backFromCategoriesBtn = document.getElementById('back-from-categories');
  const categoriesList = document.getElementById('categories-list');
  const newCategoryInput = document.getElementById('new-category-input');
  const addCategoryBtn = document.getElementById('add-category-btn');
  const filterBar = document.getElementById('filter-bar');
  const currentTitle = document.getElementById('current-title');
  const currentCategory = document.getElementById('current-category');
  const circularFill = document.getElementById('circular-fill');
  const percentageText = document.getElementById('percentage-text');
  const progressText = document.getElementById('progress-text');
  const tableContainer = document.getElementById('table-container');
  const todayView = document.getElementById('today-view');
  const todayTasksContainer = document.getElementById('today-tasks-container');
  const todayTasksBtn = document.getElementById('today-tasks-btn');
  const backFromTodayBtn = document.getElementById('back-from-today');
  const copySummaryBtn = document.getElementById('copy-summary');
  const shareProgressBtn = document.getElementById('share-progress');
  const resetChallengeBtn = document.getElementById('reset-challenge');
  const deleteChallengeBtn = document.getElementById('delete-challenge');
  const editChallengeBtn = document.getElementById('edit-challenge');
  const formTitle = document.getElementById('form-title');
  const exportDataBtn = document.getElementById('export-data');
  const importDataBtn = document.getElementById('import-data');
  const importInput = document.getElementById('import-input');
  const toast = document.getElementById('toast');
  const presetBtns = document.querySelectorAll('.preset-btn');

  let challenges = [];
  let categories = [];
  let currentChallengeId = null;
  let editingId = null;
  let currentFilter = 'All';
  let contextTargetChallenge = null;

  // Navigation
  if (appTitle) {
    appTitle.addEventListener('click', () => switchView('list'));
  }

  function openCreateForm() {
    editingId = null;
    formTitle.textContent = 'New Challenge';
    clearForm();
    switchView('create');
    if (!startDateInput.value) {
      startDateInput.value = new Date().toISOString().split('T')[0];
    }
  }

  if (fabAdd) fabAdd.addEventListener('click', openCreateForm);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      let start = new Date(startDateInput.value || new Date());
      const end = new Date(start);
      if (btn.dataset.days) end.setDate(end.getDate() + parseInt(btn.dataset.days) - 1);
      else if (btn.dataset.months) { end.setMonth(end.getMonth() + parseInt(btn.dataset.months)); end.setDate(end.getDate() - 1); }
      else if (btn.dataset.years) { end.setFullYear(end.getFullYear() + parseInt(btn.dataset.years)); end.setDate(end.getDate() - 1); }
      endDateInput.value = end.toISOString().split('T')[0];
    });
  });

  cancelCreateBtn.addEventListener('click', () => switchView('list'));
  backToListBtn.addEventListener('click', () => switchView('list'));

  function switchView(viewName) {
    [listView, createView, detailView, categoriesView, todayView].forEach(v => v.classList.add('hidden'));
    if (viewName === 'list') {
      listView.classList.remove('hidden');
      renderFilters();
      renderList();
    } else if (viewName === 'create') {
      createView.classList.remove('hidden');
      populateCategorySelect();
    } else if (viewName === 'detail') {
      detailView.classList.remove('hidden');
    } else if (viewName === 'categories') {
      categoriesView.classList.remove('hidden');
      renderCategories();
    } else if (viewName === 'today') {
      todayView.classList.remove('hidden');
      renderTodayTasks();
    }
    lucide.createIcons();
    chrome.storage.local.set({ lastView: viewName });
  }

  todayTasksBtn.addEventListener('click', () => {
    switchView(todayView.classList.contains('hidden') ? 'today' : 'list');
  });

  backFromTodayBtn.addEventListener('click', () => switchView('list'));
  manageCategoriesBtn.addEventListener('click', () => switchView('categories'));
  backFromCategoriesBtn.addEventListener('click', () => switchView('list'));

  // Context Menu Listeners
  const contextMenu = document.getElementById('context-menu');
  
  document.addEventListener('click', (e) => {
    if (contextMenu && !e.target.closest('.more-btn')) {
      contextMenu.classList.add('hidden');
    }
  });

  document.getElementById('ctx-edit')?.addEventListener('click', () => {
    if (contextTargetChallenge) {
      editingId = contextTargetChallenge.id;
      formTitle.textContent = 'Edit Challenge';
      populateCategorySelect();
      titleInput.value = contextTargetChallenge.title;
      categorySelect.value = contextTargetChallenge.category;
      startDateInput.value = contextTargetChallenge.startDate;
      endDateInput.value = contextTargetChallenge.endDate;
      switchView('create');
      contextMenu.classList.add('hidden');
    }
  });

  document.getElementById('ctx-delete')?.addEventListener('click', () => {
    if (contextTargetChallenge && confirm(`Delete "${contextTargetChallenge.title}"?`)) {
      challenges = challenges.filter(x => x.id !== contextTargetChallenge.id);
      saveChallenges().then(() => renderList());
    }
    contextMenu.classList.add('hidden');
  });

  document.getElementById('ctx-copy')?.addEventListener('click', () => {
    if (contextTargetChallenge) {
      copyChallengeSummary(contextTargetChallenge);
      contextMenu.classList.add('hidden');
    }
  });

  // Theme
  async function initTheme() {
    const { theme = 'dark' } = await chrome.storage.local.get('theme');
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
    }
    lucide.createIcons();
  }

  themeToggle.addEventListener('click', async () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    await chrome.storage.local.set({ theme: newTheme });
  });

  // Categories
  async function loadCategories() {
    const { categories: saved } = await chrome.storage.local.get('categories');
    categories = saved || ['Personal', 'Work', 'Fitness', 'Learning', 'Health', 'Hobbies', 'Coding'];
    if (!saved) await chrome.storage.local.set({ categories });
  }

  function renderCategories() {
    categoriesList.innerHTML = '';
    categories.forEach((cat, i) => {
      const tag = document.createElement('div');
      tag.className = 'category-tag';
      tag.innerHTML = `${cat} <span class="remove-tag" style="cursor:pointer; margin-left:5px;">&times;</span>`;
      tag.querySelector('.remove-tag').onclick = () => {
        categories.splice(i, 1);
        chrome.storage.local.set({ categories }).then(() => { renderCategories(); renderFilters(); });
      };
      categoriesList.appendChild(tag);
    });
  }

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = '';
    ['All', ...categories].forEach(opt => {
      const chip = document.createElement('div');
      chip.className = `filter-chip ${currentFilter === opt ? 'active' : ''}`;
      chip.textContent = opt;
      chip.onclick = () => { currentFilter = opt; renderFilters(); renderList(); };
      filterBar.appendChild(chip);
    });
  }

  function populateCategorySelect() {
    categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  addCategoryBtn.onclick = () => {
    const val = newCategoryInput.value.trim();
    if (val && !categories.includes(val)) {
      categories.push(val);
      chrome.storage.local.set({ categories }).then(() => { renderCategories(); newCategoryInput.value = ''; });
    }
  };

  // View Mode
  async function initViewMode() {
    const { viewMode = 'grid' } = await chrome.storage.local.get('viewMode');
    applyViewMode(viewMode);
  }

  function applyViewMode(mode) {
    if (!challengesContainer) return;
    challengesContainer.className = `${mode}-mode`;
    if (viewToggle) {
        viewToggle.innerHTML = `<i data-lucide="${mode === 'grid' ? 'list' : 'layout-grid'}"></i>`;
    }
    lucide.createIcons();
  }

  viewToggle.onclick = async () => {
    const newMode = challengesContainer.classList.contains('grid-mode') ? 'list' : 'grid';
    applyViewMode(newMode);
    await chrome.storage.local.set({ viewMode: newMode });
  };

  // Data
  async function loadChallenges() {
    try {
      const { challenges: saved = [] } = await chrome.storage.local.get('challenges');
      challenges = Array.isArray(saved) ? saved : [];
      console.log('Challenges loaded:', challenges.length); // User relies on this
      updateBadge();
    } catch (e) {
      console.error('Failed to load challenges:', e);
    }
  }

  async function saveChallenges() {
    await chrome.storage.local.set({ challenges });
    updateBadge();
  }

  function updateBadge() {
    const count = challenges.length;
    chrome.action.setBadgeText({ text: count > 0 ? count.toString() : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#4c1d95' });
  }

  // Rendering
  function renderList() {
    if (!challengesContainer) return;
    challengesContainer.innerHTML = '';
    const filtered = currentFilter === 'All' ? challenges : challenges.filter(c => c.category === currentFilter);

    if (filtered.length === 0) {
      challengesContainer.innerHTML = `<div class="empty-state"><p>No challenges yet. Start by creating one!</p></div>`;
      return;
    }

    filtered.forEach(c => {
      try {
        const days = Array.isArray(c.days) ? c.days : [];
        const completed = days.filter(d => d.completed).length;
        const total = days.length;
        const percent = total > 0 ? (completed / total) * 100 : 0;
        
        const item = document.createElement('div');
        item.className = 'challenge-item';
        item.innerHTML = `
          <div class="challenge-icon">${getCategoryIcon(c.category)}</div>
          <div class="challenge-info">
            <div class="challenge-header">
              <div>
                <span class="category-badge">${c.category}</span>
                <h3>${c.title}</h3>
              </div>
              <button class="more-btn"><i data-lucide="more-vertical"></i></button>
            </div>
            <p class="challenge-days-label">${total} Days Challenge</p>
            <div class="gauge-container">
              <div class="mini-gauge">
                <svg viewBox="0 0 40 40">
                  <circle class="mini-gauge-bg" cx="20" cy="20" r="16"></circle>
                  <circle class="mini-gauge-fill ${getGaugeColorClass(percent)}" cx="20" cy="20" r="16" style="stroke-dasharray: 100 100; stroke-dashoffset: ${100 - percent}"></circle>
                </svg>
                <div class="mini-percent">${Math.round(percent)}%</div>
              </div>
              <span class="percent-label">${completed}/${total} Days</span>
            </div>
          </div>
        `;
        item.onclick = (e) => { if (!e.target.closest('button')) openChallenge(c.id); };
        item.querySelector('.more-btn').onclick = (e) => { e.stopPropagation(); showContextMenu(e, c); };
        challengesContainer.appendChild(item);
      } catch (e) { 
        console.error('Error rendering item:', e, c); 
      }
    });
    lucide.createIcons();
  }

  function renderTodayTasks() {
    if (!todayTasksContainer) return;
    todayTasksContainer.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const tasks = challenges.filter(c => (c.days || []).some(d => d.date === today));
    if (!tasks.length) return todayTasksContainer.innerHTML = '<div class="empty-state"><p>No tasks today! ☕</p></div>';

    tasks.forEach(c => {
      const day = c.days.find(d => d.date === today);
      const item = document.createElement('div');
      item.className = 'today-task-item';
      item.innerHTML = `<input type="checkbox" ${day.completed ? 'checked' : ''} class="task-cb" style="margin-right:10px;"><span>${getCategoryIcon(c.category)} ${c.title}</span>`;
      item.querySelector('.task-cb').onchange = (e) => { 
        day.completed = e.target.checked; 
        saveChallenges(); 
        if (day.completed && c.days.every(d => d.completed)) showToast('🎉 Challenge Completed!');
      };
      todayTasksContainer.appendChild(item);
    });
  }

  function getCategoryIcon(cat) {
    const map = { 'Personal': '🎯', 'Work': '💼', 'Fitness': '💪', 'Learning': '📚', 'Health': '🍵', 'Hobbies': '🎨', 'Coding': '💻' };
    return map[cat] || '✨';
  }

  function getGaugeColorClass(p) { return p < 35 ? 'gauge-red' : p < 75 ? 'gauge-yellow' : 'gauge-green'; }

  function openChallenge(id) {
    currentChallengeId = id;
    const c = challenges.find(x => x.id === id);
    if (!c) return;
    currentTitle.textContent = c.title;
    currentCategory.textContent = c.category;
    renderTable(c);
    updateProgress(c);
    switchView('detail');
  }

  function renderTable(c) {
    tableContainer.innerHTML = `<table><thead><tr><th>Date</th><th>Done</th></tr></thead><tbody>` + 
      c.days.map((d, i) => `<tr><td>${new Date(d.date).toLocaleDateString(undefined, {weekday:'short', month:'short', day:'numeric'})}</td><td><input type="checkbox" data-idx="${i}" ${d.completed ? 'checked' : ''} style="width:20px;height:20px;"></td></tr>`).join('') +
      `</tbody></table>`;
    tableContainer.querySelectorAll('input').forEach(cb => cb.onchange = (e) => {
      c.days[e.target.dataset.idx].completed = e.target.checked;
      saveChallenges();
      updateProgress(c);
    });
  }

  function updateProgress(c) {
    const done = c.days.filter(d => d.completed).length, total = c.days.length, p = total ? (done/total)*100 : 0;
    if (circularFill) circularFill.style.strokeDasharray = `${p} 100`;
    if (percentageText) percentageText.textContent = `${Math.round(p)}%`;
    if (progressText) progressText.textContent = `${done}/${total} Completed`;
  }

  // Savings
  saveChallengeBtn.onclick = () => {
    const title = titleInput.value.trim(), startS = startDateInput.value, endS = endDateInput.value;
    if (!title || !startS || !endS) return showToast('Please fill all fields');
    
    const start = new Date(startS);
    const end = new Date(endS);
    if (end < start) return showToast('End date must be after start date');

    const days = [];
    let cur = new Date(startS);
    while (cur <= end) { days.push({ date: cur.toISOString().split('T')[0], completed: false }); cur.setDate(cur.getDate() + 1); }

    if (editingId) {
      const idx = challenges.findIndex(x => x.id === editingId);
      if (idx !== -1) {
          // Preserve completed status if date matches
          const oldDays = challenges[idx].days;
          days.forEach(d => {
              const old = oldDays.find(od => od.date === d.date);
              if (old) d.completed = old.completed;
          });
          challenges[idx] = { ...challenges[idx], title, category: categorySelect.value, startDate: startS, endDate: endS, days };
      }
    } else {
      challenges.push({ id: Date.now().toString(), title, category: categorySelect.value, startDate: startS, endDate: endS, days });
    }
    saveChallenges().then(() => switchView('list'));
  };

  function clearForm() { titleInput.value = ''; startDateInput.value = ''; endDateInput.value = ''; presetBtns.forEach(b => b.classList.remove('active')); }

  function showToast(msg) { 
      toast.textContent = msg; 
      toast.classList.remove('hidden'); 
      setTimeout(() => toast.classList.add('hidden'), 2000); 
  }

  function showContextMenu(e, c) {
    contextTargetChallenge = c;
    const menu = document.getElementById('context-menu');
    if (!menu) return;
    
    menu.classList.remove('hidden');
    
    // Position menu near the button
    const rect = e.target.closest('.more-btn').getBoundingClientRect();
    const menuWidth = 160; 
    
    let left = rect.left - menuWidth + rect.width;
    let top = rect.bottom + 5;
    
    // Boundary checks
    if (left < 10) left = 10;
    if (top + 150 > window.innerHeight) top = rect.top - 140;

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    
    lucide.createIcons();
  }

  function copyChallengeSummary(c) {
    const done = c.days.filter(d => d.completed).length;
    const total = c.days.length;
    const text = `📊 Progress for: ${c.title}\n✅ ${done}/${total} days completed\n\nSent from Challenge Tracker 🚀`;
    navigator.clipboard.writeText(text).then(() => showToast('Summary copied!'));
  }

  // Backup
  exportDataBtn.onclick = () => {
    const blob = new Blob([JSON.stringify(challenges, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'challenges-backup.json'; a.click();
    URL.revokeObjectURL(url);
  };

  importDataBtn.onclick = () => importInput.click();
  importInput.onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (re) => { 
        try {
            const data = JSON.parse(re.target.result);
            if (Array.isArray(data)) {
                challenges = data;
                saveChallenges().then(() => renderList());
                showToast('Imported successfully!');
            }
        } catch (err) { showToast('Invalid file format'); }
    };
    reader.readAsText(e.target.files[0]);
  };

  // Final Init Step
  async function fullInit() {
    await loadCategories();
    await loadChallenges();
    await initTheme();
    await initViewMode();
    
    const { lastView = 'list' } = await chrome.storage.local.get('lastView');
    switchView(lastView);
  }
  fullInit();
});
