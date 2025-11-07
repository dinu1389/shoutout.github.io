# Interior Design & Construction Landing Page

A professional landing page for interior design and construction services in Hyderabad with WhatsApp integration and lead form.

## Features

- ✅ **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- ✅ **WhatsApp Integration** - Direct chat button and form-to-WhatsApp conversion
- ✅ **Lead Form with Spam Protection** - Honeypot and timing-based spam filtering
- ✅ **ntfy.sh Notifications** - Real-time notifications when users enter phone numbers
- ✅ **GTM Integration** - Google Tag Manager event tracking ready
- ✅ **SEO Optimized** - Meta tags and structured content
- ✅ **Professional Design** - Modern UI with smooth animations
- ✅ **Location-Specific** - Hyderabad area targeting (Madhapur, Gachibowli, Hitech City, etc.)
- ✅ **Construction Calculator** - Detailed cost estimation with material requirements
  - Multiple area units (sq.ft and sq.yard)
  - Floor selection (G, G+1, G+2, etc.)
  - Material estimates (cement, bricks, TMT bars, sand, gravel)

## Quick Start

### 1. Configure Global Settings

Edit `config.js` to set your WhatsApp number and ntfy.sh topic:

```javascript
const GLOBAL_CONFIG = {
    WHATSAPP_NUMBER: '919876543210' // Replace with your number (format: country code + number)
};

const NTFY_CONFIG = {
    TOPIC: 'shoutout', // Your ntfy.sh topic
    ENABLED: true // Set to false to disable notifications
};
```

Example: For Indian number 9876543210, use: `'919876543210'`

### 2. Configure Google Tag Manager (Optional but Recommended)

Edit `index.html` and replace `GTM-XXXXXXX` with your actual GTM container ID in two places:
- Line 10 (main GTM script)
- Line 18 (noscript fallback)

### 3. Deploy

Simply upload these files to your web server:
- `index.html`
- `calculator.html`
- `styles.css`
- `calculator-styles.css`
- `script.js`
- `calculator.js`
- `config.js`

Or use GitHub Pages, Netlify, Vercel, or any static hosting service.

## File Structure

```
├── index.html              # Main landing page
├── calculator.html         # Construction cost calculator
├── styles.css             # Main page styling
├── calculator-styles.css  # Calculator page styling
├── script.js              # Form validation, WhatsApp integration, tracking
├── calculator.js          # Calculator logic and material estimation
├── config.js              # Global configuration (WhatsApp number, ntfy.sh)
└── README.md              # This file
```

## Features Breakdown

### 1. Hero Section
- Strong headline targeting Hyderabad
- Clear value proposition
- Prominent WhatsApp CTA button
- Secondary callback CTA

### 2. Services Section
- Interior Design
- Modular Kitchen
- False Ceiling
- Civil & MEP Work
- Turnkey Projects
- Approvals & Documentation

### 3. Coverage Areas
- Madhapur, Gachibowli, Hitech City
- Jubilee Hills, Kondapur, Kukatpally
- Miyapur, LB Nagar, Secunderabad
- And more Hyderabad localities

### 4. Trust Indicators
- Years of experience
- Project completion record
- Warranty information
- RERA certification

### 5. Testimonials
- Customer reviews
- Location-specific testimonials
- Star ratings

### 6. Lead Form
Collects minimal but essential information:
- Full Name (validated)
- Phone Number (10-digit Indian mobile validation)
  - **Automatic ntfy.sh notification** when valid phone number is entered
- Locality (dropdown with Hyderabad areas)
- Property Type (Apartment, Villa, etc.)
- Property Size (1BHK to 4BHK+)
- Service Required (dropdown)
- Email (optional)

**Spam Protection:**
- Honeypot field (hidden)
- Submission timing check
- Real-time validation
- Terms agreement checkbox

**ntfy.sh Integration:**
- Sends instant notification when user enters valid phone number
- Configure topic in `config.js`
- Notifications sent to https://ntfy.sh/[your-topic]
- Can be monitored via mobile app or web interface

### 7. WhatsApp Integration

**Two conversion paths:**

1. **Direct WhatsApp Button** (Hero CTA)
   - Opens WhatsApp with pre-filled message
   - Tracks as "whatsapp_click" event

2. **Form Submission to WhatsApp**
   - User fills form
   - Form validates and checks for spam
   - Formatted message sent to WhatsApp
   - Tracks as "lead_form_submit" event

