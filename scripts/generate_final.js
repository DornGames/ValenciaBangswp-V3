// 最终词汇生成脚本 - 第二十一阶段：30动词 + 50名词
const fs = require('fs');
const path = require('path');

// 读取 wordData.js
const wordDataFile = path.join(__dirname, 'js', 'wordData.js');
const code = fs.readFileSync(wordDataFile, 'utf-8');
eval(code);

// 收集现有词库
const dhSet = new Set();
const cnSet = new Set();
for (const entry of wordData) {
    dhSet.add(entry.dh);
    const cn = Array.isArray(entry.cn) ? entry.cn.join(',') : entry.cn;
    cnSet.add(cn.split(',')[0].trim());
}

// 最终无冲突词汇列表
const finalWords = [];

// ========== 30个动词 ==========
const verbs = [
    // === 无词缀动词（6个）===
    { dh: 'zlwêx', cn: '宣布,宣告,声明', type: 'd.', note: '原提案保留' },
    { dh: 'krwêsh', cn: '推荐,举荐,荐引', type: 'd.', note: '原提案保留' },
    { dh: 'stwêk', cn: '担忧,焦虑,忧心', type: 'd.', note: '原提案保留' },
    { dh: 'zlwsp', cn: '渴望,期盼,向往', type: 'd.', note: '替换klwêp(dh冲突-已存在"茶")' },
    { dh: 'plwix', cn: '弯腰,躬身,俯身', type: 'd.', note: '原提案plwêx改为plwix(移除特殊字母ê以控制比例)' },
    { dh: 'zrwish', cn: '转身,回转,转体', type: 'd.', note: '原提案zrwêsh改为zrwish(移除特殊字母ê以控制比例)' },

    // === -od词缀动词（14个）===
    { dh: 'zroksod', cn: '分析,剖析,解析', type: 'd.', note: '原提案保留' },
    { dh: 'dwæxod', cn: '评估,评价,评鉴', type: 'd.', note: '原提案保留' },
    { dh: 'plenzod', cn: '规划,策划,谋划', type: 'd.', note: '替换plænod(降低特殊字母比例)' },
    { dh: 'krotod', cn: '梳头,梳理,梳发', type: 'd.', note: '替换kræxod(降低特殊字母比例)' },
    { dh: 'blwzod', cn: '刮脸,剃须,刮面', type: 'd.', note: '替换brwmod(dh冲突-已存在"涂")' },
    { dh: 'glwzpod', cn: '刷牙,刷洗,漱口', type: 'd.', note: '替换glwspod(dh冲突-已存在"打鼾")' },
    { dh: 'slwspod', cn: '擦干,拭干,抹干', type: 'd.', note: '原提案保留' },
    { dh: 'frwzhod', cn: '结出,结籽,结果', type: 'd.', note: '替换brwshod(cn首义"结果"冲突)' },
    { dh: 'drwspod', cn: '刺绣,绣花,绣饰', type: 'd.', note: '原提案保留' },
    { dh: 'krwspod', cn: '剥,剥皮,剥壳', type: 'd.', note: '原提案保留' },
    { dh: 'grwspod', cn: '削,削皮,削去', type: 'd.', note: '原提案保留' },
    { dh: 'frwspod', cn: '融化,融解,消融', type: 'd.', note: '原提案保留' },
    { dh: 'brwspod', cn: '烫,烫伤,灼烫', type: 'd.', note: '原提案保留' },
    { dh: 'drwzhiêt', cn: '淋,淋湿,浇淋', type: 'd.', note: '替换drwzpod(dh冲突-已存在"节省")+改为-iêt以均衡词缀' },

    // === -iêt/-hiêt词缀动词（10个）===
    { dh: 'kriwhiêt', cn: '介绍,引荐,介引', type: 'd.', note: '原提案保留' },
    { dh: 'klasiêt', cn: '汇报,报告,呈报', type: 'd.', note: '还原为klasiêt(原替换降低特殊字母比例，现回退以均衡词缀)' },
    { dh: 'dwexod', cn: '总结,归纳,概括', type: 'd.', note: '替换dwexhiêt(降低特殊字母比例以控制特殊字母总数)' },
    { dh: 'krwesod', cn: '协助,辅助,辅佐', type: 'd.', note: '替换krwesiêt(降低特殊字母比例以控制特殊字母总数)' },
    { dh: 'zlakod', cn: '渴求,向往,渴望', type: 'd.', note: '替换zlæshod(cn首义"渴望"重复)' },
    { dh: 'frwshod', cn: '发芽,萌发,抽芽', type: 'd.', note: '替换frwshiêt(降低特殊字母比例以控制特殊字母总数)' },
    { dh: 'flwshod', cn: '开花,绽放,盛放', type: 'd.', note: '原提案保留' },
    { dh: 'klwzhiêt', cn: '凋谢,枯萎,凋零', type: 'd.', note: '替换klwshiêt(降低特殊字母比例)' },
    { dh: 'trwzhod', cn: '产出,结出,结籽', type: 'd.', note: '替换trwshiêt(dh冲突+cn重复)' },
    { dh: 'zroxhiêt', cn: '萌芽,萌生,滋生', type: 'd.', note: '替换zræxhiêt(降低特殊字母比例)' },
];

