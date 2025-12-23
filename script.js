const form = document.getElementById('signup-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone-number');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function showError(input, message) {
    const errorElement = document.getElementById(input.id + '-error');
    errorElement.textContent = message;
    input.classList.add('error');
    input.classList.remove('valid');
}

function showSuccess(input) {
    const errorElement = document.getElementById(input.id + '-error');
    errorElement.textContent = '';
    input.classList.remove('error');
    input.classList.add('valid');
}

function validateName(input) {
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    } else if (input.value.trim().length < 2) {
        showError(input, 'Must be at least 2 characters');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        return false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email');
        return false;
    } else {
        showSuccess(email);
        return true;
    }
}

function validatePhone() {
    if (phone.value.trim() === '') {
        showSuccess(phone);
        return true;
    }
    const phonePattern = /^[0-9]{10,}$/;
    if (!phonePattern.test(phone.value.replace(/[\s-]/g, ''))) {
        showError(phone, 'Must be at least 10 digits');
        return false;
    } else {
        showSuccess(phone);
        return true;
    }
}

function validatePassword() {
    if (password.value === '') {
        showError(password, 'Password is required');
        return false;
    } else if (password.value.length < 8) {
        showError(password, 'Must be at least 8 characters');
        return false;
    } else {
        showSuccess(password);
        return true;
    }
}

function validateConfirmPassword() {
    if (confirmPassword.value === '') {
        showError(confirmPassword, 'Please confirm password');
        return false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword);
        return true;
    }
}

firstName.addEventListener('blur', () => validateName(firstName));
lastName.addEventListener('blur', () => validateName(lastName));
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);

password.addEventListener('input', () => {
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
            
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isFirstNameValid && isLastNameValid && isEmailValid && 
        isPhoneValid && isPasswordValid && isConfirmValid) {
        alert('Form submitted successfully!');
    }
});