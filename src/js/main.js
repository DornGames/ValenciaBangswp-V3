/* ============================================
   th valencia bangswp | 瓦来西雅大辞典 — 首页逻辑
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // === 初始化 ===
    try {
        setMultiWord.setAllWord();
    } catch (e) {
        console.error('[main.js] setMultiWord 初始化错误:', e);
    }

    try {
        initFooter();
    } catch (e) {
        console.error('[main.js] initFooter 初始化错误:', e);
    }

    try {
        initNav(false);
    } catch (e) {
        console.error('[main.js] initNav 初始化错误:', e);
    }

    // === 词典切换 ===
    let openOpt = false;

    try {
        document.getElementById('selectLan').addEventListener('click', function () {
            const ul = document.getElementById('selectUL');
            if (!openOpt) {
                openOpt = true;
                ul.style.display = 'block';
                // 仅在 ul 为空时创建选项
                if (ul.children.length === 0) {
                    const li1 = document.createElement('li');
                    const li2 = document.createElement('li');
                    li1.textContent = '𣿅中词典';
                    li2.textContent = '中𣿅词典';
                    li1.style.width = '100%';
                    li2.style.width = '100%';
                    ul.appendChild(li1);
                    ul.appendChild(li2);
                    [li1, li2].forEach(function (li) {
                        li.addEventListener('click', function (e) {
                            e.stopPropagation();
                            document.getElementById('selectP').innerHTML = li.textContent;
                            ul.style.display = 'none';
                            openOpt = false;
                        });
                    });
                }
            } else {
                ul.style.display = 'none';
                openOpt = false;
            }
        });
    } catch (e) {
        console.error('[main.js] 词典切换绑定错误:', e);
    }

    // === 搜索提交 ===
    try {
        document.getElementById('search_ui_containerButton').addEventListener('click', function () {
            submitSearch();
        });

        document.getElementById('search_ipt').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitSearch();
            }
        });
    } catch (e) {
        console.error('[main.js] 搜索按钮绑定错误:', e);
    }

    // === 搜索输入联想 ===
    try {
        document.getElementById('search_ipt').addEventListener('input', function () {
            if (document.getElementById('selectP').textContent === '𣿅中词典') {
                findWordDh();
            } else {
                findWordCn();
            }
        });
    } catch (e) {
        console.error('[main.js] 搜索输入绑定错误:', e);
    }

    // === 搜索相关函数 ===
    function submitSearch() {
        const word = document.getElementById('search_ipt').value;
        if (!word) return;
        let tp = 'dh';
        if (document.getElementById('selectP').textContent === '中𣿅词典') {
            tp = 'cn';
        }
        window.open('pages/search.html?s="' + word + '"&type="' + tp + '"', '_self');
    }

    function findWordDh() {
        const list = document.getElementById('search-list');
        if (!document.getElementById('search_ipt').value) {
            iptChangeColor('toWhite');
            list.style.display = 'none';
            return;
        }
        iptChangeColor('toBlue');
        let v = document.getElementById('search_ipt').value;
        let type = 'normal';
        if (v.endsWith('s') && v !== 'faks' && v !== 'caos' && v !== 'mads' && v !== 'tons') {
            type = 'pl';
            v = v.slice(0, -1);
        }
        const similarChars = levenshtein.findSimilarChars_dh(v, wordData);
        if (similarChars.length) {
            showResultDh(similarChars);
        } else {
            list.style.display = 'none';
        }
    }

    function showResultDh(result) {
        if (!document.getElementById('search_ipt').value) {
            iptChangeColor('toWhite');
            return;
        }
        iptChangeColor('toBlue');
        const list = document.getElementById('search-list');
        list.innerHTML = '';
        if (result.length > 0) {
            result.forEach(function (item) {
                const li = document.createElement('li');
                li.style.width = '100%';
                const dhSpan = document.createElement('span');
                dhSpan.className = 'search-dh';
                dhSpan.textContent = item.dh;
                const cnSpan = document.createElement('span');
                cnSpan.className = 'search-cn';
                cnSpan.textContent = item.cn;
                li.appendChild(dhSpan);
                li.appendChild(cnSpan);
                li.addEventListener('click', function () {
                    document.getElementById('search_ipt').value = item.dh;
                    document.getElementById('search-list').style.display = 'none';
                    submitSearch();
                });
                list.appendChild(li);
            });
            list.style.display = 'block';
        }
    }

    function findWordCn() {
        const list = document.getElementById('search-list');
        if (!document.getElementById('search_ipt').value) {
            iptChangeColor('toWhite');
            list.style.display = 'none';
            return;
        }
        iptChangeColor('toBlue');
        const v = document.getElementById('search_ipt').value;
        const similarChars = levenshtein.findSimilarChars_cn(v, wordData);
        if (similarChars.length) {
            showResultCn(similarChars);
        } else {
            list.style.display = 'none';
        }
    }

    function showResultCn(result) {
        if (!document.getElementById('search_ipt').value) {
            iptChangeColor('toWhite');
            return;
        }
        iptChangeColor('toBlue');
        const list = document.getElementById('search-list');
        list.innerHTML = '';
        if (result.length > 0) {
            result.forEach(function (item) {
                const li = document.createElement('li');
                li.style.width = '100%';
                const dhSpan = document.createElement('span');
                dhSpan.className = 'search-dh';
                dhSpan.textContent = item.dh;
                const cnSpan = document.createElement('span');
                cnSpan.className = 'search-cn';
                cnSpan.textContent = item.cn;
                li.appendChild(dhSpan);
                li.appendChild(cnSpan);
                li.addEventListener('click', function () {
                    document.getElementById('search_ipt').value = item.cn;
                    document.getElementById('search-list').style.display = 'none';
                    submitSearch();
                });
                list.appendChild(li);
            });
            list.style.display = 'block';
        }
    }

    // === 输入框颜色动画 ===
    const colorAnimations = new Map();

    function iptChangeColor(type) {
        if (type === 'toBlue') {
            const ipt = document.getElementById('fmwp');
            let r = 238, g = 237, b = 221, a = 0;
            const origin = { r: r, g: g, b: b, a: a };
            const target = { r: 153, g: 204, b: 255, a: 1 };
            const totalSteps = 50;
            let tick = 0;

            // 取消已有动画
            if (colorAnimations.has('fmwp')) {
                cancelAnimationFrame(colorAnimations.get('fmwp'));
            }

            ipt.style.border = '2px solid rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

            function animate() {
                if (tick > totalSteps) return;
                r -= (origin.r - target.r) / totalSteps;
                g -= (origin.g - target.g) / totalSteps;
                b -= (origin.b - target.b) / totalSteps;
                a -= (origin.a - target.a) / totalSteps;
                ipt.style.border = '2px solid rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
                tick++;
                colorAnimations.set('fmwp', requestAnimationFrame(animate));
            }
            requestAnimationFrame(animate);
        } else if (type === 'toWhite') {
            const ipt = document.getElementById('fmwp');
            // 取消已有动画
            if (colorAnimations.has('fmwp')) {
                cancelAnimationFrame(colorAnimations.get('fmwp'));
                colorAnimations.delete('fmwp');
            }
            ipt.style.border = '2px solid rgba(238,237,221,1)';
        }
    }

});