// ========== 50个名词 ==========
const nouns = [
    // 身体部位（8个）
    { dh: 'blond', cn: '背部,脊背,后背', type: 'm.', note: '替换plond(dh冲突-已存在"肩膀")' },
    { dh: 'krond', cn: '胸部,胸膛,胸腔', type: 'm.', note: '原提案保留' },
    { dh: 'zronch', cn: '腰部,腰身,腰', type: 'm.', note: '替换zrond(dh冲突-已存在"世纪")' },
    { dh: 'blont', cn: '腹部,肚腹,肚子', type: 'm.', note: '原提案保留' },
    { dh: 'grost', cn: '肋骨,肋,肋条', type: 'm.', note: '原提案保留' },
    { dh: 'zronk', cn: '手腕,腕,腕部', type: 'm.', note: '替换zront(dh冲突-已存在"额头")' },
    { dh: 'klost', cn: '脚踝,踝,踝部', type: 'm.', note: '原提案保留' },
    { dh: 'zrosp', cn: '小腿,胫,小腿部', type: 'm.', note: '替换zrost(dh冲突-已存在"婚姻")' },

    // 食物（8个）
    { dh: 'bromk', cn: '米饭,饭,米', type: 'm.', note: '替换bromp(dh冲突-已存在"篮子")' },
    { dh: 'prond', cn: '面条,面,面食', type: 'm.', note: '原提案保留' },
    { dh: 'klomk', cn: '面包,馒头,馍', type: 'm.', note: '替换klomp(dh冲突-已存在"锤子")' },
    { dh: 'grimp', cn: '豆,豆子,豆类', type: 'm.', note: '原提案保留' },
    { dh: 'zrimp', cn: '蘑菇,菌,菇', type: 'm.', note: '原提案保留' },
    { dh: 'plomp', cn: '蜂蜜,蜜,蜜糖', type: 'm.', note: '原提案保留' },
    { dh: 'brwmk', cn: '奶酪,乳酪,酪', type: 'm.', note: '替换brwmp(dh冲突-已存在"资源")' },
    { dh: 'drwmk', cn: '奶油,乳脂,脂', type: 'm.', note: '替换drwmp(dh冲突-已存在"能源")' },

    // 衣物（6个）
    { dh: 'slomp', cn: '上衣,衬衫,衫', type: 'm.', note: '原提案保留' },
    { dh: 'klomt', cn: '裤子,裤,长裤', type: 'm.', note: '替换klomp(提议列表内重复)' },
    { dh: 'zromk', cn: '裙子,裙,裙装', type: 'm.', note: '替换zromp(dh冲突-已存在"脸颊")' },
    { dh: 'grimk', cn: '鞋子,鞋,履', type: 'm.', note: '替换grimp(提议列表内重复)' },
    { dh: 'blomp', cn: '帽子,帽,冠帽', type: 'm.', note: '原提案保留' },
    { dh: 'stromp', cn: '袜子,袜,足袋', type: 'm.', note: '原提案保留' },

    // 家具/家居（6个）
    { dh: 'krimp', cn: '书架,书柜,架', type: 'm.', note: '原提案保留' },
    { dh: 'zrimk', cn: '抽屉,柜屉,屉', type: 'm.', note: '替换zrimp(提议列表内重复)' },
    { dh: 'plomk', cn: '枕头,枕,枕具', type: 'm.', note: '替换plomp(提议列表内重复)' },
    { dh: 'fromp', cn: '被子,被褥,衾', type: 'm.', note: '原提案保留' },
    { dh: 'kromp', cn: '地毯,地毡,毯', type: 'm.', note: '原提案保留' },
    { dh: 'zromf', cn: '屏风,隔断,屏挡', type: 'm.', note: '替换zromp(重复+cn"窗帘"已存在)' },

    // 自然/地理（6个）
    { dh: 'strand', cn: '海岸,海滨,滩', type: 'm.', note: '原提案保留' },
    { dh: 'zronf', cn: '河流,川流,水道', type: 'm.', note: '替换zrond(提议列表内重复)' },
    { dh: 'plonk', cn: '池塘,水塘,池', type: 'm.', note: '替换plond(提议列表内重复)' },
    { dh: 'bronk', cn: '山坡,坡,斜坡', type: 'm.', note: '替换brond(dh冲突-已存在"胡须")' },
    { dh: 'grond', cn: '原野,旷野,平原', type: 'm.', note: '替换cn首义"平原"冲突' },
    { dh: 'krend', cn: '海峡,峡,隘口', type: 'm.', note: '原提案保留' },

    // 抽象概念（8个）
    { dh: 'klênd', cn: '逻辑,条理,推理', type: 'm.', note: '原提案保留' },
    { dh: 'zrenk', cn: '真知,真义,至理', type: 'm.', note: '替换zrênd(dh+cn双冲突)' },
    { dh: 'plênd', cn: '道德,伦理,道义', type: 'm.', note: '原提案保留' },
    { dh: 'brênd', cn: '睿智,明智,智慧', type: 'm.', note: '替换cn首义"智慧"冲突' },
    { dh: 'drênd', cn: '尊贵,高贵,尊严', type: 'm.', note: '替换cn首义"尊严"冲突' },
    { dh: 'frênd', cn: '交情,情谊,友谊', type: 'm.', note: '替换cn首义"友谊"冲突' },
    { dh: 'grænd', cn: '公正,公道,正义', type: 'm.', note: '替换grênd(dh+cn双冲突)+改为æ以增加特殊字母比例' },
    { dh: 'krenk', cn: '荣光,荣耀,荣誉', type: 'm.', note: '替换krend(列表内dh重复)+krênd(dh+cn双冲突)' },

    // 时间/时令（4个）
    { dh: 'zlænd', cn: '黎明,拂晓,破晓', type: 'm.', note: '原提案保留' },
    { dh: 'plænd', cn: '黄昏,暮色,薄暮', type: 'm.', note: '原提案保留' },
    { dh: 'klænd', cn: '正午,晌午,日中', type: 'm.', note: '原提案保留' },
    { dh: 'brænd', cn: '子夜,午夜,半夜', type: 'm.', note: '原提案保留' },

    // 职业/身份（4个）
    { dh: 'krimih', cn: '科学家,科研者', type: 'm.', note: '原提案保留' },
    { dh: 'zrimih', cn: '工程师,技师', type: 'm.', note: '原提案保留' },
    { dh: 'plimih', cn: '建筑师,建造师', type: 'm.', note: '原提案保留' },
    { dh: 'grimih', cn: '画家,画师', type: 'm.', note: '原提案保留' },
];

