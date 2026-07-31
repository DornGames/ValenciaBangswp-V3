# VALENCIA 瓦来西雅大辞典

𣿅语（Irelav）在线词典与学习平台

## 项目简介

VALENCIA（瓦来西雅）是一个为虚构语言 **𣿅语**（Irelav）打造的综合性在线词典项目。提供词典查询、字母表、词缀表、时态表、学习资源等完整功能，是𣿅语学习者的必备工具。

**版本：** V3.1  
**作者：** DornGames  
**语言：** 𣿅语 / 中文

## 功能特性

- 📚 **词典查询** - 支持𣿅语 - 中文双向查询
- 🔤 **字母表** - 完整的𣿅语字母系统
- 📝 **词缀表** - 词缀变化规则详解
- ⏰ **时态表** - 时态变化规则说明
- 🎓 **学习资源** - 考试听力材料、国歌等学习资料
- 🔍 **智能搜索** - 强大的单词搜索功能
- 🌐 **双语支持** - 中𣿅互译，无缝切换
- 📖 **例句展示** - 丰富的语法例句与高亮显示
- 🔧 **模块化架构** - CSS/JS 分离，便于维护

## 项目结构

```
Valencia Bangswp - V2/
├── index.html                  # 根入口 — 跳转到 src/index.html
├── src/                        # 源代码
│   ├── index.html              # 主页（词典查询入口）
│   ├── css/
│   │   ├── main.css            # 全局样式表入口（@import 汇总）
│   │   ├── base.css            # 基础层：CSS 变量、全局重置、工具类
│   │   ├── layout.css          # 布局层：导航栏、页脚、容器布局
│   │   ├── components.css      # 组件层：搜索框、单词卡片、详情区、动画
│   │   └── pages.css           # 页面层：背景图片、错误图片、搜索页样式
│   ├── js/
│   │   ├── main.js             # 首页逻辑（事件绑定、搜索功能）
│   │   ├── tools.js            # 工具函数（字母转换、莱文斯坦距离、单词派生）
│   │   ├── wordData.js         # 词汇数据
│   │   ├── components.js       # 共享组件（导航栏、页脚注入）
│   │   ├── exampleData.js      # 例句库数据（90个语法示例）
│   │   └── exampleUtils.js     # 例句匹配算法（分词推导、反向查找、高亮）
│   └── pages/                  # 子页面
│       ├── alphabet.html       # 字母表（含iframe）
│       ├── alphabetDetail.html # 字母表详情
│       ├── bwbæzencl.html      # 词缀表（含iframe）
│       ├── bwbæzenclDetail.html # 词缀表详情
│       ├── tondhæ.html         # 时态表（含iframe）
│       ├── tondhæDetail.html   # 单词详情页（动态展示单词信息及例句）
│       ├── edusrc.html         # 学习资源
│       ├── search.html         # 搜索结果页
│       └── translation.html    # 翻译工具
├── public/                     # 静态资源
│   ├── images/
│   │   ├── bg.png
│   │   └── search_ui.png
│   └── videos/
│       └── antiqueIrelav-D1.mp4
├── scripts/                    # 工具脚本
│   ├── extract/
│   │   ├── _extract.js
│   │   └── _extract_words.js
│   ├── check_conflicts.js
│   ├── generate_final.js
│   ├── verify.js
│   └── gitUpdateCode.ps1
├── config/                     # 配置文件
│   ├── command.txt
│   ├── base.dict.yaml
│   └── deploy.yml
├── docs/                       # 文档
│   ├── intro.md
│   ├── word_list.md
│   └── README.md
├── data/                       # 数据文件
│   ├── wordlist/
│   │   ├── _all_cn.txt
│   │   ├── _all_dh.txt
│   │   ├── _existing_cn.txt
│   │   ├── _existing_dh.txt
│   │   └── _existing_words.json
│   └── detail/
│       ├── alphabetDetail.xlsx
│       ├── bwbæzenclDetail.xlsx
│       └── tondhæDetail.xlsx
├── z/                          # 项目详情与记录
│   └── projectdetail.md
└── .trae/                      # IDE 配置
```

## 快速开始

1. 直接打开 `src/index.html` 文件即可使用
2. 在搜索框中输入拉丁字母进行查询
3. 点击导航栏按钮访问不同功能页面
4. 所有页面使用相对路径，支持离线使用

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计（模块化分层架构）
- **JavaScript** - 交互逻辑（模块化组件分离）
- **Excel** - 数据存储（xlsx 格式）

## 开发信息

- **作者：** DornGames
- **GitHub：** [@dornhub](https://github.com/dornhub)
- **Box3Pro：** [@DornGames](https://dao3.fun/profile/50450184)
- **邮箱：** dorngames@163.com
- **版本：** V3.1
- **发布日期：** 2025

## 部署

本项目支持通过 GitHub Actions 自动部署到 InfinityFree：

```yaml
name: Deploy to InfinityFree via FTP
on:
  push:
    branches:
      - main
jobs:
  ftp-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: ${{ secrets.FTP_TARGET_FOLDER }}
```

## 许可证

本项目为私有项目，版权所有。

## 链接

- [主站](https://dornhub.github.io)
- [GitHub](https://github.com/dornhub)
- [Box3Pro 主页](https://dao3.fun/profile/50450184)

---

**版权说明：** 所有内容纯属虚构，与现实无关，敬请理性看待。  
**版权所有 © 2025 DornGames**

**注意：** 本项目所有内容均为虚构创作，不涉及任何现实政治、历史或文化实体。