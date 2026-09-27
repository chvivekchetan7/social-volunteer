const fs = require('fs');

const code = fs.readFileSync('/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/ref_bundle.js', 'utf8');

// Extract all string literals longer than 15 chars
const matches = code.match(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g) || [];

const cleanStrings = [];
matches.forEach(m => {
  const str = m.slice(1, -1).trim();
  if (
    str.length > 15 &&
    !str.startsWith('http://www.w3.org') &&
    !str.includes('M0 0h') &&
    !str.includes('calc(') &&
    !str.includes('node_modules') &&
    !str.includes('framer-motion') &&
    !str.includes('react-router') &&
    !str.includes('lucide') &&
    !str.includes('className=') &&
    !str.includes('aria-')
  ) {
    cleanStrings.push(str);
  }
});

const uniqueStrings = Array.from(new Set(cleanStrings));

fs.writeFileSync(
  '/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/reference_content_inventory.md',
  `# SOCIAL VOLUNTEERS (reference site: https://socialvolunteers.in/) - CONTENT INVENTORY\n\n` +
  uniqueStrings.map(s => `- ${s}`).join('\n')
);

console.log('Saved inventory with', uniqueStrings.length, 'entries.');
