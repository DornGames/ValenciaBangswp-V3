// 提取所有单词数据用于分析
var fs = require('fs');
var content = fs.readFileSync('js/wordData.js', 'utf8');

// 解析所有单词条目
var entries = [];
var regex = /\{\s*dh:\s*'([^']+)'\s*,\s*cn:\s*'([^']+)'\s*,\s*type:\s*'([^']+)'/g;
var m;
while ((m = regex.exec(content)) !== null) {
    entries.push({ dh: m[1], cn: m[1] === m[1] ? m[2] : m[2], type: m[3] });
}

// 统计
var verbs = entries.filter(function(e) { return e.type === 'd.'; });
var nouns = entries.filter(function(e) { return e.type === 'm.'; });

console.log('=== 总条目:', entries.length, '===');
console.log('动词(d.):', verbs.length);
console.log('名词(m.):', nouns.length);

// 输出所有动词
console.log('\n=== 所有动词 dh ===');
verbs.forEach(function(v) { console.log(v.dh + ' -> ' + v.cn); });

console.log('\n=== 所有名词 dh ===');
nouns.forEach(function(n) { console.log(n.dh + ' -> ' + n.cn); });

// 检查特殊字母使用
var special = content.match(/[êæœ]/g);
console.log('\n=== 特殊字母统计 ===');
console.log('ê:', (content.match(/ê/g) || []).length);
console.log('æ:', (content.match(/æ/g) || []).length);
console.log('œ:', (content.match(/œ/g) || []).length);
console.log('总计特殊字母:', special ? special.length : 0);
console.log('总字符数:', content.length);
console.log('特殊字母比例:', ((special ? special.length : 0) / content.length * 100).toFixed(2) + '%');