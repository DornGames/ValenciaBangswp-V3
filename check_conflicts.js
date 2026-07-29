// 冲突检查脚本
const fs = require('fs');
const path = require('path');

// 读取 wordData.js
const wordDataFile = path.join(__dirname, 'js', 'wordData.js');
const code = fs.readFileSync(wordDataFile, 'utf-8');

// 提取 wordData 数组
eval(code);

// 收集所有 dh 和 cn
const dhSet = new Set();
const cnSet = new Set();
const dhMap = new Map(); // dh -> cn
const cnMap = new Map(); // cnFirst -> dh

for (const entry of wordData) {
    const dh = entry.dh;
    const cn = Array.isArray(entry.cn) ? entry.cn.join(',') : entry.cn;
    const cnFirst = cn.split(',')[0].trim();
    
    dhSet.add(dh);
    if (!dhMap.has(dh)) {
        dhMap.set(dh, []);
    }
    dhMap.get(dh).push({ cn, type: entry.type });
    
    cnSet.add(cnFirst);
    if (!cnMap.has(cnFirst)) {
        cnMap.set(cnFirst, []);
    }
    cnMap.get(cnFirst).push({ dh, cn, type: entry.type });
}

console.log('=== 现有词库统计 ===');
console.log(`总词条数: ${wordData.length}`);
console.log(`唯一dh数: ${dhSet.size}`);
console.log(`唯一cn(首义)数: ${cnSet.size}`);

// 用户提出的新词汇
const proposedVerbs = [
    { dh: 'zlwêx', cn: '宣布,宣告,声明', type: 'd.' },
    { dh: 'krwêsh', cn: '推荐,举荐,荐引', type: 'd.' },
    { dh: 'stwêk', cn: '担忧,焦虑,忧心', type: 'd.' },
    { dh: 'klwêp', cn: '渴望,期盼,向往', type: 'd.' },
    { dh: 'plwêx', cn: '弯腰,躬身,俯身', type: 'd.' },
    { dh: 'zrwêsh', cn: '转身,回转,转体', type: 'd.' },
    { dh: 'zroksod', cn: '分析,剖析,解析', type: 'd.' },
    { dh: 'dwæxod', cn: '评估,评价,评鉴', type: 'd.' },
    { dh: 'plænod', cn: '规划,策划,谋划', type: 'd.' },
    { dh: 'kræxod', cn: '梳头,梳理,梳发', type: 'd.' },
    { dh: 'brwmod', cn: '刮脸,剃须,刮面', type: 'd.' },
    { dh: 'glwspod', cn: '刷牙,刷洗,漱口', type: 'd.' },
    { dh: 'slwspod', cn: '擦干,拭干,抹干', type: 'd.' },
    { dh: 'brwshod', cn: '结果,结出,结籽', type: 'd.' },
    { dh: 'drwspod', cn: '刺绣,绣花,刺绣', type: 'd.' },
    { dh: 'krwspod', cn: '剥,剥皮,剥壳', type: 'd.' },
    { dh: 'grwspod', cn: '削,削皮,削去', type: 'd.' },
    { dh: 'frwspod', cn: '融化,融解,消融', type: 'd.' },
    { dh: 'brwspod', cn: '烫,烫伤,灼烫', type: 'd.' },
    { dh: 'drwspod', cn: '淋,淋湿,浇淋', type: 'd.' },
    { dh: 'kriwhiêt', cn: '介绍,引荐,介引', type: 'd.' },
    { dh: 'klasiêt', cn: '汇报,报告,呈报', type: 'd.' },
    { dh: 'dwexhiêt', cn: '总结,归纳,概括', type: 'd.' },
    { dh: 'krwesiêt', cn: '协助,辅助,辅佐', type: 'd.' },
    { dh: 'zlæshod', cn: '渴望,渴求,向往', type: 'd.' },
    { dh: 'frwshiêt', cn: '发芽,萌发,抽芽', type: 'd.' },
    { dh: 'flwshod', cn: '开花,绽放,盛放', type: 'd.' },
    { dh: 'klwshiêt', cn: '凋谢,枯萎,凋零', type: 'd.' },
    { dh: 'trwshiêt', cn: '结果,结出,结籽', type: 'd.' },
    { dh: 'zræxhiêt', cn: '萌芽,萌生,滋生', type: 'd.' },
];

