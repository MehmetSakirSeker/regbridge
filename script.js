// Color-code staff counts based on value
function colorCodeStaffCounts() {
    const staffCounts = document.querySelectorAll('.staff-count');
    staffCounts.forEach(element => {
        const count = parseInt(element.textContent);
        
        if (count <= 4) {
            element.style.background = 'rgba(243, 181, 0, 0.8)';
            element.title = 'Low staffing level (3-4)';
        } else if (count <= 7) {
            element.style.background = 'rgba(30, 136, 229, 0.8)';
            element.title = 'Standard staffing level (5-7)';
        } else {
            element.style.background = 'rgba(67, 160, 71, 0.8)';
            element.title = 'Peak staffing level (8-10)';
        }
    });
}

// Violation Details Data
const regulationViolations = [
    {
        id: 1,
        title: "Excessive Working Hours - Dr. Ahmet Kaya",
        severity: "critical",
        description: "Doctor worked 47 hours per week in violation of regulations. Maximum allowed is 45 hours per week.",
        date: "2024-12-23",
        time: "14:32",
        department: "Emergency",
        details: {
            limit: "45 hours/week",
            actual: "47 hours/week",
            excess: "2 hours",
            period: "Dec 21-27, 2024"
        },
        impact: ["Worker Safety", "Patient Care Quality", "Labor Compliance"]
    },
    {
        id: 2,
        title: "Equipment Shortage - Defibrillator",
        severity: "critical",
        description: "In the Emergency Department, 1 of the required 3 defibrillators is under maintenance. Minimum 2 operational units required.",
        date: "2024-12-22",
        time: "09:15",
        department: "Emergency",
        details: {
            required: "3 units",
            operational: "2 units",
            maintenance: "1 unit",
            riskLevel: "High"
        },
        impact: ["Patient Safety", "Emergency Response Capacity", "Regulation Compliance"]
    },
    {
        id: 3,
        title: "Night Shift - Nurse Ratio",
        severity: "warning",
        description: "ICU night shift nurse-to-patient ratio is 1:3.5, but regulations require maximum 1:3 ratio.",
        date: "2024-12-21",
        time: "22:48",
        department: "Intensive Care Unit",
        details: {
            required: "1:3 ratio",
            actual: "1:3.5 ratio",
            nurses: "4 nurses",
            patients: "14 patients"
        },
        impact: ["Care Quality", "Nurse Workload", "Patient Safety"]
    },
    {
        id: 4,
        title: "Night Shift Duration Exceeded - Nurse Aişe Yilmaz",
        severity: "warning",
        description: "Nurse was assigned to night shift for 8 hours without consent. Maximum 7.5 hours allowed without written consent.",
        date: "2024-12-20",
        time: "06:22",
        department: "Cardiology",
        details: {
            limit: "7.5 hours (no consent)",
            actual: "8 hours",
            excess: "0.5 hours",
            date: "Dec 20, 2024"
        },
        impact: ["Worker Health", "Protection Regulations"]
    },
    {
        id: 5,
        title: "Bed Capacity - Observation Beds",
        severity: "info",
        description: "Observation beds comprise 26.5% of total capacity. Maximum allowed is 25% per regulations.",
        date: "2024-12-19",
        time: "12:00",
        department: "Hospital Administration",
        details: {
            limit: "≤ 25%",
            actual: "26.5%",
            excess: "1.5%",
            beds: "8/300 total beds"
        },
        impact: ["Resource Management", "Planning"]
    },
    {
        id: 6,
        title: "Ambulance Maintenance Status",
        severity: "info",
        description: "1 ambulance was scheduled for preventive maintenance. System checks and updates in progress.",
        date: "2024-12-18",
        time: "10:30",
        department: "Transport Services",
        details: {
            total: "5 ambulances",
            operational: "4 ambulances",
            maintenance: "1 ambulance",
            duration: "3-4 hours"
        },
        impact: ["Operational Readiness"]
    }
];

// Real-time Clock
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('tr-TR', options);
    document.getElementById('datetime').textContent = dateTimeString;
    document.getElementById('footer-time').textContent = dateTimeString;
}

// Update date-time on page load and every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Filter buttons functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        filterScheduleByDepartment(filter);
    });
});

