Smart Savings Manager

DEMO : https://incomparable-florentine-201074.netlify.app/

Project Overview

Smart Savings Manager is a modern, full-stack web application built to empower users in managing their personal finances effortlessly. Whether you're a family head planning long-term savings, a student tracking EMIs, or a business owner seeking investment advice, this app provides intuitive tools for budgeting, financial calculations, investment exploration, and real-time chat support.

Key highlights:
- User-Friendly Interface: Clean, responsive design using React and Tailwind CSS.
- Secure & Role-Based: Supports three user roles (User, Admin, Financier) with tailored dashboards.
- Persistent Data: Powered by MongoDB for seamless data storage and retrieval.
- No External Dependencies: Runs locally with seeded demo data for instant testing.

This project was developed as a comprehensive demo of full-stack development, focusing on modularity, scalability, and user experience. It's perfect for learning or extending into a production app.

Target Users and Roles

The app is designed for diverse users in the financial management space. It supports three primary roles, each with tailored access:

1. End Users (Individuals): Families, students, freelancers, or small business owners. They register with a user type (e.g., family-man, bachelor, child) and salary to personalize budget tools. Access: Budget trackers, calculators, investments, and chat for advice.
   
2. Financiers (Advisors): Professional wealth planners or investment consultants. They respond to user queries via a dedicated dashboard. Access: Chat management, unread message tracking.

3. Admins (System Managers): Platform administrators handling content and support. They oversee schemes and user interactions. Access: Scheme CRUD, threaded message replies.

The app is primarily in English (user language), with potential for internationalization (i18n) via React libraries. No multi-language support yet, but UI strings are modular for easy translation.

Purpose of the Project

The core purpose of Smart Savings Manager is to democratize personal finance tools, making sophisticated budgeting and investment planning accessible to everyday users without needing expensive apps or advisors. By combining interactive visualizations (e.g., pie charts), quick calculators, and guided chat support, it bridges the gap between financial literacy and action. 

For developers, it serves as an educational blueprint: A complete MERN-stack (MongoDB, Express, React, Node) example showcasing authentication, real-time messaging, data persistence, and role-based UI. It promotes financial empowerment while demonstrating clean, maintainable code.

How Helpful to Humans

This project significantly aids human well-being in practical ways:

1. Financial Empowerment: Helps users allocate budgets wisely (e.g., ensuring 30% savings), calculate EMIs to avoid debt traps, and explore low-risk investments—potentially saving thousands in interest or missed opportunities. For a family earning $6,000/month, it visualizes "what if" scenarios to build wealth over time.

2. Accessibility & Education: Free, open-source tools lower barriers for underserved groups (e.g., students or low-income families). Chat with "advisors" simulates real guidance, fostering financial literacy without judgment.

3. Scalability for Good: Easily extensible for NGOs or educators to teach finance in schools/communities. By reducing financial stress (a top global mental health factor), it indirectly boosts productivity, family stability, and economic equity—ultimately contributing to happier, more secure lives.

In a world where 78% of adults live paycheck-to-paycheck (per recent surveys), apps like this promote proactive habits, turning "money anxiety" into confident control.

Features

Core User Features
- Authentication: Easy login/register with role selection. Users specify type (e.g., family-man) and salary during signup.
- Budget Tracker: Interactive sliders to allocate percentages across categories (Food, Education, Miscellaneous, Savings). Visualized with a dynamic SVG pie chart. Ensures total ≤ 100%.
- Financial Calculators:
  - EMI Calculator: Computes monthly payments based on principal, rate, and tenure.
  - Simple Interest Calculator: Calculates interest earned on principal over time.
- Investment Schemes: Browse, filter (by type: Post, LIC, New), and "download" performance charts (mock placeholders).
- Chat System: Direct messaging with Admins or Financiers. Unread counts and real-time-like updates.

Admin & Financier Features
- Admin Dashboard: Add/delete investment schemes, manage user messages in threaded view.
- Financier Dashboard: Respond to user queries via dedicated chat threads.

General
- Profile Editing: Update personal bio/statement.
- Landing Page: Hero section with quote, feedback testimonials, and contact details.
- Error Handling: User-friendly alerts for invalid actions (e.g., budget overflow).
- Responsive: Mobile-first design for all devices.

Tech Stack

Layer | Technologies
Frontend | React 18, Axios (API calls), Tailwind CSS, SVG for charts
Backend | Node.js, Express.js, Mongoose (ODM)
Database | MongoDB (local)
Other | CORS, dotenv, npm scripts for seeding