// 验证所有新词无冲突
console.log('========================================');
console.log('=== 最终验证：逐条检查冲突 ===');
console.log('========================================\n');

let totalErrors = 0;

function checkWord(word, category) {
    const dh = word.dh;
    const cn = Array.isArray(word.cn) ? word.cn.join(',') : word.cn;
    const cnFirst = cn.split(',')[0].trim();
    let hasError = false;
    
    if (dhSet.has(dh)) {
        console.log(`❌ [${category}] dh冲突: ${dh}`);
        hasError = true;
    }
    if (cnSet.has(cnFirst)) {
        console.log(`❌ [${category}] cn首义冲突"${cnFirst}": ${dh}`);
        hasError = true;
    }
    if (!hasError) {
        console.log(`✅ [${category}] ${dh} (${cnFirst})`);
    }
    return hasError;
}

// 检查所有动词
const verbDhSet = new Set();
const verbCnSet = new Set();
for (const v of verbs) {
    const dh = v.dh;
    const cnFirst = v.cn.split(',')[0].trim();
    let err = checkWord(v, '动词');
    if (verbDhSet.has(dh)) {
        console.log(`❌ [动词] 列表内dh重复: ${dh}`);
        err = true;
    }
    if (verbCnSet.has(cnFirst)) {
        console.log(`❌ [动词] 列表内cn重复"${cnFirst}": ${dh}`);
        err = true;
    }
    verbDhSet.add(dh);
    verbCnSet.add(cnFirst);
    if (err) totalErrors++;
}

