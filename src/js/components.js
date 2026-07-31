/* ============================================
   components.js | 共享组件：导航栏 & 页脚
   ============================================ */

/**
 * 初始化导航栏按钮的点击事件
 * @param {boolean} isSubpage - 是否为子页面：
 *   - false 首页（src/index.html），导航到 pages/ 子目录
 *   - true  子页面（src/pages/*.html），导航到同级目录
 */
function initNav(isSubpage) {
    // 主站按钮
    var navbut1 = document.getElementById('navbut1');
    if (navbut1) {
        navbut1.addEventListener('click', function () {
            if (isSubpage) {
                window.open('../index.html', '_self');
            } else {
                window.open('https://dornhub.github.io', '_self');
            }
        });
    }

    // 子页面导航按钮（字母表、词缀表、时态表、学习资源）
    var prefix = isSubpage ? '' : 'pages/';
    var pages = [
        { id: 'navbut2', page: prefix + 'alphabet.html' },
        { id: 'navbut3', page: prefix + 'bwbæzencl.html' },
        { id: 'navbut4', page: prefix + 'tondhæ.html' },
        { id: 'navbut5', page: prefix + 'edusrc.html' }
    ];
    pages.forEach(function (item) {
        var btn = document.getElementById(item.id);
        if (btn) {
            btn.addEventListener('click', function () {
                window.open(item.page, '_self');
            });
        }
    });

    // 翻译按钮
    var navbutUser = document.getElementById('navbut_user');
    if (navbutUser) {
        navbutUser.addEventListener('click', function () {
            if (isSubpage) {
                window.open('translation.html', '_self');
            } else {
                window.open('pages/translation.html', '_self');
            }
        });
    }
}

/**
 * 初始化页脚内容
 * 动态设置版权信息及词汇量查看链接
 */
function initFooter() {
    var cprt = document.getElementById('cprt');
    if (cprt) {
        cprt.innerHTML = '版权所有 &copy; 2025 DornGames | Ver V3.1 | '
            + '<a onclick="window.alert(\'当前词汇量:\' + wordData.length + \'词\')">点击查看词汇量</a>';
    }
}

// 导出到全局，供各页面调用
globalThis.initNav = initNav;
globalThis.initFooter = initFooter;