export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export const maxDuration = 60; // 60 seconds max duration to prevent 504 Timeouts

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const OPENROUTER_KEY = process.env.OPENROUTER_KEY || process.env.GEMINI_API_KEY;

    if (!OPENROUTER_KEY) {
      return res.status(500).json({ error: "Server missing API key configuration" });
    }

    const prompt = `You are TrafficWatch AI. Analyze this traffic image and return ONLY a valid JSON object with this exact structure. Be fast and precise.

RULES:
- Never hallucinate a vehicle number plate. If unclear, use null.
- Only report violations clearly visible in the image.
- Use confidence scores (0.0 to 1.0) for all assessments.
- Be conservative — do not invent violations.

Return ONLY this JSON (no markdown, no extra text):
{
  "analysis_status": "completed",
  "vehicle_detection": {
    "vehicle_type": "Car|Motorcycle|Truck|Bus|Van|Auto Rickshaw|Bicycle|Other",
    "vehicle_color": "color description",
    "position": "front|rear|side",
    "confidence_score": 0.95
  },
  "number_plate_ocr": {
    "plate_number": "plate text or null if not visible",
    "region_state_hint": "state/region if detectable or null",
    "confidence_score": 0.90
  },
  "vehicle_classification": {
    "type": "vehicle type",
    "make": "brand if identifiable or Unknown",
    "color": "color",
    "year_estimate": "year range or Unknown"
  },
  "violation_detection": {
    "violation_type": "name of primary violation or No Violation Detected",
    "severity": "Low|Medium|High|Critical",
    "confidence_score": 0.85,
    "evidence_description": "one sentence describing the visible evidence of the violation"
  },
  "authenticity_check": {
    "classification": "Authentic|Suspicious|Likely Manipulated",
    "confidence": 0.95,
    "risk_level": "Low|Medium|High",
    "reasons": ["reason 1", "reason 2"]
  },
  "investigation_report": {
    "incident_summary": "brief incident summary",
    "vehicle_details": "vehicle description",
    "violation_details": "violation details",
    "evidence_assessment": "evidence quality assessment",
    "recommended_action": "suggested enforcement action",
    "generated_narrative": "One professional paragraph describing the incident in formal enforcement language.",
    "executive_summary": "two sentence executive summary"
  },
  "financials": {
    "recommended_fine_amount_usd": 150,
    "fine_reasoning": "why this amount",
    "citizen_reward_points": 75,
    "reward_reasoning": "why these points"
  },
  "traffic_intelligence": {
    "hotspots": ["location type if identifiable"],
    "patterns": ["observed pattern"],
    "recommendations": ["enforcement recommendation"]
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
        model: "google/gemini-2.5-flash:free",
        max_tokens: 1500,
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
    res.status(200).json(parsedData);

  } catch (error) {
    console.error("Error analyzing evidence:", error);
    res.status(500).json({ error: error.message || "Failed to analyze evidence" });
  }
}
