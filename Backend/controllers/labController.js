const labModel = require('../models/labModel'); // Yahan apne model file ka exact naam likhiyega agar Test.js nahi hai

exports.listLabs = (_req, res) => {
  const labs = labModel.getLabs();
  res.json({ labs });
};

exports.getLabTests = (req, res) => {
  const { labId } = req.params;

  const result = labModel.getLabTests(labId);

  if (!result) {
    return res.status(404).json({ message: 'Lab not found' });
  }

  // Return both lab info and tests
  res.json({
    lab: result.lab,
    tests: result.tests,
  });
};

// ==========================================
// 🚀 MASTERPIECE MODEL: Get Aggregated Test
// ==========================================
exports.getTestDetails = (req, res) => {
  const { testId } = req.params;
  
  const aggregatedData = labModel.getAggregatedTestDetails(testId);

  if (!aggregatedData) {
    return res.status(404).json({ message: 'Test not found in any lab' });
  }

  res.json(aggregatedData);
};