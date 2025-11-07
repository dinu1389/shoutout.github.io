// Construction Calculator Script

// Configuration (from global config)
const WHATSAPP_NUMBER = GLOBAL_CONFIG.WHATSAPP_NUMBER;
const MIN_PLOT_AREA = 100; // Minimum plot area in sq. ft

// Area conversion constants
const SQYARD_TO_SQFT = 9; // 1 sq yard = 9 sq ft

// Material estimation constants (industry-standard ratios)
const MATERIAL_RATIOS = {
    CEMENT_BAGS_PER_SQFT: 0.4,      // Cement bags (50kg) per sq.ft for all work
    WALL_AREA_RATIO: 0.3,            // Percentage of built-up area that is walls
    BRICKS_PER_SQFT_WALL: 8,         // Bricks per sq.ft of wall area
    TMT_BARS_KG_PER_SQFT: 4.5,       // TMT bars in kg per sq.ft
    SAND_CUFT_PER_SQFT: 1.2,         // Sand in cubic feet per sq.ft
    SAND_KG_PER_CUFT: 45,            // Weight of sand in kg per cubic feet
    GRAVEL_CUFT_PER_SQFT: 1.5,       // Gravel/Aggregate in cubic feet per sq.ft
    GRAVEL_KG_PER_CUFT: 50,          // Weight of aggregate in kg per cubic feet
    KG_TO_TONS: 1000                 // Conversion factor from kg to tons
};

const AREA_CONVERSION_DECIMAL_PLACES = 2;

