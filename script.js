let currentCharacterImageData = null;

const atributosPorClasse = {
    "Cavaleiros": { for: 4, agi: 2, vig: 3, int: 0, car: 1 },
    "Diplomatas": { for: 0, agi: 1, vig: 1, int: 4, car: 4 },
    "Meistres": { for: 0, agi: 1, vig: 1, int: 5, car: 3 },
    "Septãos": { for: 0, agi: 1, vig: 2, int: 3, car: 4 },
    "Guerreiros": { for: 3, agi: 3, vig: 3, int: 1, car: 0 },
    "Comerciantes": { for: 0, agi: 2, vig: 1, int: 3, car: 4 },
    "Ladinos": { for: 1, agi: 4, vig: 1, int: 2, car: 2 },
    "Patrulheiros": { for: 2, agi: 3, vig: 3, int: 2, car: 0 },
    "Ferreiros": { for: 4, agi: 1, vig: 4, int: 1, car: 0 },
    "Mercenários": { for: 3, agi: 2, vig: 3, int: 2, car: 0 },
    "Prostitutas": { for: 0, agi: 3, vig: 1, int: 2, car: 4 },
    "Sacerdotes": { for: 1, agi: 1, vig: 2, int: 3, car: 3 },
    "Piromantes": { for: 0, agi: 2, vig: 1, int: 5, car: 2 },
    "Umbromantes": { for: 0, agi: 3, vig: 1, int: 4, car: 2 },
    "Feiticeiras de Asshai": { for: 0, agi: 2, vig: 2, int: 4, car: 2 },
    "Magos de Sangue": { for: 1, agi: 1, vig: 4, int: 4, car: 0 },
    "Magos de Qarth": { for: 0, agi: 1, vig: 1, int: 4, car: 4 },
    "Homens Sem Rosto": { for: 2, agi: 4, vig: 1, int: 3, car: 0 }
};

const classesPorOrigem = {
    "Nobre": [
        "Cavaleiros", 
        "Diplomatas", 
        "Meistres", 
        "Septãos", 
        "Guerreiros", 
        "Comerciantes"
    ],
    "Plebeu": [
        "Ladinos", 
        "Patrulheiros", 
        "Ferreiros", 
        "Mercenários", 
        "Guerreiros", 
        "Prostitutas", 
        "Sacerdotes",
        "Piromantes",
        "Umbromantes",
        "Feiticeiras de Asshai",
        "Magos de Sangue",
        "Magos de Qarth",
        "Homens Sem Rosto"
    ]
};

