# ============================================
# 项目重构 Git 提交脚本
# 日期: 2026-07-31
# 说明: 第二十三阶段(CSS模块化) + 第二十四阶段(全量重构+Bug修复)
# ============================================

# 1. 进入项目目录
cd "c:\Users\70495\Desktop\Git Repositories\Valencia Bangswp\Valencia Bangswp - V2"

# 2. 配置 Git 用户信息
git config --global user.name "Koloyaaa"
git config --global user.email "yakamozzz@sjtu.edu.cn"

# 3. 添加所有文件到暂存区（包括新增、修改、删除）
git add -A

# 4. 提交更改
git commit -m "$(cat <<'EOF'
refactor: 项目结构全量重构 + CSS 模块化拆分 + Bug 修复

一、项目结构重构

- 源文件移至 src/：src/index.html、src/css/、src/js/、src/pages/（原 basicLang/）
- 静态资源移至 public/：public/images/、public/videos/
- 工具脚本移至 scripts/，含 extract/ 子目录
- 配置文件移至 config/
- 文档移至 docs/
- 数据文件移至 data/，含 wordlist/ 和 detail/ 子目录
- 废弃文件清理：删除 logo_img.png、文字云3D_wenziyun.cn_.png、search_bg.jpg
- 新增 index.html（根目录入口页，自动跳转到 src/index.html）

二、CSS 模块化拆分（第二十三阶段）

- src/css/main.css — 改为 @import 汇总入口
- src/css/base.css（新增）— 基础层：CSS 变量、Google Fonts、全局重置
- src/css/layout.css（新增）— 布局层：导航栏、页脚、容器布局
- src/css/components.css（新增）— 组件层：搜索框、单词卡片、动画
- src/css/pages.css（新增）— 页面层：背景图片、错误图片

三、共享组件与 Bug 修复（第二十四阶段）

- src/js/components.js（新增）— 共享组件模块，提供 initNav() 和 initFooter()
- src/js/main.js — 改用 initNav(false) 和 initFooter() 替代内联事件
- src/index.html — 移除所有导航按钮 onclick，统一由 components.js 管理
- src/pages/alphabet/bwbæzencl/tondhae/edusrc.html — 同上
- 修复 translation.html 翻译按钮刷新页面（window.open('','_self')）
- 修复 translation.html setMultiWord 调用错误（new 实例化非构造函数）
- 修复 components.js initNav() 路径逻辑（basePath→isSubpage 布尔参数）

四、部署配置更新

- .github/workflows/deploy.yml — 添加构建步骤，合并 src/ 和 public/ 到 dist/
- docs/README.md — 项目结构更新
- z/projectdetail.md — 结构更新 + 新增修改记录
EOF
)"

# 5. 添加远程仓库（如已存在则跳过）
git remote remove origin 2> $null
git remote add origin https://github.com/Koloyaaa/Valencia-Bangswp---V2.git

# 6. 推送到远程仓库
git push -u origin master