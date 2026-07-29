var irelavCrt = {
    a: `∀`,
    b: `±`,
    c: `⊂`,
    d: `∂`,
    e: `∃`,
    f: `∫`,
    g: `⊙`,
    h: `∥`,
    i: `∈`,
    j: `∉`,
    k: `⫥`,
    l: `∤`,
    m: `≡`,
    n: `∩`,
    o: `cOɔ`,
    p: `▱`,
    q: `∅`,
    r: `∠`,
    s: `∽`,
    t: `⊥`,
    u: `∪`,
    v: `√`,
    w: `∓`,
    x: `=`,
    y: `≈`,
    z: `≠`,
    ê: `∄`,
    æ: `∝`,
    œ: `∞`,
};//湩语字母列表
var latinCrt = {
    "∀": `a`,
};//拉丁字母列表
String.prototype.wordConvert = function (target) {//单词转换
    var ts = convertToLowercase(this);
    var ans = ``;//结果
    for (var i = 0; i < ts.length; i++) {
        try {//尝试进行以下操作
            var tgt = ts[i].convert(target);
            if (!tgt) {//如果不在字母列表中
                ans += ts[i];//保留原样
            } else {
                ans += String(tgt);//对字母进行转换
            }
        } catch (err) {//如果出错则报错
            window.alert(`请不要输入无关字符!`);
            console.error(err);
        }
    }
    return ans;
}
String.prototype.convert = function (target) {//字母转换
    switch (target) {
        case `irelav`://转成湩语字母
            return irelavCrt[`${this}`];
        case `latin`://转成拉丁字母
            return latinCrt[`${this}`];
        default: break;
    }
}
function convertToLowercase(str) {//大小写转换
    return str.toUpperCase().toLowerCase();
}

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
                cnWords = String(cn).split(",");
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
/* 使用例子
let mainStr = "hello";
let strArray =["hallo", "world", "hello", "h3llo", "hillo"];
let similarChars = levenshtein.findSimilarChars(mainStr, strArray);
console.log(similarChars); //["hallo", "hello", "hillo"]
*/

