/* ============================================
   tools.js | 纯工具函数：字母转换、编辑距离、词汇派生
   ============================================ */

// === 湩语/拉丁字母映射表 ===
var irelavCrt = {
    a: '∀', b: '±', c: '⊂', d: '∂', e: '∃', f: '∫', g: '⊙', h: '∥',
    i: '∈', j: '∉', k: '⫥', l: '∤', m: '≡', n: '∩', o: 'cOɔ', p: '▱',
    q: '∅', r: '∠', s: '∽', t: '⊥', u: '∪', v: '√', w: '∓', x: '=',
    y: '≈', z: '≠', ê: '∄', æ: '∝', œ: '∞'
}; // 湩语字母列表

var latinCrt = {
    '∀': 'a'
}; // 拉丁字母列表（部分）

// === String.prototype 扩展 ===

/**
 * 单词转换：将字符串中的每个字母按目标类型逐字符转换
 * 扩展在 String.prototype 上，可通过 "word".wordConvert("irelav") 调用
 */
String.prototype.wordConvert = function (target) {
    var ts = convertToLowercase(this);
    var ans = '';
    for (var i = 0; i < ts.length; i++) {
        try {
            var tgt = ts[i].convert(target);
            if (!tgt) {
                ans += ts[i]; // 不在字母列表中，保留原样
            } else {
                ans += String(tgt);
            }
        } catch (err) {
            window.alert('请不要输入无关字符!');
            console.error(err);
        }
    }
    return ans;
};

/**
 * 单字母转换：将单个字符转为湩语字母或拉丁字母
 * 扩展在 String.prototype 上，可通过 "a".convert("irelav") 调用
 */
String.prototype.convert = function (target) {
    switch (target) {
        case 'irelav': return irelavCrt['' + this]; // 转成湩语字母
        case 'latin':  return latinCrt['' + this];  // 转成拉丁字母
        default: break;
    }
};

// === 大小写转换 ===
function convertToLowercase(str) {
    return str.toUpperCase().toLowerCase();
}

// === Damerau-Levenshtein 编辑距离 ===
class Levenshtein {
    // 计算 Damerau-Levenshtein 距离（支持插入、删除、替换、相邻交换）
    getDLDistance(str1, str2) {
        let len1 = str1.length;
        let len2 = str2.length;
        if (len1 === 0) return len2;
        if (len2 === 0) return len1;
        // 创建 (len1+1) x (len2+1) 的矩阵
        let d = [];
        for (let i = 0; i <= len1; i++) {
            d[i] = [];
            d[i][0] = i;
        }
        for (let j = 0; j <= len2; j++) {
            d[0][j] = j;
        }
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                let cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                d[i][j] = Math.min(
                    d[i - 1][j] + 1,        // 删除
                    d[i][j - 1] + 1,        // 插入
                    d[i - 1][j - 1] + cost  // 替换
                );
                // 相邻字符交换（transposition）
                if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
                }
            }
        }
        return d[len1][len2];
    }

    // 查找𣿅语（拉丁字母）近似词
    // 支持：完整匹配、前缀匹配、相似度匹配
    // 在结果中先按精确前缀匹配排序，再按相似度排序
    findSimilarChars_dh(mainStr, strArray, tp = 'dh') {
        let threshold = 0.3;
        let results = [];
        for (let item of strArray) {
            let strDH = item[tp];
            if (!strDH) continue;
            let distance = this.getDLDistance(mainStr, strDH);
            let maxLen = Math.max(mainStr.length, strDH.length);
            let similarity = 1 - distance / maxLen;
            if (similarity > threshold) {
                results.push({ item, similarity, dh: strDH });
            }
        }
        // 先按精确前缀匹配排序，再按相似度降序
        results.sort((a, b) => {
            let aPrefix = a.dh.startsWith(mainStr) ? 1 : 0;
            let bPrefix = b.dh.startsWith(mainStr) ? 1 : 0;
            if (aPrefix !== bPrefix) return bPrefix - aPrefix;
            return b.similarity - a.similarity;
        });
        return results.map(r => r.item);
    }

    // 查找中文近似词
    // 对中文释义中的每个词分别匹配，取最高相似度
    findSimilarChars_cn(mainStr, strArray) {
        let threshold = 0.3;
        let results = [];
        for (let item of strArray) {
            let cn = item.cn;
            if (!cn) continue;
            let cnWords = [];
            if (Array.isArray(cn)) {
                cnWords = cn;
            } else {
                cnWords = String(cn).split(',');
            }
            let maxSimilarity = 0;
            for (let word of cnWords) {
                word = word.trim();
                if (!word) continue;
                let distance = this.getDLDistance(mainStr, word);
                let maxLen = Math.max(mainStr.length, word.length);
                let similarity = 1 - distance / maxLen;
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                }
            }
            if (maxSimilarity > threshold) {
                results.push({ item, similarity: maxSimilarity });
            }
        }
        results.sort((a, b) => b.similarity - a.similarity);
        return results.map(r => r.item);
    }
}

