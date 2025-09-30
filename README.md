# Lynkio

**Lynkio** is a modern URL shortener and QR code generator built with **Next.js**, **Tailwind CSS**, and **Supabase**. It allows users to quickly shorten links, copy them, and generate customizable QR codes, all with a clean, responsive interface.

---

## Features

- Shorten URLs instantly.
- Copy shortened links to clipboard with one click.
- Generate QR codes for any URL.
- Customize QR codes with colors.
- Light/Dark theme support.
- Responsive design for mobile and desktop.
- Simple backend powered by Supabase (PostgreSQL).

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Supabase
- **Testing:** Playwright for end-to-end tests
- **Deployment:** Vercel

---

## Getting Started

### Requirements

- Node.js (LTS recommended)
- pnpm

### Installation

```bash
git clone https://github.com/yourusername/lynkio.git
cd lynkio
pnpm install
```

### Running locally 

```bash
pnpm dev
```

- Visit http://localhost:3000 in your browser.

### Running Tests

- Playwright tests are included:

```bash
pnpm exec playwright test
```

## Environment Variables

- Create a .env file at the root of the project with the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```