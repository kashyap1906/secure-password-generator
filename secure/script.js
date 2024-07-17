const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const passwordLengthInput = document.getElementById('password-length');
const generatedPasswordInput = document.getElementById('generated-password');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const asciiLowercase = 'abcdefghijklmnopqrstuvwxyz';
const asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const punctuation = '!@#$%^&*()_+[]{}|;:,.<>?';

function getRandomCharacter(characterSet) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    const randomIndex = randomValues[0] % characterSet.length;
    return characterSet.charAt(randomIndex);
}

function generatePassword() {
    const length = parseInt(passwordLengthInput.value);
    const characterSet = [];
    if (lowercaseCheckbox.checked) characterSet.push(asciiLowercase);
    if (uppercaseCheckbox.checked) characterSet.push(asciiUppercase);
    if (numbersCheckbox.checked) characterSet.push(digits);
    if (symbolsCheckbox.checked) characterSet.push(punctuation);

    if (characterSet.length === 0) {
        alert("Please select at least one character set.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const charSetIndex = Math.floor(Math.random() * characterSet.length);
        const charSet = characterSet[charSetIndex];
        password += getRandomCharacter(charSet);
    }

    generatedPasswordInput.value = password;
    copyBtn.disabled = false;
}

function copyToClipboard() {
    generatedPasswordInput.select();
    document.execCommand("copy");
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);