const fs = require('fs');
const data = fs.readFileSync('c:\\Users\\70495\\Desktop\\Git Repositories\\Valencia Bangswp\\Valencia Bangswp - V2\\js\\wordData.js', 'utf8');
const start = data.indexOf('[');
const end = data.lastIndexOf(']');
const json = data.substring(start, end + 1);
const re = /dh:\s*'([^']+)',\s*cn:\s*'([^']*)',\s*type:\s*'([^']+)'/g;
const words = [];
let m;
while ((m = re.exec(json)) !== null) {
    words.push({ dh: m[1], cn: m[2], type: m[3] });
}

const dhSet = new Set(words.map(w => w.dh));
const cnSet = new Set(words.map(w => w.cn));

const proposed = [
    {dh:'glinch', cn:'\u7761,\u5165\u7761,\u5b89\u7720', type:'d.'},
    {dh:'splorh', cn:'\u5531,\u6b4c\u5531,\u541f\u5531', type:'d.'},
    {dh:'klinx', cn:'\u98de,\u98de\u7fd4,\u7ff1\u7fd4', type:'d.'},
    {dh:'tromp', cn:'\u6e38,\u6e38\u6cf3,\u6cbe\u6e21', type:'d.'},
    {dh:'chrih', cn:'\u7b11,\u5fae\u7b11,\u6b22\u7b11', type:'d.'},
    {dh:'trezh', cn:'\u6696,\u53d6\u6696,\u52a0\u70ed', type:'d.'},
    {dh:'pl\u0153sh', cn:'\u5439,\u522e\u98ce,\u5439\u62c2', type:'d.'},
    {dh:'drost', cn:'\u6d6e,\u6f02\u6d6e,\u6f02\u6d41', type:'d.'},
    {dh:'glanh', cn:'\u5750,\u5c31\u5750,\u7aef\u5750', type:'d.'},
    {dh:'zrinhod', cn:'\u505a\u68a6,\u68a6\u89c1,\u68a6\u5230', type:'d.'},
    {dh:'glinchiad', cn:'\u7761\u7720,\u7761\u68a6,\u5b89\u7720', type:'m.'},
    {dh:'splorhiad', cn:'\u6b4c\u58f0,\u6b4c\u5531,\u66f2\u8c03', type:'m.'},
    {dh:'klinxiad', cn:'\u98de\u884c,\u7ff1\u7fd4,\u822a\u7a0b', type:'m.'},
    {dh:'trompiad', cn:'\u6e38\u6cf3,\u6cf3\u59ff,\u6cbe\u6e21', type:'m.'},
    {dh:'chrihiad', cn:'\u7b11\u58f0,\u7b11\u5bb9,\u6b22\u7b11', type:'m.'},
    {dh:'trezhiad', cn:'\u6e29\u6696,\u70ed\u91cf,\u6696\u610f', type:'m.'},
    {dh:'pl\u0153shiad', cn:'\u98ce,\u6c14\u6d41,\u5439\u62c2', type:'m.'},
    {dh:'drostiad', cn:'\u6d6e\u529b,\u6f02\u6d6e\u7269,\u6f02\u6d41', type:'m.'},
    {dh:'glanhork', cn:'\u5ea7\u4f4d,\u5750\u5e2d,\u5e2d\u4f4d', type:'m.'},
    {dh:'zrinh', cn:'\u68a6,\u68a6\u5883,\u5e7b\u68a6', type:'m.'},
    {dh:'brash', cn:'\u96e8,\u96e8\u6c34,\u964d\u96e8', type:'m.'},
    {dh:'glish', cn:'\u96ea,\u79ef\u96ea,\u964d\u96ea', type:'m.'},
    {dh:'zlish', cn:'\u51b0,\u51b0\u5757,\u5bd2\u51b0', type:'m.'},
    {dh:'kv\u00eash', cn:'\u7897,\u5668\u76bf,\u94b5', type:'m.'},
    {dh:'glinh', cn:'\u5e8a,\u5367\u69bb,\u5e8a\u94fa', type:'m.'},
    {dh:'drinch', cn:'\u5200,\u5200\u5177,\u5203', type:'m.'},
    {dh:'plosh', cn:'\u529b\u91cf,\u529b\u6c14,\u52b2\u529b', type:'m.'},
    {dh:'klinh', cn:'\u52c7\u6c14,\u80c6\u91cf,\u52c7\u6562', type:'m.'},
    {dh:'dwash', cn:'\u9732\u6c34,\u9732\u73e0,\u671d\u9732', type:'m.'},
    {dh:'krinx', cn:'\u5fc3,\u5fc3\u810f,\u5185\u5fc3', type:'m.'},
];

const dhDup = proposed.filter(p => dhSet.has(p.dh));
console.log('=== dh \u91cd\u590d\u68c0\u67e5 ===');
console.log(dhDup.length > 0 ? dhDup.map(p => p.dh + '(' + p.cn + ')').join(', ') : '\u65e0 \u2713');

const cnDup = proposed.filter(p => cnSet.has(p.cn));
console.log('cn \u5b8c\u5168\u91cd\u590d:', cnDup.length > 0 ? cnDup.map(p => p.dh + '(' + p.cn + ')').join(', ') : '\u65e0 \u2713');

const dhCount = {};
proposed.forEach(p => { dhCount[p.dh] = (dhCount[p.dh] || 0) + 1; });
const internalDup = Object.entries(dhCount).filter(([k,v]) => v > 1);
console.log('\u5185\u90e8\u91cd\u590d:', internalDup.length > 0 ? internalDup.map(([k,v]) => k+'('+v+'\u6b21)').join(', ') : '\u65e0 \u2713');

const vowels = new Set(['a','e','i','o','u','y','\u00ea','\u00e6','\u0153']);
const openSyllables = proposed.filter(p => vowels.has(p.dh[p.dh.length-1]));
console.log('\u5f00\u97f3\u8282\u8bcd:', openSyllables.length > 0 ? openSyllables.map(p => p.dh).join(', ') : '\u65e0 \u2713');

console.log('');
console.log('=== \u5168\u90e830\u4e2a\u65b0\u8bcd ===');
proposed.forEach(p => console.log(p.dh + ' (' + p.type + ') - ' + p.cn + ' [' + p.dh.length + '\u5b57]'));

// Check cn partial match
console.log('');
console.log('=== cn \u90e8\u5206\u5339\u914d\u68c0\u67e5 ===');
const allCn = words.map(w => w.cn);
proposed.forEach(p => {
    const parts = p.cn.split(',');
    parts.forEach(part => {
        const match = allCn.find(c => c.includes(part) || part.includes(c));
        if (match) {
            console.log('  ' + p.dh + ' \u7684 \"' + part + '\" \u53ef\u80fd\u51b2\u7a81: \"' + match + '\"');
        }
    });
});