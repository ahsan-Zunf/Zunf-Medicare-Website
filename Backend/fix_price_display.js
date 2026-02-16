// Quick fix script to update price display format
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'controllers', 'chatController.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix: Update price display to show test name, original price, and discounted price with percentage
const oldPriceSection = `if (exactMatch) {
    const cleanedName = cleanTestName(exactMatch.testName);
    const originalPrice = exactMatch.price || exactMatch.salePrice;
    const discountedPrice = exactMatch.salePrice;
    
    let response = \`\${cleanedName} at \${exactMatch.labName}\\n\\n\`;
    response += \`Original Price: PKR \${originalPrice.toLocaleString()}\\n\`;
    response += \`Discounted Price: PKR \${discountedPrice.toLocaleString()}\`;
    response += \`\\n\\nSUGGESTIONS: Book this test | How to prepare | Check other labs | Home sample collection\`;
    
    console.log(\`✅ [CHAT] Exact match found: \${cleanedName} at \${exactMatch.labName}\`);
    return res.json({ response });
  }`;

const newPriceSection = `if (exactMatch) {
    const cleanedName = cleanTestName(exactMatch.testName);
    const originalPrice = exactMatch.regularPrice || 0;
    const discountedPrice = exactMatch.salePrice || 0;
    const discountPercentage = exactMatch.discountPercentage || 0;
    
    let response = \`**\${cleanedName}**\\n\\n\`;
    response += \`Original Price: PKR \${originalPrice.toLocaleString()}\\n\`;
    
    if (discountPercentage > 0) {
      response += \`Discounted Price: PKR \${discountedPrice.toLocaleString()} (\${discountPercentage}% off)\`;
    } else {
      response += \`Price: PKR \${discountedPrice.toLocaleString()}\`;
    }
    
    response += \`\\n\\nSUGGESTIONS: Book this test | How to prepare | Check other labs | Home sample collection\`;
    
    console.log(\`✅ [CHAT] Exact match found: \${cleanedName} at \${exactMatch.labName}\`);
    return res.json({ response });
  }`;

content = content.replace(oldPriceSection, newPriceSection);

fs.writeFileSync(filePath, content);
console.log('✅ Updated price display format');
