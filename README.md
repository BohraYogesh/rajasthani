# Aanya & Aarav | Rajasthani Wedding Invitation

React + Vite + Tailwind v4 + Framer Motion + Lenis (smooth scroll)

## Run (VS Code terminal)
```bash
npm install
npm run dev
```
Browser me `http://localhost:5173` khulega.

## Kahan kya badalna hai
| Kya | File |
|---|---|
| Naam, date, venue, family text, story, gift message | `src/data/weddingData.js` |
| Events (Haldi, Mehndi...) | `src/data/events.js` |
| Journey ke 5 items | `src/data/journey.js` |
| Saari images ke paths | `src/data/images.js` |
| Menu links, social links | `src/data/navLinks.js` |
| Colors, fonts | `src/index.css` (`@theme` block) |
| RSVP kahan jaye | `.env` (copy `.env.example`) |

Countdown `dateISO` se chalta hai, date badalte hi sab update.

## Images
Abhi saari images ke jagah themed placeholder dikh raha hai (label me file ka naam likha hai).
Apni image lagane ke liye file ko `public/images/<folder>/` me **same naam** se rakho
(list: `public/images/README.md`), ya `src/data/images.js` me koi bhi URL paste karo.

## Intro (Hawa Mahal zoom)
- Abhi built-in illustrated Hawa Mahal (SVG) hai, jiski center ki jharokha me scroll karte hue zoom hota hai.
- Apni Hawa Mahal art image lagani ho: `src/data/images.js` me `hawaMahal: '/images/intro/hawa-mahal.jpg'`
  aur `hawaMahalZoomOrigin` me window ki % position (x, y) daalo.
- Intro lamba/chhota karne ke liye `Intro.jsx` me `h-[480vh]` badlo.
- Navbar intro ke baad dikhta hai: `Navbar.jsx` me `innerHeight * 3.9`.

## RSVP
`.env` me `VITE_RSVP_MODE=demo | whatsapp | sheets`

## Build
```bash
npm run build
```
`dist/` folder ko Netlify / Vercel par daal do.
