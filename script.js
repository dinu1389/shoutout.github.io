// WhatsApp Configuration
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number (country code + number)

// GTM Event Tracking Helper
function trackEvent(eventName, eventData = {}) {
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
            'event': eventName,
            ...eventData
        });
    }
    console.log('Event tracked:', eventName, eventData);
}

// WhatsApp CTA Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const whatsappCTA = document.getElementById('whatsapp-cta');
    
    if (whatsappCTA) {
        whatsappCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = encodeURIComponent(
                "Hi! I'm interested in your interior design and construction services in Hyderabad. " +
                "Please share more details."
            );
            
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            
            // Track WhatsApp click event
            trackEvent('whatsapp_click', {
                'event_category': 'CTA',
                'event_label': 'Hero WhatsApp Button',
                'conversion_type': 'whatsapp_lead'
            });
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
        });
    }
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Check honeypot (spam filter)
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            console.log('Spam detected - honeypot filled');
            // Track spam attempt
            trackEvent('spam_blocked', {
                'event_category': 'Form',
                'event_label': 'Honeypot Triggered'
            });
            alert('Form submission failed. Please try again.');
            return;
        }

        // Additional spam check - submission timing
        if (!form.dataset.loadTime) {
            form.dataset.loadTime = Date.now();
        }
        const timeSinceLoad = Date.now() - parseInt(form.dataset.loadTime);
        if (timeSinceLoad < 3000) { // Less than 3 seconds
            console.log('Spam detected - too fast submission');
            trackEvent('spam_blocked', {
                'event_category': 'Form',
                'event_label': 'Too Fast Submission'
            });
            alert('Please take a moment to review your information.');
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            locality: document.getElementById('locality').value,
            propertyType: document.getElementById('propertyType').value,
            propertySize: document.getElementById('propertySize').value,
            service: document.getElementById('service').value,
            email: document.getElementById('email').value.trim() || 'Not provided'
        };

        // Validate phone number format (Indian mobile)
        if (!isValidIndianPhone(formData.phone)) {
            showError('phone', 'Please enter a valid 10-digit Indian mobile number');
            return;
        }

        // Track form submission
        trackEvent('lead_form_submit', {
            'event_category': 'Form',
            'event_label': 'Lead Form',
            'conversion_type': 'form_lead',
            'locality': formData.locality,
            'property_type': formData.propertyType,
            'service': formData.service
        });

        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(formData);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

        // Show success message
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ Redirecting to WhatsApp...';
        submitButton.disabled = true;

        // Track WhatsApp redirect
        trackEvent('whatsapp_redirect', {
            'event_category': 'Form',
            'event_label': 'Form to WhatsApp',
            'conversion_type': 'whatsapp_lead'
        });

        // Redirect to WhatsApp after short delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Reset form
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show thank you message
            showThankYouMessage();
        }, 1000);
    });

    // Set load time for spam detection
    form.dataset.loadTime = Date.now();
});

// Field Validation Function
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearError(fieldId);

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Name validation
    else if (fieldId === 'name' && value) {
        if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!/^[a-zA-Z\s.]+$/.test(value)) {
            errorMessage = 'Name should only contain letters';
            isValid = false;
        }
    }
    // Phone validation
    else if (fieldId === 'phone' && value) {
        if (!/^[6-9][0-9]{9}$/.test(value)) {
            errorMessage = 'Enter a valid 10-digit mobile number starting with 6-9';
            isValid = false;
        }
    }
    // Email validation (optional field)
    else if (fieldId === 'email' && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Enter a valid email address';
            isValid = false;
        }
    }
    // Terms checkbox
    else if (fieldId === 'terms' && !field.checked) {
        errorMessage = 'You must agree to the terms';
        isValid = false;
    }

    if (!isValid) {
        showError(fieldId, errorMessage);
    }

    return isValid;
}

// Show Error Message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear Error Message
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Validate Indian Phone Number
function isValidIndianPhone(phone) {
    // Must start with 6-9 and be exactly 10 digits
    return /^[6-9][0-9]{9}$/.test(phone);
}

// Create WhatsApp Message
function createWhatsAppMessage(formData) {
    return `🏠 *New Lead - Interior Design Inquiry*

📝 *Customer Details:*
━━━━━━━━━━━━━━━━━
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}

🏘️ *Property Information:*
━━━━━━━━━━━━━━━━━
📍 Locality: ${formData.locality}
🏢 Property Type: ${formData.propertyType}
📏 Size: ${formData.propertySize}
🔧 Service Required: ${formData.service}

⏰ *Inquiry Date:* ${new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
})}

━━━━━━━━━━━━━━━━━
Please respond within 24 hours for site visit scheduling.`;
}

// Show Thank You Message
function showThankYouMessage() {
    const formSection = document.querySelector('.contact-form');
    if (!formSection) return;

    // Create thank you overlay
    const thankYouDiv = document.createElement('div');
    thankYouDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 1000;
        max-width: 500px;
        width: 90%;
    `;
    
    thankYouDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">✅</div>
        <h3 style="color: #25D366; margin-bottom: 15px;">Thank You!</h3>
        <p style="color: #2c3e50; margin-bottom: 20px;">
            Your details have been sent via WhatsApp. 
            We'll contact you within 24 hours to schedule a site visit.
        </p>
        <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" 
                style="background: #25D366; color: white; border: none; padding: 12px 30px; 
                       border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            Close
        </button>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(thankYouDiv);

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (thankYouDiv.parentElement) {
            thankYouDiv.remove();
            overlay.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#whatsapp-cta') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Track page view
trackEvent('page_view', {
    'page_title': document.title,
    'page_location': window.location.href
});