// Filter schedule by department
function filterScheduleByDepartment(filter) {
    const rows = document.querySelectorAll('.dept-row');
    rows.forEach(row => {
        if (filter === 'all') {
            row.style.display = '';
        } else {
            if (row.classList.contains(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Sidebar navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Equipment filter
const equipmentFilter = document.querySelector('.equipment-filter');
if (equipmentFilter) {
    equipmentFilter.addEventListener('change', function() {
        const filter = this.value;
        filterEquipment(filter);
    });
}

function filterEquipment(type) {
    const cards = document.querySelectorAll('.equipment-card');
    cards.forEach(card => {
        if (type === 'All Equipment') {
            card.style.display = '';
        } else {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(type.toLowerCase())) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Search functionality for staff table
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    searchBox.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('.staff-table tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Alert buttons functionality
document.querySelectorAll('.btn-small').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const alertItem = this.closest('.alert-item');
        const alertTitle = alertItem.querySelector('h4').textContent;
        showNotification(`Action: ${alertTitle}`, 'success');
    });
});

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : '#1e88e5'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Generate Schedule button
const generateBtn = document.querySelector('.btn-primary');
if (generateBtn) {
    generateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generateSchedule();
    });
}

function generateSchedule() {
    showNotification('🔄 Generating new schedule based on regulations...', 'info');
    
    // Simulate schedule generation
    setTimeout(() => {
        updateScheduleMetrics();
        showNotification('✓ Schedule generated successfully!', 'success');
    }, 2000);
}

// Update schedule metrics (simulated)
function updateScheduleMetrics() {
    // Simulate metric updates
    const randomCompliance = Math.floor(Math.random() * 5 + 96);
    const metricCards = document.querySelectorAll('.metric-value');
    
    if (metricCards[1]) {
        metricCards[1].textContent = randomCompliance + '%';
    }
}

// Add hover effects to staff table
const staffRows = document.querySelectorAll('.staff-table tbody tr');
staffRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f0f4ff';
    });
    row.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});

// Simulate real-time equipment updates
function simulateEquipmentUpdates() {
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach((card, index) => {
        // Randomly update some equipment status
        if (Math.random() > 0.7) {
            const statusBadge = card.querySelector('.equipment-status');
            const lastUpdated = card.querySelector('p:nth-child(3)');
            
            if (statusBadge) {
                const statuses = ['available', 'in-use', 'maintenance'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                statusBadge.className = `equipment-status ${newStatus}`;
                
                const statusTexts = {
                    'available': 'Available',
                    'in-use': 'In Use',
                    'maintenance': 'Maintenance'
                };
                statusBadge.textContent = statusTexts[newStatus];
            }
            
            if (lastUpdated) {
                lastUpdated.innerHTML = '<strong>Last Updated:</strong> Just now';
            }
        }
    });
}

// Simulate equipment updates every 10 seconds
setInterval(simulateEquipmentUpdates, 10000);

// Analytics chart animation
function animateCharts() {
    const svgs = document.querySelectorAll('.chart-placeholder svg');
    
    svgs.forEach(svg => {
        svg.style.opacity = '0';
        svg.style.animation = 'fadeIn 1s ease-out forwards';
    });
}

// Call animate charts when page loads
window.addEventListener('load', animateCharts);

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Compliance score animation
function animateComplianceScore() {
    const scoreElement = document.querySelectorAll('.metric-value')[1];
    if (scoreElement && scoreElement.textContent.includes('%')) {
        const startValue = 90;
        const endValue = parseInt(scoreElement.textContent);
        const duration = 1000; // 1 second
        const steps = 60;
        const increment = (endValue - startValue) / steps;
        let current = startValue;
        let step = 0;
        
        const interval = setInterval(() => {
            if (step < steps) {
                current += increment;
                scoreElement.textContent = Math.floor(current) + '%';
                step++;
            } else {
                scoreElement.textContent = endValue + '%';
                clearInterval(interval);
            }
        }, duration / steps);
    }
}

// Performance metrics
const performanceMetrics = {
    getComplianceScore: () => {
        return Math.floor(Math.random() * 5) + 96;
    },
    
    getStaffUtilization: (department) => {
        const baseUtilization = {
            'Emergency': 88,
            'ICU': 92,
            'Surgery': 76,
            'Pharmacy': 85
        };
        return baseUtilization[department] || 80;
    },
    
    getEquipmentStatus: () => {
        return {
            available: 142,
            inUse: 12,
            maintenance: 2
        };
    }
};

// Dynamic alerts simulation
function generateRandomAlert() {
    const alertTypes = [
        {
            type: 'high',
            icon: '🚨',
            title: 'High Aggression Risk Detected',
            desc: 'Department: Emergency Room',
            action: 'Additional security staff redirected'
        },
        {
            type: 'medium',
            icon: '⚠️',
            title: 'Equipment Maintenance Due',
            desc: 'Resource: Ambulance #3',
            action: 'Scheduled for maintenance'
        },
        {
            type: 'low',
            icon: 'ℹ️',
            title: 'Staff Shift Upcoming',
            desc: 'Emergency Department',
            action: 'Shift starts in 30 minutes'
        }
    ];
    
    return alertTypes[Math.floor(Math.random() * alertTypes.length)];
}

// Initialize tooltips for additional info
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.85rem;
                z-index: 1000;
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.left = (rect.left - tooltip.offsetWidth / 2 + rect.width / 2) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(t => t.remove());
        });
    });
}

