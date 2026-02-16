const fs = require('fs');
const path = require('path');

/**
 * Parse CSV content into array of objects
 * @param {string} csvContent - Raw CSV file content
 * @param {string} filename - Name of the CSV file
 * @returns {Array} Array of parsed test objects
 */
function parseCSV(csvContent, filename) {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    // Get headers from first line
    const headers = parseCSVLine(lines[0]);
    const tests = [];

    // Parse each data row
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === 0) continue;

        const row = {};
        headers.forEach((header, index) => {
            row[header.trim()] = values[index] ? values[index].trim() : '';
        });

        tests.push(row);
    }

    return tests;
}

/**
 * Parse a single CSV line, handling quoted fields
 * @param {string} line - CSV line to parse
 * @returns {Array} Array of field values
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++;
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // Field separator
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    // Add last field
    result.push(current);
    return result;
}

/**
 * Normalize lab test data into consistent format
 * @param {Object} row - Raw CSV row object
 * @param {string} labName - Name of the lab
 * @returns {Object} Normalized test object
 */
function normalizeTestData(row, labName) {
    const normalized = {
        testName: '',
        shortDescription: '',
        description: '',
        salePrice: 0,
        regularPrice: 0,
        discountPercentage: 0,
        labName: labName,
        sampleRequired: '',
        reportingTime: ''
    };

    // Handle different CSV formats
    if (row['Product Name']) {
        // Ayzal/BioTech format
        normalized.testName = row['Product Name'] || '';
        normalized.shortDescription = row['Short Description'] || '';
        normalized.description = row['Short Description'] || '';
        normalized.regularPrice = parsePrice(row['Original Price']);
        normalized.salePrice = parsePrice(row['Discounted Price (40% Off)']);
    } else if (row['Name']) {
        // Chughtai/TestZone format
        normalized.testName = row['Name'] || '';
        normalized.shortDescription = row['Short description'] || '';
        normalized.description = row['Description'] || '';
        normalized.salePrice = parsePrice(row['Sale price']);
        normalized.regularPrice = parsePrice(row['Regular price']);

        // Extract sample and reporting time from description if available
        const desc = normalized.description;
        const sampleMatch = desc.match(/Sample Required:\s*([^.]+)/i);
        const reportingMatch = desc.match(/Reporting Time:\s*([^.]+)/i);

        if (sampleMatch) normalized.sampleRequired = sampleMatch[1].trim();
        if (reportingMatch) normalized.reportingTime = reportingMatch[1].trim();
    }

    // Calculate discount percentage
    if (normalized.regularPrice > 0 && normalized.salePrice > 0) {
        normalized.discountPercentage = Math.round(
            ((normalized.regularPrice - normalized.salePrice) / normalized.regularPrice) * 100
        );
    }

    return normalized;
}

/**
 * Parse price string to number
 * @param {string} priceStr - Price string (may contain commas, currency symbols)
 * @returns {number} Parsed price as number
 */
function parsePrice(priceStr) {
    if (!priceStr || priceStr === '') return 0;
    // Remove non-numeric characters except decimal point
    const cleaned = String(priceStr).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
}

/**
 * Extract lab name from filename
 * @param {string} filename - CSV filename
 * @returns {string} Lab name
 */
function extractLabName(filename) {
    // Remove file extension and common suffixes
    let labName = filename
        .replace(/\.csv$/i, '')
        .replace(/\s*-\s*Sheet\d+/i, '')
        .replace(/\s*Lab Tests/i, '')
        .replace(/\s*-\s*wc-product-export.*$/i, '')
        .trim();

    // Handle specific cases
    if (labName.includes('Chughtai')) return 'Chughtai Lab';
    if (labName.includes('Ayzal')) return 'Ayzal Lab';
    if (labName.includes('BioTech')) return 'BioTech Lab';
    if (labName.includes('TestZone')) return 'Test Zone Diagnostic Center';

    return labName;
}

/**
 * Parse all CSV files from the info directory
 * @param {string} infoDir - Path to info directory
 * @returns {Array} Array of all normalized lab tests
 */
function parseCSVFiles(infoDir) {
    const allTests = [];

    try {
        if (!fs.existsSync(infoDir)) {
            console.error('[CSV Parser] Directory not found:', infoDir);
            return [];
        }

        const files = fs.readdirSync(infoDir);
        const csvFiles = files.filter(file => file.toLowerCase().endsWith('.csv'));

        console.log(`[CSV Parser] Found ${csvFiles.length} CSV files`);

        for (const file of csvFiles) {
            const filePath = path.join(infoDir, file);
            const labName = extractLabName(file);

            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                if (!content) continue;

                const rows = parseCSV(content, file);
                console.log(`   - Processing ${file}: ${rows.length} rows`);

                for (const row of rows) {
                    if (!row) continue;
                    const normalized = normalizeTestData(row, labName);
                    if (normalized && normalized.testName) {
                        allTests.push(normalized);
                    }
                }
            } catch (error) {
                console.error(`[CSV Parser] Error parsing ${file}:`, error.message);
            }
        }

        console.log(`[CSV Parser] Successfully loaded ${allTests.length} tests total.`);
    } catch (error) {
        console.error('[CSV Parser] Failed to read directory:', error.message);
    }

    return allTests;
}

module.exports = {
    parseCSVFiles,
    normalizeTestData,
    extractLabName,
    parsePrice
};
