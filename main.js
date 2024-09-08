// Store default language
let currentLanguage = 'eng';

// Add event listener for dropdown click
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();

        // Get selected language from the data attribute
        let selectedLanguage = this.getAttribute('data-lang');

        // Change the text in the language dropdown to the selected language
        if (selectedLanguage === 'eng') {
            currentLanguage = 'eng';
            document.getElementById('current-language').textContent = 'Eng';
            changeLanguageToEnglish();
        } else if (selectedLanguage === 'esp') {
            currentLanguage = 'esp';
            document.getElementById('current-language').textContent = 'Español';
            changeLanguageToSpanish();
        } else if (selectedLanguage === 'fra') {
            currentLanguage = 'fra';
            document.getElementById('current-language').textContent = 'Français';
            changeLanguageToFrench();
        }
    });
});

// Function to change content to English
function changeLanguageToEnglish() {
    document.querySelector('h1').textContent = 'Hi,';
    document.querySelector('.headz').innerHTML = 'I am <span>Kelechi Eze</span>';
    document.querySelector('p').textContent = 'Product and Visual Interface designer at Irede Foundation/Ally Hub. Specialist in UI/UX and product development & responsive web design.';
}

// Function to change content to Spanish
function changeLanguageToSpanish() {
    document.querySelector('h1').textContent = 'Hola,';
    document.querySelector('.headz').innerHTML = 'Soy <span>Kelechi Eze</span>';
    document.querySelector('p').textContent = 'Diseñador de producto e interfaz visual en Irede Foundation/Ally Hub. Especialista en UI/UX y desarrollo de productos & diseño web responsivo.';
}

// Function to change content to French
function changeLanguageToFrench() {
    document.querySelector('h1').textContent = 'Bonjour,';
    document.querySelector('.headz').innerHTML = 'Je suis <span>Kelechi Eze</span>';
    document.querySelector('p').textContent = 'Concepteur de produits et d\'interfaces visuelles à Irede Foundation/Ally Hub. Spécialiste en UI/UX et développement de produits & conception web réactive.';
}