function updateClasses() {
    const originSelect = document.getElementById('origin');
    const classSelect = document.getElementById('char-class');
    
    if(!originSelect || !classSelect) return;

    const origin = originSelect.value;
    classSelect.innerHTML = "";

    classesPorOrigem[origin].forEach(classe => {
        let option = document.createElement('option');
        option.value = classe;
        option.textContent = classe;
        classSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', updateClasses);

function previewImage(input) {
    const file = input.files[0];
    const fileNamePreview = document.getElementById('file-name-preview');

    if (file) {
        fileNamePreview.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            currentCharacterImageData = e.target.result;
            console.log("Imagem carregada com sucesso.");
        }
        reader.readAsDataURL(file);
    }
}



// FUNÇÃO PRINCIPAL: Gerar a Ficha
function generateSheet() {

    const data = {
        name: document.getElementById('char-name').value || "Um Estranho",
        house: document.getElementById('house').value,
        origin: document.getElementById('origin').value,
        className: document.getElementById('char-class').value,
        age: document.getElementById('age').value || "??",
        gender: document.getElementById('gender').value || "Não informado",
        height: document.getElementById('height').value || "??",
        about: document.getElementById('about').value || "..."
    };

    const attr = atributosPorClasse[data.className];

    let vidaBase = (data.origin === "Nobre") ? 16 : 20;
    let defesaBase = (data.origin === "Nobre") ? 12 : 10;

    const vidaTotal = vidaBase + attr.vig;
    const defesaTotal = defesaBase + attr.agi;

    const sheetArea = document.getElementById('character-sheet');
    const buttonsArea = document.getElementById('action-buttons');
    let photoHTML = currentCharacterImageData 
        ? `<img src="${currentCharacterImageData}" style="width:100%; height:100%; object-fit:cover;">` 
        : `<div style="font-size:3rem; color:#ccc;">👤</div>`;

    const originClass = data.origin === "Nobre" ? "origin-nobre" : "origin-plebeu";

    sheetArea.innerHTML = `
        <div class="sheet-header-container">
            <div class="char-photo-frame">${photoHTML}</div>
            <div class="sheet-header-visual-with-photo">
                <h1>${data.name}</h1>
                <p class="subtitle">${data.house}</p>
                <span class="origin-badge ${originClass}">${data.origin}</span>
            </div>
        </div>
        
        <div class="status-row">
            <div class="status-item life">
                <span>PONTOS DE VIDA</span>
                <strong>${vidaTotal}</strong>
            </div>
            <div class="status-item defense">
                <span>DEFESA</span>
                <strong>${defesaTotal}</strong>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-item"><strong>Classe:</strong> ${data.className}</div>
            <div class="info-item"><strong>Idade:</strong> ${data.age}</div>
            <div class="info-item"><strong>Gênero:</strong> ${data.gender}</div>
            <div class="info-item"><strong>Altura:</strong> ${data.height}</div>
        </div>

        <div class="attributes-container">
            <h3>Atributos</h3>
            <div class="attr-grid">
                <div class="attr-box"><span>FOR</span><strong>${attr.for}</strong></div>
                <div class="attr-box"><span>AGI</span><strong>${attr.agi}</strong></div>
                <div class="attr-box"><span>VIG</span><strong>${attr.vig}</strong></div>
                <div class="attr-box"><span>INT</span><strong>${attr.int}</strong></div>
                <div class="attr-box"><span>CAR</span><strong>${attr.car}</strong></div>
            </div>
        </div>

        <div class="about-section-visual">
            <h3>Biografia</h3>
            <p>${data.about.replace(/\n/g, '<br>')}</p>
        </div>
    `;

    sheetArea.classList.remove('hidden');
    if(buttonsArea) buttonsArea.classList.remove('hidden');
    sheetArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let currentSheetId = null; 

// FUNÇÃO: Salva a ficha atual na lista de fichas
function saveToLocalStorage() {
    const name = document.getElementById('char-name').value || "Sem Nome";
    
    const sheetData = {
        id: currentSheetId || Date.now(), 
        name: name,
        house: document.getElementById('house').value,
        origin: document.getElementById('origin').value,
        className: document.getElementById('char-class').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        about: document.getElementById('about').value,
        image: currentCharacterImageData
    };

    let allSheets = JSON.parse(localStorage.getItem('fallenThrone_all_sheets')) || [];

    
    const existingIndex = allSheets.findIndex(s => s.id === sheetData.id);
    if (existingIndex !== -1) {
        allSheets[existingIndex] = sheetData;
    } else {
        allSheets.push(sheetData);
    }

    currentSheetId = sheetData.id; 
    localStorage.setItem('fallenThrone_all_sheets', JSON.stringify(allSheets));
    
    updateSavedList(); 
    alert(`Ficha de ${name} salva!`);
}

function updateSavedList() {
    const list = document.getElementById('saved-sheets-list');
    const allSheets = JSON.parse(localStorage.getItem('fallenThrone_all_sheets')) || [];
    
    list.innerHTML = '<option value="">-- Criar Nova Ficha --</option>';
    
    allSheets.forEach(sheet => {
        const option = document.createElement('option');
        option.value = sheet.id;
        option.textContent = sheet.name;
        if (sheet.id === currentSheetId) option.selected = true;
        list.appendChild(option);
    });
}

function loadSpecificSheet() {
    const id = document.getElementById('saved-sheets-list').value;
    if (!id) {
        createNewSheet();
        return;
    }

    const allSheets = JSON.parse(localStorage.getItem('fallenThrone_all_sheets')) || [];
    const sheet = allSheets.find(s => s.id == id);

    if (sheet) {
        currentSheetId = sheet.id;
        document.getElementById('char-name').value = sheet.name;
        document.getElementById('house').value = sheet.house;
        document.getElementById('origin').value = sheet.origin;
        
        updateClasses(); 
        document.getElementById('char-class').value = sheet.className;
        
        document.getElementById('age').value = sheet.age;
        document.getElementById('gender').value = sheet.gender;
        document.getElementById('height').value = sheet.height;
        document.getElementById('about').value = sheet.about;
        currentCharacterImageData = sheet.image;
        
        generateSheet(); 
    }
}

function createNewSheet() {
    currentSheetId = null;
    document.getElementById('sheet-form').reset();
    document.getElementById('file-name-preview').textContent = "Nenhum arquivo selecionado";
    currentCharacterImageData = null;
    document.getElementById('character-sheet').classList.add('hidden');
    updateClasses();
}

function clearSavedData() {
    if (!currentSheetId) return alert("Nenhuma ficha selecionada para apagar.");

    if (confirm("Deseja apagar permanentemente esta ficha?")) {
        let allSheets = JSON.parse(localStorage.getItem('fallenThrone_all_sheets')) || [];
        allSheets = allSheets.filter(s => s.id !== currentSheetId);
        localStorage.setItem('fallenThrone_all_sheets', JSON.stringify(allSheets));
        createNewSheet();
        updateSavedList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateClasses();
    updateSavedList();
});

// Garante que as classes carreguem assim que abrir o site
document.addEventListener('DOMContentLoaded', updateClasses);