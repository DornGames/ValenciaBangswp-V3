/* ============================================
   exampleUtils.js | 例句匹配工具函数
   依赖：tools.js（getQueryParams）、wordData.js、exampleData.js
   功能：自动从湩语句子中拆分词汇，结合 wordData 中的分词规则
         建立分词与动词原型的联系，用算法匹配单词与例句
   ============================================
   更新日志：2026-07-31 第二十九阶段
   - 新增 getWordMatchForms：获取单词所有匹配形式（自身+分词+原动词）
   - 新增 highlightSentence：将句子中匹配词汇用高亮 <span> 包裹
   - 两个函数均导出到全局（globalThis）
   ============================================ */

// 元音列表（与 tools.js 保持一致）
var yyList = ['a', 'e', 'i', 'o', 'w', 'y', 'ê', 'æ', 'œ'];

/**
 * 从分词形式还原到原动词词根
 * 根据分词类型和 dh 推导原动词的 dh
 * @param {string} dh - 单词的湩语拼写
 * @param {string} type - 单词词性（如 pvd., prd., fvd. 等）
 * @returns {string|null} 原动词 dh，如果不是分词则返回 null
 */
function getOriginalVerb(dh, type) {
    if (!dh || !type) return null;
    switch (type) {
        case 'pvd.':
            if (dh.endsWith('pah')) return dh.slice(0, -3);
            if (dh.endsWith('ah')) return dh.slice(0, -2);
            return null;
        case 'prd.':
            if (dh.endsWith('kif')) return dh.slice(0, -3);
            if (dh.endsWith('if')) return dh.slice(0, -2);
            return null;
        case 'fvd.':
            if (dh.endsWith('xit')) return dh.slice(0, -3);
            if (dh.endsWith('it')) return dh.slice(0, -2);
            return null;
        case 'zsd.':
            if (dh.endsWith('sop')) return dh.slice(0, -3);
            if (dh.endsWith('op')) return dh.slice(0, -2);
            return null;
        case 'ntd.':
            if (dh.startsWith('kih')) return dh.slice(3);
            if (dh.startsWith('ki')) return dh.slice(2);
            return null;
        case 'hnd.':
        case 'hns.':
            if (dh.startsWith('sleh')) return dh.slice(4);
            if (dh.startsWith('sle')) return dh.slice(3);
            return null;
        case 'mhd.':
            if (dh.startsWith('plwh')) return dh.slice(4);
            if (dh.startsWith('plw')) return dh.slice(3);
            return null;
        default:
            return null;
    }
}

/**
 * 根据原动词 dh 生成所有分词形式的 dh 列表
 * @param {string} dh - 原动词的湩语拼写
 * @returns {Array} 分词形式列表，每项包含 { dh, type }
 */
function getParticipleForms(dh) {
    var lastChar = dh[dh.length - 1];
    var firstChar = dh[0];
    var isVowelEnd = yyList.indexOf(lastChar) !== -1;
    var isVowelStart = yyList.indexOf(firstChar) !== -1;

    return [
        { dh: dh + (isVowelEnd ? 'pah' : 'ah'), type: 'pvd.' },
        { dh: dh + (isVowelEnd ? 'kif' : 'if'), type: 'prd.' },
        { dh: dh + (isVowelEnd ? 'xit' : 'it'), type: 'fvd.' },
        { dh: dh + (isVowelEnd ? 'sop' : 'op'), type: 'zsd.' },
        { dh: (isVowelStart ? 'kih' : 'ki') + dh, type: 'ntd.' },
        { dh: (isVowelEnd ? 'sleh' : 'sle') + dh, type: 'hnd.' },
        { dh: (isVowelEnd ? 'plwh' : 'plw') + dh, type: 'mhd.' }
    ];
}

/**
 * 判断是否为分词类型
 * @param {string} type - 词性
 * @returns {boolean}
 */
function isParticipleType(type) {
    return ['pvd.', 'prd.', 'fvd.', 'zsd.', 'ntd.', 'hnd.', 'hns.', 'mhd.'].indexOf(type) !== -1;
}

/**
 * 获取分词类型的中文名称
 * @param {string} type - 词性
 * @returns {string}
 */