Prerequisites

Before setup, ensure you have:
- Node.js (v18 or higher) & npm (v8+)
- MongoDB (v4.4+; install and run locally as a service)
- Git for cloning

No additional databases or services needed—everything runs locally.

Quick Start Guide

1. Clone & Setup
git clone https://github.com/[YOUR_USERNAME]/smart-savings-manager.git
cd smart-savings-manager

2. Backend (API & Database)
cd backend
npm install
# Copy and edit .env (MONGODB_URI=mongodb://localhost:27017/smartsavings)
cp .env.example .env
# Seed demo data (users, schemes, messages)
npm run seed
# Start server (port 5000)
npm start
- Verify: Open http://localhost:5000/api/users in browser—should return JSON array.

3. Frontend (UI)
cd ../frontend
npm install
# Start dev server (port 3000; auto-proxies to backend)
npm start
- Open http://localhost:3000 in your browser.

4. Test the App
- Landing: Click "Get Started" → Auth page.
- Register: New user (e.g., username: testuser, password: pass123, type: family-man, salary: 5000).
- Login: Use seeded creds (see below).
- Explore: Home → Budget sliders → Calculators → Investments → Chat.

Seeded Demo Credentials:
Role | Username | Password | Profile/Notes
User | john_doe | user | Family man, $6000 salary
Admin | admin_root | admin | System admin; full scheme control
Financier | finan1 | fin1 | Senior Investment Advisor
Financier | finan2 | fin2 | Junior Wealth Planner

Project Structure

smart-savings-manager/
├── backend/                  # Express API
│   ├── models/               # Mongoose schemas (User, Scheme, Message)
│   ├── routes/               # API endpoints (users, schemes, messages)
│   ├── data/                 # Seeding script
│   ├── server.js             # Entry point
│   ├── package.json          # Backend deps
│   └── .env                  # Config (DB URI, port)
├── frontend/                 # React App
│   ├── public/               # Static assets (index.html)
│   ├── src/
│   │   ├── components/       # Pages & commons (Auth, Home, Chat, etc.)
│   │   ├── utils/            # API client, constants, pie chart util
│   │   ├── App.jsx           # Main router & state
│   │   ├── index.js          # Entry
│   │   └── index.css         # Global styles
│   └── package.json          # Frontend deps (proxy to backend)
└── README.md                 # This file!

API Reference

All endpoints under /api/:

Endpoint | Method | Description | Auth?
/users | GET | Fetch all users | No
/users/login | POST | Login (body: {username, password, role}) | No
/users/register | POST | Register user (body: {username, password, type, salary}) | No
/users/:id | PUT | Update user (e.g., budget) | Yes
/schemes | GET | Fetch schemes | No
/schemes | POST | Add scheme (admin) | Yes
/schemes/:id | DELETE | Delete scheme (admin) | Yes
/messages | GET | Fetch messages | No
/messages | POST | Send message | Yes
/messages/:id | PUT | Mark as read | Yes

Body examples in JSON; use tools like Postman for testing.

Troubleshooting

Issue | Solution
"Failed to load data" | Restart frontend (npm start). Ensure backend running. Check proxy in frontend/package.json.
MongoDB not connecting | Start MongoDB service (mongod). Verify .env URI.
Registration/Login fails | Check console for errors. Ensure seeded data loaded (npm run seed).
CORS/Proxy errors | Restart both servers. Use incognito mode.
Budget pie chart broken | Refresh; SVG renders client-side.
Chat not updating | Manual refresh after sending; no WebSockets (polling via reloads).

If stuck, check browser Network tab (F12) for failed requests or backend console logs.

Contributing

We love contributions! Here's how:
1. Fork the repo & clone your fork.
2. Install deps & run locally.
3. Create a branch: git checkout -b feature/your-feature.
4. Commit: git commit -m "Add your feature".
5. Push: git push origin feature/your-feature.
6. Open a Pull Request (PR) here.

- Guidelines: Follow ESLint/Prettier. Add tests if possible.
- Issues: Report bugs or suggest features via GitHub Issues.

License

This project is MIT licensed. See LICENSE for details. Free to use, modify, and distribute.

Acknowledgments

- Inspiration: Personal finance apps like Mint/YNAB.
- Assets: Unsplash (hero bg), placehold.co (charts).
- Built With: xAI's Grok for initial code gen & debugging.

Questions? Open an issue or ping the maintainer.

Updated: October 05, 2025
Stars: ⭐ Fork: 🍴
