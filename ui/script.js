// Import configuration
import { getText, getStartingMoney, getStartingItems } from './config.js';

// Character data
const characters = [
    {
        id: 1,
        name: "John Doe",
        level: 25,
        playtime: "156h 23m",
        cash: "$25,430",
        bank: "$125,750"
    },
    {
        id: 2,
        name: "Jane Smith",
        level: 18,
        playtime: "89h 45m",
        cash: "$12,840",
        bank: "$67,230"
    }
];

// DOM Elements
const charactersContainer = document.querySelector('.characters');
const emptyState = document.querySelector('.empty-state');
const infoContent = document.querySelector('.info-content');
const levelElement = document.getElementById('level');
const playtimeElement = document.getElementById('playtime');
const cashElement = document.getElementById('cash');
const bankElement = document.getElementById('bank');
const deleteModal = document.getElementById('deleteModal');
const deleteCharacterBtn = document.getElementById('deleteCharacterBtn');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const deleteCharacterName = document.getElementById('deleteCharacterName');
const addModal = document.getElementById('addModal');
const addCharacterBtn = document.getElementById('addCharacterBtn');
const cancelAddBtn = document.getElementById('cancelAdd');
const addCharacterForm = document.getElementById('addCharacterForm');

let selectedCharacter = null;

// Initialize characters
function initializeCharacters() {
    charactersContainer.innerHTML = ''; // Clear existing characters
    characters.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'character-item';
        charElement.innerHTML = `
            <span>${char.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `;
        charElement.dataset.id = char.id;
        
        charElement.addEventListener('click', () => selectCharacter(char));
        charactersContainer.appendChild(charElement);
    });
}

// Select character
function selectCharacter(character) {
    selectedCharacter = character;
    
    // Update selection visual
    document.querySelectorAll('.character-item').forEach(item => {
        item.classList.remove('selected');
        if (parseInt(item.dataset.id) === character.id) {
            item.classList.add('selected');
        }
    });

    // Update character info
    levelElement.textContent = character.level;
    playtimeElement.textContent = character.playtime;
    cashElement.textContent = character.cash;
    bankElement.textContent = character.bank;

    // Show info panel
    emptyState.style.display = 'none';
    infoContent.style.display = 'flex';
}

// Add character handlers
addCharacterBtn.addEventListener('click', () => {
    addModal.classList.add('active');
});

cancelAddBtn.addEventListener('click', () => {
    addModal.classList.remove('active');
    addCharacterForm.reset();
});

addCharacterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const characterType = document.getElementById('type').value;
    const startingMoney = getStartingMoney(characterType);
    const startingItems = getStartingItems(characterType);
    
    const newCharacter = {
        id: characters.length + 1,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        birthDate: document.getElementById('birthDate').value,
        type: characterType,
        nationality: document.getElementById('nationality').value,
        nickname: document.getElementById('nickname').value,
        lore: document.getElementById('lore').value,
        name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
        level: 1,
        playtime: "0h 0m",
        cash: `$${startingMoney.cash}`,
        bank: `$${startingMoney.bank}`,
        items: startingItems
    };
    
    characters.push(newCharacter);
    initializeCharacters();
    
    // Close modal and reset form
    addModal.classList.remove('active');
    addCharacterForm.reset();
    
    // Select the new character
    selectCharacter(newCharacter);
});

// Delete character handlers
deleteCharacterBtn.addEventListener('click', () => {
    if (!selectedCharacter) {
        // Could add a notification here that no character is selected
        return;
    }
    deleteCharacterName.textContent = selectedCharacter.name;
    deleteModal.classList.add('active');
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.remove('active');
});

confirmDeleteBtn.addEventListener('click', () => {
    if (selectedCharacter) {
        // Remove character from array
        const index = characters.findIndex(char => char.id === selectedCharacter.id);
        if (index > -1) {
            characters.splice(index, 1);
        }
        
        // Reset UI
        selectedCharacter = null;
        emptyState.style.display = 'flex';
        infoContent.style.display = 'none';
        
        // Reinitialize character list
        initializeCharacters();
        
        // Close modal
        deleteModal.classList.remove('active');
    }
});

// Initialize the UI and translations
document.addEventListener('DOMContentLoaded', () => {
    initializeCharacters();
    updateUILanguage();
});
