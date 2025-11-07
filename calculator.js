// Construction Calculator Script

// Configuration
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number (country code + number)
const MIN_PLOT_AREA = 100; // Minimum plot area in sq. ft

// Package specifications with detailed breakdown
const packageSpecs = {
    silver: {
        name: 'Silver',
        rate: 1599,
        color: 'silver',
        specs: {
            'Design': {
                'a. Architectural Design': 'Site Layout Plan\nArchitectural Detailing',
                'b. Structural & MEP Design': 'Earthquake Resistant Structural Detailing\nPlumbing and Electrical drawing',
                'c. Additionals': 'Furniture Layout'
            },
            'Civil Works': {
                'a. Formwork': 'Slab shuttering MS plates\nColumn and Beams: Plywood sheets attached to timber frames',
                'b. Reinforcement steel': 'Fe 415 grade\nBrands: Trishul, Kamdhenu, Pushpak, Shakti, equivalent\nMS binding wire\nConcrete cover blocks',
                'c. Concrete': 'M25 Designed Mix',
                'd. Cement': 'OPC 53 G for Concrete - Brands: Chettinad, Bharthi, ACC, Equivalent\nPPC for masonry, Plaster for Tiling - Brands: Chettinad, Bharthi, ACC, Equivalent',
                'e. Masonry': 'Fly ash Bricks/CLC Bricks\nInternal walls – 150mm, External walls – 150mm\n(Happho approved local brands)\nCrushed sand for jointing mortar',
                'f. External Plaster': 'Cement & Plaster sand using water proofing chemical',
                'g. Internal Plaster': 'Internal plaster (wet areas) – Cement and Plaster sand\nInternal plaster (dry areas) – POP plaster - Brands: HappHo approved local brands',
                'h. Ceiling Finishing': 'White cement/Gypsum based putty - Brands: Birla, JK, Walplast or Happho approved local brands',
                'i. WaterProofing': 'Chemical Waterproofing - Brands: Dr. Fixit, Sika, BASF',
                'j. Others': 'Anti-Termite Treatment at foundation and plinth level'
            },
            'Bathroom': {
                'a. Concealed Pipes': 'Wall concealed pipes: CPVC - Brands: Finolex, Supreme',
                'b. Dado Tiles': 'Ceramic tiles @ ₹40/sq.ft, 7\' height (fixed with SBR Bonding agent)\nBrands: Somany, Nitco, Asian Granito, Morbi Manufactured Tiles',
                'c. Floor Tiles': 'Anti skid tiles @ ₹45/sq.ft - Brands: Somany, Nitco, Asian Granito, Morbi Manufactured Tiles',
                'd. Fixtures': 'Sanitary & CP fixtures @ ₹20,000 - Brands: Hindware, Parryware, RAK, Plumber'
            },
            'Electrical': {
                'a. Conduits': 'MMS grade PVC Conduits - Brands: Precision, Supreme',
                'b. Wires & Cables': 'Flame Retardent - Brands: Polycab, Finolex, HPL, Anchor',
                'c. Switches and Sockets': 'Brands: Anchor, HPL, L&T'
            },
            'Doors & Windows': {
                'a. Main Door': 'Hard Wood Frame & Engineered Door Shutters 35mm (Factory finished) - HappHo approved brands',
                'b. Door Kit': 'Brass alloy - HappHo approved brands',
                'c. Windows': 'Subframe, Aluminium 19mm series main frame, powder coated, 5mm clear glass - HappHo approved local brands'
            },
            'Kitchen': {
                'a. Countertop (OTA)': 'Granite @ ₹150/sq.ft',
                'b. Wall tiles (Dado tiles)': 'Ceramic tiles 2\' above kitchen platform @ ₹40/sq.ft - Brands: Somany, Nitco, Asian Granito, Morbi Manufactured Tiles',
                'c. Kitchen Sink and accessories': 'Single Sink bowl – SS 304, Faucet & Accessories @ ₹6,000',
                'd. Modular Kitchen': 'Not included'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Living & Dining: Vitrified tiles (600x600) @ ₹45/sq.ft\nBed Room: Vitrified tiles (600x600) @ ₹45/sq.ft\nTerraces: Antiskid @ ₹50/sq.ft\nStaircase: Indian granite @ ₹60/sq.ft\nParking: Chequered tiles @ ₹45/sq.ft',
                'b. Painting': 'Internal: Oil Bound Distemper (OBD)\nExternal: Weather proof, anti-algae, anti-fungal, Exterior emulsion\nBrands: Asian, Berger, Nerolac, ICI Dulux'
            },
            'Add-On Features': {
                'a. Balcony and Terraces': 'MS Railing',
                'b. Entrance Lobby': 'Vitrified Flooring, Ramp for differently able people',
                'c. False Ceiling': 'Not included',
                'd. Home Automation': 'Not included'
            }
        }
    },
    gold: {
        name: 'Gold',
        rate: 1999,
        color: 'gold',
        specs: {
            'Design': {
                'a. Architectural Design': 'Site Layout Plan\nArchitectural Detailing',
                'b. Structural & MEP Design': 'Earthquake Resistant Structural Detailing\nPlumbing and Electrical drawing',
                'c. Additionals': 'Furniture Layout\nHardscape & Landscape\nRain Water Harvesting'
            },
            'Civil Works': {
                'a. Formwork': 'Slab shuttering Film faced plywood\nColumn and Beams: Plywood sheets attached to MS frames',
                'b. Reinforcement steel': 'Fe 500 grade\nBrands: Trishul, Vizag, JSW, Welspun\nGI binding wire\nPVC cover blocks',
                'c. Concrete': 'M25 Designed Mix',
                'd. Cement': 'OPC 53 G for Concrete - Brands: Chettinad, Bharthi, Ultratech, ACC, Birla Super\nPPC for masonry, Plaster for Tiling - Brands: Chettinad, Bharthi, Ultratech, ACC, Birla',
                'e. Masonry': 'Fly ash Bricks/Cellular Lightweight Concrete Blocks\nInternal walls – 150mm, External walls – 150mm\n(Happho approved local brands)\nCrushed sand for jointing mortar',
                'f. External Plaster': 'Cement & Plaster sand using water proofing chemical',
                'g. Internal Plaster': 'Internal plaster (wet areas) – Cement and Plaster sand\nInternal plaster (dry areas) – POP/Gypsum plaster - Brands: Saint Gobain, Walplast, Buildcon, Diamond, Supreme',
                'h. Ceiling Finishing': 'White cement/Gypsum based putty - Brands: Birla, JK, Saint Gobain, Walplast\nChemical Waterproofing - Brands: Dr. Fixit, Sika, BASF',
                'i. WaterProofing': 'Chemical Waterproofing - Brands: Dr. Fixit, Sika, BASF',
                'j. Others': 'Anti-Termite Treatment at foundation and plinth level'
            },
            'Bathroom': {
                'a. Concealed Pipes': 'Wall concealed pipes: CPVC - Brands: Finolex, Supreme',
                'b. Dado Tiles': 'Ceramic tiles @ ₹60/sq.ft, 7\' height (fixed with SBR Bonding agent)\nBrands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'c. Floor Tiles': 'Anti skid tiles @ ₹60/sq.ft - Brands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'd. Fixtures': 'Sanitary & CP fixtures @ ₹35,000 - Brands: Hindware, Jaquar, CERA, RAK'
            },
            'Electrical': {
                'a. Conduits': 'MMS FRLS grade PVC Conduits - Brands: Precision, Supreme',
                'b. Wires & Cables': 'Flame Retardent Low Smoke - Brands: Polycab, Finolex, Havells, Anchor',
                'c. Switches and Sockets': 'Brands: Anchor, Schneider, Crabtree, Finolex'
            },
            'Doors & Windows': {
                'a. Main Door': 'Pine Wood Frame & Flush Door Shutters laminate finish, 40mm - HappHo approved brands',
                'b. Door Kit': 'Brass Chromium Plated - HappHo approved brands',
                'c. Windows': 'Subframe, Aluminium 25mm series main frame, anodized, 5mm tinted glass - HappHo approved brands, Marble sill at bottom'
            },
            'Kitchen': {
                'a. Countertop (OTA)': 'Galaxy black granite @ ₹180/sq.ft',
                'b. Wall tiles (Dado tiles)': 'Ceramic tiles 2\' above kitchen platform @ ₹50/sq.ft - Brands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'c. Kitchen Sink and accessories': 'Single Sink bowl – SS 304 with drainer, Faucet & Accessories @ ₹12,000',
                'd. Modular Kitchen': 'Modular Kitchen @ ₹1,00,000'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Living & Dining: Vitrified tiles (800x800) @ ₹125/sq.ft\nBed Room: Vitrified tiles (600x600) or wooden tiles @ ₹85/sq.ft\nTerraces: Antiskid @ ₹60/sq.ft\nStaircase: Indian granite @ ₹80/sq.ft\nParking: Paver tiles @ ₹60/sq.ft',
                'b. Painting': 'Internal: Emulsion paint (Matt/Satin finish), Washable, Stain resistant, Anti fungal\nExternal: Weather proof, anti-algae, anti-fungal, Exterior emulsion\nBrands: Asian, Berger, Nerolac, Jotun'
            },
            'Add-On Features': {
                'a. Balcony and Terraces': 'SS 202 Railing',
                'b. Entrance Lobby': 'Granite with Marble Inlay Flooring, Ramp for differently able people',
                'c. False Ceiling': 'Designer False Ceiling in living and dining area',
                'd. Home Automation': 'Home Automation @ ₹25,000'
            }
        }
    },
    platinum: {
        name: 'Platinum',
        rate: 2599,
        color: 'platinum',
        specs: {
            'Design': {
                'a. Architectural Design': 'Site Layout Plan\nArchitectural Detailing',
                'b. Structural & MEP Design': 'Earthquake Resistant Structural Detailing\nPlumbing and Electrical drawing',
                'c. Additionals': 'Furniture Layout\nHardscape & Landscape\nRain Water Harvesting\nHeating Ventilation and Air Conditioning'
            },
            'Civil Works': {
                'a. Formwork': 'Slab shuttering Film faced plywood\nColumn and Beams: Plywood sheets attached to MS frames',
                'b. Reinforcement steel': 'Fe 500 grade\nBrand: TATA steel, Vizag, JSW, SAIL\nGI binding wire\nPVC cover blocks',
                'c. Concrete': 'M25 Designed Mix',
                'd. Cement': 'OPC 53 G for Concrete - Brands: Chettinad, Bharthi, Ultratech, ACC, Birla Super\nPPC for masonry, Plaster for Tiling - Brands: Chettinad, Bharthi, Ultratech, ACC, Birla',
                'e. Masonry': 'Autoclaved Aerated Concrete Blocks\nInternal walls – 200mm, External walls – 150mm\nBrands: Siporex, Magicrete, Ecolite, Ultratech\nCrushed sand for jointing mortar',
                'f. External Plaster': 'Cement & Plaster sand using water proofing chemical',
                'g. Internal Plaster': 'Internal plaster (wet areas) – Cement and Plaster sand\nInternal plaster (dry areas) – POP/Gypsum plaster - Brands: Saint Gobain, Walplast, Buildcon, Diamond, Supreme',
                'h. Ceiling Finishing': 'White cement/Gypsum based putty - Brands: Birla, JK, Saint Gobain, Walplast',
                'i. WaterProofing': 'Chemical Waterproofing - Brands: Dr. Fixit, Sika, BASF',
                'j. Others': 'Anti-Termite Treatment at foundation and plinth level'
            },
            'Bathroom': {
                'a. Concealed Pipes': 'Wall concealed pipes: CPVC - Brands: Finolex, Supreme',
                'b. Dado Tiles': 'Vitrified tiles @ ₹80/sq.ft, 7\' height (fixed with SBR Bonding agent and spacers)\nBrands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'c. Floor Tiles': 'Anti skid tiles @ ₹75/sq.ft fixed with spacer - Brands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'd. Fixtures': 'Sanitary & CP fixtures @ ₹50,000 - Brands: Kohler, Roca, Grohe, Kludi'
            },
            'Electrical': {
                'a. Conduits': 'HMS FRLS grade PVC Conduits - Brands: Precision, Supreme',
                'b. Wires & Cables': 'Flame Retardent Low Smoke - Brands: Polycab, Finolex, Havells, Anchor',
                'c. Switches and Sockets': 'Brands: Schneider, Crabtree, Legrand'
            },
            'Doors & Windows': {
                'a. Main Door': 'Pine Wood Frame & Flush Door Shutters Veneer finish, 45mm - HappHo approved brands',
                'b. Door Kit': 'Stainless steel - HappHo approved brands',
                'c. Windows': 'Subframe, Aluminium 35mm series, anodized, Double glass unit (tinted) - HappHo approved brands or UPVC Windows, Marble sill four sides'
            },
            'Kitchen': {
                'a. Countertop (OTA)': 'Jet black granite @ ₹250/sq.ft',
                'b. Wall tiles (Dado tiles)': 'Ceramic tiles 2\' above kitchen platform @ ₹80/sq.ft - Brands: Nitco, Asian Granito, Kajaria, HR Johnson',
                'c. Kitchen Sink and accessories': 'Double sink bowl SS 304, faucet & accessories @ ₹18,000',
                'd. Modular Kitchen': 'Modular Kitchen @ ₹2,50,000'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Living & Dining: Italian Marble @ ₹275/sq.ft\nBed Room: Italian Marble @ ₹275/sq.ft\nTerraces: Antiskid @ ₹80/sq.ft\nStaircase: Indian granite @ ₹120/sq.ft\nParking: Paver tiles/stamp coloured concrete @ ₹75/sq.ft',
                'b. Painting': 'Internal: Emulsion paint (Matt/Satin finish), Washable, Stain resistant, Anti fungal\nExternal: Elastomeric Texture paint\nBrands: Asian, Berger, Nerolac, Jotun'
            },
            'Add-On Features': {
                'a. Balcony and Terraces': 'SS 304 Railing with Toughened Glass',
                'b. Entrance Lobby': 'Marble Flooring and Designer False Ceiling, Ramp for differently able people',
                'c. False Ceiling': 'Designer False Ceiling in living area, dining and bedrooms',
                'd. Home Automation': 'Home Automation @ ₹1,00,000'
            }
        }
    }
};

