const fs = require('fs');

const code = fs.readFileSync('/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/ref_bundle.js', 'utf8');

// Search for printable text strings in bundle
const stringRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
const matches = new Set();
let match;

while ((match = stringRegex.exec(code)) !== null) {
  const val = (match[1] || match[2] || match[3] || '').trim();
  if (
    val.length > 5 &&
    !val.includes('path d=') &&
    !val.includes('M0 0h') &&
    !val.includes('calc(') &&
    !val.includes('xmlns') &&
    !val.includes('node_modules') &&
    !val.includes('framer-motion') &&
    !val.includes('react-dom') &&
    !val.includes('lucide')
  ) {
    matches.add(val);
  }
}

const list = Array.from(matches);
console.log('Total extracted UI strings:', list.length);

fs.writeFileSync(
  '/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/all_site_strings.txt',
  list.join('\n')
);

// Find sentences/paragraphs
const paragraphs = list.filter((s) => s.length > 20 || /[A-Z][a-z]+\s+[a-z]+/.test(s));
console.log('Paragraphs & Headings found:', paragraphs.length);
console.log('\n================ TOP CONTENT STRINGS FROM ORIGINAL SITE ================');
console.log(paragraphs.slice(0, 100).join('\n---\n'));
