# Teacher Management Web App

A modern, responsive teacher management system built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Easily manage teachers, students, schedules, and payments with a clean, accessible UI.

## 📺 Demo & Walkthrough

- **🎥 Loom Video Walkthrough:** [Watch the full demo](https://www.loom.com/share/a7f194d3777443d4a7384dbbbdc245c0?sid=f1f4f1a0-9d1b-4458-8e4c-ab6d7c379e0f)
- **🌐 Live Website:** [Visit the deployed app](https://teacher-management-kmk.netlify.app)

---

## Features

- **Teacher Profiles:**

  - View and edit teacher details, including multiple emails, phones, and addresses.
  - Qualifications management (private and group).

- **Student Management:**

  - View all students and their assigned teachers.
  - Responsive tables and cards.

- **Schedule & Calendar:**

  - Weekly schedule view with mock data.
  - Tabs for Availability, Unavailabilities, Schedule, and more.

- **Payments:**

  - Modern payment form with validation, loading states, and user feedback.
  - Accessible from the sidebar.

- **Responsive Sidebar & Header:**

  - Mobile-first sidebar with hamburger menu.
  - Smooth transitions and adaptive layout.

- **Accessibility:**

  - Keyboard navigation, ARIA attributes, and color contrast.
  - Semantic HTML and screen reader support.

- **LocalStorage Persistence:**
  - Edits to teacher profiles are saved locally for a seamless experience.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/KHAJAMOINUDDINKHADRI/teacher-management.git
cd teacher-management
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build for Production

```bash
npm run build
npm start
```

---

## Linting & Type Checking

```bash
npm run lint
```

TypeScript is enabled with strict settings for maximum type safety.

---

## Project Structure

```
src/
  app/                # Next.js app directory (pages, layout, etc.)
  components/         # Reusable React components (Sidebar, Header, PaymentForm, etc.)
  data/               # Mock data for teachers, students, schedules
  styles/             # Global styles (if any)
public/               # Static assets
```

---

## Accessibility

- All forms and interactive elements are keyboard accessible.
- ARIA attributes and roles are used for screen readers.
- Color contrast meets WCAG guidelines.
- Semantic HTML is used throughout.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Enjoy managing your teachers and students with ease!**