// Log performance metrics to console
function logPerformanceMetrics() {
    console.log('=== RegBridge Performance Metrics ===');
    console.log('Compliance Score:', performanceMetrics.getComplianceScore() + '%');
    console.log('Equipment Status:', performanceMetrics.getEquipmentStatus());
    console.log('System Time:', new Date().toLocaleTimeString('tr-TR'));
}

// Call on page load
window.addEventListener('load', function() {
    colorCodeStaffCounts();
    animateComplianceScore();
    initializeTooltips();
    logPerformanceMetrics();
});

// Violation Details Modal Functions
function renderViolations() {
    const violationsList = document.getElementById('violationsList');
    violationsList.innerHTML = '';
    
    // Label translations to English
    const labelTranslations = {
        'limit': 'Limit',
        'actual': 'Actual',
        'excess': 'Excess',
        'period': 'Period',
        'required': 'Required',
        'operational': 'Operational',
        'maintenance': 'Maintenance',
        'riskLevel': 'Risk Level',
        'nurses': 'Nurses',
        'patients': 'Patients',
        'date': 'Date',
        'duration': 'Duration',
        'total': 'Total',
        'beds': 'Beds'
    };
    
    regulationViolations.forEach(violation => {
        const violationItem = document.createElement('div');
        violationItem.className = `violation-item ${violation.severity}`;
        
        let detailsHTML = '';
        for (const [key, value] of Object.entries(violation.details)) {
            const translatedLabel = labelTranslations[key] || key;
            detailsHTML += `
                <div class="detail-item">
                    <span class="detail-label">${translatedLabel}</span>
                    <span class="detail-value">${value}</span>
                </div>
            `;
        }
        
        let impactHTML = violation.impact.map(i => `<span class="impact-badge">📌 ${i}</span>`).join('');
        
        violationItem.innerHTML = `
            <div class="violation-header">
                <h3 class="violation-title">${violation.title}</h3>
                <span class="violation-severity ${violation.severity}">${violation.severity === 'critical' ? 'Critical' : violation.severity === 'warning' ? 'Warning' : 'Information'}</span>
            </div>
            <p class="violation-description">${violation.description}</p>
            <div class="violation-details">
                ${detailsHTML}
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 0.8rem; font-size: 0.85rem; color: var(--text-secondary);">
                <span>📅 ${violation.date}</span>
                <span>⏰ ${violation.time}</span>
                <span>🏥 ${violation.department}</span>
            </div>
            <div class="violation-impact">${impactHTML}</div>
        `;
        
        violationsList.appendChild(violationItem);
    });
}

function openViolationModal() {
    const modal = document.getElementById('violationModal');
    renderViolations();
    modal.classList.add('active');
}

function closeViolationModal() {
    const modal = document.getElementById('violationModal');
    modal.classList.remove('active');
}

// Violation Modal Event Listeners
document.getElementById('violationDetailsBtn').addEventListener('click', openViolationModal);
document.getElementById('closeViolationBtn').addEventListener('click', closeViolationModal);
document.getElementById('closeViolationModal').addEventListener('click', closeViolationModal);

// Close modal when clicking outside
document.getElementById('violationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeViolationModal();
    }
});

