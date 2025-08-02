// Initialize Feather Icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
});

// Timer functionality
let secondsLeft = 600; // 10 minutes
const timerElement = document.getElementById('timer');

function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
    
    if (secondsLeft > 0) {
        secondsLeft--;
    } else {
        // Timer expired - you can add custom logic here
        timerElement.style.color = '#dc2626';
        timerElement.textContent = '00:00';
    }
}

// Update timer every second
const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Form data storage
const formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    referral: '',
    enrollingFor: 'Myself'
};

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(message) {
    alert(message); // In a real app, you'd use a better notification system
}

function showSuccess(message) {
    console.log('Success:', message);
}

// Form navigation functions
function goToStep2() {
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const referral = document.getElementById('referral').value.trim();

    // Basic validation
    if (!firstName) {
        showError('Please enter your first name');
        document.getElementById('firstName').focus();
        return;
    }

    if (!lastName) {
        showError('Please enter your last name');
        document.getElementById('lastName').focus();
        return;
    }

    if (!phone) {
        showError('Please enter your phone number');
        document.getElementById('phone').focus();
        return;
    }

    if (!validatePhone(phone)) {
        showError('Please enter a valid phone number');
        document.getElementById('phone').focus();
        return;
    }

    if (!email) {
        showError('Please enter your email address');
        document.getElementById('email').focus();
        return;
    }

    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        document.getElementById('email').focus();
        return;
    }

    // Store form data
    formData.firstName = firstName;
    formData.lastName = lastName;
    formData.phone = phone;
    formData.email = email;
    formData.referral = referral;

    // Get selected radio button value
    const selectedEnrollOption = document.querySelector('input[name="enrollFor"]:checked');
    if (selectedEnrollOption) {
        formData.enrollingFor = selectedEnrollOption.value;
    }

    // Hide step 1 and show step 2
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');

    console.log('Form data:', formData);
    showSuccess('Proceeding to payment step');
}

function markAsPaid() {
    // In a real application, you would:
    // 1. Verify the payment with your payment processor
    // 2. Send the form data to your server
    // 3. Generate and send confirmation emails
    
    console.log('Payment marked as completed');
    console.log('Final form data:', formData);
    
    // Hide main container and show success screen
    document.getElementById('mainContainer').classList.add('hidden');
    document.getElementById('successScreen').classList.remove('hidden');
    
    // Re-initialize feather icons for the success screen
    feather.replace();
    
    // Stop the timer since payment is complete
    clearInterval(timerInterval);
    
    // In a real app, you might want to send data to server here
    submitPaymentData();
}

// Simulate sending data to server
function submitPaymentData() {
    const paymentData = {
        ...formData,
        amount: 55751.81,
        currency: 'INR',
        course: 'AWS Certified Solutions Architect - Associate Training',
        paymentMethod: 'UPI',
        timestamp: new Date().toISOString(),
        transactionId: generateTransactionId()
    };
    
    console.log('Submitting payment data:', paymentData);
    
    // Here you would typically make an API call
    // fetch('/api/payment', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(paymentData)
    // });
}

function generateTransactionId() {
    return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Event listeners for form inputs
document.getElementById('firstName').addEventListener('input', function(e) {
    formData.firstName = e.target.value;
});

document.getElementById('lastName').addEventListener('input', function(e) {
    formData.lastName = e.target.value;
});

document.getElementById('phone').addEventListener('input', function(e) {
    formData.phone = e.target.value;
});

document.getElementById('email').addEventListener('input', function(e) {
    formData.email = e.target.value;
});

document.getElementById('referral').addEventListener('input', function(e) {
    formData.referral = e.target.value;
});

// Handle radio button changes
document.querySelectorAll('input[name="enrollFor"]').forEach(radio => {
    radio.addEventListener('change', function(e) {
        formData.enrollingFor = e.target.value;
    });
});

// Handle Enter key in form fields
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const currentStep = document.getElementById('step1').classList.contains('hidden') ? 2 : 1;
            if (currentStep === 1) {
                goToStep2();
            }
        }
    });
});

// Prevent form submission on Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
    }
});

// Pricing calculations (for reference and potential future use)
const pricing = {
    subtotal: 52497,
    discount: 5249.7,
    sgst: 4252.26,
    cgst: 4252.26,
    total: 55751.81,
    discountPercentage: 10,
    taxRate: 18 // 9% SGST + 9% CGST
};

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN').format(date);
}

// Initialize the application
function initApp() {
    console.log('AWS Payment UI Initialized');
    console.log('Pricing:', pricing);
    
    // Set initial focus
    document.getElementById('firstName').focus();
    
    // Add any additional initialization logic here
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle page visibility changes (pause timer when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, you might want to pause certain activities
        console.log('Page hidden');
    } else {
        // Page is visible again
        console.log('Page visible');
    }
});

// Handle page unload (cleanup)
window.addEventListener('beforeunload', function(e) {
    // Clear intervals
    clearInterval(timerInterval);
    
    // In a real app, you might want to save form data to localStorage
    // localStorage.setItem('awsPaymentForm', JSON.stringify(formData));
});

// Export functions for potential external use
window.AWSPaymentUI = {
    formData,
    pricing,
    goToStep2,
    markAsPaid,
    formatCurrency,
    formatDate
};