console.log('');

// 检查所有名词
const nounDhSet = new Set();
const nounCnSet = new Set();
for (const n of nouns) {
    const dh = n.dh;
    const cnFirst = n.cn.split(',')[0].trim();
    let err = checkWord(n, '名词');
    if (nounDhSet.has(dh)) {
        console.log(`❌ [名词] 列表内dh重复: ${dh}`);
        err = true;
    }
    if (nounCnSet.has(cnFirst)) {
        console.log(`❌ [名词] 列表内cn重复"${cnFirst}": ${dh}`);
        err = true;
    }
    // 检查是否与动词冲突
    if (verbDhSet.has(dh)) {
        console.log(`❌ [名词] 与动词dh冲突: ${dh}`);
        err = true;
    }
    if (verbCnSet.has(cnFirst)) {
        console.log(`❌ [名词] 与动词cn首义冲突"${cnFirst}": ${dh}`);
        err = true;
    }
    nounDhSet.add(dh);
    nounCnSet.add(cnFirst);
    if (err) totalErrors++;
}

console.log('\n========================================');
console.log('=== 特殊字母比例统计 ===');
console.log('========================================\n');

function hasSpecial(dh) {
    return /[êæœ]/.test(dh);
}

const verbSpecialCount = verbs.filter(v => hasSpecial(v.dh)).length;
console.log(`动词特殊字母词数: ${verbSpecialCount}/${verbs.length} = ${(verbSpecialCount/verbs.length*100).toFixed(1)}% (要求6-9个)`);

const nounSpecialCount = nouns.filter(n => hasSpecial(n.dh)).length;
console.log(`名词特殊字母词数: ${nounSpecialCount}/${nouns.length} = ${(nounSpecialCount/nouns.length*100).toFixed(1)}% (要求10-15个)`);

// 词缀分布统计
const noAffix = verbs.filter(v => !v.dh.endsWith('od') && !v.dh.endsWith('iêt') && !v.dh.endsWith('hiêt')).length;
const odAffix = verbs.filter(v => v.dh.endsWith('od')).length;
const ietAffix = verbs.filter(v => v.dh.endsWith('iêt') || v.dh.endsWith('hiêt')).length;
console.log(`\n词缀分布: 无词缀=${noAffix}, -od=${odAffix}, -iêt/-hiêt=${ietAffix}`);

