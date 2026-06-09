export interface ReportRecord {
  id: string;
  timestamp: string;
  previewUrl: string;
  status: 'pending' | 'authorized' | 'rejected';
  reportData: any;
}

// Seed data to make the application look premium and populated out of the box
const SEED_REPORTS: ReportRecord[] = [
  {
    id: "REP-9842",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    previewUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    status: "authorized",
    reportData: {
      analysis_status: "completed",
      vehicle_detection: {
        vehicle_type: "Car",
        vehicle_color: "Dark Blue",
        position: "rear",
        confidence_score: 0.98
      },
      number_plate_ocr: {
        plate_number: "NY-GHT992",
        region_state_hint: "New York",
        confidence_score: 0.95
      },
      vehicle_classification: {
        type: "Sedan",
        make: "BMW",
        color: "Navy Blue",
        year_estimate: "2018-2022"
      },
      violation_detection: {
        violation_type: "Illegal Parking",
        severity: "Medium",
        confidence_score: 0.94,
        evidence_description: "Vehicle parked on double yellow line blocking access to pedestrian ramp."
      },
      authenticity_check: {
        classification: "Authentic",
        confidence: 0.97,
        risk_level: "Low",
        reasons: ["No digital manipulation detected", "Lighting gradients match context"]
      },
      investigation_report: {
        incident_summary: "Illegal parking in Restricted Zone A",
        vehicle_details: "Dark Blue BMW Sedan (NY-GHT992)",
        violation_details: "Parking on double yellow line at pedestrian access ramp",
        evidence_assessment: "High quality photographic evidence",
        recommended_action: "Issue citation fine of $115",
        generated_narrative: "On June 9, 2026, the subject vehicle (BMW Sedan, plate NY-GHT992) was documented standing in a restricted zone marked with double yellow lines, obstructing the wheelchair accessible curb ramp. AI analysis confirms location and vehicle identity.",
        executive_summary: "Illegal parking violation in Zone A. Recommended fine: $115."
      },
      financials: {
        recommended_fine_amount_usd: 115,
        fine_reasoning: "Obstructing ADA pedestrian ramp in a restricted parking zone.",
        citizen_reward_points: 50,
        reward_reasoning: "High quality photo submission clearly capturing plate and violation context."
      },
      traffic_intelligence: {
        hotspots: ["Zone A Crossing"],
        patterns: ["Commuter drop-off violations"],
        recommendations: ["Increase physical signage and dynamic warnings"]
      }
    }
  },
  {
    id: "REP-9841",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    previewUrl: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600",
    status: "pending",
    reportData: {
      analysis_status: "completed",
      vehicle_detection: {
        vehicle_type: "Motorcycle",
        vehicle_color: "Red",
        position: "rear",
        confidence_score: 0.94
      },
      number_plate_ocr: {
        plate_number: "CA-88X9Y",
        region_state_hint: "California",
        confidence_score: 0.92
      },
      vehicle_classification: {
        type: "Sports Bike",
        make: "Ducati",
        color: "Racing Red",
        year_estimate: "2020-2024"
      },
      violation_detection: {
        violation_type: "Speeding",
        severity: "High",
        confidence_score: 0.91,
        evidence_description: "Motorcycle recorded travelling at high speed in local residential street."
      },
      authenticity_check: {
        classification: "Authentic",
        confidence: 0.94,
        risk_level: "Low",
        reasons: ["Metadata matches timestamp", "Shadow alignment is natural"]
      },
      investigation_report: {
        incident_summary: "Excessive speed in residential area",
        vehicle_details: "Red Ducati Sports Bike (CA-88X9Y)",
        violation_details: "Speeding above posted 25mph limits",
        evidence_assessment: "Good quality photo from hand-held device",
        recommended_action: "Send speed violation fine notice of $220",
        generated_narrative: "Visual telemetric analysis of the red Ducati sports bike (plate CA-88X9Y) indicates speed significantly in excess of the local 25mph limits in a residential zone. Citizen evidence submitted for law enforcement review.",
        executive_summary: "Speeding in 25mph residential zone. Ducati bike plate CA-88X9Y."
      },
      financials: {
        recommended_fine_amount_usd: 220,
        fine_reasoning: "High-speed speeding in a posted 25mph residential speed limit zone.",
        citizen_reward_points: 100,
        reward_reasoning: "Clear license plate recognition and documented high-speed motion blur."
      },
      traffic_intelligence: {
        hotspots: ["Residential Speed Zones"],
        patterns: ["Afternoon sportbike speeding"],
        recommendations: ["Deploy temporary digital speed display sign"]
      }
    }
  },
  {
    id: "REP-9839",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    previewUrl: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600",
    status: "authorized",
    reportData: {
      analysis_status: "completed",
      vehicle_detection: {
        vehicle_type: "Car",
        vehicle_color: "Grey",
        position: "side",
        confidence_score: 0.99
      },
      number_plate_ocr: {
        plate_number: "TX-PTL339",
        region_state_hint: "Texas",
        confidence_score: 0.96
      },
      vehicle_classification: {
        type: "SUV",
        make: "Toyota",
        color: "Silver Metallic",
        year_estimate: "2019"
      },
      violation_detection: {
        violation_type: "Running Red Light",
        severity: "Critical",
        confidence_score: 0.98,
        evidence_description: "Silver SUV crossing the intersection limit line while the light is solid red."
      },
      authenticity_check: {
        classification: "Authentic",
        confidence: 0.99,
        risk_level: "Low",
        reasons: ["Exif data intact", "Traffic light glow matches vehicle surface reflections"]
      },
      investigation_report: {
        incident_summary: "Red light violation at 5th Ave",
        vehicle_details: "Silver Toyota SUV (TX-PTL339)",
        violation_details: "Crossing stop line during solid red phase",
        evidence_assessment: "Perfect intersection alignment capture",
        recommended_action: "Authorize instant citation of $250 and license points assessment",
        generated_narrative: "On June 8, 2026, the Toyota SUV (plate TX-PTL339) was documented moving through the intersection of 5th Ave and Main St during a solid red signal phase. AI analysis verifies signal timing and vehicle presence.",
        executive_summary: "Critical red light violation at 5th Ave. Silver SUV plate TX-PTL339."
      },
      financials: {
        recommended_fine_amount_usd: 250,
        fine_reasoning: "Solid red light intersection breach, posing active safety risks.",
        citizen_reward_points: 150,
        reward_reasoning: "Captured clear sequential visual evidence of intersection crossing."
      },
      traffic_intelligence: {
        hotspots: ["5th Ave Intersection"],
        patterns: ["Red-light running at yellow transitions"],
        recommendations: ["Review yellow light duration timings"]
      }
    }
  }
];

