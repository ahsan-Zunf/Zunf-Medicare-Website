// Quick fix script to update chatController.js responses
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'controllers', 'chatController.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix 1: Update handleExactQuery to show original + discounted price without description
const oldExactQueryPattern = /if \(exactMatch\) \{[\s\S]*?console\.log\(`✅ \[CHAT\] Exact match found.*?\n    return res\.json\(\{ response \}\);/;
const newExactQueryCode = `if (exactMatch) {
    const cleanedName = cleanTestName(exactMatch.testName);
    const originalPrice = exactMatch.price || exactMatch.salePrice;
    const discountedPrice = exactMatch.salePrice;
    
    let response = \`\${cleanedName} at \${exactMatch.labName}\\n\\n\`;
    response += \`Original Price: PKR \${originalPrice.toLocaleString()}\\n\`;
    response += \`Discounted Price: PKR \${discountedPrice.toLocaleString()}\`;
    response += \`\\n\\nSUGGESTIONS: Book this test | How to prepare | Check other labs | Home sample collection\`;
    
    console.log(\`✅ [CHAT] Exact match found: \${cleanedName} at \${exactMatch.labName}\`);
    return res.json({ response });`;

content = content.replace(oldExactQueryPattern, newExactQueryCode);

// Fix 2: Remove prices from lab list in handleTestQuery
content = content.replace(
    /let response = `I found \*\*\$\{cleanTestName\(matches\[0\]\.testName\)\}\*\* at/,
    'let response = `I found ${cleanTestName(matches[0].testName)} at'
);

content = content.replace(
    /topLabs\.forEach\(\(lab, index\) => \{[\s\S]*?response \+= `\$\{index \+ 1\}\. \*\*\$\{lab\}\*\* - PKR[\s\S]*?\n  \}\);/,
    `topLabs.forEach((lab, index) => {
    response += \`\${index + 1}. \${lab}\\n\`;
  });`
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed chatController.js');