// Alert Details Data
const alertsData = {
    1: {
        id: 1,
        title: 'High Aggression Risk Detected',
        severity: 'high',
        icon: '🚨',
        department: 'Emergency Room',
        timestamp: '2024-12-25 14:32:15',
        description: 'AI-powered image processing detected high-risk behavioral patterns in the Emergency Room.',
        details: [
            { label: 'Risk Level', value: 'Critical (95%)' },
            { label: 'Location', value: 'Emergency Room - Zone A' },
            { label: 'Detected At', value: '14:30:45' },
            { label: 'Response Time', value: '1.2 minutes' }
        ],
        actions: ['View Footage', 'Increase Security', 'Alert Staff'],
        status: 'Active Response'
    },
    2: {
        id: 2,
        title: 'Equipment Maintenance Due',
        severity: 'medium',
        icon: '⚠️',
        department: 'Transport Services',
        timestamp: '2024-12-25 14:17:30',
        description: 'Ambulance #3 has reached its scheduled maintenance interval.',
        details: [
            { label: 'Equipment', value: 'Ambulance #3' },
            { label: 'Current Status', value: 'Operational' },
            { label: 'Maintenance Type', value: 'Routine Service' },
            { label: 'Estimated Duration', value: '4-5 hours' }
        ],
        actions: ['Schedule Today', 'Schedule Tomorrow', 'Postpone 1 Week'],
        status: 'Pending Scheduling'
    },
    3: {
        id: 3,
        title: 'Staff Shift Upcoming',
        severity: 'low',
        icon: 'ℹ️',
        department: 'Emergency Department',
        timestamp: '2024-12-25 14:00:00',
        description: 'Scheduled staff member approaching their shift start time.',
        details: [
            { label: 'Staff Member', value: 'Dr. Fatima Abbas' },
            { label: 'Position', value: 'Emergency Medicine Specialist' },
            { label: 'Shift Start', value: '14:30' },
            { label: 'Duration', value: '8 hours' }
        ],
        actions: ['Send Reminder', 'Confirm Availability'],
        status: 'Awaiting Confirmation'
    }
};

// Alert Modal Functions
function openAlertDetails(alertId) {
    const alert = alertsData[alertId];
    if (!alert) return;

    const header = document.getElementById('alertModalHeader');
    const body = document.getElementById('alertModalBody');
    const actions = document.getElementById('alertModalActions');

    // Update header
    header.style.background = alert.severity === 'high' ? 'linear-gradient(135deg, var(--danger-color), #d32f2f)' :
                              alert.severity === 'medium' ? 'linear-gradient(135deg, var(--warning-color), #f57c00)' :
                              'linear-gradient(135deg, var(--primary-color), #1565c0)';
    header.innerHTML = `<h2>${alert.icon} ${alert.title}</h2><button class="modal-close" id="closeAlertModal">&times;</button>`;

    // Update body
    let detailsHTML = '<div class="alert-details-content">';
    detailsHTML += `<p class="alert-description">${alert.description}</p>`;
    detailsHTML += '<div class="alert-details-grid">';
    
    alert.details.forEach(detail => {
        detailsHTML += `
            <div class="alert-detail-item">
                <span class="alert-detail-label">${detail.label}</span>
                <span class="alert-detail-value">${detail.value}</span>
            </div>
        `;
    });
    
    detailsHTML += '</div>';
    detailsHTML += `<div class="alert-status-badge alert-status-${alert.severity}">${alert.status}</div>`;
    detailsHTML += '</div>';
    
    body.innerHTML = detailsHTML;

    // Update action buttons
    let actionsHTML = '';
    alert.actions.forEach((action, index) => {
        actionsHTML += `<button class="btn btn-primary" onclick="handleAlertAction(${alertId}, ${index}, '${action}')" style="margin-right: 0.5rem;">${action}</button>`;
    });
    actions.innerHTML = actionsHTML;

    // Open modal
    const modal = document.getElementById('alertModal');
    modal.classList.add('active');

    // Attach close button handler
    document.getElementById('closeAlertModal').addEventListener('click', closeAlertModal);
}

function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    modal.classList.remove('active');
}

function handleAlertAction(alertId, actionIndex, actionName) {
    const alert = alertsData[alertId];
    showNotification(`Action: ${actionName} - ${alert.title}`, 'success');
    closeAlertModal();
}

