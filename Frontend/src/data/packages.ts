export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  discountedPrice: number;
  actualPrice: number;
  tests: string[]; // Test names to search for
  image?: string;
}

export const healthPackages: HealthPackage[] = [
  {
    id: "heart-health-package",
    name: "Heart Health Package",
    description: "Comprehensive heart health screening with essential cardiac tests",
    discountedPrice: 4200,
    actualPrice: 7000,
    tests: [
      "Lipid Profile (Complete)",
      "High Sensitivity CRP (hs-CRP)",
      "Blood Sugar - Fasting",
      "ECG",
      "Thyroid Stimulating Hormone",
      "Blood Pressure + BMI Assessment"
    ]
  },
  {
    id: "wellness-journey-package",
    name: "Wellness Journey Package",
    description: "Start your wellness journey with comprehensive health screening",
    discountedPrice: 4000,
    actualPrice: 7100,
    tests: [
      "Complete Blood Count",
      "Lipid Profile",
      "Liver Function Test",
      "Renal Function Test",
      "Blood Sugar",
      "Erythrocyte Sedimentation Rate",
      "Urine Routine Examination"
    ]
  },
  {
    id: "special-health-profile",
    name: "Special Health Profile",
    description: "More comprehensive than basic. Designed to check critical organs, vitamins, and metabolic balance.",
    discountedPrice: 6500,
    actualPrice: 11450,
    tests: [
      "Complete Blood Count (CBC)",
      "Complete Liver Function Test",
      "Complete Renal Function Test",
      "Thyroid Profile (TSH, T3, T4)",
      "Urine R/E",
      "Vitamin D (25-OH)",
      "Uric Acid"
    ]
  },
  {
    id: "vitamin-health-profile",
    name: "Vitamin Health Profile",
    description: "Comprehensive vitamin and mineral assessment for optimal health",
    discountedPrice: 5600,
    actualPrice: 9500,
    tests: [
      "Vitamin D (25-OH)",
      "Vitamin B12",
      "Calcium",
      "Iron Studies",
      "Serum Iron",
      "TIBC",
      "Ferritin"
    ]
  }
];

