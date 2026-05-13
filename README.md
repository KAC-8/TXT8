# TXT8 - Luxury Ego Booster

TXT8 is a high-end, highly optimized Next.js web application that lets users generate hilarious, "official" looking honorary certificates (like "Chief of Sleep" or "Certified Couch Potato") and share them directly to X (Twitter), WhatsApp, and Snapchat. 

It was built with a heavy emphasis on **Cybersecurity principles**, **viral social loops**, and **premium UX/UI**.

## 🚀 Features

- **Multi-Template Engine:** Built-in template selector switching dynamically between different high-end visual styles.
- **Dynamic Signature Pad:** Users can sign their certificates using a responsive canvas integration.
- **Smart Export:** Renders the customized HTML into a high-res PDF or PNG without layout breakage using html2canvas and jsPDF.
- **Vertical Snapchat Export:** Hidden 1080x1920 layout specifically configured for instant Snapchat/Instagram Stories sharing.
- **AI Title Assistant:** Let the "Magic Wand" generate a hilarious title based on 3 keywords.
- **Hall of Fame:** A public masonry grid showcasing the Top 20 trending certificates using a custom eact-parallax-tilt 3D hover effect.
- **Command Center Dashboard:** A hidden admin route for monitoring database health, template distributions via echarts, and safely moderating user inputs.
- **Elite Badge System:** Overlay custom SVG badges onto the certificate frames dynamically.

## 🔒 Security & Performance

As a cybersecurity-first application, TXT8 includes several protective layers:

- **Honeypot Trap:** A visually hidden <input> field placed strategically in the form catches spam bots that automatically fill out fields. Any request containing data in this field is silently dropped.
- **Rate Limiting:** A strict client-side rate limit module ensures users cannot abuse the database (Max 5 certificates per minute), triggering a "Security Alert" message upon violation.
- **XSS Protection:** Rigid input sanitization functions scrub all <> characters from names and titles before they ever touch the database or rendering engine.
- **Dynamic Imports:** Massive rendering libraries (html2canvas, jspdf, eact-signature-canvas) are loaded dynamically *only* when requested by the user, keeping the initial page load incredibly fast.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Components:** Lucide React, react-fast-marquee, react-parallax-tilt, react-tsparticles
- **Export Engine:** html2canvas, jsPDF, @vercel/og (Dynamic OpenGraph images)

## 📦 Local Development

1. Clone the repository.
2. Install dependencies:
   `ash
   npm install
   `
3. Set up your .env.local variables with your Supabase keys:
   `nv
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   `
4. Run the development server:
   `ash
   npm run dev
   `

## 📝 License

Developed by [KAC8.ME](https://www.kac8.me).