function getParticipleLabel(type) {
    var labels = {
        'pvd.': '过去分词',
        'prd.': '现在分词',
        'fvd.': '将来分词',
        'zsd.': '被动分词',
        'ntd.': '使动分词',
        'hnd.': '意动分词',
        'hns.': '意动分词（形）',
        'mhd.': '为动分词'
    };
    return labels[type] || type;
}

/**
 * 将湩语句子按空格拆分，返回所有 token 列表
 * 去除标点符号（逗号、句号、感叹号、问号、分号等）
 * @param {string} sentenceDh - 湩语原文句子
 * @returns {Array} token 列表
 */
function splitSentenceTokens(sentenceDh) {
    if (!sentenceDh) return [];
    // 按空格拆分，同时去除标点
    return sentenceDh.split(/[\s]+/).map(function(t) {
        return t.replace(/[,.!?;:]+$/g, '').replace(/^[,.!?;:]+/g, '').toLowerCase();
    }).filter(function(t) { return t.length > 0; });
}

/**
 * 从句子中提取所有关联的单词根（分词→原动词）
 * 对于句子中的每个 token：
 *   1. 查找 wordData 中是否有该 token
 *   2. 如果有且是分词，推导原动词
 *   3. 如果不是分词，直接使用 token 本身
 * @param {string} sentenceDh - 湩语原文句子
 * @param {Array} wordData - 单词数据（已包含派生词）
 * @returns {Array} 单词根 dh 列表（去重）
 */
function getSentenceWordRoots(sentenceDh, wordData) {
    var tokens = splitSentenceTokens(sentenceDh);
    var roots = {};
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        // 在 wordData 中查找该 token
        var word = null;
        for (var j = 0; j < wordData.length; j++) {
            if (wordData[j].dh === token) {
                word = wordData[j];
                break;
            }
        }
        if (word) {
            // 如果是分词，找原动词
            var originalDh = getOriginalVerb(word.dh, word.type);
            if (originalDh) {
                roots[originalDh] = true;
            } else {
                roots[token] = true;
            }
        } else {
            // 不在 wordData 中，直接用 token
            roots[token] = true;
        }
    }
    return Object.keys(roots);
}

/**
 * 快速构建 wordData 的 dh→entry 查找映射
 * @param {Array} wordData - 单词数据
 * @returns {Object} 映射表 { dh: entry }
 */
function buildWordMap(wordData) {
    var map = {};
    for (var i = 0; i < wordData.length; i++) {
        map[wordData[i].dh] = wordData[i];
    }
    return map;
}

/**
 * 查找与指定单词相关的所有例句（核心算法）
 * 匹配规则：
 *   1. 单词本身出现在句子中（直接匹配）
 *   2. 单词的分词形式出现在句子中（分词→原动词推导）
 *   3. 如果单词是动词，其所有分词形式出现在句子中
 *   4. 如果单词是分词，其原动词出现在句子中
 *
 * @param {string} wordDh - 要匹配的单词 dh
 * @param {string} wordType - 要匹配的单词词性
 * @param {Array} exampleData - 例句数据
 * @param {Array} wordData - 单词数据（已包含派生词）
 * @returns {Array} 匹配的例句列表（去重）
 */
function findExamplesForWord(wordDh, wordType, exampleData, wordData) {
    var results = [];
    var seen = {};

    // 收集所有要匹配的 dh
    var matchDhs = [wordDh];

    // 如果是分词，添加原动词
    var originalDh = getOriginalVerb(wordDh, wordType);
    if (originalDh && originalDh !== wordDh) {
        matchDhs.push(originalDh);
    }

    // 如果是动词，添加所有分词形式
    if (wordType === 'd.' || wordType === 'ud.' || wordType === 'cd.') {
        var forms = getParticipleForms(wordDh);
        for (var i = 0; i < forms.length; i++) {
            matchDhs.push(forms[i].dh);
        }
    }

    // 遍历每个例句，提取句子中的单词根，检查是否匹配
    for (var i = 0; i < exampleData.length; i++) {
        var ex = exampleData[i];
        var roots = getSentenceWordRoots(ex.dh, wordData);

        for (var m = 0; m < matchDhs.length; m++) {
            if (roots.indexOf(matchDhs[m]) !== -1) {
                if (!seen[ex.dh]) {
                    seen[ex.dh] = true;
                    results.push(ex);
                }
                break;
            }
        }
    }

    return results;
}

