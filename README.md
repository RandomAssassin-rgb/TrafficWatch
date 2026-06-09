# TrafficWatch AI 🚦

TrafficWatch AI is a comprehensive, AI-powered traffic enforcement platform that empowers citizens and authorities to monitor, analyze, and act on traffic violations in real-time. By leveraging cutting-edge multimodal AI (Google Gemini 2.5 Flash), the system extracts high-precision telemetric and visual data from citizen-submitted evidence.

## Features ✨

* **AI-Powered Evidence Analysis:** Automatically extracts license plates (OCR), vehicle classifications (make/model/color), and violation types with high confidence scoring.
* **Intelligent Dashboard:** View live KPIs, system-wide analytics, and real-time activity trends.
* **Review & Authorization Queue:** Intuitive interface for authorities to review AI findings, issue citations, and calculate fine amounts and citizen reward yields.
* **Live Spatial Radar:** Simulated real-time geographic heatmaps for traffic intelligence and predictive alerts.
* **Citizen Rewards System:** Earn "SafeCity Yield" points for verified reports to redeem for transit passes and municipal resources.
* **Local Data Persistence:** Seamlessly stores and retrieves all evidence and analysis reports using an optimized client-side `localStorage` database.

## Tech Stack 🛠️

* **Frontend:** React, React Router, Tailwind CSS, Lucide Icons
* **Build Tool:** Vite
* **Backend:** Express.js (Node.js) API gateway
* **AI Provider:** OpenRouter (Gemini 2.5 Flash multimodal engine)

## Quick Start 🚀

### 1. Clone the repository
```bash
git clone https://github.com/RandomAssassin-rgb/TrafficWatch.git
cd TrafficWatch
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Rename `.env.example` to `.env` and insert your OpenRouter API key:
```env
OPENROUTER_KEY="your_openrouter_api_key_here"
```

### 4. Run the application
```bash
npm run dev
```

The app will be running at `http://localhost:3001` with both the frontend SPA and the backend Express server actively listening.

## Project Structure 📁

- `/src/pages`: Main application views (`Dashboard.tsx`, `Upload.tsx`, `AdminReview.tsx`, `Reports.tsx`, `Analytics.tsx`, `Rewards.tsx`)
- `/src/utils`: Utility functions, including `storage.ts` for database persistence.
- `server.ts`: The Express backend handling the Gemini AI prompt engineering and multimodal processing.

## License 📄
MIT License
