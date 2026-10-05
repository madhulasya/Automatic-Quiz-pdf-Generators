# 🎓 DevQuiz Engine & PDF Certificate Generator

A frontend-only, offline-ready Quiz Engine web application built with **React**, **Tailwind CSS**, and **jsPDF**. 

**No backend, no database required.** All data persists seamlessly in the browser's `localStorage`.

---

## ✨ Features

- 🔐 **Local Authentication**: Full Name, Email, and Password signup with unique email validation, login, and forgot password flow stored in `localStorage`.
- ⚡ **Technical & Coding Quizzes**: Pre-populated technical quizzes (JavaScript, React, Python, DSA, Web Dev, SQL, OOP, Coding Logic, TypeScript) featuring real-world code snippets and explanations.
- ⏱️ **Timed Assessments**: Real-time countdown timer, question navigation palette, flag-for-review, and auto-submit.
- 📜 **Instant PDF Certificate Generation**: Dynamic client-side PDF certificates of achievement generated using `jsPDF` with candidate name, quiz title, score percentage, date, and unique verification tokens.
- 📊 **Executive Dashboard & History**: Summary statistics (Quizzes Taken, Average Score %, Certificates Earned, Pass Rate), filterable history table, and recent activity feed.
- 🎨 **Minimal White & Blue Aesthetic**: Clean modern developer UI built with Tailwind CSS and Lucide icons.

---

## 🛠️ Tech Stack

- **React 18** (Hooks & Context API)
- **React Router v6**
- **Tailwind CSS**
- **Lucide React** (Icons)
- **jsPDF** (Client-side PDF generation)
- **React Hot Toast** (Notifications)
- **Canvas Confetti** (Celebration animations)
- **Vite** (Fast build tool & dev server)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd "Quiz-PDF Generator"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🔑 Quick Demo Login

You can use the **"Fill Demo"** button on the login screen or manually enter:
- **Email:** `demo@devquiz.io`
- **Password:** `password123`

---

## 📁 Storage Keys in LocalStorage

- `quiz_users`: Array of registered users `{ name, email, password, joinedAt }`
- `quiz_currentUser`: Currently logged in session `{ name, email, joinedAt }`
- `quiz_data`: Technical assessment question bank
- `quiz_attempts`: Attempt records with scores, answers, dates, and certificate metadata
