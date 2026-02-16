export interface Lab {
  id: string;
  name: string;
  position: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  duration?: string;
}

export const labs: Lab[] = [
  { id: "chughtai-lab", name: "Chughtai Lab", position: "top-8 left-8" },
  { id: "dr-essa-lab", name: "Dr. Essa Laboratories & Diagnostic Center", position: "top-24 right-12" },
  { id: "test-zone", name: "Test Zone Diagnostic Center", position: "top-1/2 left-4 -translate-y-1/2" },
  { id: "biotech-lahore", name: "BioTech Lahore Lab", position: "bottom-32 right-8" },
  { id: "ayzal-lab", name: "Azyal Lab", position: "top-40 left-1/6 -translate-x-1/2" },
  { id: "lahore-pcr", name: "Lahore PCR Lab", position: "top-40 left-1/2 -translate-x-1/2" },
  { id: "jinnah-mri", name: "Jinnah MRI & Diagnostic Center", position: "bottom-48 right-1/14 translate-x-1/2" },
  { id: "esthetique-canon", name: "Esthetique Canon", position: "bottom-40 right-1/2" }
];



