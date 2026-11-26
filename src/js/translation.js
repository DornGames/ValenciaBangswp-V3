/* ============================================
   translation.js | 本地词典与规则式翻译
   依赖：wordData.js、exampleData.js
   不调用网络服务、AI 模型或外部 API。
   ============================================ */

(function () {
    'use strict';

    var vowels = new Set(['a', 'e', 'i', 'o', 'w', 'y', 'ê', 'æ', 'œ']);
    var sourceWords = Array.isArray(globalThis.wordData) ? globalThis.wordData : [];
    var examplePairs = Array.isArray(globalThis.exampleData) ? globalThis.exampleData : [];
    var exactWords = new Map();
    var generatedForms = new Map();
    var exampleTranslations = new Map();
    var timeWordForms = new Set(['jadot', 'grêld', 'brêld', 'priv', 'fwv', 'pav']);
    var timeGlosses = new Set([
        '今天', '昨天', '明天', '今晚', '现在', '以后', '之前',
        '早上', '下午', '晚上', '每天', '每周', '每月', '每年'
    ]);
    var questionWords = new Set(['tah', 'wni', 'gwna', 'wno', 'wadheo', 'woh']);
    var yesNoParticle = 'wna';

    function normalizeWord(value) {
        return String(value || '').normalize('NFC').trim().toLowerCase();
    }

    function normalizeSentence(value) {
        return normalizeWord(value)
            .replace(/[.!?。！？]+$/u, '')
            .replace(/\s+/gu, ' ');
    }

    function firstMeaning(entry) {
        if (!entry) return '';
        var value = Array.isArray(entry.cn) ? entry.cn[0] : entry.cn;
        value = String(value || '').trim();
        return value.split(/\s*[,，;；]\s*/u)[0].trim();
    }

    function finalChar(value) {
        return value.slice(-1).toLowerCase();
    }

    function addGeneratedForm(form, entry, kind, gloss, type) {
        var key = normalizeWord(form);
        if (!key || exactWords.has(key) || generatedForms.has(key)) return;
        generatedForms.set(key, {
            entry: entry,
            kind: kind,
            gloss: gloss || firstMeaning(entry),
            type: type || entry.type,
            word: key
        });
    }

    function makeAdjectiveGloss(gloss) {
        return gloss.endsWith('的') ? gloss : gloss + '的';
    }

    function makeAdverbGloss(gloss) {
        if (gloss.endsWith('地')) return gloss;
        if (gloss.endsWith('的')) return gloss.slice(0, -1) + '地';
        return gloss + '地';
    }

    function addAdverbForms(dh, gloss, entry, includeLongVerbAdverb) {
        var adverbGloss = makeAdverbGloss(gloss);
        // tools.js 现有派生规则使用 -esht；语法文档也列出 -fakesht。
        addGeneratedForm(dh + 'esht', entry, 'adverb', adverbGloss, 'f.');
        if (includeLongVerbAdverb) {
            addGeneratedForm(dh + 'fakesht', entry, 'adverb', adverbGloss, 'f.');
        }
        addGeneratedForm(dh + 'fakext', entry, 'adverb', adverbGloss, 'f.');
        addGeneratedForm(dh + 'fakezt', entry, 'adverb', adverbGloss, 'f.');
        addGeneratedForm(dh + 'fakest', entry, 'adverb', adverbGloss, 'f.');
    }

    function buildLexicon() {
        sourceWords.forEach(function (entry) {
            var key = normalizeWord(entry && entry.dh);
            if (key && !exactWords.has(key)) exactWords.set(key, entry);
        });

        sourceWords.forEach(function (entry) {
            if (!entry || !entry.dh) return;
            var dh = normalizeWord(entry.dh);
            var gloss = firstMeaning(entry);
            var type = entry.type;

            if (type === 'q.') {
                addGeneratedForm(dh + 'v', entry, 'ordinal', '第' + gloss, 'm.');
            }

            if (type === 'm.' || type === 'di.') {
                addGeneratedForm(dh + 'fak', entry, 'adjective', makeAdjectiveGloss(gloss), 's.');
                if (type === 'm.') addGeneratedForm(dh + 's', entry, 'plural', gloss, 'm.');

                if (type !== 'di.') {
                    addAdverbForms(dh + 'fak', makeAdjectiveGloss(gloss), entry, false);
                }
            }

            if (type === 's.') {
                addAdverbForms(dh, gloss, entry, true);
            }

            if (type === 'd.' || type === 'ud.' || type === 'cd.') {
                var endsInVowel = vowels.has(finalChar(dh));
                var startsWithVowel = vowels.has(dh[0].toLowerCase());
                addGeneratedForm(dh + (endsInVowel ? 'pah' : 'ah'), entry, 'past', gloss, type);
                addGeneratedForm(dh + (endsInVowel ? 'kif' : 'if'), entry, 'progressive', gloss, type);
                addGeneratedForm(dh + (endsInVowel ? 'xit' : 'it'), entry, 'future', gloss, type);
                addGeneratedForm(dh + (endsInVowel ? 'sop' : 'op'), entry, 'passive', gloss, type);
                addGeneratedForm((startsWithVowel ? 'kih' : 'ki') + dh, entry, 'causative', gloss, type);
                addGeneratedForm((endsInVowel ? 'sleh' : 'sle') + dh, entry, 'mental', gloss, type);
                addGeneratedForm((endsInVowel ? 'plwh' : 'plw') + dh, entry, 'purpose', gloss, type);
            }
        });
    }

    function buildExampleMemory() {
        examplePairs.forEach(function (pair) {
            if (!pair || !pair.dh || !pair.cn) return;
            var key = normalizeSentence(pair.dh);
            if (key && !exampleTranslations.has(key)) exampleTranslations.set(key, pair.cn);
        });
    }

    function resolveWord(source) {
        var key = normalizeWord(source);
        var direct = exactWords.get(key);
        if (direct) {
            return {
                word: key,
                entry: direct,
                kind: 'base',
                type: direct.type,
                gloss: firstMeaning(direct),
                known: true
            };
        }

        var generated = generatedForms.get(key);
        if (generated) {
            return {
                word: key,
                entry: generated.entry,
                kind: generated.kind,
                type: generated.type,
                gloss: generated.gloss,
                known: true
            };
        }

        return { word: key, source: source, kind: 'unknown', type: '', gloss: source, known: false };
    }

    function isTimeWord(item) {
        return timeWordForms.has(item.word) || timeGlosses.has(item.gloss);
    }

    function isWhWord(item) {
        return questionWords.has(item.word);
    }

    function renderWord(item) {
        if (!item.known) return item.source;
        var gloss = item.gloss;

        switch (item.kind) {
            case 'past':
                if (['是', '为', '作为', '成为'].indexOf(gloss) !== -1) return '曾' + gloss;
                return gloss + '了';
            case 'progressive':
                return '正在' + gloss;
            case 'future':
                return '将' + gloss;
            case 'passive':
                return '被' + gloss;
            case 'causative':
                return '请' + gloss;
            case 'mental':
                return '觉得要' + gloss;
            case 'purpose':
                return '为了' + gloss;
            default:
                return gloss;
        }
    }

    function isRelation(item) {
        return item.known && item.type === 'ud.';
    }

    function renderRelation(left, relation, right) {
        if (relation.word === 'bich') return left + '的' + right;

        var gloss = relation.gloss;
        var placeholders = /(?:\.{2,}|[…⋯]+)/gu;
        if (placeholders.test(gloss)) {
            placeholders.lastIndex = 0;
            return left + gloss.replace(placeholders, right);
        }
        return left + gloss + right;
    }

    function renderItems(items, hasPassiveMarker) {
        var output = [];

        for (var i = 0; i < items.length; i += 1) {
            var item = items[i];
            if (item.word === 'aizêr' && item.known) {
                output.push('被');
                continue;
            }
            if (hasPassiveMarker && item.kind === 'passive') {
                output.push(item.gloss + '了');
                continue;
            }
            if (isRelation(item) && output.length && i + 1 < items.length) {
                var left = output.pop();
                var right = renderWord(items[i + 1]);
                output.push(renderRelation(left, item, right));
                i += 1;
                continue;
            }
            output.push(renderWord(item));
        }

        return output.join('');
    }

    function translateClause(source, questionMark, unknownWords) {
        var tokens = source.match(/[\p{L}\p{M}\p{N}]+(?:['’\-][\p{L}\p{M}\p{N}]+)*|[^\s]/gu) || [];
        var items = tokens.map(function (token) {
            if (/^[\p{L}\p{M}\p{N}]/u.test(token)) return resolveWord(token);
            return { word: token, source: token, kind: 'literal', type: '', gloss: token, known: true };
        });
        var hasQuestionParticle = false;
        var filtered = [];

        items.forEach(function (item) {
            if (item.word === yesNoParticle) {
                hasQuestionParticle = true;
                return;
            }
            if (item.kind === 'unknown') unknownWords.add(item.source);
            filtered.push(item);
        });
        items = filtered;

        var hasWhWord = items.some(isWhWord);
        var whAtStart = items.length && isWhWord(items[0]) ? items[0] : null;
        if (whAtStart && whAtStart.word !== 'wni' && whAtStart.word !== 'gwna') {
            items.shift();
            if (whAtStart.word === 'wno' || whAtStart.word === 'wadheo' || whAtStart.word === 'woh') {
                var subjectIndex = items.findIndex(function (item) {
                    return item.type === 'di.';
                });
                items.splice(subjectIndex >= 0 ? subjectIndex + 1 : 0, 0, whAtStart);
            } else {
                items.push(whAtStart);
            }
        } else if (items.some(function (item, index) { return item.word === 'wni' && index > 0; })) {
            var who = items.find(function (item, index) { return item.word === 'wni' && index > 0; });
            items = items.filter(function (item) { return item !== who; });
            items.push(who);
        }

        var times = items.filter(isTimeWord);
        if (times.length) {
            items = times.concat(items.filter(function (item) { return !isTimeWord(item); }));
        }

        var hasPassiveMarker = items.some(function (item) { return item.word === 'aizêr'; });
        var text = renderItems(items, hasPassiveMarker);
        var isQuestion = questionMark || hasQuestionParticle || hasWhWord;
        if (isQuestion && !hasWhWord && !text.endsWith('吗')) text += '吗';
        return { text: text, isQuestion: isQuestion, hasWhWord: hasWhWord };
    }

    function translateBody(body, questionMark, unknownWords) {
        var parts = body.split(/([,，;；:：])/u);
        var translated = '';
        var hasQuestionParticle = false;
        var hasWhWord = false;

        for (var i = 0; i < parts.length; i += 1) {
            if (/^[,，;；:：]$/u.test(parts[i])) {
                translated += ({ ',': '，', '，': '，', ';': '；', '；': '；', ':': '：', '：': '：' })[parts[i]];
                continue;
            }

            var clause = translateClause(parts[i], questionMark && i === parts.length - 1, unknownWords);
            translated += clause.text;
            hasQuestionParticle = hasQuestionParticle || clause.isQuestion;
            hasWhWord = hasWhWord || clause.hasWhWord;
        }

        return { text: translated, isQuestion: hasQuestionParticle, hasWhWord: hasWhWord };
    }

    function outputPunctuation(sourcePunctuation, isQuestion, referencePunctuation) {
        if (isQuestion) return '？';
        var mark = sourcePunctuation || referencePunctuation;
        if (!mark) return '';
        var lastMark = mark.slice(-1);
        if (lastMark === '?' || lastMark === '？') return '？';
        if (lastMark === '!' || lastMark === '！') return '！';
        return '。';
    }

    function translateSegment(segment, state) {
        var trimmed = segment.trim();
        if (!trimmed) return '';

        var punctuationMatch = trimmed.match(/[.!?。！？]+$/u);
        var sourcePunctuation = punctuationMatch ? punctuationMatch[0] : '';
        var body = sourcePunctuation ? trimmed.slice(0, -sourcePunctuation.length).trim() : trimmed;
        var questionMark = /[?？]/u.test(sourcePunctuation);
        var reference = exampleTranslations.get(normalizeSentence(body));

        if (reference) {
            state.references += 1;
            var referenceText = String(reference).trim();
            var referenceMarkMatch = referenceText.match(/[.!?。！？]+$/u);
            var referenceMark = referenceMarkMatch ? referenceMarkMatch[0] : '';
            if (referenceMark) referenceText = referenceText.slice(0, -referenceMark.length);
            return referenceText + outputPunctuation(sourcePunctuation, questionMark, referenceMark);
        }

        state.usedRules = true;
        var result = translateBody(body, questionMark, state.unknownWords);
        return result.text + outputPunctuation(sourcePunctuation, result.isQuestion, '');
    }

    function splitInput(value) {
        var segments = [];
        var current = '';

        for (var i = 0; i < value.length; i += 1) {
            var character = value[i];
            if (character === '\n' || character === '\r') {
                if (current.trim()) segments.push({ type: 'sentence', value: current });
                current = '';
                if (character === '\r' && value[i + 1] === '\n') i += 1;
                segments.push({ type: 'newline', value: '\n' });
                continue;
            }

            current += character;
            if (/[.!?。！？]/u.test(character)) {
                while (i + 1 < value.length && /[.!?。！？]/u.test(value[i + 1])) {
                    current += value[i + 1];
                    i += 1;
                }
                segments.push({ type: 'sentence', value: current });
                current = '';
            }
        }

        if (current.trim()) segments.push({ type: 'sentence', value: current });
        return segments;
    }

    function translateText(value) {
        var state = {
            references: 0,
            usedRules: false,
            unknownWords: new Set()
        };
        var output = splitInput(String(value || '')).map(function (segment) {
            if (segment.type === 'newline') return segment.value;
            return translateSegment(segment.value, state);
        }).join('');

        return {
            text: output,
            references: state.references,
            usedRules: state.usedRules,
            unknownWords: Array.from(state.unknownWords)
        };
    }

    function runTranslation() {
        var input = document.getElementById('leftTA');
        var result = document.getElementById('translateResult');
        if (!input || !result) return;

        var source = input.value.trim();
        if (!source) {
            result.style.display = 'none';
            result.textContent = '';
            return;
        }

        var translation = translateText(source);
        var output = document.createElement('p');
        output.className = 'translation-output';
        output.textContent = translation.text || '暂时无法翻译这段文本。';

        var meta = document.createElement('p');
        meta.className = 'translation-meta';
        if (translation.references && translation.usedRules) {
            meta.textContent = '已匹配 ' + translation.references + ' 条例句，其余部分按词典和语法规则翻译。';
        } else if (translation.references) {
            meta.textContent = '匹配到 ' + translation.references + ' 条已有对照例句。';
        } else {
            meta.textContent = '根据词典和语法规则生成；多义词默认采用词典中的首个释义。';
        }
        if (translation.unknownWords.length) {
            meta.textContent += ' 未收录词已保留原文：' + translation.unknownWords.join('、') + '。';
        }

        result.replaceChildren(output, meta);
        result.style.display = 'block';
    }

    function initializeTranslationPage() {
        var button = document.getElementById('translateBtn');
        var input = document.getElementById('leftTA');
        if (!button || !input) return;

        button.addEventListener('click', runTranslation);
        input.addEventListener('keydown', function (event) {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') runTranslation();
        });
    }

    buildLexicon();
    buildExampleMemory();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTranslationPage);
    } else {
        initializeTranslationPage();
    }
})();