function randomString(length) {//随机字符串
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function getQueryParams(url) {//获取网址
    const urlObj = new URL(url);
    return Object.fromEntries(urlObj.searchParams.entries());
}

// 示例使用
const url = "http://example.com/?key=value&param=another";
const queryParams = getQueryParams(url);
console.log(queryParams); // 输出: { key: "value", param: "another" }

var yyList = ['a', 'e', 'i', 'o', 'w', 'y', 'ê', 'æ', 'œ'];//元音列表
class SetMultiWord {//不同词性的单词设置
    setAllWord() {
        this.setOrdNum();
        this.setAdj();
        this.setAdv();
        this.nafibwb();//分词
    }
    nafibwb() {
        this.pavnaf();//过去分词
        this.privnaf();//现在分词
        this.fwvnaf();//将来分词
        this.zwgzisnaf();//被动分词
        this.notnaf();//使动分词,
        this.hairnaf();//hairnaf意动分词
        this.mehdnaf();//mehdnaf为动分词
    }
    pavnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'ah';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'pah';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的过去分词]` + w.cn,
                type: `pvd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
            });
        });
    }
    privnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'if';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'kif';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的现在分词]` + w.cn,
                type: `prd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
            });
        });
    }
    fwvnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'it';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'xit';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的将来分词]` + w.cn,
                type: `fvd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
            });
        });
    }
    zwgzisnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'op';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'sop';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的被动分词]被` + w.cn,
                type: `zsd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
            });
        });
    }
    //notnaf使动分词,hairnaf意动分词,mehdnaf为动分词
    notnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'ki';
            if (yyList.includes(w.dh[0])) {//开头是元音
                tail = 'kih';
            }
            wordData.push({//直接添加进单词列表里面
                dh: tail + w.dh,
                cn: `[${w.dh}的使动分词]使` + w.cn,
                type: `ntd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
            });
        });
    }
    hairnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'sle';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'sleh';
            }
            wordData.push({//直接添加进单词列表里面
                dh: tail + w.dh,
                cn: `[${w.dh}的意动分词]觉得要` + w.cn,
                type: `hnd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
        this.hairnaf_s();
    }
    hairnaf_s() {//形容词意动
        var originWordList = wordData.filter(x => x.type == `s.`);
        originWordList.forEach((w) => {
            var tail = 'sle';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'sleh';
            }
            wordData.push({//直接添加进单词列表里面
                dh: tail + w.dh,
                cn: `[${w.dh}的意动分词]认为...是` + w.cn,
                type: `hns.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    mehdnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'plw';
            if (yyList.includes(w.dh[w.dh.length - 1])) {//结尾是元音
                tail = 'plwh';
            }
            wordData.push({//直接添加进单词列表里面
                dh: tail + w.dh,
                cn: `[${w.dh}的为动分词]为...而` + w.cn,
                type: `mhd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }

    setAdj() {//形容词添加
        var originWordList = wordData.filter(x => x.type == `m.` || x.type == `di.`);
        originWordList.forEach((w) => {
            var wcn = w.cn.split(",");//以逗号分割为汉语词汇
            for (var i = 0; i < wcn.length; i++) {//对每个词分别加“的”
                wcn[i] += `的`;
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `fak`,
                cn: wcn,
                type: `s.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    setOrdNum() {//序数词添加
        var originWordList = wordData.filter(x => x.type == `q.`);
        originWordList.forEach((w) => {
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `v`,
                cn: `第` + w.cn,
                type: `m.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    setAdv() {//副词添加
        var originWordList = wordData.filter(x => x.type == `s.`);
        originWordList.forEach((w) => {
            if (w.originType == `di.`) { return; }
            var wcn = w.cn, wcn_ = [];
            for (var i = 0; i < wcn.length; i++) {//对每个词分别去“的”加“地”
                wcn_.push(wcn[i].slice(0, -1));
                wcn_[i] += `地`;
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `esht`,
                cn: wcn_,
                type: `f.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
}
globalThis.setMultiWord = new SetMultiWord();


//字符串分隔
var s = `Lauid m.[省或城市名]拉基
Tongrabac m.[城市名]通安
Vinfak m.[城市名]观山
Tlash m.[城市名]特拉斯
Ders m.[城市名]德色
Posmid m.[城市名]布森敏
Hidê m.[城市名]三十
Dondê m.[城市名]四十
Smolaitork m.[城市名]斯莫里亚
Uosh m.[城市名]尤西
Bag m.[城市名]巴伽
Nigmaj m.[城市名]尼干马
Ceshk m.[城市名]芷英
Valæhi m.[省或城市名]瓦莱莉
Uydvalæhi m.[城市名]新瓦莱莉
Haohfak m.[城市名]绿水
Val m.[城市名]钒铝
Ery m.[城市名]铒钇
Britlis m.[城市名]布提里申
Kasthet m.[城市名]卡斯瑞特
Malgbid m.[城市名]马勒戈壁
Irelavid m.[城市名]爱勒拉夫
Mæmar m.[省或城市名]梅马
Zoft m.[城市名]基哥
Madêr m.[城市名]马德
Jemptork m.[城市名]碱硼托克
Stwhenuref m.[城市名]圣金丰
Cwasain m.[特别行政区名]出塞
Dhotork m.[城市名]剟城
Viophashtork m.[城市名]核平城
Wchin m.[省或城市名]欧芹
Wsias m.[城市名]欧萨
Wcios m.[城市名]欧朝
Wshit m.[城市名]欧榭
Wkanika m.[城市名]欧干尼克
Wtma m.[城市名]欧特曼
Wmmek m.[城市名]欧米伽
Wmmia m.[城市名]欧米亚
Wtdon m.[城市名]欧特𣿅
Sem m.[省或城市名]萨姆
Sabi m.[城市名]六七
Klwta m.[城市名]克劳迪亚
Soblash m.[省名]福利
Tontoshfak m.[城市名]香樟
Loctork m.[城市名]留春
Tonhaid m.[城市名]花火
Uinpsidfaktornk m.[城市名]金瓶古镇
Coiran m.[城市名]怡然
Shmævin m.[城市名]梅花山
Joms m.[城市名]松杉
Sorchtork m.[城市名]崤瑾托克
Uautork m.[城市名]佳景
Ytin m.[城市名]鱼小
Uenshtork m.[城市名]碱锌托克
Clintork m.[城市名]昌阁
Tonhr m.[省或城市名]天狗
Henship m.[城市名]汉乔布
Bakin m.[城市名]泉费
Beniuob m.[城市名]卷沟
Uenimad m.[城市名]汤平
Daibal m.[城市名]以巴
Dog m.[城市名]多格
Gog m.[城市名]冰狗
Sbench m.[城市名]金汤湖
Swhiadonhfak m.[省或城市名]南𣿅
Tonhaichfak m.[城市名]泡面
Vilishthiktfak m.[城市名]棕榈
Vinsdohtfak m.[城市名]山梨
Bejanposdetfak m.[城市名]红柚
Korndfak m.[城市名]苹果
Bejansdintsfaks m.[城市名]红林
Lonzishfak m.[城市名]香蕉
Loclvin m.[城市名]龙子山
Kfechvin m.[城市名]木子山`;
var sSplit = s.split("\n");
var ansString = '';
sSplit.forEach((e) => {
    var ans1 = e.split(" ");
    var ans2 = ans1[1].split(".");
    ansString += `{
		dh: '${ans1[0]}',
		cn: '${ans2[1]}',
		type: '${ans2[0]}.',
		chunk:[
			{ dh: '', cn: '' }
		],
	},`;
});
console.log(ansString);

/**
 * htix m.行业
tork m.聚落
chidiêt d.耕作
chidtws m.农田
chidhih m.农民
chidhtix m.农业
chidtork m.农村
gecton m.工艺
geciêt d.打工,务工
gec'htix m.工业
gec'hih m.工人
gectork m.工业园区
geckehiad m.工厂
knishfê m.房间
gecknishfê m.车间
panbton m.商品
panbiêt d.经商
panbhih m.商人
panbhtix m.商业
panbtork m.商业区
panbkehiad m.商场,商城
 */

function copyright(a) {
    document.getElementById('cprt').innerHTML = `版权所有 © 2025 DornGames | Ver 3.0.0 | <a onclick="window.alert('当前词汇量:'+wordData.length+'词')">点击查看词汇量</a>`;
}
globalThis.copyright = copyright;