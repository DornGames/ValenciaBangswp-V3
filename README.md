# 🚧 施工中 Under Construction

# VALENCIA 瓦莱西雅大辞典

![VALENCIA Logo](image/logo_img.png)

𣿅语（Irelav）在线词典与学习平台

## 项目简介

VALENCIA（瓦莱西雅）是一个为虚构语言 **𣿅语**（Irelav）打造的综合性在线词典项目。提供词典查询、字母表、词缀表、时态表、学习资源等完整功能，是𣿅语学习者的必备工具。

**版本：** 3.0.0  
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

## 项目结构

```
Valencia Bangswp - V2/
├── index.html              # 主页（词典查询入口）
├── basicLang/              # 基础语言模块
│   ├── alphabet.html       # 字母表
│   ├── alphabetDetail.html # 字母表详情
│   ├── alphabetDetail.xlsx # 字母表数据
│   ├── bwbæzencl.html      # 词缀表
│   ├── bwbæzenclDetail.html # 词缀表详情
│   ├── bwbæzenclDetail.xlsx # 词缀表数据
│   ├── tondhæ.html         # 时态表
│   ├── tondhæDetail.html   # 时态表详情
│   ├── edusrc.html         # 学习资源
│   ├── search.html         # 搜索页面
│   └── translation.html    # 翻译工具
├── css/                    # 样式文件
│   └── main.css
├── js/                     # JavaScript 文件
│   ├── main.js            # 主逻辑
│   ├── tools.js           # 工具函数
│   └── wordData.js        # 单词数据
├── image/                  # 图片资源
│   ├── bg.png
│   ├── logo_img.png
│   ├── search_bg.jpg
│   ├── search_ui.png
│   └── 文字云 3D_wenziyun.cn_.png
├── video/                  # 视频资源
│   └── antiqueIrelav-D1.mp4
├── z/                      # 项目文档与数据
│   └── projectdetail.md   # 项目详情
└── README.md              # 项目说明
```

## 快速开始

1. 直接打开 `index.html` 文件即可使用
2. 在搜索框中输入拉丁字母进行查询
3. 点击导航栏按钮访问不同功能页面
4. 所有页面使用相对路径，支持离线使用

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **JavaScript** - 交互逻辑
- **Excel** - 数据存储（xlsx 格式）

## 开发信息

- **作者：** DornGames
- **GitHub：** [@dornhub](https://github.com/dornhub)
- **Box3Pro：** [@DornGames](https://dao3.fun/profile/50450184)
- **邮箱：** dorngames@163.com
- **版本：** 3.0.0
- **发布日期：** 2026.7.29

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

代码
本仓库的代码使用 **AGPL-3.0** 许可证。

内容
本仓库的**单词表wordData.js**使用 **CC BY-NC-ND 4.0** 许可证。

## 链接

- [主站](https://dornhub.github.io)
- [GitHub](https://github.com/dornhub)
- [Box3Pro 主页](https://dao3.fun/profile/50450184)

---

## 版权说明：   
**Copyright © 2023-2026 DornGames. All Rights Reserved.**

**注意：** 本项目所有内容均为虚构创作，不涉及任何现实政治、历史或文化实体。所有内容纯属虚构，与现实无关，敬请理性看待。  
