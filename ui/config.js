// Language configurations
const translations = {
    en: {
        characterSelection: "Character Selection",
        addCharacter: "Add Character",
        deleteCharacter: "Delete Character",
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        characterType: "Character Type",
        nationality: "Nationality",
        nickname: "Nickname",
        shortLore: "Short Lore",
        level: "Level",
        playtime: "Playtime",
        cash: "Cash",
        bank: "Bank",
        legal: "Legal",
        illegal: "Illegal",
        neutral: "Neutral",
        cancel: "Cancel",
        create: "Create Character",
        delete: "Delete",
        confirmDelete: "Are you sure you want to delete",
        selectCharacter: "Select a character to view details",
        playCharacter: "Play Character"
    },
    cs: {
        characterSelection: "Výběr postavy",
        addCharacter: "Přidat postavu",
        deleteCharacter: "Smazat postavu",
        firstName: "Jméno",
        lastName: "Příjmení",
        dateOfBirth: "Datum narození",
        characterType: "Typ postavy",
        nationality: "Národnost",
        nickname: "Přezdívka",
        shortLore: "Krátký příběh",
        level: "Úroveň",
        playtime: "Čas hraní",
        cash: "Hotovost",
        bank: "Banka",
        legal: "Legální",
        illegal: "Nelegální",
        neutral: "Neutrální",
        cancel: "Zrušit",
        create: "Vytvořit postavu",
        delete: "Smazat",
        confirmDelete: "Opravdu chcete smazat",
        selectCharacter: "Vyberte postavu pro zobrazení detailů",
        playCharacter: "Hrát za postavu"
    }
};

// Starting money configuration for each character type
const startingMoney = {
    legal: {
        cash: 1000,
        bank: 5000
    },
    illegal: {
        cash: 2500,
        bank: 1000
    },
    neutral: {
        cash: 1500,
        bank: 2500
    }
};

// Starting items configuration for each character type
const startingItems = {
    legal: {
        'phone': 1,
        'water': 2,
        'sandwich': 2,
        'id_card': 1,
        'driving_license': 1
    },
    illegal: {
        'phone': 1,
        'water': 1,
        'lockpick': 2,
        'fake_id': 1,
        'burner_phone': 1
    },
    neutral: {
        'phone': 1,
        'water': 2,
        'sandwich': 1,
        'backpack': 1
    }
};

// Current language setting (can be changed dynamically)
let currentLanguage = 'en';

// Helper functions
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        updateUILanguage();
    }
}

function getText(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

function getStartingMoney(characterType) {
    return startingMoney[characterType] || startingMoney.neutral;
}

function getStartingItems(characterType) {
    return startingItems[characterType] || startingItems.neutral;
}

// Function to update UI with current language
function updateUILanguage() {
    // Update all text elements with their translations
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getText(key);
    });
}

export {
    setLanguage,
    getText,
    getStartingMoney,
    getStartingItems,
    currentLanguage
};
