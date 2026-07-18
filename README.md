# AI&DS Student Management System

A modern, production-ready Student Management System exclusively for the **Department of Artificial Intelligence & Data Science**, AVS College of Technology, Salem.

---

## Features

### Authentication
- Firebase Authentication with role-based access
- Admin, Faculty, Student, and Parent roles
- Password reset, forgot password, session management

### Admin Dashboard
- Department overview with statistics
- Manage Students, Faculty, Parents
- Manage Subjects, Departments, Timetable
- Attendance overview and reports
- Marks management
- Events, Notices, Gallery management
- System settings, logs, backup/restore

### Faculty Dashboard
- Today's schedule and quick actions
- Mark attendance (one entry per student per day)
- Upload assignments and study materials
- Internal marks entry
- View student profiles and analytics
- Approve/reject leave requests

### Student Dashboard
- Attendance tracking with charts
- View assignments and study materials
- Timetable view
- Results/marks view
- Apply for leave
- View notices, events, gallery, achievements

### Parent Dashboard
- View child's attendance
- View department notices
- Check leave status
- Faculty contact information
- **No access to marks, CGPA, or GPA**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6 |
| Backend | Firebase (BaaS) |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Hosting | Firebase Hosting |

---

## Project Structure

```
Student-Management-System/
├── index.html                    # Home page
├── login.html                    # Login page
├── register.html                 # Registration page
├── firebase.json                 # Firebase hosting config
├── firestore.rules               # Firestore security rules
├── storage.rules                 # Storage security rules
├── assets/
│   ├── css/
│   │   ├── main.css              # Main stylesheet (imports all)
│   │   ├── variables.css         # CSS custom properties
│   │   ├── reset.css             # Reset & animations
│   │   ├── components.css        # Buttons, cards, forms, tables, modals
│   │   ├── layout.css            # Sidebar, header, grid, responsive
│   │   ├── auth.css              # Login/register page styles
│   │   └── home.css              # Home page styles
│   ├── js/
│   │   ├── app.js                # Core app functions
│   │   ├── auth.js               # Authentication module
│   │   ├── db.js                 # Firestore database module
│   │   ├── utils.js              # Utility functions
│   │   ├── toast.js              # Toast notifications
│   │   ├── theme.js              # Dark/Light mode
│   │   ├── charts.js             # Chart.js wrapper
│   │   ├── notifications.js      # Notifications panel
│   │   └── components.js         # Reusable UI components
│   ├── firebase/
│   │   └── config.js             # Firebase configuration
│   ├── images/
│   └── icons/
└── dashboard/
    ├── admin/                    # Admin pages (13 pages)
    ├── faculty/                  # Faculty pages (7 pages)
    ├── student/                  # Student pages (10 pages)
    └── parent/                   # Parent pages (8 pages)
```

---

## Setup Instructions

### 1. Clone the Project
```bash
git clone <repository-url>
cd Student-Management-System
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Enable Firebase Storage
6. Enable Firebase Hosting
7. Copy your Firebase config to `assets/firebase/config.js`

### 3. Configure Firebase
Edit `assets/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Deploy
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Deploy
firebase deploy
```

### 5. Create Admin Account
1. Register a new account through `register.html`
2. Manually set the user's role to `admin` in the Firestore `users` collection
3. Login as admin

---

## Color Palette

| Name | Color | Code |
|------|-------|------|
| Primary | Blue | `#2563EB` |
| Secondary | Dark | `#1E293B` |
| Accent | Cyan | `#06B6D4` |
| Success | Green | `#22C55E` |
| Danger | Red | `#EF4444` |
| Warning | Amber | `#F59E0B` |
| Background | Light Gray | `#F8FAFC` |

---

## Security

- Role-based access control (RBAC)
- Firestore Security Rules
- Input validation and sanitization
- XSS prevention
- Secure Firebase Storage rules
- Authentication required for all protected routes

---

## Responsive Design

- **Desktop:** Full sidebar + content layout
- **Tablet:** Collapsible sidebar
- **Mobile:** Hidden sidebar with hamburger menu

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Developer

**G. Nithiarasu**

### Special Credits
- **D. Kiruthika**
- **C. Amirtha Dharshini**

---

## Department

**Department of Artificial Intelligence & Data Science**
AVS College of Technology, Salem

---

&copy; 2026 AI&DS Student Management System. All rights reserved.
