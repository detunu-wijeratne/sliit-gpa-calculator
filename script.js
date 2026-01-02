/**
 * SLIIT Grading Scale
 * Defines the official SLIIT grading system with GPA values and marks ranges
 */
const GRADING_SCALE = {
    'A+': { gpa: 4.0, minMarks: 90, maxMarks: 100 },
    'A': { gpa: 4.0, minMarks: 80, maxMarks: 89 },
    'A-': { gpa: 3.7, minMarks: 75, maxMarks: 79 },
    'B+': { gpa: 3.3, minMarks: 70, maxMarks: 74 },
    'B': { gpa: 3.0, minMarks: 65, maxMarks: 69 },
    'B-': { gpa: 2.7, minMarks: 60, maxMarks: 64 },
    'C+': { gpa: 2.3, minMarks: 55, maxMarks: 59 },
    'C': { gpa: 2.0, minMarks: 45, maxMarks: 54 },
    'C-': { gpa: 1.7, minMarks: 40, maxMarks: 44 },
    'D+': { gpa: 1.3, minMarks: 35, maxMarks: 39 },
    'D': { gpa: 1.0, minMarks: 30, maxMarks: 34 },
    'E': { gpa: 0.0, minMarks: 0, maxMarks: 29 }
};

const GRADE_OPTIONS = Object.keys(GRADING_SCALE);

// DOM Elements
const yearSelect = document.getElementById('yearSelect');
const semesterSelect = document.getElementById('semesterSelect');
const modulesBody = document.getElementById('modulesBody');
const addModuleBtn = document.getElementById('addModuleBtn');
const gpaValue = document.getElementById('gpaValue');
const totalCredits = document.getElementById('totalCredits');
const deansListMessage = document.getElementById('deansListMessage');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const emptyState = document.getElementById('emptyState');

// Initialize
let moduleCount = 0;

// Add Module Row
function addModule() {
    moduleCount++;
    const row = document.createElement('tr');
    row.className = 'module-row';
    row.dataset.moduleId = moduleCount;
    
    row.innerHTML = `
        <td>
            <input type="text" class="module-name" placeholder="e.g., IT1010 – Programming Fundamentals" />
        </td>
        <td>
            <select class="module-grade">
                <option value="">Select Grade</option>
                ${GRADE_OPTIONS.map(grade => `<option value="${grade}">${grade}</option>`).join('')}
            </select>
        </td>
        <td>
            <input type="number" class="module-credits" min="0" step="0.5" placeholder="Credits" />
        </td>
        <td class="grade-points-cell">0.00</td>
        <td>
            <button class="remove-btn" onclick="removeModule(${moduleCount})">Remove</button>
        </td>
    `;
    
    modulesBody.appendChild(row);
    emptyState.classList.add('hidden');
    
    // Add event listeners
    const gradeSelect = row.querySelector('.module-grade');
    const creditsInput = row.querySelector('.module-credits');
    
    gradeSelect.addEventListener('change', () => {
        calculateGPA();
    });
    
    creditsInput.addEventListener('input', () => {
        calculateGPA();
    });
    
    // Focus on module name input
    row.querySelector('.module-name').focus();
}

// Remove Module Row
function removeModule(moduleId) {
    const row = document.querySelector(`tr[data-module-id="${moduleId}"]`);
    if (row) {
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            calculateGPA();
            updateEmptyState();
        }, 300);
    }
}

// Calculate GPA
function calculateGPA() {
    const rows = modulesBody.querySelectorAll('.module-row');
    let totalGradePoints = 0;
    let totalCreditsSum = 0;
    
    rows.forEach(row => {
        const grade = row.querySelector('.module-grade').value;
        const credits = parseFloat(row.querySelector('.module-credits').value) || 0;
        const gradePointsCell = row.querySelector('.grade-points-cell');
        
        if (grade && credits > 0 && GRADING_SCALE[grade]) {
            const gradePoints = GRADING_SCALE[grade].gpa * credits;
            totalGradePoints += gradePoints;
            totalCreditsSum += credits;
            gradePointsCell.textContent = gradePoints.toFixed(2);
        } else {
            gradePointsCell.textContent = '0.00';
        }
    });
    
    // Update total credits
    totalCredits.textContent = `Total Credits: ${totalCreditsSum}`;
    
    // Calculate GPA
    let gpa = 0;
    if (totalCreditsSum > 0) {
        gpa = totalGradePoints / totalCreditsSum;
    }
    
    // Update GPA display
    gpaValue.textContent = gpa.toFixed(2);
    gpaValue.classList.add('pulse');
    setTimeout(() => gpaValue.classList.remove('pulse'), 500);
    
    // Update Dean's List message
    updateDeansListMessage(gpa);
    
    // Enable/disable PDF download
    downloadPdfBtn.disabled = totalCreditsSum === 0 || rows.length === 0;
}

