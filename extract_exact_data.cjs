const fs = require('fs');

const code = fs.readFileSync('/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/ref_bundle.js', 'utf8');

// Extract all JSON-like objects or data arrays in bundle
const arrayMatches = code.match(/\[\s*\{[^\[\]]{20,}\}\s*\]/g) || [];

console.log('Found data arrays:', arrayMatches.length);

fs.writeFileSync(
  '/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/exact_site_data.txt',
  arrayMatches.join('\n\n========================================\n\n')
);

// Also look for specific text strings like mission, vision, about, contact details
const textSections = [];
const matches = code.matchAll(/["\x27`]([^"\x27`]{25,})["\x27`]/g);
for (const m of matches) {
  const s = m[1];
  if (
    !s.includes('http') &&
    !s.includes('className') &&
    !s.includes('path d=') &&
    !s.includes('webpack') &&
    !s.includes('lucide')
  ) {
    textSections.push(s);
  }
}

fs.writeFileSync(
  '/Users/vivekchetan/.gemini/antigravity/scratch/social-volunteers-3d/text_sections.txt',
  Array.from(new Set(textSections)).join('\n---\n')
);

console.log('Saved data and text sections.');