/**
 * 获取某个单词的所有匹配形式（自身 + 分词形式 + 原动词）
 * 用于句子高亮匹配
 * @param {string} wordDh - 单词 dh
 * @param {string} wordType - 单词词性
 * @returns {Array} 所有需要匹配的 dh 字符串列表
 */
function getWordMatchForms(wordDh, wordType) {
    var forms = [wordDh];
    var originalDh = getOriginalVerb(wordDh, wordType);
    if (originalDh && originalDh !== wordDh) {
        forms.push(originalDh);
    }
    if (wordType === 'd.' || wordType === 'ud.' || wordType === 'cd.') {
        var participleForms = getParticipleForms(wordDh);
        for (var i = 0; i < participleForms.length; i++) {
            forms.push(participleForms[i].dh);
        }
    }
    return forms;
}

/**
 * 将句子中的匹配词汇用高亮 <span> 包裹
 * 匹配规则同 findExamplesForWord
 * @param {string} sentenceDh - 湩语原文句子
 * @param {string} wordDh - 要匹配的单词 dh
 * @param {string} wordType - 要匹配的单词词性
 * @param {Array} wordData - 单词数据
 * @returns {string} 高亮后的 HTML 字符串
 */
function highlightSentence(sentenceDh, wordDh, wordType, wordData) {
    if (!sentenceDh || !wordDh) return sentenceDh || '';

    var matchForms = getWordMatchForms(wordDh, wordType);
    var tokens = sentenceDh.split(/(\s+)/);
    var result = '';

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        // 只检查非空白 token
        if (token.trim().length > 0) {
            var cleanToken = token.replace(/[,.!?;:]+$/g, '').replace(/^[,.!?;:]+/g, '').toLowerCase();
            var isMatch = false;
            for (var f = 0; f < matchForms.length; f++) {
                if (cleanToken === matchForms[f]) {
                    isMatch = true;
                    break;
                }
            }
            // 如果是分词，检查原动词是否匹配
            if (!isMatch) {
                var wordEntry = null;
                for (var j = 0; j < wordData.length; j++) {
                    if (wordData[j].dh === cleanToken) {
                        wordEntry = wordData[j];
                        break;
                    }
                }
                if (wordEntry) {
                    var origVerb = getOriginalVerb(wordEntry.dh, wordEntry.type);
                    if (origVerb) {
                        for (var f = 0; f < matchForms.length; f++) {
                            if (origVerb === matchForms[f]) {
                                isMatch = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (isMatch) {
                result += '<span class="example-highlight">' + token + '</span>';
            } else {
                result += token;
            }
        } else {
            result += token;
        }
    }
    return result;
}

/**
 * 通过分词形式反向查找原动词条目
 * 遍历 wordData 中所有动词，生成其分词形式，匹配给定的 dh
 * @param {string} dh - 分词形式的湩语拼写
 * @param {Array} wordData - 单词数据
 * @returns {Object|null} 原动词条目，如果未找到则返回 null
 */
function findOriginalVerbByParticiple(dh, wordData) {
    if (!dh || !wordData) return null;
    var lowerDh = dh.toLowerCase();
    for (var i = 0; i < wordData.length; i++) {
        var entry = wordData[i];
        // 只检查动词类词性
        if (entry.type === 'd.' || entry.type === 'ud.' || entry.type === 'cd.') {
            var forms = getParticipleForms(entry.dh);
            for (var f = 0; f < forms.length; f++) {
                if (forms[f].dh === lowerDh) {
                    return {
                        entry: entry,
                        participleType: forms[f].type
                    };
                }
            }
        }
    }
    return null;
}

// 导出到全局
globalThis.getOriginalVerb = getOriginalVerb;
globalThis.getParticipleForms = getParticipleForms;
globalThis.isParticipleType = isParticipleType;
globalThis.getParticipleLabel = getParticipleLabel;
globalThis.splitSentenceTokens = splitSentenceTokens;
globalThis.getSentenceWordRoots = getSentenceWordRoots;
globalThis.buildWordMap = buildWordMap;
globalThis.findExamplesForWord = findExamplesForWord;
globalThis.findOriginalVerbByParticiple = findOriginalVerbByParticiple;
globalThis.getWordMatchForms = getWordMatchForms;
globalThis.highlightSentence = highlightSentence;