const labModel = require('../models/labModel');

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