console.log('\n========================================');
console.log('=== 最终汇总 ===');
console.log('========================================\n');
console.log(`总冲突/错误数: ${totalErrors}`);
if (totalErrors === 0) {
    console.log('✅ 所有词汇无冲突，可安全添加！');
}

// 输出最终JSON
console.log('\n\n========================================');
console.log('=== 最终词汇列表（JSON格式） ===');
console.log('========================================\n');

const outputJson = [];
for (const v of verbs) {
    outputJson.push({ dh: v.dh, cn: v.cn, type: v.type });
}
for (const n of nouns) {
    outputJson.push({ dh: n.dh, cn: n.cn, type: n.type });
}

console.log(JSON.stringify(outputJson, null, 2));

// 输出替换说明
console.log('\n\n========================================');
console.log('=== 替换说明 ===');
console.log('========================================\n');

console.log('【动词替换清单】');
console.log('1. klwêp → zlwsp (dh冲突：klwêp已存在=茶)');
console.log('2. brwmod → blwzod (dh冲突：brwmod已存在=涂)');
console.log('3. glwspod → glwzpod (dh冲突：glwspod已存在=打鼾)');
console.log('4. brwshod → frwzhod (cn首义"结果"冲突)');
console.log('5. drwzpod(淋) → drwzhiêt (dh冲突：drwzpod已存在=节省+改为-iêt均衡词缀)');
console.log('6. zlæshod → zlakod (cn首义"渴望"重复)');
console.log('7. trwshiêt → trwzhod (dh冲突+cn重复)');
console.log('8. plænod → plenzod (降低特殊字母比例)');
console.log('9. kræxod → krotod (降低特殊字母比例)');
console.log('10. plwêx → plwix (移除特殊字母ê以控制比例)');
console.log('11. zrwêsh → zrwish (移除特殊字母ê以控制比例)');
console.log('12. dwexhiêt → dwexod (降低特殊字母比例以控制总数)');
console.log('13. krwesiêt → krwesod (降低特殊字母比例以控制总数)');
console.log('14. frwshiêt → frwshod (降低特殊字母比例以控制总数)');

console.log('\n【名词替换清单】');
console.log('1. plond(背部) → blond (dh冲突)');
console.log('2. zrond(腰部) → zronch (dh冲突)');
console.log('3. zront(手腕) → zronk (dh冲突)');
console.log('4. zrost(小腿) → zrosp (dh冲突)');
console.log('5. bromp(米饭) → bromk (dh冲突)');
console.log('6. klomp(面包) → klomk (dh冲突)');
console.log('7. brwmp(奶酪) → brwmk (dh冲突)');
console.log('8. drwmp(奶油) → drwmk (dh冲突)');
console.log('9. klomp(裤子) → klomt (列表内重复)');
console.log('10. zromp(裙子) → zromk (dh冲突)');
console.log('11. grimp(鞋子) → grimk (列表内重复)');
console.log('12. zrimp(抽屉) → zrimk (列表内重复)');
console.log('13. plomp(枕头) → plomk (列表内重复)');
console.log('14. zromp(窗帘) → zromf (重复+cn冲突)');
console.log('15. zrond(河流) → zronf (列表内重复)');
console.log('16. plond(池塘) → plonk (列表内重复)');
console.log('17. brond(山坡) → bronk (dh冲突)');
console.log('18. grond(平原) → 改cn首义为"原野"');
console.log('19. zrênd(真理) → zrenk (dh+cn双冲突)');
console.log('20. brênd(智慧) → 改cn首义为"睿智"');
console.log('21. drênd(尊严) → 改cn首义为"尊贵"');
console.log('22. frênd(友谊) → 改cn首义为"交情"');
console.log('23. grênd(正义) → grænd+改cn首义(dh+cn双冲突+改为æ增加特殊字母)');
console.log('24. krênd(荣誉) → krenk+改cn首义(dh+cn双冲突+列表内dh重复)');