// Update Dean's List Message
function updateDeansListMessage(gpa) {
    if (gpa === 0) {
        deansListMessage.classList.add('hidden');
        return;
    }
    
    deansListMessage.classList.remove('hidden');
    
    if (gpa >= 3.7) {
        deansListMessage.className = 'deans-list-message success';
        deansListMessage.textContent = 'Congratulations! You are on the Dean\'s List 🎉';
    } else {
        deansListMessage.className = 'deans-list-message warning';
        deansListMessage.textContent = 'Keep going — you\'re improving! 💪';
    }
}

// Update Empty State
function updateEmptyState() {
    const rows = modulesBody.querySelectorAll('.module-row');
    if (rows.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

// Generate PDF Report
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colors (using RGB 0-255 format)
    const primaryColor = [0, 168, 255]; // Cyan blue
    const secondaryColor = [138, 43, 226]; // Purple
    const textColor = [50, 50, 50]; // Dark text
    const headerColor = [0, 168, 255]; // Cyan
    const successColor = [0, 150, 0]; // Green
    const warningColor = [255, 140, 0]; // Orange
    
    // Header
    doc.setTextColor(...headerColor);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('SLIIT GPA Calculator Report', 14, 25);
    
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 35);
    
    // Year & Semester
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...headerColor);
    doc.text(`${yearSelect.value} - ${semesterSelect.value}`, 14, 50);
    
    // Prepare table data
    const rows = modulesBody.querySelectorAll('.module-row');
    const tableData = [];
    let totalGradePoints = 0;
    let totalCreditsSum = 0;
    
    rows.forEach(row => {
        const name = row.querySelector('.module-name').value || 'N/A';
        const grade = row.querySelector('.module-grade').value || '-';
        const credits = parseFloat(row.querySelector('.module-credits').value) || 0;
        const gradePointsCell = row.querySelector('.grade-points-cell');
        let gradePoints = 0;
        
        if (grade && credits > 0 && GRADING_SCALE[grade]) {
            gradePoints = GRADING_SCALE[grade].gpa * credits;
            totalGradePoints += gradePoints;
            totalCreditsSum += credits;
        }
        
        tableData.push([
            name,
            grade,
            credits.toString(),
            gradePoints.toFixed(2)
        ]);
    });
    
    // Add table
    doc.autoTable({
        startY: 60,
        head: [['Module Name', 'Grade', 'Credits', 'Grade Points']],
        body: tableData,
        headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10
        },
        bodyStyles: {
            fillColor: [245, 245, 245],
            textColor: textColor,
            fontSize: 9
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        },
        styles: {
            lineColor: [200, 200, 200],
            lineWidth: 0.1
        },
        margin: { left: 14, right: 14 }
    });
    
    const finalY = doc.lastAutoTable.finalY + 15;
    
    // Summary
    const gpa = totalCreditsSum > 0 ? (totalGradePoints / totalCreditsSum) : 0;
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...textColor);
    doc.text('Summary', 14, finalY);
    
    doc.setFont(undefined, 'normal');
    doc.text(`Total Credits: ${totalCreditsSum}`, 14, finalY + 10);
    doc.text(`Total Grade Points: ${totalGradePoints.toFixed(2)}`, 14, finalY + 18);
    
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(`GPA: ${gpa.toFixed(2)}`, 14, finalY + 30);
    
    // Dean's List Status
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    if (gpa >= 3.7) {
        doc.setTextColor(...successColor);
        doc.text('Congratulations! You are on the Dean\'s List', 14, finalY + 45);
    } else {
        doc.setTextColor(...warningColor);
        doc.text('Keep going - you are improving!', 14, finalY + 45);
    }
    
    // Grading Scale (if space allows)
    const remainingSpace = doc.internal.pageSize.getHeight() - finalY - 70;
    if (remainingSpace > 80) {
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.setFont(undefined, 'bold');
        doc.text('SLIIT Grading Scale', 14, finalY + 70);
        
        const scaleData = Object.entries(GRADING_SCALE).map(([grade, scale]) => [
            grade,
            scale.gpa.toString(),
            `${scale.minMarks}–${scale.maxMarks}`
        ]);
        
        doc.autoTable({
            startY: finalY + 75,
            head: [['Grade', 'GPA Value', 'Marks Range']],
            body: scaleData,
            headStyles: {
                fillColor: secondaryColor,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9
            },
            bodyStyles: {
                fillColor: [245, 245, 245],
                textColor: textColor,
                fontSize: 8
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255]
            },
            styles: {
                lineColor: [200, 200, 200],
                lineWidth: 0.1
            },
            margin: { left: 14, right: 14 },
            tableWidth: 'wrap'
        });
    }
    
    // Save PDF
    const filename = `SLIIT_GPA_${yearSelect.value.replace(' ', '_')}_${semesterSelect.value.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
}

// Add fadeOut animation for removal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
addModuleBtn.addEventListener('click', addModule);
downloadPdfBtn.addEventListener('click', generatePDF);

// Initialize - add first module on load (optional, or start empty)
// Uncomment the line below if you want to start with one empty module row
// addModule();