**Message Format:**
```
🏠 *New Lead - Interior Design Inquiry*

📝 *Customer Details:*
━━━━━━━━━━━━━━━━━
👤 Name: [Customer Name]
📱 Phone: [Phone Number]
📧 Email: [Email]

🏘️ *Property Information:*
━━━━━━━━━━━━━━━━━
📍 Locality: [Location]
🏢 Property Type: [Type]
📏 Size: [Size]
🔧 Service Required: [Service]

⏰ *Inquiry Date:* [Timestamp]
```

### 8. Construction Cost Calculator

A comprehensive calculator for construction cost estimation with detailed material requirements.

**Features:**
- **Area Input Options:**
  - Square Feet (sq.ft)
  - Square Yards (sq.yd)
  - Real-time conversion display
  
- **Floor Selection:**
  - Ground Floor (G)
  - G+1, G+2, G+3, G+4, G+5
  - Automatic built-up area calculation

- **Package Options:**
  - Silver - ₹1,599 per sq.ft
  - Gold - ₹1,999 per sq.ft
  - Platinum - ₹2,599 per sq.ft

- **Material Estimates:**
  - Cement Bags (50kg count)
  - Bricks (count)
  - TMT Bars (tons)
  - Sand (tons)
  - Gravel/Aggregate (tons)

**Calculation Formula:**
- Material estimates are based on industry-standard ratios
- Total built-up area = Plot area × Number of floors
- Estimates include pillars, walls, and slabs
- Displayed in easy-to-read cards with icons

**Output:**
- Detailed PDF-ready estimation report
- Customer information
- Package specifications
- Material requirements
- Cost breakdown
- WhatsApp share option
- Print option

## Google Tag Manager Setup

### Events Tracked:

1. **page_view** - When page loads
2. **whatsapp_click** - When WhatsApp button is clicked
3. **lead_form_submit** - When form is submitted successfully
4. **whatsapp_redirect** - When form redirects to WhatsApp
5. **spam_blocked** - When spam is detected

### GTM Configuration:

#### For WhatsApp Click Conversion:
1. Create a Trigger: Click URL contains "wa.me" or "api.whatsapp.com"
2. Create a Tag: Google Ads Conversion - "WhatsApp Click"
3. Set Conversion Value (e.g., ₹500 for click)

#### For Lead Form Conversion:
1. Create a Trigger: Custom Event = "lead_form_submit"
2. Create a Tag: Google Ads Conversion - "Lead Form Submit"
3. Set Conversion Value (e.g., ₹1000 for qualified lead)

## Google Ads Campaign Setup

Based on the requirements, here's the campaign structure:

### Campaign Settings:
- **Objective:** Leads
- **Campaign Type:** Search
- **Bidding:** Maximize Conversions (switch to Target CPA after 20-30 conversions)
- **Budget:** ₹1,000-₹3,000/day
- **Location:** Hyderabad (with specific area radius targeting)
- **Languages:** English + Telugu + Hindi
- **Ad Schedule:** 8 AM - 9 PM IST

### Keywords Examples:
```
[interior designer hyderabad]
"interior design madhapur"
"modular kitchen gachibowli"
[home renovation hyderabad]
"construction contractor hitech city"
```

### Negative Keywords:
```
-jobs -careers -salary -course -training -DIY -free 
-furniture -IKEA -autocad -degree -tenders
```

### Ad Extensions:
- Sitelink: "Chat on WhatsApp" → wa.me link
- Call Extension: Your phone number
- Location Extension: Google Business Profile
- Lead Form Extension: Quick lead capture
- Callouts: "Free Site Visit", "3D Designs", "On-Time Delivery"

## Customization

### Change Colors:
Edit `styles.css` root variables (lines 10-17):
```css
:root {
    --primary-color: #25D366;  /* WhatsApp green */
    --secondary-color: #FF6B35;
    --text-dark: #2c3e50;
    /* ... */
}
```

### Update Content:
- Service descriptions in `index.html`
- Testimonials (lines 155-178)
- Coverage areas (lines 139-152)
- Trust indicators (lines 182-211)

### Add More Locations:
Edit the locality dropdown in `index.html` (lines 248-262)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight (~36KB total uncompressed)
- No external dependencies
- Fast loading (<1s on good connection)
- Mobile-optimized

## Security & Privacy

- No data stored on server
- All leads go directly to WhatsApp
- Honeypot spam protection
- No cookies or tracking (except GTM if configured)
- HTTPS recommended for production

## Support & Customization

For questions or custom development, contact through the form on the page.

## License

Free to use and modify for your business.