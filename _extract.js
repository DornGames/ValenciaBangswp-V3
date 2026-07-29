const fs = require('fs');
const data = fs.readFileSync('c:\\Users\\70495\\Desktop\\Git Repositories\\Valencia Bangswp\\Valencia Bangswp - V2\\js\\wordData.js', 'utf8');
const dhMatches = data.matchAll(/dh:\s*['`]([^'`]+)['`]/g);
const dhs = [];
for (const m of dhMatches) {
  dhs.push(m[1]);
}
console.log('Total entries:', dhs.length);
console.log('All dh values:', JSON.stringify(dhs));