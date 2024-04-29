const fs = require('fs');

const blockedKeywords = ['console', 'ERROR_CODE']; // Add more keywords as needed

// Read the staged files
const stagedFiles = fs.readFileSync('.git/index', 'utf-8')
  .split('\0')
  .filter(Boolean);

// Check for blocked keywords
for (const file of stagedFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (blockedKeywords.some(keyword => content.includes(keyword))) {
    console.error(`Error: Commits containing '${blockedKeywords.join(', ')}' are not allowed.`);
    process.exit(1);
  }
}