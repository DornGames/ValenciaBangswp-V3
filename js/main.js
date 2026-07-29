/* ============================================
   th valencia bangswp | 瓦来西雅大辞典 — 首页逻辑
   ============================================ */

// 脚本在 body 底部加载，DOM 已就绪，直接绑定事件
console.log("[main.js] 脚本已加载");

try {
    setMultiWord.setAllWord();
} catch(e) {
    console.error("[main.js] setMultiWord 初始化错误:", e);
}
try {
    copyright(true);
} catch(e) {
    console.error("[main.js] copyright 初始化错误:", e);
}

var openOpt = false;

try {
    // === 词典切换 ===
    document.getElementById("selectLan").addEventListener("click", function() {
    var ul = document.getElementById("selectUL");
    if (!openOpt) {
        openOpt = true;
        ul.style.display = "block";
        // 仅在 ul 为空时创建选项
        if (ul.children.length === 0) {
            var li1 = document.createElement("li");
            var li2 = document.createElement("li");
            li1.textContent = "𣿅中词典";
            li2.textContent = "中𣿅词典";
            li1.style.width = "100%";
            li2.style.width = "100%";
            ul.appendChild(li1);
            ul.appendChild(li2);
            [li1, li2].forEach(function(li) {
                li.addEventListener("click", function(e) {
                    e.stopPropagation();
                    document.getElementById("selectP").innerHTML = li.textContent;
                    ul.style.display = "none";
                    openOpt = false;
                });
            });
        }
    } else {
        ul.style.display = "none";
        openOpt = false;
    }
});

// === 搜索提交 ===
document.getElementById("search_ui_containerButton").addEventListener("click", function() {
    submitSearch();
});

document.getElementById("search_ipt").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submitSearch();
    }
});

function submitSearch() {
    var word = document.getElementById("search_ipt").value;
    if (!word) return;
    var tp = "dh";
    if (document.getElementById("selectP").textContent === "中𣿅词典") {
        tp = "cn";
    }
    window.open("basicLang/search.html?s=\"" + word + "\"&type=\"" + tp + "\"", "_self");
}

// === 搜索输入联想 ===
document.getElementById("search_ipt").addEventListener("input", function() {
    if (document.getElementById("selectP").textContent === "𣿅中词典") {
        findWord_dh();
    } else {
        findWord_cn();
    }
});

function findWord_dh() {
    var list = document.getElementById("search-list");
    if (!document.getElementById("search_ipt").value) {
        iptChangeColor("toWhite");
        list.style.display = "none";
        return;
    }
    iptChangeColor("toBlue");
    var v = document.getElementById("search_ipt").value;
    var type = "normal";
    if (v.endsWith("s") && v !== "faks" && v !== "caos" && v !== "mads" && v !== "tons") {
        type = "pl";
        v = v.slice(0, -1);
    }
    var similarChars = levenshtein.findSimilarChars_dh(v, wordData);
    if (similarChars.length) {
        showResult_dh(similarChars, v, type);
    } else {
        list.style.display = "none";
    }
}

function showResult_dh(result) {
    if (!document.getElementById("search_ipt").value) {
        iptChangeColor("toWhite");
        return;
    }
    iptChangeColor("toBlue");
    var list = document.getElementById("search-list");
    list.innerHTML = "";
    if (result.length > 0) {
        result.forEach(function(item) {
            var li = document.createElement("li");
            li.style.width = "100%";
            var dhSpan = document.createElement("span");
            dhSpan.className = "search-dh";
            dhSpan.textContent = item.dh;
            var cnSpan = document.createElement("span");
            cnSpan.className = "search-cn";
            cnSpan.textContent = item.cn;
            li.appendChild(dhSpan);
            li.appendChild(cnSpan);
            li.addEventListener("click", function() {
                document.getElementById("search_ipt").value = item.dh;
                document.getElementById("search-list").style.display = "none";
                submitSearch();
            });
            list.appendChild(li);
        });
        list.style.display = "block";
    }
}

function findWord_cn() {
    var list = document.getElementById("search-list");
    if (!document.getElementById("search_ipt").value) {
        iptChangeColor("toWhite");
        list.style.display = "none";
        return;
    }
    iptChangeColor("toBlue");
    var v = document.getElementById("search_ipt").value;
    var similarChars = levenshtein.findSimilarChars_cn(v, wordData);
    if (similarChars.length) {
        showResult_cn(similarChars);
    } else {
        list.style.display = "none";
    }
}

function showResult_cn(result) {
    if (!document.getElementById("search_ipt").value) {
        iptChangeColor("toWhite");
        return;
    }
    iptChangeColor("toBlue");
    var list = document.getElementById("search-list");
    list.innerHTML = "";
    if (result.length > 0) {
        result.forEach(function(item) {
            var li = document.createElement("li");
            li.style.width = "100%";
            var dhSpan = document.createElement("span");
            dhSpan.className = "search-dh";
            dhSpan.textContent = item.dh;
            var cnSpan = document.createElement("span");
            cnSpan.className = "search-cn";
            cnSpan.textContent = item.cn;
            li.appendChild(dhSpan);
            li.appendChild(cnSpan);
            li.addEventListener("click", function() {
                document.getElementById("search_ipt").value = item.cn;
                document.getElementById("search-list").style.display = "none";
                submitSearch();
            });
            list.appendChild(li);
        });
        list.style.display = "block";
    }
}

function iptChangeColor(type) {
    if (type === "toBlue") {
        var ipt = document.getElementById("fmwp");
        var r = 238, g = 237, b = 221, a = 0, tick = 0;
        var origin = { r: r, g: g, b: b, a: a };
        var target = { r: 153, g: 204, b: 255, a: 1 };
        ipt.style.border = "2px solid rgba(" + r + "," + g + "," + b + "," + a + ")";
        setInterval(function() {
            if (tick > 100) return;
            r -= (origin.r - target.r) / 50;
            g -= (origin.g - target.g) / 50;
            b -= (origin.b - target.b) / 50;
            a -= (origin.a - target.a) / 50;
            ipt.style.border = "2px solid rgba(" + r + "," + g + "," + b + "," + a + ")";
            tick++;
        }, 7);
    } else if (type === "toWhite") {
        var ipt = document.getElementById("fmwp");
        ipt.style.border = "2px solid rgba(238,237,221,1)";
    }
}

// 控制台输出词汇数据（调试用）
try {
    var k = "";
    for (var i = 0; i < wordData.length; i++) {
        if (wordData[i]) {
            k += wordData[i].dh + " " + wordData[i].type + wordData[i].cn + ";\n";
        }
    }
    console.log(k);
} catch(e) {
    console.error("[main.js] wordData 加载错误:", e);
}

} catch(e) {
    console.error("[main.js] 事件绑定错误:", e);
}