// Package specifications with simplified text
const packageSpecs = {
    silver: {
        name: 'Silver',
        rate: 1599,
        color: 'silver',
        specs: {
            'Design': {
                'a. Architectural Design': 'Basic site layout and building design by ShoutOut.',
                'b. Structural & MEP Design': 'Earthquake-safe structure, plumbing, and electrical plans.',
                'c. Add-ons': 'Basic furniture layout included.'
            },
            'Civil Works': {
                'a. Formwork': 'Temporary molds for concrete work.',
                'b. Reinforcement Steel': 'Strong steel bars for building strength.',
                'c. Concrete': 'High-quality concrete mix for durability.',
                'd. Cement': 'Top brands for strong walls and floors.',
                'e. Masonry': 'Fly ash bricks for walls, eco-friendly and durable.',
                'f. External Plaster': 'Waterproof plaster for outer walls.',
                'g. Internal Plaster': 'Smooth finish for inner walls.',
                'h. Ceiling Finish': 'White cement or gypsum for a clean look.',
                'i. Waterproofing': 'Leak-proofing with trusted brands.',
                'j. Others': 'Anti-termite treatment for long-lasting protection.'
            },
            'Bathroom': {
                'a. Pipes': 'Hidden pipes for a clean look.',
                'b. Wall Tiles': 'Ceramic tiles up to 7 feet for easy cleaning.',
                'c. Floor Tiles': 'Anti-slip tiles for safety.',
                'd. Fixtures': 'Basic bathroom fittings from trusted brands.'
            },
            'Electrical': {
                'a. Conduits': 'PVC pipes for safe wiring.',
                'b. Wires & Cables': 'Fire-resistant wires for safety.',
                'c. Switches': 'Reliable switches and sockets.'
            },
            'Doors & Windows': {
                'a. Main Door': 'Strong wooden door for security.',
                'b. Door Kit': 'Durable handles and locks.',
                'c. Windows': 'Aluminum windows with clear glass.'
            },
            'Kitchen': {
                'a. Countertop': 'Granite countertop for durability.',
                'b. Wall Tiles': 'Easy-to-clean tiles above the counter.',
                'c. Sink': 'Stainless steel sink with faucet.',
                'd. Modular Kitchen': 'Not included in this package.'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Vitrified tiles for living areas and bedrooms.',
                'b. Painting': 'Basic interior and weatherproof exterior paint.'
            },
            'Add-On Features': {
                'a. Balcony': 'Simple railing for safety.',
                'b. Entrance': 'Basic flooring and ramp for accessibility.',
                'c. False Ceiling': 'Not included in this package.',
                'd. Home Automation': 'Not included in this package.'
            }
        }
    },
    gold: {
        name: 'Gold',
        rate: 1999,
        color: 'gold',
        specs: {
            'Design': {
                'a. Architectural Design': 'Detailed site layout and building design by ShoutOut.',
                'b. Structural & MEP Design': 'Advanced structure, plumbing, and electrical plans.',
                'c. Add-ons': 'Furniture layout, landscaping, and rainwater harvesting.'
            },
            'Civil Works': {
                'a. Formwork': 'High-quality molds for concrete work.',
                'b. Reinforcement Steel': 'Premium steel bars for extra strength.',
                'c. Concrete': 'Durable concrete mix for long life.',
                'd. Cement': 'Top brands for strong and lasting construction.',
                'e. Masonry': 'Lightweight blocks for walls, eco-friendly.',
                'f. External Plaster': 'Waterproof plaster for outer walls.',
                'g. Internal Plaster': 'Smooth finish with gypsum plaster.',
                'h. Ceiling Finish': 'Gypsum-based finish for a premium look.',
                'i. Waterproofing': 'Leak-proofing with advanced chemicals.',
                'j. Others': 'Anti-termite treatment for long-lasting protection.'
            },
            'Bathroom': {
                'a. Pipes': 'Hidden pipes for a clean look.',
                'b. Wall Tiles': 'Premium tiles up to 7 feet for easy cleaning.',
                'c. Floor Tiles': 'Anti-slip tiles for safety.',
                'd. Fixtures': 'High-quality bathroom fittings from top brands.'
            },
            'Electrical': {
                'a. Conduits': 'Fire-resistant PVC pipes for safe wiring.',
                'b. Wires & Cables': 'Flame-retardant wires for safety.',
                'c. Switches': 'Premium switches and sockets.'
            },
            'Doors & Windows': {
                'a. Main Door': 'Premium wooden door for security.',
                'b. Door Kit': 'High-quality handles and locks.',
                'c. Windows': 'Aluminum windows with tinted glass.'
            },
            'Kitchen': {
                'a. Countertop': 'Granite countertop for durability.',
                'b. Wall Tiles': 'Easy-to-clean tiles above the counter.',
                'c. Sink': 'Stainless steel sink with faucet.',
                'd. Modular Kitchen': 'Included in this package.'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Vitrified tiles for living areas and bedrooms.',
                'b. Painting': 'Premium interior and weatherproof exterior paint.'
            },
            'Add-On Features': {
                'a. Balcony': 'Stylish railing for safety.',
                'b. Entrance': 'Granite flooring and ramp for accessibility.',
                'c. False Ceiling': 'Designer false ceiling in living areas.',
                'd. Home Automation': 'Basic home automation included.'
            }
        }
    },
    platinum: {
        name: 'Platinum',
        rate: 2599,
        color: 'platinum',
        specs: {
            'Design': {
                'a. Architectural Design': 'Comprehensive site layout and building design by ShoutOut.',
                'b. Structural & MEP Design': 'Top-notch structure, plumbing, and electrical plans.',
                'c. Add-ons': 'Furniture layout, landscaping, rainwater harvesting, and HVAC.'
            },
            'Civil Works': {
                'a. Formwork': 'Premium molds for concrete work.',
                'b. Reinforcement Steel': 'Top-grade steel bars for maximum strength.',
                'c. Concrete': 'High-strength concrete mix for durability.',
                'd. Cement': 'Best brands for strong and lasting construction.',
                'e. Masonry': 'AAC blocks for walls, eco-friendly and durable.',
                'f. External Plaster': 'Waterproof plaster for outer walls.',
                'g. Internal Plaster': 'Smooth finish with gypsum plaster.',
                'h. Ceiling Finish': 'Gypsum-based finish for a premium look.',
                'i. Waterproofing': 'Leak-proofing with advanced chemicals.',
                'j. Others': 'Anti-termite treatment for long-lasting protection.'
            },
            'Bathroom': {
                'a. Pipes': 'Hidden pipes for a clean look.',
                'b. Wall Tiles': 'Luxury tiles up to 7 feet for easy cleaning.',
                'c. Floor Tiles': 'Anti-slip tiles for safety.',
                'd. Fixtures': 'Luxury bathroom fittings from top brands.'
            },
            'Electrical': {
                'a. Conduits': 'Fire-resistant PVC pipes for safe wiring.',
                'b. Wires & Cables': 'Flame-retardant wires for safety.',
                'c. Switches': 'Luxury switches and sockets.'
            },
            'Doors & Windows': {
                'a. Main Door': 'Luxury wooden door for security.',
                'b. Door Kit': 'Premium handles and locks.',
                'c. Windows': 'Aluminum windows with double glass.'
            },
            'Kitchen': {
                'a. Countertop': 'Premium granite countertop for durability.',
                'b. Wall Tiles': 'Easy-to-clean tiles above the counter.',
                'c. Sink': 'Double stainless steel sink with faucet.',
                'd. Modular Kitchen': 'Luxury modular kitchen included.'
            },
            'Flooring & Painting': {
                'a. Flooring': 'Italian marble for living areas and bedrooms.',
                'b. Painting': 'Luxury interior and weatherproof exterior paint.'
            },
            'Add-On Features': {
                'a. Balcony': 'Glass railing for a modern look.',
                'b. Entrance': 'Marble flooring and ramp for accessibility.',
                'c. False Ceiling': 'Designer false ceiling in all rooms.',
                'd. Home Automation': 'Advanced home automation included.'
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

// Material estimation formulas (approximate)
// These are industry-standard estimates and may vary based on design
function calculateMaterialEstimates(areaInSqFt, floors) {
    const floorCount = getFloorCount(floors);
    const totalBuiltUpArea = areaInSqFt * floorCount;
    
    // Cement bags (50kg each)
    const cementBags = Math.ceil(totalBuiltUpArea * MATERIAL_RATIOS.CEMENT_BAGS_PER_SQFT);
    
    // Bricks - assuming percentage of built-up area is walls
    const wallArea = totalBuiltUpArea * MATERIAL_RATIOS.WALL_AREA_RATIO;
    const bricks = Math.ceil(wallArea * MATERIAL_RATIOS.BRICKS_PER_SQFT_WALL);
    
    // TMT bars (in tons)
    const tmtBarsKg = totalBuiltUpArea * MATERIAL_RATIOS.TMT_BARS_KG_PER_SQFT;
    const tmtBars = (tmtBarsKg / MATERIAL_RATIOS.KG_TO_TONS).toFixed(AREA_CONVERSION_DECIMAL_PLACES);
    
    // Sand (in tons)
    const sandCuFt = totalBuiltUpArea * MATERIAL_RATIOS.SAND_CUFT_PER_SQFT;
    const sandKg = sandCuFt * MATERIAL_RATIOS.SAND_KG_PER_CUFT;
    const sand = (sandKg / MATERIAL_RATIOS.KG_TO_TONS).toFixed(AREA_CONVERSION_DECIMAL_PLACES);
    
    // Gravel/Aggregate (in tons)
    const gravelCuFt = totalBuiltUpArea * MATERIAL_RATIOS.GRAVEL_CUFT_PER_SQFT;
    const gravelKg = gravelCuFt * MATERIAL_RATIOS.GRAVEL_KG_PER_CUFT;
    const gravel = (gravelKg / MATERIAL_RATIOS.KG_TO_TONS).toFixed(AREA_CONVERSION_DECIMAL_PLACES);
    
    return {
        cementBags,
        bricks,
        tmtBars,
        sand,
        gravel,
        totalBuiltUpArea
    };
}

// Get floor count from floor selection
function getFloorCount(floors) {
    const floorMap = {
        'G': 1,
        'G+1': 2,
        'G+2': 3,
        'G+3': 4,
        'G+4': 5,
        'G+5': 6
    };
    return floorMap[floors] || 1;
}

// Convert area based on unit
function convertArea(area, unit) {
    if (unit === 'sqyard') {
        return area * SQYARD_TO_SQFT;
    }
    return area;
}

// Area conversion display
document.addEventListener('DOMContentLoaded', function() {
    const areaUnitSelect = document.getElementById('areaUnit');
    const plotAreaInput = document.getElementById('plotArea');
    const areaConversionDiv = document.getElementById('areaConversion');
    
    function updateAreaConversion() {
        const unit = areaUnitSelect.value;
        const area = parseFloat(plotAreaInput.value);
        
        if (!unit || !area) {
            areaConversionDiv.textContent = '';
            return;
        }
        
        if (unit === 'sqyard') {
            const sqft = area * SQYARD_TO_SQFT;
            areaConversionDiv.textContent = `≈ ${sqft.toLocaleString('en-IN')} sq.ft`;
        } else {
            const sqyard = (area / SQYARD_TO_SQFT).toFixed(AREA_CONVERSION_DECIMAL_PLACES);
            areaConversionDiv.textContent = `≈ ${sqyard} sq.yd`;
        }
    }
    
    if (areaUnitSelect && plotAreaInput && areaConversionDiv) {
        areaUnitSelect.addEventListener('change', updateAreaConversion);
        plotAreaInput.addEventListener('input', updateAreaConversion);
    }
});

// Form submission handler
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const customerName = document.getElementById('customerName').value.trim();
    const location = document.getElementById('location').value.trim();
    const areaUnit = document.getElementById('areaUnit').value;
    const plotArea = parseFloat(document.getElementById('plotArea').value);
    const floors = document.getElementById('floors').value;
    const packageType = document.getElementById('package').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate
    if (!customerName || !location || !areaUnit || !plotArea || !floors || !packageType) {
        showValidationError('Please fill in all required fields');
        return;
    }
    
    if (plotArea < MIN_PLOT_AREA) {
        showValidationError(`Plot area must be at least ${MIN_PLOT_AREA} ${areaUnit === 'sqyard' ? 'sq. yd' : 'sq. ft'}`);
        return;
    }
    
    // Convert area to sq.ft for calculation
    const areaInSqFt = convertArea(plotArea, areaUnit);
    
    // Generate estimation
    generateEstimation(customerName, location, plotArea, areaUnit, areaInSqFt, floors, packageType, email, phone);
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

function generateEstimation(customerName, location, plotArea, areaUnit, areaInSqFt, floors, packageType, email, phone) {
    const packageData = packageSpecs[packageType];
    const totalCost = areaInSqFt * packageData.rate;
    const randomFact = constructionFacts[Math.floor(Math.random() * constructionFacts.length)];
    
    // Calculate material estimates
    const materials = calculateMaterialEstimates(areaInSqFt, floors);
    
    // Sanitize user inputs
    customerName = escapeHtml(customerName);
    location = escapeHtml(location);
    email = email ? escapeHtml(email) : '';
    phone = phone ? escapeHtml(phone) : '';
    
    // Format area display
    const areaDisplay = areaUnit === 'sqyard' 
        ? `${plotArea.toLocaleString('en-IN')} sq. yd (${areaInSqFt.toLocaleString('en-IN')} sq. ft)`
        : `${plotArea.toLocaleString('en-IN')} sq. ft`;
    
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
            <p style="color: #7f8c8d; font-size: 1.1rem;">Detailed Package Specifications, Pricing & Material Requirements</p>
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
            <div class="info-row"><span class="info-label">Floors:</span> ${floors}</div>
        </div>

        <div class="construction-fact">
            💡 ${randomFact}
        </div>

        <div class="material-estimates">
            <h2>📊 Material Estimates</h2>
            <p style="color: #7f8c8d; margin-bottom: 20px;">Approximate material requirements for ${materials.totalBuiltUpArea.toLocaleString('en-IN')} sq. ft built-up area (${floors})</p>
            <div class="material-grid">
                <div class="material-card">
                    <div class="material-icon">🏗️</div>
                    <div class="material-name">Cement Bags</div>
                    <div class="material-value">${materials.cementBags.toLocaleString('en-IN')}</div>
                    <div class="material-unit">bags (50 kg each)</div>
                </div>
                <div class="material-card">
                    <div class="material-icon">🧱</div>
                    <div class="material-name">Bricks</div>
                    <div class="material-value">${materials.bricks.toLocaleString('en-IN')}</div>
                    <div class="material-unit">count</div>
                </div>
                <div class="material-card">
                    <div class="material-icon">⚙️</div>
                    <div class="material-name">TMT Bars</div>
                    <div class="material-value">${materials.tmtBars}</div>
                    <div class="material-unit">tons</div>
                </div>
                <div class="material-card">
                    <div class="material-icon">🏖️</div>
                    <div class="material-name">Sand</div>
                    <div class="material-value">${materials.sand}</div>
                    <div class="material-unit">tons</div>
                </div>
                <div class="material-card">
                    <div class="material-icon">🪨</div>
                    <div class="material-name">Gravel/Aggregate</div>
                    <div class="material-value">${materials.gravel}</div>
                    <div class="material-unit">tons</div>
                </div>
            </div>
            <p style="margin-top: 15px; color: #7f8c8d; font-size: 0.9rem; font-style: italic;">
                * These are approximate estimates based on industry standards. Actual requirements may vary based on structural design, soil conditions, and architectural specifications.
            </p>
        </div>

        <div class="specifications">
            <h2 style="text-align: center; margin-bottom: 30px; color: #2c3e50;">Detailed Specifications - ${packageData.name} Package</h2>
            
            ${generateSpecificationsSections(packageData.specs)}
        </div>

        <div class="cost-summary">
            <h2>Cost Summary</h2>
            <div class="cost-row">
                <span>Construction Area:</span>
                <span>${areaDisplay}</span>
            </div>
            <div class="cost-row">
                <span>Number of Floors:</span>
                <span>${floors}</span>
            </div>
            <div class="cost-row">
                <span>Total Built-up Area:</span>
                <span>${materials.totalBuiltUpArea.toLocaleString('en-IN')} sq. ft</span>
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
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I generated a construction estimation on ShoutOut. I would like to discuss the ' + packageData.name + ' package for ' + areaDisplay + ' (' + floors + ').')}" 
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
