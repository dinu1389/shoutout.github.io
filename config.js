// Global Configuration
// This file contains all shared configuration variables used across the application

// WhatsApp Configuration - Replace with your actual WhatsApp number (country code + number)
// Example: For Indian number 9876543210, use: '919876543210'
const GLOBAL_CONFIG = {
    WHATSAPP_NUMBER: '919876543210'
};

// ntfy.sh Configuration
// Topic for receiving notifications about new leads
const NTFY_CONFIG = {
    TOPIC: 'shoutout', // ntfy.sh topic: https://ntfy.sh/shoutout
    ENABLED: true // Set to false to disable notifications
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GLOBAL_CONFIG, NTFY_CONFIG };
}