// Construction facts for the estimation
const constructionFacts = [
    "Quality construction is an investment that appreciates with time. Choose materials wisely for long-term value.",
    "A well-planned construction ensures safety, comfort, and durability for generations to come.",
    "Modern construction techniques combined with quality materials create homes that stand the test of time.",
    "Every detail in construction matters - from foundation to finishing, quality should never be compromised.",
    "Smart construction planning today saves significant maintenance costs tomorrow."
];

// Form submission handler
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const customerName = document.getElementById('customerName').value.trim();
    const location = document.getElementById('location').value.trim();
    const plotArea = parseFloat(document.getElementById('plotArea').value);
    const packageType = document.getElementById('package').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate
    if (!customerName || !location || !plotArea || !packageType) {
        showValidationError('Please fill in all required fields');
        return;
    }
    
    if (plotArea < MIN_PLOT_AREA) {
        showValidationError(`Plot area must be at least ${MIN_PLOT_AREA} sq. ft`);
        return;
    }
    
    // Generate estimation
    generateEstimation(customerName, location, plotArea, packageType, email, phone);
});

function showValidationError(message) {
    const button = document.querySelector('.btn-calculate');
    const originalText = button.textContent;
    button.textContent = '⚠️ ' + message;
    button.style.background = '#e74c3c';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateEstimation(customerName, location, plotArea, packageType, email, phone) {
    const packageData = packageSpecs[packageType];
    const totalCost = plotArea * packageData.rate;
    const randomFact = constructionFacts[Math.floor(Math.random() * constructionFacts.length)];
    
    // Sanitize user inputs
    customerName = escapeHtml(customerName);
    location = escapeHtml(location);
    email = email ? escapeHtml(email) : '';
    phone = phone ? escapeHtml(phone) : '';
    
    // Create new window for estimation
    const estimationWindow = window.open('', '_blank');
    
    // Note: Using document.write() for client-side generation of estimation page
    // All user inputs are sanitized via escapeHtml() to prevent XSS
    // This is a client-side only application with no backend server
    
    // Generate HTML
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Construction Estimation - ${customerName}</title>
    <link rel="stylesheet" href="calculator-styles.css">
    <style>
        @media print {
            .action-buttons, .no-print { display: none; }
            body { background: white; }
        }
    </style>
</head>
<body>
    <div class="estimation-page">
        <div class="estimation-header">
            <div class="company-logo">🏗️ ShoutOut Construction</div>
            <h1 class="estimation-title">Construction Cost Estimation</h1>
            <p style="color: #7f8c8d; font-size: 1.1rem;">Detailed Package Specifications & Pricing</p>
        </div>

        <div class="customer-info">
            <h2>To,</h2>
            <div class="info-row"><span class="info-label">${customerName} Ji</span></div>
            <div class="info-row"><span class="info-label">Location:</span> ${location}</div>
            ${email ? `<div class="info-row"><span class="info-label">Email:</span> ${email}</div>` : ''}
            ${phone ? `<div class="info-row"><span class="info-label">Phone:</span> ${phone}</div>` : ''}
            <div class="info-row"><span class="info-label">Date:</span> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div class="info-row">
                <span class="info-label">Selected Package:</span>
                <span class="package-badge ${packageData.color}">${packageData.name} - ₹${packageData.rate.toLocaleString('en-IN')} per sq. ft</span>
            </div>
        </div>

        <div class="construction-fact">
            💡 ${randomFact}
        </div>

        <div class="specifications">
            <h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">Detailed Specifications - ${packageData.name} Package</h2>
            
            ${generateSpecificationsSections(packageData.specs)}
        </div>

        <div class="cost-summary">
            <h2>Cost Summary</h2>
            <div class="cost-row">
                <span>Construction Area:</span>
                <span>${plotArea.toLocaleString('en-IN')} sq. ft</span>
            </div>
            <div class="cost-row">
                <span>Rate per sq. ft (${packageData.name} Package):</span>
                <span>₹${packageData.rate.toLocaleString('en-IN')}</span>
            </div>
            <div class="cost-row total">
                <span>Total Estimated Cost:</span>
                <span>₹${totalCost.toLocaleString('en-IN')}</span>
            </div>
            <p style="margin-top: 20px; color: #7f8c8d; font-size: 0.95rem;">
                * This is an approximate estimation. Final costs may vary based on site conditions, material availability, and customizations.
            </p>
        </div>

        <div class="closing-message">
            <h3>Thank You for Choosing ShoutOut!</h3>
            <p style="font-size: 1.1rem; margin: 15px 0;">
                We wish you all the very best for your construction journey. May your new space bring joy, prosperity, and happiness to you and your family.
            </p>
            <p style="font-size: 1rem; opacity: 0.9;">
                Our team will contact you shortly to discuss the project details and schedule a site visit.
            </p>
        </div>

        <div class="action-buttons no-print">
            <button onclick="window.print()" class="btn btn-print">🖨️ Print Estimation</button>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I generated a construction estimation on ShoutOut. I would like to discuss the ' + packageData.name + ' package for ' + plotArea + ' sq.ft.')}" 
               class="btn btn-whatsapp" target="_blank">
                💬 Discuss on WhatsApp
            </a>
            <a href="calculator.html" class="btn" style="background: #667eea; color: white;">
                ← Back to Calculator
            </a>
        </div>
    </div>
</body>
</html>
    `;
    
    estimationWindow.document.write(html);
    estimationWindow.document.close();
}

function generateSpecificationsSections(specs) {
    let html = '';
    
    for (const [sectionName, items] of Object.entries(specs)) {
        html += `
            <div class="spec-section">
                <div class="spec-header">${sectionName}</div>
                <div class="spec-content">
        `;
        
        for (const [itemName, itemValue] of Object.entries(items)) {
            html += `
                <div class="spec-item">
                    <div class="spec-name">${itemName}</div>
                    <div class="spec-value">${itemValue.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    return html;
}