const LOCAL_STORAGE_KEY = "trafficwatch_reports";

export function getAllReports(): ReportRecord[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      // Seed initial data if empty
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_REPORTS));
      return SEED_REPORTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return SEED_REPORTS;
  }
}

export function getReportById(id: string): ReportRecord | undefined {
  const reports = getAllReports();
  return reports.find(r => r.id === id);
}

export function saveReport(reportInput: Omit<ReportRecord, 'id' | 'timestamp'> & { id?: string; timestamp?: string }): ReportRecord {
  const reports = getAllReports();
  
  const newReport: ReportRecord = {
    id: reportInput.id || `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: reportInput.timestamp || new Date().toISOString(),
    previewUrl: reportInput.previewUrl,
    status: reportInput.status,
    reportData: reportInput.reportData
  };

  // Check if it already exists, if so update it
  const index = reports.findIndex(r => r.id === newReport.id);
  if (index >= 0) {
    reports[index] = newReport;
  } else {
    reports.unshift(newReport); // Add to beginning
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }

  return newReport;
}

export function updateReportStatus(id: string, status: 'authorized' | 'rejected' | 'pending'): ReportRecord | undefined {
  const reports = getAllReports();
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return undefined;

  reports[index].status = status;

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }

  return reports[index];
}

export function deleteReport(id: string): void {
  let reports = getAllReports();
  reports = reports.filter(r => r.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}

export function clearReports(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
