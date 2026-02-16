const path = require('path');

const LAB_SOURCES = [
  {
    id: 'chughtai-lab',
    name: 'Chughtai Lab',
    description:
      'A nationwide diagnostic network in Pakistan offering pathology, imaging, radiology, and home-care services.',
    dataFile: path.join(__dirname, '../data/chughtai-lab-test.json'),
  },
  {
    id: 'test-zone',
    name: 'Test Zone Diagnostic Center',
    description:
      'A trusted diagnostic center offering comprehensive laboratory tests and health screening services.',
    dataFile: path.join(__dirname, '../data/test-zone-lab-test.json'),
  },
  {
    id: 'jinnah-mri',
    name: 'Jinnah MRI & Diagnostic Center',
    description:
      'Specialized MRI and diagnostic imaging services with advanced technology and expert radiologists.',
    dataFile: path.join(__dirname, '../data/jinnah-mri-lab-test.json'),
  },
  {
    id: 'esthetique-canon',
    name: 'Esthetique Canon',
    description:
      'Premium aesthetic and cosmetic procedures including facials, skin treatments, and beauty services.',
    dataFile: path.join(__dirname, '../data/esthetique-canon-lab-test.json'),
  },
  {
    id: 'ayzal-lab',
    name: 'Azyal Lab',
    description:
      'A leading diagnostic laboratory offering comprehensive pathology, chemistry, and microbiology services.',
    dataFile: path.join(__dirname, '../data/ayzal-lab-test.json'),
  },
  {
    id: 'biotech-lahore',
    name: 'BioTech Lahore Lab',
    description:
      'Advanced biotechnology and diagnostic services with state-of-the-art equipment and expert medical professionals.',
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
      // Set empty array as fallback so app doesn't crash
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

