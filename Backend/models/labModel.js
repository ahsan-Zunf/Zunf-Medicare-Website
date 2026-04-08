const path = require('path');

const LAB_SOURCES = [
  {
    id: 'chughtai-lab',
    name: 'Chughtai Lab',
    description: 'A nationwide diagnostic network in Pakistan offering pathology, imaging, radiology, and home-care services.',
    dataFile: path.join(__dirname, '../data/chughtai-lab-test.json'),
  },
  {
    id: 'test-zone',
    name: 'Test Zone Diagnostic Center',
    description: 'A trusted diagnostic center offering comprehensive laboratory tests and health screening services.',
    dataFile: path.join(__dirname, '../data/test-zone-lab-test.json'),
  },
  {
    id: 'jinnah-mri',
    name: 'Jinnah MRI & Diagnostic Center',
    description: 'Specialized MRI and diagnostic imaging services with advanced technology and expert radiologists.',
    dataFile: path.join(__dirname, '../data/jinnah-mri-lab-test.json'),
  },
  {
    id: 'esthetique-canon',
    name: 'Esthetique Canon',
    description: 'Premium aesthetic and cosmetic procedures including facials, skin treatments, and beauty services.',
    dataFile: path.join(__dirname, '../data/esthetique-canon-lab-test.json'),
  },
  {
    id: 'ayzal-lab',
    name: 'Azyal Lab',
    description: 'A leading diagnostic laboratory offering comprehensive pathology, chemistry, and microbiology services.',
    dataFile: path.join(__dirname, '../data/ayzal-lab-test.json'),
  },
  {
    id: 'biotech-lahore',
    name: 'BioTech Lahore Lab',
    description: 'Advanced biotechnology and diagnostic services with state-of-the-art equipment and expert medical professionals.',
    dataFile: path.join(__dirname, '../data/bio-tech-lab-test.json'),
  },
];

const normalizeLabId = (labId = '') => labId.trim().toLowerCase();

const loadLabData = () =>
  LAB_SOURCES.reduce((acc, lab) => {
    try {
      const tests = require(lab.dataFile);
      acc[lab.id] = { ...lab, tests };
    } catch (error) {
      console.warn(`Warning: Could not load data for ${lab.id}:`, error.message);
      acc[lab.id] = { ...lab, tests: [] };
    }
    return acc;
  }, {});

const labs = loadLabData();

exports.getLabs = () =>
  Object.values(labs).map((lab) => ({
    id: lab.id,
    name: lab.name,
    description: lab.description,
    totalTests: Array.isArray(lab.tests) ? lab.tests.length : 0,
  }));

exports.getLabTests = (labId) => {
  const lab = labs[normalizeLabId(labId)];

  if (!lab) {
    return null;
  }

  return {
    lab: {
      id: lab.id,
      name: lab.name,
      description: lab.description,
      totalTests: Array.isArray(lab.tests) ? lab.tests.length : 0,
    },
    tests: lab.tests,
  };
};

// ==========================================
// 🚀 MASTERPIECE MODEL: Aggregation Logic
// ==========================================
exports.getAggregatedTestDetails = (testId) => {
  let testName = "";
  let testDescription = "";
  const available_labs = [];

  // Har lab ke data mein ghus kar test dhoondein
  Object.values(labs).forEach((lab) => {
    if (!Array.isArray(lab.tests)) return;

    const foundTest = lab.tests.find(t => t.id === testId);
    
    // Agar is lab ke paas yeh test hai, toh details save kar lein
    if (foundTest) {
      // Test ka basic naam pehli baar set karein
      if (!testName) {
        testName = foundTest.name;
        testDescription = foundTest.description || "";
      }
      
      // Is lab ki price list mein daal dein
      available_labs.push({
        lab_id: lab.id,
        name: lab.name,
        price: foundTest.price,
        discounted_price: foundTest.discounted_price
      });
    }
  });

  // Agar kisi bhi lab ke paas yeh test nahi nikla toh null bhej dein
  if (available_labs.length === 0) {
    return null;
  }

  return {
    test_id: testId,
    test_name: testName,
    description: testDescription,
    available_labs: available_labs
  };
};