// Notification Toast
function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    toast.textContent = message;
    toast.className = `notification-toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Alert Button Handlers
document.addEventListener('DOMContentLoaded', function() {
    // View Details buttons
    document.querySelectorAll('.alert-btn-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const alertId = this.getAttribute('data-alert-id');
            openAlertDetails(alertId);
        });
    });

    // Reschedule buttons
    document.querySelectorAll('.alert-btn-reschedule').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const alertId = this.getAttribute('data-alert-id');
            openAlertDetails(alertId);
        });
    });

    // Notify buttons
    document.querySelectorAll('.alert-btn-notify').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const alertId = this.getAttribute('data-alert-id');
            openAlertDetails(alertId);
        });
    });

    // Close alert modal outside
    document.getElementById('alertModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAlertModal();
        }
    });

    document.getElementById('closeAlertBtn').addEventListener('click', closeAlertModal);
});

// Sidebar Navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all sidebar items
        document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get the target section
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // Smooth scroll to the section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a brief highlight effect to the section
            targetSection.style.animation = 'none';
            setTimeout(() => {
                targetSection.style.animation = 'sectionHighlight 0.6s ease-out';
            }, 10);
        }
    });
});

// Export functions for testing
window.RegBridge = {
    performanceMetrics,
    filterScheduleByDepartment,
    filterEquipment,
    generateSchedule,
    showNotification,
    openViolationModal,
    closeViolationModal,
    openAlertDetails,
    closeAlertModal,
    handleAlertAction
};

// Sidebar Navigation (Tab Yapısı)
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Sayfanın zıplamasını engelle
        
        // 1. Sidebar'daki aktif sınıfını güncelle
        document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // 2. Hedeflenen bölümün ID'sini al
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // 3. Tüm section'lardan 'active' sınıfını kaldır (Hepsini gizle)
            document.querySelectorAll('main.content > section').forEach(section => {
                section.classList.remove('active');
            });

            // 4. Sadece hedeflenen section'a 'active' ekle (Görünür yap)
            targetSection.classList.add('active');
            
            // Sayfanın en üstüne atmasın diye scrollu yumuşakça içeriğin başına alabiliriz
            document.querySelector('.main-container').scrollTop = 0;
        }
    });
});

/* --------------------
   Floorplan simulation
   - Creates 5-6 example assets (sedye / tekerlekli sandalye)
   - Places them into rooms
   - Every 2s moves a random asset to a random room via appendChild
   - Hover shows the asset name (using title)
   -------------------- */
(function() {
    const assets = [
        { id: 's1', type: 'stretcher', name: 'Sedye S-001' },
        { id: 's2', type: 'wheelchair', name: 'Tekerlekli W-042' },
        { id: 's3', type: 'stretcher', name: 'Sedye S-002' },
        { id: 's4', type: 'wheelchair', name: 'Tekerlekli W-010' },
        { id: 's5', type: 'stretcher', name: 'Sedye S-003' },
        { id: 's6', type: 'wheelchair', name: 'Tekerlekli W-099' }
    ];

    const roomIds = [
        'kantin','kanbankasi','ameliyathane','yanik','poliklinik-giris',
        'buyuk-acil','koridor-ust','ortopedi','rontgen',
        'koridor-orta','laboratuvar','eczane',
        'koridor-alt','ptt','bekleme'
    ];

    // adjacency map for the detailed layout (approximate neighbors)
    const adjacency = {
        'kantin': ['kanbankasi','buyuk-acil'],
        'kanbankasi': ['kantin','ameliyathane','buyuk-acil'],
        'ameliyathane': ['kanbankasi','yanik','koridor-ust'],
        'yanik': ['ameliyathane','poliklinik-giris','koridor-ust'],
        'poliklinik-giris': ['yanik','rontgen'],
        'buyuk-acil': ['kantin','kanbankasi','koridor-ust','koridor-orta'],
        'koridor-ust': ['buyuk-acil','ameliyathane','ortopedi','rontgen','koridor-orta'],
        'ortopedi': ['koridor-ust','rontgen','koridor-orta'],
        'rontgen': ['koridor-ust','ortopedi','poliklinik-giris','koridor-orta'],
        'koridor-orta': ['buyuk-acil','koridor-ust','rontgen','laboratuvar','eczane','koridor-alt'],
        'laboratuvar': ['koridor-orta','eczane','koridor-alt'],
        'eczane': ['koridor-orta','laboratuvar','koridor-alt'],
        'koridor-alt': ['koridor-orta','laboratuvar','eczane','ptt','bekleme'],
        'ptt': ['koridor-alt','bekleme'],
        'bekleme': ['ptt','koridor-alt']
    };

    function createDot(item) {
        const el = document.createElement('div');
        el.className = `dot ${item.type}`;
        el.dataset.id = item.id;
        el.title = item.name; // native tooltip on hover
        return el;
    }

    function placeInitial() {
        const containers = roomIds.map(id => document.querySelector(`.room[data-room-id="${id}"] .room-inner`));
        assets.forEach((asset, idx) => {
            const dot = createDot(asset);
            asset.el = dot;
            // round-robin initial placement for predictability
            const container = containers[idx % containers.length] || containers[0];
            if (container) container.appendChild(dot);
        });
    }

    // Move each asset to a random neighboring room every 5 seconds
    function moveAssetsToNeighbor() {
        assets.forEach(asset => {
            if (!asset.el) return;
            const currentRoomEl = asset.el.closest('.room');
            const currentId = currentRoomEl ? currentRoomEl.dataset.roomId : null;
            const neighbors = adjacency[currentId] || roomIds;
            const targetId = neighbors[Math.floor(Math.random() * neighbors.length)];
            const targetContainer = document.querySelector(`.room[data-room-id="${targetId}"] .room-inner`);
            if (targetContainer) targetContainer.appendChild(asset.el);
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        placeInitial();
        setInterval(moveAssetsToNeighbor, 5000);
    });
})();