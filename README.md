# SLIIT GPA Calculator

A modern, responsive web application for calculating GPA based on the SLIIT grading system. Students can track their academic progress by year and semester, manage modules, and generate downloadable PDF reports.

![SLIIT GPA Calculator](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- ✅ **Year & Semester Selection** - Organize your academic progress by year and semester
- ✅ **Dynamic Module Management** - Add and remove modules dynamically
- ✅ **SLIIT Grading System** - Accurate GPA calculation using official SLIIT grading scale
- ✅ **Real-time GPA Calculation** - Instant updates as you add or modify modules
- ✅ **Dean's List Recognition** - Automatic detection when GPA ≥ 3.7
- ✅ **PDF Report Generation** - Download professional PDF reports with all your academic details
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Modern Dark Theme UI** - Beautiful gradient-based dark theme interface

## How to Use

1. **Select Academic Period**
   - Choose your Year (Year 1, 2, 3, or 4)
   - Select your Semester (Semester 1 or 2)

2. **Add Modules**
   - Click "Add Module" button
   - Enter module name/code
   - Select grade from dropdown
   - Enter credit value
   - Grade points are calculated automatically

3. **View GPA**
   - Your GPA updates automatically
   - Total credits are displayed
   - Dean's List status appears if GPA ≥ 3.7

4. **Download PDF Report**
   - Click "Download PDF Report" to generate and save your report
   - PDF includes all modules, grades, credits, and calculated GPA

## SLIIT Grading Scale

| Grade | GPA Value | Marks Range |
|-------|-----------|-------------|
| A+    | 4.0       | 90–100      |
| A     | 4.0       | 80–89       |
| A-    | 3.7       | 75–79       |
| B+    | 3.3       | 70–74       |
| B     | 3.0       | 65–69       |
| B-    | 2.7       | 60–64       |
| C+    | 2.3       | 55–59       |
| C     | 2.0       | 45–54       |
| C-    | 1.7       | 40–44       |
| D+    | 1.3       | 35–39       |
| D     | 1.0       | 30–34       |
| E     | 0.0       | 0–29        |

## GPA Calculation Formula

```
GPA = (Σ GradePoints × Credits) / (Σ Credits)
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **JavaScript (Vanilla)** - Functionality and interactivity
- **jsPDF** - PDF generation
- **jsPDF AutoTable** - Table generation in PDF

## Installation

1. Clone the repository:
```bash
git clone https://github.com/detunu-wijeratne/sliit-gpa-calculator.git
```

2. Navigate to the project directory:
```bash
cd sliit-gpa-calculator
```

3. Open `index.html` in your web browser:
   - Simply double-click the file, or
   - Use a local server (recommended):
     - Install Live Server extension in VS Code
     - Right-click `index.html` → Open with Live Server

## Usage

No installation or build process required! Just open `index.html` in a modern web browser and start calculating your GPA.

## Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Author

**detunu-wijeratne**

- GitHub: [@detunu-wijeratne](https://github.com/detunu-wijeratne)

## Acknowledgments

- SLIIT for the official grading system
- jsPDF and jsPDF AutoTable for PDF generation capabilities

---

Made with ❤️ for SLIIT students

