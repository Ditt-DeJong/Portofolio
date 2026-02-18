# Imagination Portfolio

A modern, immersive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Project Structure

This project follows a modular Next.js App Router structure:

```
d:/Portfolio/
├── app/                  # Application Entry Points
│   ├── globals.css       # Global styles (Tailwind + custom CSS)
│   ├── layout.tsx        # Root layout (fonts, metadata, global providers)
│   └── page.tsx          # Main landing page (assembles all sections)
│
├── components/           # Reusable Components
│   ├── ui/               # Generic UI elements
│   │   ├── CustomCursor.tsx
│   │   └── ProjectCard.tsx
│   ├── layout/           # Structure components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/         # Page sections
│   │   ├── Intro.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Kitchen.tsx
│   │   └── Achievements.tsx
│   └── features/         # Complex interactive features
│       └── SousChef.tsx  # AI Chatbot component
│
├── lib/                  # Utilities and Constants
│   ├── data.ts           # Static content (text, project data)
│   └── gemini.ts         # Google Gemini AI integration logic
│
└── public/               # Static Assets (images, fonts, etc.)
```

## Getting Started

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Run Development Server**:

    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Configuration Files

- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.ts`: Tailwind CSS theme configuration.
- `next.config.mjs`: Next.js configuration.
