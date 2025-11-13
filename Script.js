document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeBtn = document.querySelector('.close-btn');
    const regForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');

    // --- Modal Interactivity ---
    loginBtn.onclick = () => {
        loginModal.style.display = "flex";
    }

    closeBtn.onclick = () => {
        loginModal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    }

    // --- Form Tab Switching (Used by HTML buttons) ---
    window.showForm = (formId, buttonElement) => {
        document.querySelectorAll('.form-container').forEach(container => {
            container.style.display = 'none';
        });
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(formId).style.display = 'block';
        buttonElement.classList.add('active');
    }

    // --- Helper for Validation ---
    const setError = (input, message) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
        input.classList.toggle('invalid', !!message);
    };

    // --- Feature 2: Validation Logic ---
    const validateRegistration = (e) => {
        let isValid = true;
        
        const fullname = document.getElementById('reg-fullname');
        const email = document.getElementById('reg-email');
        const password = document.getElementById('reg-password');
        const confirmPassword = document.getElementById('reg-confirm-password');

        // 1. Full Name (Required, Min 3 Chars)
        if (fullname.value.trim().length < 3) {
            setError(fullname, 'Full name is required (min 3 characters).');
            isValid = false;
        } else {
            setError(fullname, '');
        }

        // 2. Email Validation (Basic Regex check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            setError(email, 'Enter a valid email address.');
            isValid = false;
        } else {
            setError(email, '');
        }

        // 3. Password Strength
        // Regex: Min 8 length, 1 uppercase, 1 number, 1 symbol (@$!%*?&)
        const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password.value)) {
            setError(password, 'Password must be 8+ chars, 1 capital, 1 number, 1 symbol.');
            isValid = false;
        } else {
            setError(password, '');
        }

        // 4. Confirm Password Match
        if (password.value !== confirmPassword.value || confirmPassword.value === '') {
            setError(confirmPassword, 'Passwords must match.');
            isValid = false;
        } else {
            setError(confirmPassword, '');
        }

        if (!isValid) {
            e.preventDefault(); // Stop form submission if any validation fails
        } else {
            alert('Registration Successful! (Client-side validation passed)');
            // In a real application, you'd send data to the server here.
            e.preventDefault(); // Prevent form submission for demo purposes
        }
    };
    
    // Simple Login Validation (Just checks if fields are non-empty)
    const validateLogin = (e) => {
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        let isValid = true;

        if (email.value.trim() === '') {
            setError(email, 'Email is required.');
            isValid = false;
        } else {
            setError(email, '');
        }

        if (password.value.trim() === '') {
            setError(password, 'Password is required.');
            isValid = false;
        } else {
            setError(password, '');
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            alert('Login attempted! (Needs Server Check)');
            // Note: Actual login check must be performed on the server.
            e.preventDefault(); // Prevent form submission for demo purposes
        }
    };

    // Attach listeners
    regForm.addEventListener('submit', validateRegistration);
    loginForm.addEventListener('submit', validateLogin);
});