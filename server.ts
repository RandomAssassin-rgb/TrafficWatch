import 'dotenv/config';
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json({ limit: '50mb' }));

  // API Route for Gemini Evidence Analysis
  app.post("/api/analyze-evidence", async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "No image provided" });
      }

      // Read OpenRouter API key from environment variable
      const OPENROUTER_KEY = process.env.OPENROUTER_KEY || process.env.GEMINI_API_KEY;

      const prompt = `You are TrafficWatch AI. Analyze this traffic image and return ONLY a valid JSON object. Be EXTREMELY concise to save tokens (use short phrases, 1 sentence max for narrative).

Return ONLY this JSON:
{
  "analysis_status": "completed",
  "vehicle_detection": {
    "vehicle_type": "Car|Motorcycle|Truck|Bus|Other",
    "vehicle_color": "color",
    "position": "front|rear|side",
    "confidence_score": 0.95
  },
  "number_plate_ocr": {
    "plate_number": "text or null",
    "region_state_hint": "state or null",
    "confidence_score": 0.90
  },
  "vehicle_classification": {
    "type": "type",
    "make": "brand or Unknown",
    "color": "color",
    "year_estimate": "year or Unknown"
  },
  "violation_detection": {
    "violation_type": "violation name",
    "severity": "Low|Medium|High",
    "confidence_score": 0.85,
    "evidence_description": "1 short sentence"
  },
  "authenticity_check": {
    "classification": "Authentic|Suspicious",
    "confidence": 0.95,
    "risk_level": "Low|High",
    "reasons": ["short reason"]
  },
  "investigation_report": {
    "incident_summary": "1 short sentence",
    "vehicle_details": "short phrase",
    "violation_details": "short phrase",
    "evidence_assessment": "short phrase",
    "recommended_action": "short phrase",
    "generated_narrative": "1 short sentence.",
    "executive_summary": "1 short sentence"
  },
  "financials": {
    "recommended_fine_amount_usd": 150,
    "fine_reasoning": "short phrase",
    "citizen_reward_points": 75,
    "reward_reasoning": "short phrase"
  },
  "traffic_intelligence": {
    "hotspots": ["hotspot"],
    "patterns": ["pattern"],
    "recommendations": ["short recommendation"]
  }
}`;

      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "https://trafficwatch.app",
          "X-Title": "TrafficWatch AI"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          max_tokens: 940,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType || 'image/jpeg'};base64,${imageBase64}`
                  }
                }
              ]
            }
          ]
        })
      });

      if (!openRouterResponse.ok) {
        const errText = await openRouterResponse.text();
        throw new Error(`OpenRouter API Error: ${openRouterResponse.status} ${errText}`);
      }

      const data = await openRouterResponse.json();
      const textResponse = data.choices?.[0]?.message?.content;

      if (!textResponse) {
        throw new Error("Empty response from OpenRouter");
      }

      let cleanJson = textResponse.trim();
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }

      const parsedData = JSON.parse(cleanJson);
      res.json(parsedData);

    } catch (error: any) {
      console.error("Error analyzing evidence:", error);
      res.status(500).json({ error: error.message || "Failed to analyze evidence" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
