document.addEventListener('DOMContentLoaded', () => {
    let localConfig = {};
    let allPlayers = [];
    let activeTab = 'players';

    const tabContainer = document.getElementById('tab-content-container');
    const tabButtons = document.querySelectorAll('.tab-button');
    const saveMainButton = document.getElementById('save-main-button');

    const render = () => {
        tabContainer.innerHTML = '';
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === activeTab);
        });

        switch (activeTab) {
            case 'players':
                renderPlayersTab();
                break;
            case 'special':
                renderConfigTab('specialTasks', 'Добавить новое спец. задание');
                break;
            case 'upgrades':
                renderConfigTab('upgrades', 'Добавить новое улучшение');
                break;
            case 'tasks':
                renderConfigTab('tasks', 'Добавить новое ежедневное задание');
                break;
            case 'boosts':
                renderConfigTab('boosts', 'Добавить новый буст');
                break;
        }
        addEventListeners();
    };

    const createLocalizedInput = (section, index, field, value) => `
        <div class="space-y-1">
            <div class="flex items-center">
                <span class="bg-gray-500 p-2 rounded-l-md text-xs font-bold">EN</span>
                <input type="text" data-section="${section}" data-index="${index}" data-field="${field}.en" value="${escapeHtml(value.en)}" class="w-full bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <button data-section="${section}" data-index="${index}" data-field-type="${field}" class="translate-btn bg-blue-600 p-2 rounded-r-md">🈂️</button>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <input type="text" data-section="${section}" data-index="${index}" data-field="${field}.ua" value="${escapeHtml(value.ua)}" placeholder="UA" class="w-full bg-gray-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <input type="text" data-section="${section}" data-index="${index}" data-field="${field}.ru" value="${escapeHtml(value.ru)}" placeholder="RU" class="w-full bg-gray-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            </div>
        </div>`;

    const createLocalizedTextarea = (section, index, field, value) => `
        <div class="space-y-1">
            <div class="flex items-stretch">
                <span class="bg-gray-500 p-2 rounded-l-md text-xs font-bold flex items-center">EN</span>
                <textarea data-section="${section}" data-index="${index}" data-field="${field}.en" class="w-full bg-gray-600 p-2 text-white h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">${escapeHtml(value.en)}</textarea>
                <button data-section="${section}" data-index="${index}" data-field-type="${field}" class="translate-btn bg-blue-600 p-2 rounded-r-md flex items-center">🈂️</button>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <textarea data-section="${section}" data-index="${index}" data-field="${field}.ua" placeholder="UA" class="w-full bg-gray-600 p-2 rounded text-white h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">${escapeHtml(value.ua)}</textarea>
                <textarea data-section="${section}" data-index="${index}" data-field="${field}.ru" placeholder="RU" class="w-full bg-gray-600 p-2 rounded text-white h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">${escapeHtml(value.ru)}</textarea>
            </div>`;
    
    const createInput = (section, index, field, type = 'text') => 
        `<input type="${type}" data-section="${section}" data-index="${index}" data-field="${field}" value="${escapeHtml(localConfig[section][index][field])}" class="w-full bg-gray-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">`;

    const createSelect = (section, index, field, options) => {
        const value = localConfig[section][index][field];
        return `<select data-section="${section}" data-index="${index}" data-field="${field}" class="w-full bg-gray-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            ${options.map(opt => `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`).join('')}
        </select>`;
    }
    
    const renderPlayersTab = (filteredPlayers) => {
        const playersToRender = filteredPlayers || allPlayers;
        const searchInput = `
            <div class="mb-4">
                <input type="text" id="player-search" placeholder="Поиск по ID или имени..." class="w-full max-w-md bg-gray-700 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>`;
        
        const tableHeader = `
            <thead class="bg-gray-700">
                <tr>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">ID</th>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">Имя</th>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">Монеты</th>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">Звезды</th>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">Рефералы</th>
                    <th class="p-3 text-left text-sm font-semibold text-gray-300">Язык</th>
                </tr>
            </thead>`;

        const tableBody = `
            <tbody id="players-table-body">
                ${playersToRender.map(player => `
                    <tr class="border-b border-gray-700">
                        <td class="p-3 text-sm font-mono text-gray-400">${player.id}</td>
                        <td class="p-3 text-sm">${escapeHtml(player.name)}</td>
                        <td class="p-3 text-sm">${Number(player.balance).toLocaleString()}</td>
                        <td class="p-3 text-sm">${Number(player.stars).toLocaleString()}</td>
                        <td class="p-3 text-sm">${Number(player.referrals).toLocaleString()}</td>
                        <td class="p-3 text-sm uppercase">${player.language}</td>
                    </tr>
                `).join('')}
            </tbody>`;
        
        tabContainer.innerHTML = `
            ${searchInput}
            <div class="overflow-x-auto max-h-[70vh] overflow-y-auto rounded-lg">
                <table class="w-full min-w-max">${tableHeader}${tableBody}</table>
            </div>
        `;
    };

    const renderConfigTab = (sectionKey, addButtonText) => {
        const items = localConfig[sectionKey] || [];
        const headersMap = {
            upgrades: ['Название', 'Прибыль/час', 'Цена', 'Категория', 'Иконка', 'ID', 'Действия'],
            tasks: ['Название', 'Награда (монеты)', 'Награда (звезды)', 'Тапы', 'ID', 'Действия'],
            boosts: ['Название', 'Описание', 'Цена (звезды)', 'Иконка', 'ID', 'Действия'],
            specialTasks: ['Название', 'Описание', 'Тип', 'URL', 'Награда', 'Цена (звезды)', 'ID', 'Действия']
        };

        const tableHeader = `
            <thead class="bg-gray-700">
                <tr>
                    ${headersMap[sectionKey].map(h => `<th class="p-3 text-left text-sm font-semibold text-gray-300">${h}</th>`).join('')}
                </tr>
            </thead>`;

        const tableBody = `
            <tbody>
                ${items.map((item, index) => {
                    let cells = '';
                    switch(sectionKey) {
                        case 'upgrades':
                            cells = `
                                <td>${createLocalizedInput(sectionKey, index, 'name', item.name)}</td>
                                <td>${createInput(sectionKey, index, 'profitPerHour', 'number')}</td>
                                <td>${createInput(sectionKey, index, 'price', 'number')}</td>
                                <td>${createSelect(sectionKey, index, 'category', [{value:'Documents', label:'Documents'}, {value:'Legal', label:'Legal'}, {value:'Lifestyle', label:'Lifestyle'}, {value:'Special', label:'Special'}])}</td>
                                <td>${createInput(sectionKey, index, 'icon')}</td>
                            `;
                            break;
                        case 'tasks':
                             cells = `
                                <td>${createLocalizedInput(sectionKey, index, 'name', item.name)}</td>
                                <td>${createInput(sectionKey, index, 'rewardCoins', 'number')}</td>
                                <td>${createInput(sectionKey, index, 'rewardStars', 'number')}</td>
                                <td>${createInput(sectionKey, index, 'requiredTaps', 'number')}</td>
                            `;
                            break;
                        case 'boosts':
                             cells = `
                                <td>${createLocalizedInput(sectionKey, index, 'name', item.name)}</td>
                                <td>${createLocalizedTextarea(sectionKey, index, 'description', item.description)}</td>
                                <td>${createInput(sectionKey, index, 'cost', 'number')}</td>
                                <td>${createInput(sectionKey, index, 'icon')}</td>
                            `;
                            break;
                        case 'specialTasks':
                             cells = `
                                <td>${createLocalizedInput(sectionKey, index, 'name', item.name)}</td>
                                <td>${createLocalizedTextarea(sectionKey, index, 'description', item.description)}</td>
                                <td>${createSelect(sectionKey, index, 'type', [{value:'telegram_join', label:'Join Telegram'}, {value:'social_follow', label:'Follow Social'}, {value:'video_watch', label:'Watch Video'}])}</td>
                                <td>${createInput(sectionKey, index, 'url')}</td>
                                <td>${createInput(sectionKey, index, 'rewardCoins', 'number')} + ${createInput(sectionKey, index, 'rewardStars', 'number')} ⭐</td>
                                <td>${createInput(sectionKey, index, 'priceStars', 'number')}</td>
                            `;
                            break;
                    }
                    return `<tr class="border-b border-gray-700 align-top">
                        ${cells}
                        <td class="p-3 font-mono text-gray-400 text-xs">${item.id}</td>
                        <td class="p-3"><button data-section="${sectionKey}" data-index="${index}" class="delete-btn text-red-500 hover:text-red-400 font-bold">Удалить</button></td>
                    </tr>`;
                }).join('')}
            </tbody>`;
        
        tabContainer.innerHTML = `
            <div class="overflow-x-auto max-h-[70vh] overflow-y-auto rounded-lg">
                <table class="w-full min-w-max table-fixed">${tableHeader}${tableBody}</table>
            </div>
            <button data-section="${sectionKey}" class="add-new-btn w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg">
                ${addButtonText}
            </button>
        `;
    };

    const handleFieldChange = (e) => {
        const { section, index, field } = e.target.dataset;
        const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        const keys = field.split('.');
        if (keys.length > 1) {
            localConfig[section][index][keys[0]][keys[1]] = value;
        } else {
            localConfig[section][index][field] = value;
        }
    };
    
    const handleTranslate = async (e) => {
        const button = e.target.closest('button');
        button.disabled = true; button.textContent = '...';
        const { section, index, fieldType } = button.dataset;
        const textObject = localConfig[section][index][fieldType];
        const fromLang = (Object.keys(textObject)).find(lang => textObject[lang]?.length > 0) || 'en';
        const sourceText = textObject[fromLang];
        
        if (!sourceText) {
            alert('Введите текст для перевода.');
            button.disabled = false; button.textContent = '🈂️';
            return;
        }

        for (const toLang of ['en', 'ua', 'ru'].filter(l => l !== fromLang)) {
             try {
                const response = await fetch('/admin/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: sourceText, from: fromLang, to: toLang }),
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                localConfig[section][index][fieldType][toLang] = data.translatedText;
            } catch (error) {
                console.error(`Error translating to ${toLang}:`, error);
                alert(`Ошибка перевода на ${toLang}.`);
            }
        }
        render();
    };
    
    const saveChanges = async () => {
        saveMainButton.disabled = true; saveMainButton.textContent = 'Сохранение...';
        try {
            const response = await fetch('/admin/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config: localConfig }),
            });
            if (!response.ok) throw new Error('Failed to save config');
            alert('Конфигурация успешно сохранена!');
        } catch (error) {
            console.error(error); alert('Ошибка сохранения.');
        } finally {
            saveMainButton.disabled = false; saveMainButton.textContent = 'Сохранить все изменения';
        }
    };
    
    const addNewItem = (e) => {
        const section = e.target.dataset.section;
        const id = `${section.slice(0, 4)}_${Date.now()}`;
        const base = { id, name: { en: '', ua: '', ru: '' } };
        let newItem = {};
        switch (section) {
            case 'upgrades': newItem = { ...base, price: 0, profitPerHour: 0, category: 'Documents', icon: '🆕' }; break;
            case 'tasks': newItem = { ...base, rewardCoins: 0, rewardStars: 0, requiredTaps: 0 }; break;
            case 'boosts': newItem = { ...base, description: { en: '', ua: '', ru: '' }, cost: 0, icon: '🆕' }; break;
            case 'specialTasks': newItem = { ...base, description: { en: '', ua: '', ru: '' }, type: 'telegram_join', url: 'https://t.me/', rewardCoins: 0, rewardStars: 0, priceStars: 0, isOneTime: true }; break;
        }
        localConfig[section].unshift(newItem);
        render();
    };
    
    const deleteItem = (e) => {
        const { section, index } = e.target.dataset;
        if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
            localConfig[section].splice(index, 1);
            render();
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allPlayers.filter(p => 
            p.id.toLowerCase().includes(searchTerm) || 
            p.name.toLowerCase().includes(searchTerm)
        );
        renderPlayersTab(filtered);
    };

    const addEventListeners = () => {
        tabContainer.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', handleFieldChange);
        });
        tabContainer.querySelectorAll('.translate-btn').forEach(btn => btn.addEventListener('click', handleTranslate));
        tabContainer.querySelectorAll('.add-new-btn').forEach(btn => btn.addEventListener('click', addNewItem));
        tabContainer.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', deleteItem));
        const searchInput = document.getElementById('player-search');
        if (searchInput) searchInput.addEventListener('input', handleSearch);
    };

    const fetchPlayers = async () => {
        try {
            const response = await fetch('/admin/api/players');
            if (!response.ok) throw new Error('Could not fetch players');
            allPlayers = await response.json();
        } catch (error) {
            console.error('Player fetch error:', error);
            alert('Не удалось загрузить список игроков.');
        }
    };

    const init = async () => {
        try {
            const configResponse = await fetch('/admin/api/config');
            if (!configResponse.ok) {
                 if (configResponse.status === 401) window.location.href = '/admin/login.html';
                 throw new Error('Could not fetch config');
            }
            localConfig = await configResponse.json();
            
            await fetchPlayers();
            render();
        } catch (error) {
            console.error('Initialization error:', error);
            tabContainer.innerHTML = `<p class="text-red-500">Ошибка загрузки. Попробуйте обновить страницу.</p>`;
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeTab = button.dataset.tab;
            render();
        });
    });
    
    saveMainButton.addEventListener('click', saveChanges);
    
    const escapeHtml = (unsafe) => {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    init();
});