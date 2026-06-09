<div align="center">
  <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800" alt="TrafficWatch AI Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <h1>🚦 TrafficWatch AI</h1>
  <p><strong>Next-Generation Autonomous Traffic Enforcement & Intelligence Platform</strong></p>
  
  <p>
    <a href="#-overview">Overview</a> •
    <a href="#-core-features">Features</a> •
    <a href="#-technology-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>
</div>

---

## 👁️ Overview

TrafficWatch AI is a state-of-the-art, AI-powered traffic enforcement platform designed to empower municipalities and citizens. By leveraging cutting-edge multimodal AI models (powered by **Google Gemini 2.5 Flash**), the platform ingests citizen-submitted media evidence and autonomously extracts high-precision telemetric data, vehicle classifications, and violation metrics in real-time.

Say goodbye to manual review bottlenecks. TrafficWatch AI automates the entire pipeline—from license plate OCR to fine calculation and evidence verification—transforming raw footage into actionable legal citations.

---

## ✨ Core Features

* 🧠 **Multimodal Evidence Analysis:** Automatically extracts license plates (OCR), vehicle classifications (make, model, color), and classifies violation types with high confidence scoring.
* 🛡️ **Cryptographic Verification:** AI-driven authenticity checks ensure digital evidence is free from manipulation.
* 📊 **Intelligence Dashboard:** A stunning, real-time command center displaying live KPIs, system-wide analytics, and automated activity trends.
* ⚖️ **Review & Authorization Queue:** An intuitive interface for enforcement officers to review AI findings, issue citations, and manage fine amounts seamlessly.
* 📡 **Live Spatial Radar:** Simulated real-time geographic heatmaps providing traffic intelligence and predictive alerts for active enforcement zones.
* 🏆 **Citizen Rewards System:** Gamifies public safety by rewarding users with "SafeCity Yield" points for verified reports, redeemable for municipal resources.
* 💾 **Secure Local Persistence:** Seamlessly stores and retrieves all evidence and analysis reports using an optimized client-side `localStorage` architecture.

---

## 🛠️ Technology Stack

TrafficWatch AI is built on a modern, lightning-fast stack designed for scalability and beautiful UX:

* **Frontend Framework:** React 18 & React Router
* **Styling & UI:** Tailwind CSS (Custom Dark/Light thematic elements), Lucide Icons
* **Build Architecture:** Vite
* **Backend API Gateway:** Express.js (Node.js)
* **Intelligence Engine:** OpenRouter API (Gemini 2.5 Flash Multimodal)

---

## 🚀 Getting Started

Deploy TrafficWatch AI locally in seconds. Follow these steps to spin up the command center.

### 1. Clone the Repository
```bash
git clone https://github.com/RandomAssassin-rgb/TrafficWatch.git
cd TrafficWatch
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory by copying the provided example:
```bash
cp .env.example .env
```
Open `.env` and insert your OpenRouter API key to activate the intelligence engine:
```env
OPENROUTER_KEY="your_openrouter_api_key_here"
```

### 4. Ignite the Servers
```bash
npm run dev
```

The platform will automatically launch at `http://localhost:3001` with both the frontend Single Page Application and the backend Express server actively listening.

---

## 📁 Architecture & Structure

```text
TrafficWatch/
├── src/
│   ├── components/      # Reusable UI elements (AppLayout, Cards)
│   ├── pages/           # Core Views
│   │   ├── Dashboard.tsx    # Command Center & KPIs
│   │   ├── Upload.tsx       # Evidence Submission Portal
│   │   ├── AdminReview.tsx  # Enforcement Authorization Queue
│   │   ├── Reports.tsx      # Database & Record Management
│   │   ├── Analytics.tsx    # Live Spatial Radar
│   │   └── Rewards.tsx      # Citizen Yield Redemption
│   └── utils/           # Utilities
│       └── storage.ts       # LocalStorage Database Manager
├── server.ts            # Node.js API Gateway & AI Prompt Engineering
└── tailwind.config.ts   # Design System configuration
```

---

<div align="center">
  <p>Built with precision for smarter, safer cities.</p>
  <p><strong>MIT License</strong></p>
</div>
