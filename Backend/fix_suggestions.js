const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'controllers', 'chatController.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update Greeting (Add Test Zone, ensure correct list)
content = content.replace(
    /response: "Hello![\s\S]*?SUGGESTIONS:.*?"/s,
    `response: "Hello! I'm ZUNF Medicare's AI assistant. What type of test would you like to conduct today?\\n\\nSUGGESTIONS: CBC Test | Urine Test | Blood Sugar | Test Zone Diagnostic Center"`
);

// 2. Update Exact Query (Only "Book this test")
content = content.replace(
    /response \+= `\\n\\nSUGGESTIONS: Book this test.*`;/g,
    `response += \`\\n\\nSUGGESTIONS: Book this test\`;`
);

// 3. Update Test Query Error (Urine Test, remove others)
content = content.replace(
    /SUGGESTIONS: CBC Test \| Urine Routine \| Blood Sugar.*?"/g,
    `SUGGESTIONS: CBC Test | Urine Test | Blood Sugar | Lipid Profile"`
);

// 4. Update Lab Only (Urine Test)
content = content.replace(
    /SUGGESTIONS: CBC Test \| Urine Routine \| Blood Sugar.*?"/g,
    `SUGGESTIONS: CBC Test | Urine Test | Blood Sugar | Lipid Profile"`
);

// 5. Update Unclear (Urine Test)
content = content.replace(
    /SUGGESTIONS: CBC Test \| Urine Routine \| Blood Sugar"/g,
    `SUGGESTIONS: CBC Test | Urine Test | Blood Sugar"`
);

// 6. Fix for any remaining "Urine Routine" in suggestions
content = content.replace(/Urine Routine/g, 'Urine Test');

fs.writeFileSync(filePath, content);
console.log('✅ Suggestions updated');
