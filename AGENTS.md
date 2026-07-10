# AGENTS.md

Instructions for AI coding agents working on the Low Budget Traffic School platform.

This project is a California-compliant online traffic school system built with Next.js and TypeScript. Accuracy, compliance, and stability matter more than speed.

---

## Project overview

This platform delivers online traffic school courses with:

• Seat-time enforcement  
• Quiz integrity controls  
• Certificate generation  
• Student progress tracking  
• Admin reporting tools  

All code changes must preserve California DMV compliance expectations.

---

## Setup commands

Install dependencies

npm install

Start dev server

npm run dev

Build production

npm run build

Run production locally

npm run start

Run tests

npm run test

---

## Code style

• TypeScript strict mode enabled  
• Single quotes only  
• No semicolons  
• Prefer functional components and pure functions  
• No any types unless explicitly justified  
• Use descriptive variable names, not abbreviations  

---

## Environment requirements

Project requires the following variables in .env.local

DATABASE_URL=
JWT_SECRET=
EMAIL_SMTP_HOST=
EMAIL_SMTP_USER=
EMAIL_SMTP_PASS=
CERTIFICATE_STORAGE_PATH=

Agents must never commit real secrets.

---

## Database rules

• All schema changes must include migration scripts  
• Never drop production tables  
• Preserve student record history for auditability  

---

## Testing instructions

Before finishing any task:

npm run lint
npm run test

All tests must pass.

When touching authentication, certificates, or quizzes, add or update tests.

---

## Compliance safeguards

Agents must never remove or weaken:

• Seat-time validation logic  
• Final exam lockout rules  
• Certificate generation audit trails  
• Student progress verification steps  

If uncertain, halt and report.

---

## Security constraints

• No plaintext passwords anywhere  
• Use hashing and token expiration  
• Never log sensitive student data  
• Sanitize all user input  

---

## Pull request instructions

• Title format: [traffic-school] Short description  
• Include a clear summary of compliance impact  
• Confirm npm run lint and npm run test were executed  

---

## Red flags

If a requested change could:

• Break DMV compliance  
• Expose student data  
• Affect certificate validity  

Stop and request clarification instead of proceeding.