const proposedNouns = [
    // 身体部位
    { dh: 'plond', cn: '背部,脊背,后背', type: 'm.' },
    { dh: 'krond', cn: '胸部,胸膛,胸腔', type: 'm.' },
    { dh: 'zrond', cn: '腰部,腰身,腰', type: 'm.' },
    { dh: 'blont', cn: '腹部,肚腹,肚子', type: 'm.' },
    { dh: 'grost', cn: '肋骨,肋,肋条', type: 'm.' },
    { dh: 'zront', cn: '手腕,腕,腕部', type: 'm.' },
    { dh: 'klost', cn: '脚踝,踝,踝部', type: 'm.' },
    { dh: 'zrost', cn: '小腿,胫,小腿部', type: 'm.' },
    // 食物
    { dh: 'bromp', cn: '米饭,饭,米', type: 'm.' },
    { dh: 'prond', cn: '面条,面,面食', type: 'm.' },
    { dh: 'klomp', cn: '面包,馒头,馍', type: 'm.' },
    { dh: 'grimp', cn: '豆,豆子,豆类', type: 'm.' },
    { dh: 'zrimp', cn: '蘑菇,菌,菇', type: 'm.' },
    { dh: 'plomp', cn: '蜂蜜,蜜,蜜糖', type: 'm.' },
    { dh: 'brwmp', cn: '奶酪,乳酪,酪', type: 'm.' },
    { dh: 'drwmp', cn: '奶油,乳脂,脂', type: 'm.' },
    // 衣物
    { dh: 'slomp', cn: '上衣,衬衫,衫', type: 'm.' },
    { dh: 'klomp', cn: '裤子,裤,长裤', type: 'm.' },
    { dh: 'zromp', cn: '裙子,裙,裙装', type: 'm.' },
    { dh: 'grimp', cn: '鞋子,鞋,履', type: 'm.' },
    { dh: 'blomp', cn: '帽子,帽,冠帽', type: 'm.' },
    { dh: 'stromp', cn: '袜子,袜,足袋', type: 'm.' },
    // 家具/家居
    { dh: 'krimp', cn: '书架,书柜,架', type: 'm.' },
    { dh: 'zrimp', cn: '抽屉,抽屉,柜屉', type: 'm.' },
    { dh: 'plomp', cn: '枕头,枕,枕具', type: 'm.' },
    { dh: 'fromp', cn: '被子,被褥,衾', type: 'm.' },
    { dh: 'kromp', cn: '地毯,地毡,毯', type: 'm.' },
    { dh: 'zromp', cn: '窗帘,帘,帷帘', type: 'm.' },
    // 自然/地理
    { dh: 'strand', cn: '海岸,海滨,滩', type: 'm.' },
    { dh: 'zrond', cn: '河流,川流,水道', type: 'm.' },
    { dh: 'plond', cn: '池塘,水塘,池', type: 'm.' },
    { dh: 'brond', cn: '山坡,坡,斜坡', type: 'm.' },
    { dh: 'grond', cn: '平原,平野,旷野', type: 'm.' },
    { dh: 'krend', cn: '海峡,峡,隘口', type: 'm.' },
    // 抽象概念
    { dh: 'klênd', cn: '逻辑,条理,推理', type: 'm.' },
    { dh: 'zrênd', cn: '真理,真谛,至理', type: 'm.' },
    { dh: 'plênd', cn: '道德,伦理,道义', type: 'm.' },
    { dh: 'brênd', cn: '智慧,才智,明智', type: 'm.' },
    { dh: 'drênd', cn: '尊严,尊贵,高贵', type: 'm.' },
    { dh: 'frênd', cn: '友谊,交情,情谊', type: 'm.' },
    { dh: 'grênd', cn: '正义,公正,公道', type: 'm.' },
    { dh: 'krênd', cn: '荣誉,荣光,荣耀', type: 'm.' },
    // 时间/时令
    { dh: 'zlænd', cn: '黎明,拂晓,破晓', type: 'm.' },
    { dh: 'plænd', cn: '黄昏,暮色,薄暮', type: 'm.' },
    { dh: 'klænd', cn: '正午,晌午,日中', type: 'm.' },
    { dh: 'brænd', cn: '子夜,午夜,半夜', type: 'm.' },
    // 职业/身份
    { dh: 'krimih', cn: '科学家,科研者', type: 'm.' },
    { dh: 'zrimih', cn: '工程师,技师', type: 'm.' },
    { dh: 'plimih', cn: '建筑师,建造师', type: 'm.' },
    { dh: 'grimih', cn: '画家,画师', type: 'm.' },
];

console.log('\n\n========================================');
console.log('=== 动词冲突检查 ===');
console.log('========================================\n');

const verbConflicts = [];
const verbAddedDh = new Set();
const verbAddedCn = new Set();

for (const v of proposedVerbs) {
    const dh = v.dh;
    const cnFirst = v.cn.split(',')[0].trim();
    let hasConflict = false;
    let conflictReasons = [];
    
    // 检查 dh 是否在现有词库中
    if (dhSet.has(dh)) {
        const existing = dhMap.get(dh);
        conflictReasons.push(`dh"${dh}"已存在：${JSON.stringify(existing)}`);
        hasConflict = true;
    }
    
    // 检查 dh 是否在提议列表中重复
    if (verbAddedDh.has(dh)) {
        conflictReasons.push(`dh"${dh}"在提议动词列表中重复`);
        hasConflict = true;
    }
    
    // 检查 cn 首义是否在现有词库中
    if (cnSet.has(cnFirst)) {
        const existing = cnMap.get(cnFirst);
        conflictReasons.push(`cn首义"${cnFirst}"已存在：${JSON.stringify(existing)}`);
        hasConflict = true;
    }
    
    // 检查 cn 首义是否在提议列表中重复
    if (verbAddedCn.has(cnFirst)) {
        conflictReasons.push(`cn首义"${cnFirst}"在提议动词列表中重复`);
        hasConflict = true;
    }
    
    verbAddedDh.add(dh);
    verbAddedCn.add(cnFirst);
    
    if (hasConflict) {
        verbConflicts.push({ word: v, reasons: conflictReasons });
        console.log(`❌ ${dh} (${v.cn}):`);
        conflictReasons.forEach(r => console.log(`   ${r}`));
    } else {
        console.log(`✅ ${dh} (${v.cn})`);
    }
}