var levenshtein = new Levenshtein();

// === URL 查询参数解析 ===

/**
 * 获取 URL 查询参数，返回键值对对象
 * 被 search.html 使用
 */
function getQueryParams(url) {
    const urlObj = new URL(url);
    return Object.fromEntries(urlObj.searchParams.entries());
}

// === 词汇派生 ===

var yyList = ['a', 'e', 'i', 'o', 'w', 'y', 'ê', 'æ', 'œ']; // 元音列表

class SetMultiWord {
    // 不同词性的单词设置
    setAllWord() {
        this.setOrdNum();
        this.setAdj();
        this.setAdv();
        this.nafibwb(); // 分词
    }

    nafibwb() {
        this.pavnaf();     // 过去分词
        this.privnaf();    // 现在分词
        this.fwvnaf();     // 将来分词
        this.zwgzisnaf();  // 被动分词
        this.notnaf();     // 使动分词
        this.hairnaf();    // 意动分词
        this.mehdnaf();    // 为动分词
    }

    pavnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'ah';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'pah';
            }
            wordData.push({
                dh: w.dh + tail,
                cn: '[' + w.dh + '的过去分词]' + w.cn,
                type: 'pvd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }]
            });
        });
    }

    privnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'if';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'kif';
            }
            wordData.push({
                dh: w.dh + tail,
                cn: '[' + w.dh + '的现在分词]' + w.cn,
                type: 'prd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }]
            });
        });
    }

    fwvnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'it';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'xit';
            }
            wordData.push({
                dh: w.dh + tail,
                cn: '[' + w.dh + '的将来分词]' + w.cn,
                type: 'fvd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }]
            });
        });
    }

    zwgzisnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'op';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'sop';
            }
            wordData.push({
                dh: w.dh + tail,
                cn: '[' + w.dh + '的被动分词]被' + w.cn,
                type: 'zsd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }]
            });
        });
    }

    // notnaf 使动分词, hairnaf 意动分词, mehdnaf 为动分词
    notnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'ki';
            if (yyList.includes(w.dh[0])) { // 开头是元音
                tail = 'kih';
            }
            wordData.push({
                dh: tail + w.dh,
                cn: '[' + w.dh + '的使动分词]使' + w.cn,
                type: 'ntd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }]
            });
        });
    }

    hairnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'sle';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'sleh';
            }
            wordData.push({
                dh: tail + w.dh,
                cn: '[' + w.dh + '的意动分词]觉得要' + w.cn,
                type: 'hnd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
        this.hairnaf_s();
    }

    hairnaf_s() { // 形容词意动
        var originWordList = wordData.filter(x => x.type == 's.');
        originWordList.forEach((w) => {
            var tail = 'sle';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'sleh';
            }
            wordData.push({
                dh: tail + w.dh,
                cn: '[' + w.dh + '的意动分词]认为...是' + w.cn,
                type: 'hns.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
    }

    mehdnaf() {
        var originWordList = wordData.filter(x => x.type == 'd.' || x.type == 'ud.' || x.type == 'cd.');
        originWordList.forEach((w) => {
            var tail = 'plw';
            if (yyList.includes(w.dh[w.dh.length - 1])) { // 结尾是元音
                tail = 'plwh';
            }
            wordData.push({
                dh: tail + w.dh,
                cn: '[' + w.dh + '的为动分词]为...而' + w.cn,
                type: 'mhd.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
    }

    setAdj() { // 形容词添加
        var originWordList = wordData.filter(x => x.type == 'm.' || x.type == 'di.');
        originWordList.forEach((w) => {
            var wcn = w.cn.split(',');
            for (var i = 0; i < wcn.length; i++) {
                wcn[i] += '的';
            }
            wordData.push({
                dh: w.dh + 'fak',
                cn: wcn,
                type: 's.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
    }

    setOrdNum() { // 序数词添加
        var originWordList = wordData.filter(x => x.type == 'q.');
        originWordList.forEach((w) => {
            wordData.push({
                dh: w.dh + 'v',
                cn: '第' + w.cn,
                type: 'm.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
    }

    setAdv() { // 副词添加
        var originWordList = wordData.filter(x => x.type == 's.');
        originWordList.forEach((w) => {
            if (w.originType == 'di.') { return; }
            var wcn = w.cn, wcn_ = [];
            for (var i = 0; i < wcn.length; i++) {
                wcn_.push(wcn[i].slice(0, -1));
                wcn_[i] += '地';
            }
            wordData.push({
                dh: w.dh + 'esht',
                cn: wcn_,
                type: 'f.',
                originType: w.type,
                chunk: [{ dh: '', cn: '' }],
                eg: [{ dh: '', cn: '' }]
            });
        });
    }
}

globalThis.setMultiWord = new SetMultiWord();

// === 向后兼容：保留 copyright 函数（内部委托给 initFooter） ===
function copyright() {
    if (typeof initFooter === 'function') {
        initFooter();
    }
}
globalThis.copyright = copyright;
