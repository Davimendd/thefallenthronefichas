let currentCharacterImageData = null;

const habilidadesPorClasse = {
    "Cavaleiros": {
        nome: "🛡️ Postura da Honra",
        desc: "Ao defender um aliado, você assume o golpe em seu lugar.",
        efeito: "Role 1d20 + Vigor",
        tabela: "<li><strong>15+:</strong> reduz dano em 50% e +3 Defesa (por 3 turnos)</li><li><strong>10–14:</strong> recebe dano total, aliado seguro, 3 de defesa (2 turnos)</li><li><strong><10:</strong> ambos recebem metade do dano</li>"
    },
    "Diplomatas": {
        nome: "🗣️ Palavras de Ouro",
        desc: "Você tenta convencer, manipular ou acalmar uma situação.",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Alvo coopera totalmente (Vantagem em testes)</li><li><strong>10–14:</strong> Cooperação parcial (+3 em teste)</li><li><strong><10:</strong> Desconfiança ou piora</li>"
    },
    "Meistres": {
        nome: "📚 Conhecimento Antigo",
        desc: "Acesse saber oculto para resolver problemas.",
        efeito: "Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> Revela fraqueza (+3 em testes) e Poção Maior (2d6 cura)</li><li><strong>10–14:</strong> Pista útil e Poção Menor (1d6 cura)</li><li><strong><10:</strong> Informação errada</li>"
    },
    "Septãos": {
        nome: "✝️ Benção dos Sete",
        desc: "Invoca fé para proteger ou curar.",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Cura Grande (2d6) ou +3 Defesa</li><li><strong>10–14:</strong> Cura Leve (1d6) ou +1 Defesa</li><li><strong><10:</strong> Sem efeito</li>"
    },
    "Guerreiros": {
        nome: "⚔️ Golpe Brutal",
        desc: "Ataque direto com força total.",
        efeito: "Role 1d20 + Força",
        tabela: "<li><strong>15+:</strong> Dano Crítico (3x)</li><li><strong>10–14:</strong> Dano Normal +1 dado</li><li><strong><10:</strong> Ataque falha</li>"
    },
    "Comerciantes": {
        nome: "💰 Acordo Lucrativo",
        desc: "Manipula preços e negociações.",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Desconto grande e +50% lucro</li><li><strong>10–14:</strong> Negociação justa (+25% lucro)</li><li><strong><10:</strong> Prejuízo</li>"
    },
    "Ladinos": {
        nome: " dagger️ Ataque nas Sombras",
        desc: "Golpe furtivo quando não detectado.",
        efeito: "Role 1d20 + Agilidade",
        tabela: "<li><strong>15+:</strong> 5d6 dano + ignora Defesa</li><li><strong>10–14:</strong> 2d6 dano</li><li><strong><10:</strong> Detectado</li>"
    },
    "Patrulheiros": {
        nome: "🌲 Olhos da Floresta",
        desc: "Rastrear ou prever perigos.",
        efeito: "Role 1d20 + Agilidade",
        tabela: "<li><strong>15+:</strong> Evita emboscada e Vantagem Ataque de Longa Distância</li><li><strong>10–14:</strong> Detecta presença ou direção de alvo</li><li><strong><10:</strong> Pista falsa</li>"
    },
    "Ferreiros": {
        nome: "🔨 Arma Reforjada",
        desc: "Melhora equipamentos por 24 horas.",
        efeito: "Role 1d20 + Força ou Intelecto",
        tabela: "<li><strong>15+:</strong> Arma +1 dado de dano ou Armadura +3 Defesa</li><li><strong>10–14:</strong> +3 de dano ou +1 de armadura</li><li><strong><10:</strong> Falha</li>"
    },
    "Mercenários": {
        nome: "🪓 Sem Lealdade",
        desc: "Luta melhor quando há recompensa.",
        efeito: "Role 1d20 + Vigor",
        tabela: "<li><strong>15+:</strong> +5 em Ataque e Defesa em missões (3 turnos)</li><li><strong>10–14:</strong> +3 em Ataque (1 turno)</li><li><strong><10:</strong> Luta normal</li>"
    },
    "Prostitutas": {
        nome: "💃 Sedução Perigosa",
        desc: "Manipula emoções e desejos 1 vez por dia.",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Alvo vulnerável (-5 Defesa ou Segredo ou 2d6 de vida)</li><li><strong>10–14:</strong> Distração (-3 Defesa e 1d6 de vida)</li><li><strong><10:</strong> Resiste</li>"
    },
    "Sacerdotes": {
        nome: "🔥 Chama da Fé",
        desc: "Invoca poder divino (R'hllor).",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Barganha ou Visão (Consultar ADM)</li><li><strong>10–14:</strong> 1d6 dano em área (ou no usuário caso não tiver alvo)</li><li><strong><10:</strong> Falha</li>"
    },
    "Piromantes": {
        nome: "🧪 Fogo Vivo",
        desc: "Cria explosões de fogovivo.",
        efeito: "Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> 4d6 dano em área (Agi reduz metade)</li><li><strong>10–14:</strong> 2d6 dano em 3 alvos</li><li><strong><10:</strong> Instável (Impar: recebe 2d6)</li>"
    },
    "Umbromantes": {
        nome: "🌑 Forma Sombria",
        desc: "Manipula sombras.",
        efeito: "Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> Sombra Assassina (2d10) ou Intangível</li><li><strong>10–14:</strong> Invisível e +3 Defesa</li><li><strong><10:</strong> Falha</li>"
    },
    "Feiticeiras de Asshai": {
        nome: "🔮 Magia Abissal",
        desc: "Poder antigo e proibido.",
        efeito: "Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> Controle Mental ou 3d6 dano</li><li><strong>10–14:</strong> Efeito parcial</li><li><strong><10:</strong> Custo Alto (perde 2d8 Vida)</li>"
    },
    "Magos de Sangue": {
        nome: "🩸 Sacrifício Vital",
        desc: "Usa vida para amplificar magia.",
        efeito: "Perde 1d6 Vida por turno → Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> Todos os alvos sangram (2d6 Vida por turno enquanto manter)</li><li><strong>10–14:</strong> Um alvo perde 2d8 Vida</li><li><strong><10:</strong> Magia falha</li>"
    },
    "Magos de Qarth": {
        nome: "🏜️ Ilusão Arcana",
        desc: "Cria ilusões realistas.",
        efeito: "Role 1d20 + Intelecto",
        tabela: "<li><strong>15+:</strong> 1d10 dano ilusório ou Condição Mental</li><li><strong>10–14:</strong> Confusão (-5 em testes)</li><li><strong><10:</strong> Falha</li>"
    },
    "Homens Sem Rosto": {
        nome: "🎭 Muitas Faces",
        desc: "Assume identidade de outro.",
        efeito: "Role 1d20 + Carisma",
        tabela: "<li><strong>15+:</strong> Disfarce Perfeito e Vantagem em ataques desprevenidos e +3d6 de dano</li><li><strong>10–14:</strong> Convincente mas imperfeito, +5 em ataques desprevenidos</li><li><strong><10:</strong> Identidade suspeita</li>"
    }
};

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

    const selectedTheme = document.getElementById('sheet-theme').value;

    const attr = atributosPorClasse[data.className];

    let vidaBase = (data.origin === "Nobre") ? 16 : 20;
    let defesaBase = (data.origin === "Nobre") ? 12 : 10;

    const vidaTotal = vidaBase + attr.vig;
    const defesaTotal = defesaBase + attr.agi;

    const sheetArea = document.getElementById('character-sheet');

    sheetArea.className = "parchment-sheet " + selectedTheme;

    const buttonsArea = document.getElementById('action-buttons');

    
    
    let photoHTML = currentCharacterImageData 
        ? `<img src="${currentCharacterImageData}" style="width:100%; height:100%; object-fit:cover;">` 
        : `<div style="font-size:3rem; color:#ccc;">👤</div>`;

    const originClass = data.origin === "Nobre" ? "origin-nobre" : "origin-plebeu";
    const hab = habilidadesPorClasse[data.className];

    // ATENÇÃO: O innerHTML começa aqui e só termina lá no final da biografia
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

        <div class="ability-container">
            <div class="ability-header">
                <h3>HABILIDADE DE CLASSE</h3>
                <h4>${hab.nome}</h4>
            </div>
            <p class="ability-desc"><em>${hab.desc}</em></p>
            <p class="ability-roll"><strong>Uso:</strong> ${hab.efeito}</p>
            <ul class="ability-table">
                ${hab.tabela}
            </ul>
        </div>

        <div class="about-section-visual">
            <h3>Biografia</h3>
            <p>${data.about.replace(/\n/g, '<br>')}</p>
        </div>
    `; // O fechamento da string tem que ser aqui!

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

// script.js

async function downloadSheet() {
    const sheet = document.getElementById('character-sheet');
    const charName = document.getElementById('char-name').value || "Ficha";
    const btn = event.currentTarget;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Renderizando...";

    // Opções de Captura
    const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null, // Garante que não force fundo branco ou preto
        logging: false,
        imageTimeout: 0, // Não desiste de carregar as imagens/texturas
        onclone: (clonedDoc) => {
            // Força a ficha clonada a ficar visível e com as dimensões corretas
            const clonedSheet = clonedDoc.getElementById('character-sheet');
            clonedSheet.style.display = "block";
            clonedSheet.style.height = "auto";
        }
    };

    try {
        const canvas = await html2canvas(sheet, options);
        const link = document.createElement('a');
        link.download = `Ficha_${charName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (err) {
        console.error(err);
        alert("Erro ao baixar. Tente usar o Chrome ou Firefox.");
    } finally {
        btn.innerHTML = originalText;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateClasses();
    updateSavedList();
});

// Garante que as classes carreguem assim que abrir o site
document.addEventListener('DOMContentLoaded', updateClasses);