console.log('\n\n========================================');
console.log('=== 名词冲突检查 ===');
console.log('========================================\n');

const nounConflicts = [];
const nounAddedDh = new Set();
const nounAddedCn = new Set();

for (const n of proposedNouns) {
    const dh = n.dh;
    const cnFirst = n.cn.split(',')[0].trim();
    let hasConflict = false;
    let conflictReasons = [];
    
    // 检查 dh 是否在现有词库中
    if (dhSet.has(dh)) {
        const existing = dhMap.get(dh);
        conflictReasons.push(`dh"${dh}"已存在：${JSON.stringify(existing)}`);
        hasConflict = true;
    }
    
    // 检查 dh 是否在提议名词列表中重复
    if (nounAddedDh.has(dh)) {
        conflictReasons.push(`dh"${dh}"在提议名词列表中重复`);
        hasConflict = true;
    }
    
    // 检查 dh 是否在提议动词列表中重复
    if (verbAddedDh.has(dh)) {
        conflictReasons.push(`dh"${dh}"在提议动词列表中已存在`);
        hasConflict = true;
    }
    
    // 检查 cn 首义是否在现有词库中
    if (cnSet.has(cnFirst)) {
        const existing = cnMap.get(cnFirst);
        conflictReasons.push(`cn首义"${cnFirst}"已存在：${JSON.stringify(existing)}`);
        hasConflict = true;
    }
    
    // 检查 cn 首义是否在提议名词列表中重复
    if (nounAddedCn.has(cnFirst)) {
        conflictReasons.push(`cn首义"${cnFirst}"在提议名词列表中重复`);
        hasConflict = true;
    }
    
    nounAddedDh.add(dh);
    nounAddedCn.add(cnFirst);
    
    if (hasConflict) {
        nounConflicts.push({ word: n, reasons: conflictReasons });
        console.log(`❌ ${dh} (${n.cn}):`);
        conflictReasons.forEach(r => console.log(`   ${r}`));
    } else {
        console.log(`✅ ${dh} (${n.cn})`);
    }
}

console.log('\n\n========================================');
console.log('=== 动词与名词之间跨类冲突检查 ===');
console.log('========================================\n');

let crossConflict = false;
for (const n of proposedNouns) {
    if (verbAddedDh.has(n.dh)) {
        console.log(`❌ 名词 dh"${n.dh}" 与动词冲突（已在动词列表中）`);
        crossConflict = true;
    }
    const cnFirst = n.cn.split(',')[0].trim();
    if (verbAddedCn.has(cnFirst)) {
        console.log(`❌ 名词 cn"${cnFirst}" 与动词含义冲突（已在动词列表中）`);
        crossConflict = true;
    }
}
if (!crossConflict) {
    console.log('✅ 无跨类冲突');
}

console.log('\n\n========================================');
console.log('=== 特殊字母比例检查 ===');
console.log('========================================\n');

function countSpecialChars(dh) {
    const specials = (dh.match(/[êæœ]/g) || []).length;
    return specials;
}

let verbSpecialCount = 0;
for (const v of proposedVerbs) {
    verbSpecialCount += countSpecialChars(v.dh);
}
console.log(`动词特殊字母数: ${verbSpecialCount}/${proposedVerbs.length} = ${(verbSpecialCount/proposedVerbs.length*100).toFixed(1)}%`);

let nounSpecialCount = 0;
for (const n of proposedNouns) {
    nounSpecialCount += countSpecialChars(n.dh);
}
console.log(`名词特殊字母数: ${nounSpecialCount}/${proposedNouns.length} = ${(nounSpecialCount/proposedNouns.length*100).toFixed(1)}%`);

console.log('\n\n========================================');
console.log('=== 汇总 ===');
console.log('========================================\n');
console.log(`动词冲突数: ${verbConflicts.length}/${proposedVerbs.length}`);
console.log(`名词冲突数: ${nounConflicts.length}/${proposedNouns.length}`);

// 输出冲突详情
if (verbConflicts.length > 0) {
    console.log('\n动词冲突列表：');
    verbConflicts.forEach(c => console.log(`  ${c.word.dh} (${c.word.cn})`));
}
if (nounConflicts.length > 0) {
    console.log('\n名词冲突列表：');
    nounConflicts.forEach(c => console.log(`  ${c.word.dh} (${c.word.cn})`));
}