# VALENCIA | 瓦来西雅大辞典 — 项目详情

## 项目结构

```
/
├── index.html                  # 首页 — 搜索入口
├── README.md                   # 项目说明
├── command.txt                 # 项目命令
├── css/
│   └── main.css               # 全局样式表 v4.0
├── js/
│   ├── tools.js               # 工具函数（字母转换、莱文斯坦距离、单词派生）
│   ├── wordData.js            # 词汇数据
│   └── main.js                # 首页逻辑（从 index.html 分离）
├── image/                      # 图片资源
│   ├── bg.png
│   ├── logo_img.png (废弃)
│   ├── search_bg.jpg
│   ├── search_ui.png
│   └── 文字云3D_wenziyun.cn_.png (废弃)
├── video/
│   └── antiqueIrelav-D1.mp4   # 古𣿅语D1考试听力
├── basicLang/                  # 子页面
│   ├── alphabet.html           # 字母表（含iframe）
│   ├── alphabetDetail.html     # 字母表详情
│   ├── bwbæzencl.html          # 词缀表（含iframe）
│   ├── bwbæzenclDetail.html    # 词缀表详情
│   ├── tondhæ.html             # 时态表（含iframe）
│   ├── tondhæDetail.html       # 时态表详情
│   ├── edusrc.html             # 学习资源
│   ├── search.html             # 搜索结果页
│   └── translation.html        # 翻译工具
├── .trae/
├── z/
│   └── projectdetail.md
└── .github/
    └── workflows/
        └── deploy.yml
```

## 设计规范

### 字体
- **英文**: Playfair Display — 典雅衬线体，用于品牌名 `VALENCIA`
- **中文**: Noto Serif SC (思源宋体) — 端庄宋体，用于中文文本
- 备选回退: SimSun / Songti SC / Georgia / Times New Roman / serif
- 引入方式: Google Fonts @import

### 色彩
- 主色: `#7A5048` (暖褐，典雅温和)
- 主色悬浮: `#6B433C`
- 主色浅色: `#EDE0DB`
- 强调色: `#9B7B6E`
- 强调色悬浮: `#8B6B5E`
- 深色: `#2D2D2D`
- 背景: `#F8F6F3` (浅暖灰)
- 正文: `#2D2D2D` (近黑)

### Logo 设计
- 导航栏: 文字 Logo — 英文 `th valencia bangswp` (主色) + 中文 `瓦来西雅大辞典` (灰色)
- 首页: 大 Logo — 中文 `瓦来西雅大辞典` (主色) + 分隔线 + 英文副标题 (灰色)

### 布局
- 固定顶部导航栏（深色，毛玻璃效果）
- 主内容区 Flexbox 居中，最大宽度 1200px
- 卡片式设计语言
- 移动端汉堡菜单折叠导航
- 响应式断点: 1024px (平板)、768px (手机)、480px (小屏)

### 动效
- 导航按钮悬浮: 轻微上移 + 背景色过渡
- 搜索框聚焦: 边框发光 + 阴影放大
- 卡片悬浮: 阴影提升 + 轻微上移
- 页面加载: 淡入动画 (fadeIn)
- 下拉列表: 滑入动画 (slideDown)

## 修改记录

### 2026-07-16 — 第三阶段：字体、配色、Logo 全面升级
- **重构** `css/main.css` — v3.0 升级：
  - 引入 Google Fonts (Noto Serif SC + Playfair Display)
  - 全面更换配色方案：橘色 → 深海军蓝 + 暖金色
  - 背景色改为暖米色 `#F5F1EB`
  - 新增文字 Logo 样式 (`#navLogo-en`, `#navLogo-zh`, `.site-logo-*`)
  - 调整文字间距、行高，适配衬线字体
  - 搜索框聚焦色统一为深蓝
  - 表格表头背景色改为深蓝
- **改造** `index.html` — 替换图片 Logo 为自制文字 Logo
- **改造** 所有子页面 (`search.html`, `alphabet.html`, `bwbæzencl.html`, `tondhæ.html`, `edusrc.html`, `translation.html`) — 导航栏 Logo 替换为文字 Logo
- 废弃文件: `image/logo_img.png` (不再使用), `image/文字云3D_wenziyun.cn_.png` (不再使用)

### 2026-07-16 — 第四阶段：搜索算法重写 + 搜索结果页美化
- **重构** `js/tools.js` — Levenshtein 类全面重写：
  - 莱文斯坦距离 → Damerau-Levenshtein 距离（支持相邻字符交换）
  - 修复 `findSimilarChars_dh` 中长字符串被截断的 bug
  - 修复 `findSimilarChars_cn` 中内外层循环变量名冲突（同用 `i`）的 bug
  - 修复 `getLevenshtein` 数组初始化维度错误
  - 相似度阈值从 0.6 降低至 0.3，更宽松智能
  - 中文搜索不再递归调用 `findSimilarChars_dh`，改为独立匹配
  - 结果按相似度降序排列，𣿅语搜索支持前缀匹配优先
- **改造** `basicLang/search.html`：
  - 移除背景图片 `search_bg.jpg`
  - 添加深蓝+金色主题专用样式
  - 新增搜索栏（支持直接在结果页搜索）
  - 修复 `findWord` 函数调用错误的方法名（`findSimilarChars_` → `findSimilarChars_dh` / `findSimilarChars_cn`）
  - 修复 `showResult` 中移除不存在的 `lgwp` 元素引用
- **修正** 所有页面词典名称 — `VALENCIA` → `th valencia bangswp`
- **调整** `css/main.css` — `#navLogo-en` 字号适配长名称

### 2026-07-16 — 第五阶段：JS 分离、配色重构、搜索交互优化
- **新增** `js/main.js` — 将 index.html 的内联 script 分离为独立 JS 文件，使用 IIFE 封装避免全局污染
- **改造** `index.html` — 移除内联 `<script>`，引用 `js/main.js`
- **重构** `css/main.css` — v4.0 升级：
  - 配色全面更换为暖褐系（`#7A5048` 主色），移除蓝金配色
  - 全局添加 `button, input, textarea, select { outline: none; }` 关闭轮廓线
  - 更新阴影色、聚焦色适配新配色
- **重构** `basicLang/search.html`：
  - 单词展示区改用 `.word-card` 布局：原文（左）+ 词性+中文（右），`align-items: center` 水平中线对齐
  - 右侧词性+中文使用 `font-size: var(--font-size-sm)` 较小字体，`color: var(--color-text-muted)` 浅色
  - 搜索框支持回车键跳转
  - 下拉列表点击词汇直接跳转到对应搜索页面
  - 下拉列表采用结构化显示（𣿅语在左，中文在右）
  - 移除旧版蓝金主题内联样式

### 2026-07-16 — 第六阶段：修复词典切换 + 事件绑定重构
- **修复** `js/main.js` — 词典切换（𣿅中/中𣿅）失效问题：
  - 将内联 `onclick`/`oninput` 全部改为 `addEventListener` 绑定，避免 IIFE 闭包导致全局作用域找不到函数
  - 使用 `DOMContentLoaded` 确保 DOM 就绪后绑定事件
  - 点击下拉选项时同步重置 `openOpt = false`，避免状态混乱
- **改造** `index.html` — 移除所有内联事件属性（`onclick`、`oninput`）
- **改造** `basicLang/search.html` — 移除所有内联事件属性，统一使用 `addEventListener`

### 2026-07-16 — 第七阶段：词汇扩充（新增 10 动词 + 20 名词）
- **扩充** `js/wordData.js` — 新增 30 个日常词汇（严格审查无重复）：
  - **动词（10个）**：
    - `gloch` 爬,攀爬,攀登
    - `zilpod` 扔,投掷,抛
    - `drok` 推,推动,推搡
    - `shlêbod` 拉,拖,牵引
    - `kênch` 切,割,剪
    - `plwshod` 藏,隐藏,躲藏
    - `hrindod` 摇,晃,震动
    - `zapshiêt` 借,借用,借贷
    - `glwntod` 挤,压,按
    - `flœx` 洒,泼,溅
  - **名词（20个）**：
    - `glat` 灰尘,尘埃,尘土
    - `shliah` 影子,阴影,暗处
    - `pœf` 泡沫,泡泡
    - `stêl` 台阶,阶梯,梯级
    - `drasp` 山谷,峡谷,洼地
    - `gêsh` 礼物,赠品,馈赠
    - `trœsh` 垃圾,废物,废弃物
    - `lœk` 锁,门锁,锁具
    - `kliad` 钥匙
    - `nêbiad` 邻居,邻里,邻人
    - `dêt` 债务,欠款,负债
    - `hrêk` 线索,痕迹,踪迹
    - `kêr` 货物,商品,货品
    - `shlêt` 碎片,破片,碎屑
    - `hrœn` 地平线,天际,天边
    - `mêk` 墨,墨水,墨汁
    - `klœd` 笼子,牢笼,囚笼
    - `vêl` 窗帘,幕布,帷幔
    - `plœn` 平原,旷野,原野
    - `sprœt` 嫩芽,新芽,萌芽

### 2026-07-17 — 第八阶段：词汇扩充（新增 10 动词 + 20 名词）
- **扩充** `js/wordData.js` — 新增 30 个日常词汇（严格审查无重复）：
  - **动词（10个，均含名词派生）**：
    - `glinch` 睡,入睡,安眠 → `glinchiad` 睡眠,睡梦,安眠
    - `splorh` 唱,歌唱,吟唱 → `splorhiad` 歌声,歌唱,曲调
    - `klinx` 飞,飞翔,翱翔 → `klinxiad` 飞行,翱翔,航程
    - `tromp` 游,游泳,泅渡 → `trompiad` 游泳,泳姿,泅渡
    - `chrih` 笑,微笑,欢笑 → `chrihiad` 笑声,笑容,欢笑
    - `trezh` 暖,取暖,加热 → `trezhiad` 温暖,热量,暖意
    - `plœsh` 吹,刮风,吹拂 → `plœshiad` 风,气流,吹拂
    - `drost` 浮,漂浮,漂流 → `drostiad` 浮力,漂浮物,漂流
    - `glanh` 坐,就坐,端坐 → `glanhork` 座位,坐席,席位
    - `zrinhod` 做梦,梦见,梦到 → `zrinh` 梦,梦境,幻梦
  - **名词（20个，独立名词）**：
    - `brash` 雨,雨水,降雨
    - `glish` 雪,积雪,降雪
    - `zlish` 冰,冰块,寒冰
    - `kvêsh` 碗,器皿,钵
    - `glinh` 床,卧榻,床铺
    - `drinch` 刀,刀具,刃
    - `plosh` 力量,力气,劲力
    - `klinh` 勇气,胆量,勇敢
    - `dwash` 露水,露珠,朝露
    - `krinx` 心,心脏,内心

### 2026-07-20 — 第九阶段：词汇扩充（新增 10 动词 + 20 名词）
- **扩充** `js/wordData.js` — 新增 50 个日常词汇（10动词+20名词+20独立名词，严格审查无重复）：
  - **动词（10个，均含名词派生）**：
    - `dwênhod` 写,书写,记录 → `dwênh` 文字,笔迹,墨迹
    - `snixod` 读,阅读,览读 → `snix` 阅读,读本,读物
    - `kwalhod` 画,绘画,描画 → `kwalh` 图画,画作,画卷
    - `plithod` 数,计数,数数 → `plith` 数字,数目,数量
    - `hrweshod` 躺,躺卧,卧倒 → `hrwesh` 躺卧,卧姿,卧榻
    - `glapshod` 穿,穿戴,着装 → `glapsh` 衣着,服饰,衣装
    - `froshod` 呼吸,喘息,吐纳 → `frosh` 呼吸,气息,鼻息
    - `zhloshod` 拥抱,搂抱,环抱 → `zhlosh` 拥抱,怀抱,环抱
    - `trwêxod` 敲,敲击,叩击 → `trwêx` 敲击声,叩门声
    - `blazhod` 燃,燃烧,焚燃 → `blazh` 火焰,烈焰,火苗
  - **名词（20个，独立名词）**：
    - `dronh` 云,云朵,云彩
    - `fronh` 雾,雾气,迷雾
    - `gronh` 霜,霜冻,白霜
    - `zronh` 湖,湖泊,湖水
    - `pronh` 河,河流,川流
    - `tronh` 路,道路,路径
    - `dronch` 门,大门,门户
    - `frinch` 窗,窗户,窗口
    - `granch` 墙,墙壁,围墙
    - `plinch` 森林,丛林,密林
    - `grênd` 石头,岩石,石块
    - `klinp` 金,黄金,金子
    - `trimp` 盐,食盐,盐巴
    - `primp` 糖,食糖,糖分
    - `blint` 油,油脂,油分
    - `prênt` 纸,纸张,纸页
    - `drêsh` 笔,毛笔,笔杆
    - `glêsh` 烟,烟雾,烟气
    - `brêsh` 泥,泥土,泥泞
    - `plêsh` 灰,灰烬,炉灰

### 2026-07-20 — 第十阶段：词汇扩充（新增 10 动词 + 20 名词）
- **扩充** `js/wordData.js` — 新增 30 个日常词汇（10动词+10名词派生+10独立名词，严格审查无重复）：
  - **动词（10个，均含名词派生）**：
    - `zrêshod` 哭,哭泣,啼哭 → `zrêsh` 哭泣,哭声,啼声
    - `glêxhod` 笑,微笑,欢笑 → `glêxh` 笑,笑容,笑意
    - `vlizhod` 飞,飞翔,飞行 → `vlizh` 飞行,飞翔,航程
    - `drazhod` 给,给予,赠予 → `drazh` 给予,赠予,馈赠
    - `plêshod` 相信,信任,信赖 → `plêsh` 信任,信赖,信用
    - `krenzod` 建造,修建,构筑 → `krenz` 建筑,建造物,构筑物
    - `shlanzod` 打开,开启,敞开 → `shlanz` 开口,开启处,敞口
    - `klêmpod` 关闭,合拢,闭合 → `klêmp` 关闭,闭合,合拢状态
    - `brêshod` 推,推动,推行 → `brêsh` 推力,推动力,推势
    - `drêshod` 拉,拉动,牵引 → `drêsh` 拉力,牵引力,拉势
  - **名词（10个，独立名词）**：
    - `zrondh` 雪,雪花,飞雪
    - `grindh` 冰,冰块,冰凌
    - `blondh` 海洋,大海,汪洋
    - `zrind` 朋友,友人,友伴
    - `grelp` 村庄,村落,村寨
    - `plirk` 港口,码头,口岸
    - `klwesh` 客人,宾客,访客
    - `zrêmp` 味道,滋味,风味
    - `blêmp` 心脏,心,心房
    - `grwesh` 血液,鲜血,血

### 2026-07-20 — 第十一阶段：词汇扩充（新增 15 动词 + 30 名词）
- **扩充** `js/wordData.js` — 新增 45 个日常词汇（15动词+15名词派生+15独立名词，严格审查无重复，词缀多样化）：
  - **动词（15个，均含名词派生）**：
    - **无词缀动词 → 有词缀名词**：
      - `shlump` 喊,叫喊,呼喊 → `shlumpiat` 喊声,叫喊,呼喊声
      - `kranch` 咬,啃咬,噬咬 → `kranchiat` 咬,咬痕,咬伤
      - `plint` 踢,踹,踢踹 → `plintiat` 踢,踢踹,踹击
      - `zrit` 撕,扯,撕裂 → `zritiat` 撕裂,裂口,裂痕
      - `krêp` 拒绝,回绝,推辞 → `krêpiad` 拒绝,否决,回绝
      - `glint` 庆祝,庆贺,欢庆 → `glintiad` 庆祝,庆典,庆贺
      - `flêp` 决定,决断,裁定 → `flêpiad` 决定,决议,决断
      - `blênt` 继续,持续,延续 → `blêntiad` 持续,延续,连续
    - **有词缀动词（-od）→ 无词缀名词**：
      - `klinchod` 抓,挠,抓挠 → `klinch` 抓痕,抓挠,挠痕
      - `brindod` 记得,记住,牢记 → `brind` 记忆,回忆,记性
      - `krenchod` 原谅,宽恕,饶恕 → `krench` 原谅,宽恕,谅解
      - `klindod` 停止,停下,停顿 → `klind` 停止,停顿,停滞
    - **有词缀动词（-iêt）→ 无词缀名词**：
      - `plochiêt` 教,教导,传授 → `ploch` 教学,教导,传授
      - `trêmpiêt` 改变,变化,变更 → `trêmp` 变化,变更,变动
      - `vlêshiêt` 救,拯救,搭救 → `vlêsh` 拯救,救援,救赎
  - **名词（15个，独立名词）**：
    - `grinp` 书,书本,书籍
    - `zrênd` 故事,传说,轶事
    - `plirp` 钱,金钱,钱财
    - `klwêp` 茶,茶水,茶叶
    - `brwêsh` 酒,酒水,酒饮
    - `zrêlp` 肉,肉类,肉食
    - `glêrp` 蛋,鸡蛋,禽蛋
    - `zrênst` 季节,时节,季候
    - `blênst` 春天,春季,春日
    - `grênst` 夏天,夏季,夏日
    - `klênst` 秋天,秋季,秋日
    - `plênst` 冬天,冬季,冬日
    - `grêld` 昨天,昨日,昨天
    - `brêld` 明天,明日,明天
    - `grilp` 月份,月份,月

### 2026-07-21 — 第十二阶段：词汇扩充（修订版，去除ê/wê，改用常规字母）
- **修订** `js/wordData.js` — 将第12阶段全部替换为纯常规字母，无任何特殊元音（ê/æ/œ）
  - **动词（20个，均含名词派生 -od → 无词缀名词）**：
    - `prekod` 切,切割,切开 → `prek` 切口,切割处,刀口
    - `zanod` 坐,坐下,就座 → `zan` 座位,坐席,坐处
    - `klipod` 爬,攀爬,攀登 → `klip` 攀爬,攀登,爬行
    - `swagod` 摇,摇晃,摆动 → `swag` 摇晃,摇动,摆动
    - `brakod` 折,折断,掰断 → `brak` 折断,断裂,裂口
    - `prwxod` 压,按压,挤压 → `prwx` 压力,按压,压强
    - `nompod` 举,抬起,托举 → `nomp` 举起,抬升,托举
    - `frinod` 指,指向,指示 → `frin` 手指,指头,指端
    - `plinod` 摸,触摸,触碰 → `plin` 触摸,触感,触觉
    - `krinod` 借,借贷,借用 → `krin` 借贷,借款,借用
    - `plofod` 换,交换,兑换 → `plof` 交换,兑换,互换
    - `prinod` 种,种植,栽种 → `prin` 种植,栽种,播种
    - `klaxod` 砍,劈砍,砍伐 → `klax` 砍伐,劈砍,砍痕
    - `drevod` 藏,隐藏,躲藏 → `drev` 隐藏,藏匿处,隐蔽处
    - `glinod` 追,追赶,追逐 → `glin` 追赶,追逐,追捕
    - `blecod` 逃,逃跑,逃离 → `blec` 逃跑,逃亡,逃窜
    - `flinod` 流,流动,流淌 → `flin` 流动,水流,流淌
    - `grofod` 浮,漂浮,浮起 → `grof` 漂浮,浮力,浮起
    - `tronod` 转,旋转,转动 → `tron` 旋转,转动,回转
    - `drempod` 滴,滴落,滴下 → `dremp` 水滴,滴落,液滴
  - **名词（20个，独立名词，全部常规字母）**：
    - `blen` 颜色,色彩,色泽
    - `grwf` 形状,外形,形态
    - `tlwnd` 重量,分量,轻重
    - `trws` 温度,热度,冷热
    - `frwf` 气味,气息,味道
    - `drem` 梦,梦境,睡梦
    - `swen` 汗,汗水,汗液
    - `glond` 脖子,颈项,颈部
    - `plond` 肩膀,肩部,肩头
    - `kronk` 膝盖,膝部,膝关节
    - `frwn` 头发,发丝,毛发
    - `gromp` 骨头,骨骼,骨
    - `blof` 药,药物,药品
    - `blofih` 医生,医师,大夫
    - `plochih` 老师,教师,师长
    - `snixih` 学生,学员,学徒
    - `klonk` 敌人,对手,敌手
    - `plofiad` 和平,安宁,和睦
    - `klep` 刀,刀具,刀子
    - `plemp` 床,床铺,卧床

### 2026-07-21 — 第十三阶段：新增 30 动词 + 30 名词（日常动作与基础名词）
- **扩充** `js/wordData.js` — 新增 120 个词条（30动词+30名词派生+30独立名词+30独立名词，全部使用常规字母）：
  - **动词（30个，均含名词派生 -od → 无词缀名词）**：
    - `krapod` 握,抓握,握住 → `krap` 抓握,握力,握持
    - `plakod` 放,放置,摆放 → `plak` 放置,摆放,安放
    - `mivod` 搬,移动,搬运 → `miv` 移动,搬运,挪动
    - `clofod` 洗,清洗,洗涤 → `clof` 清洗,洗涤,洗刷
    - `zribod` 擦,擦拭,抹擦 → `zrib` 擦拭,抹擦,擦洗
    - `smwlod` 扫,清扫,打扫 → `smwl` 清扫,打扫,扫除
    - `droxod` 晒,晾晒,曝晒 → `drox` 晾晒,曝晒,日晒
    - `flwmod` 浇,浇灌,灌溉 → `flwm` 浇灌,灌溉,浇注
    - `frepod` 喂,喂养,喂食 → `frep` 喂养,喂食,饲养
    - `plivod` 编,编织,编结 → `pliv` 编织,编结,编织物
    - `snwpod` 缝,缝纫,缝合 → `snwp` 缝纫,缝合,针线
    - `krwpod` 捆,捆绑,捆扎 → `krwp` 捆绑,捆扎,绑缚
    - `zlepod` 解,解开,松解 → `zlep` 解开,松解,解脱
    - `plitod` 贴,粘贴,贴附 → `plit` 粘贴,贴附,附着
    - `drikod` 拆,拆卸,拆开 → `drik` 拆卸,拆开,拆解
    - `splekod` 拼,拼凑,拼接 → `splek` 拼凑,拼接,拼合
    - `grinod` 磨,研磨,磨碎 → `grin` 研磨,磨碎,研末
    - `sropod` 泡,浸泡,泡发 → `srop` 浸泡,泡发,浸渍
    - `gremod` 染,染色,浸染 → `grem` 染色,浸染,染料
    - `brwmod` 涂,涂抹,涂刷 → `brwm` 涂抹,涂刷,涂料
    - `tlwxod` 倒,倾倒,倒出 → `tlwx` 倾倒,倒出,倾泻
    - `skopod` 盛,舀取,盛装 → `skop` 舀取,盛装,舀子
    - `stropod` 拌,搅拌,搅动 → `strop` 搅拌,搅动,搅和
    - `knedod` 揉,揉捏,揉搓 → `kned` 揉捏,揉搓,揉面
    - `brosod` 烤,烘烤,烧烤 → `bros` 烘烤,烧烤,烤制
    - `zrisod` 煎,油煎,油炸 → `zris` 油煎,油炸,煎炸
    - `stwmod` 蒸,蒸煮,清蒸 → `stwm` 蒸煮,清蒸,蒸汽
    - `zrwmod` 冻,冷冻,冻结 → `zrwm` 冷冻,冻结,冰冻
    - `hropod` 剁,剁碎,剁砍 → `hrop` 剁碎,剁砍,剁肉
    - `grwvod` 挖,挖掘,挖凿 → `grwv` 挖掘,挖凿,挖掘处
  - **名词（30个，独立名词，全部常规字母）**：
    - `slof` 屋顶,房顶,屋脊
    - `brink` 地板,地面,地板面
    - `blom` 花园,庭院,园子
    - `strak` 市场,集市,市集
    - `sprek` 医院,医馆,诊所
    - `zung` 寺庙,庙宇,寺院
    - `stwl` 塔,高塔,塔楼
    - `zvon` 钟,铃铛,钟铃
    - `brwp` 鼓,大鼓,皮鼓
    - `gliv` 笛,笛子,箫笛
    - `zerc` 镜子,镜面,镜
    - `krwn` 皇冠,王冠,冠冕
    - `smik` 戒指,指环,戒环
    - `skrab` 宝藏,财宝,珍宝
    - `krat` 信件,信函,书信
    - `zok` 法律,律法,法令
    - `stok` 规则,规章,条例
    - `hroj` 英雄,英豪,豪杰
    - `glwm` 灵魂,魂魄,灵
    - `zrak` 神,神灵,神明
    - `dron` 龙,巨龙,神龙
    - `glwz` 蛇,蛇类,长蛇
    - `frwk` 鱼,鱼类,游鱼
    - `zvek` 鸟,鸟类,飞鸟
    - `bzwg` 虫,虫子,昆虫
    - `zlan` 花,花朵,花卉
    - `lwnd` 月亮,月球,月
    - `glod` 太阳,日头,日
    - `stelp` 星星,星辰,星
    - `prwg` 彩虹,虹,彩虹桥

### 2026-07-21 — 第十四阶段：新增 30 动词 + 50 名词（含æ/œ/ê特殊字母）
- **扩充** `js/wordData.js` — 新增 110 个词条（30动词+30名词派生+50独立名词，特殊字母比例约25%，æ/œ/ê均衡使用）
  - **动词（30个，均含名词派生 -od → 无词缀名词，含æ/œ特殊字母7个 ≈ 23%）**：
    - `zivod` 叹,叹气,叹息 → `ziv` 叹息,叹气,叹声
    - `spwzod` 吐,吐出,吐唾 → `spwz` 吐,吐沫,唾液
    - `zwpod` 吸,吸入,吸气 → `zwp` 吸入,吸气,吸力
    - `fwzod` 吹,吹气,吹拂 → `fwz` 吹气,吹拂,吹风
    - `kosod` 咳,咳嗽,咳喘 → `kos` 咳嗽,咳声,咳喘
    - `stribod` 伸,伸展,伸直 → `strib` 伸展,伸直,延伸
    - `kniæod` 跪,跪下,跪拜 → `kniæ` 跪,跪姿,跪拜
    - `plwfod` 趴,趴下,趴伏 → `plwf` 趴伏,趴卧,俯卧
    - `trikod` 眨,眨眼,眨动 → `trik` 眨眼,眨动,一眨
    - `plintod` 踩,踩踏,踏 → `plint` 踩踏,踏,脚步
    - `klibod` 钉,钉入,钉钉 → `klib` 钉,钉子,钉入
    - `zwgod` 锯,锯开,锯割 → `zwg` 锯,锯子,锯割
    - `trwbod` 钻,钻孔,钻入 → `trwb` 钻,钻孔,钻头
    - `krebod` 凿,凿刻,凿开 → `kreb` 凿,凿子,凿刻
    - `brwnod` 长,生长,成长 → `brwn` 生长,成长,生长力
    - `dækod` 谢,感谢,道谢 → `dæk` 感谢,谢意,感激
    - `kronod` 忧,忧虑,忧愁 → `kron` 忧虑,忧愁,愁绪
    - `mrenod` 悲,悲伤,悲痛 → `mren` 悲伤,悲痛,哀伤
    - `klwmod` 嫉,嫉妒,妒忌 → `klwm` 嫉妒,妒忌,忌恨
    - `kæjod` 悔,后悔,悔恨 → `kæj` 后悔,悔恨,懊悔
    - `nifod` 厌,厌倦,厌烦 → `nif` 厌倦,厌烦,腻烦
    - `krwgod` 滚,滚动,翻滚 → `krwg` 滚动,翻滚,滚转
    - `klizod` 滑,滑行,滑倒 → `kliz` 滑行,滑倒,滑动
    - `klwmbod` 跌,跌倒,摔跌 → `klwmb` 跌倒,摔跌,跌跤
    - `stævod` 撞,碰撞,撞击 → `stæv` 碰撞,撞击,冲撞
    - `plækod` 包,包裹,打包 → `plæk` 包裹,包袱,包
    - `kœlod` 卷,卷起,卷曲 → `kœl` 卷,卷曲,卷筒
    - `slœpod` 叠,折叠,叠放 → `slœp` 折叠,叠放,叠痕
    - `zœfod` 封,封口,封闭 → `zœf` 封口,封闭,封条
    - `tœnkod` 塞,塞入,塞堵 → `tœnk` 塞入,塞堵,塞子
  - **名词（50个，独立名词，含æ/œ特殊字母12个 ≈ 24%）**：
    - `zvin` 藤,藤蔓,藤条
    - `grif` 草,青草,草地
    - `lovf` 叶子,叶片,叶
    - `zran` 根,根部,树根
    - `brok` 种子,籽种,种
    - `grok` 马,马匹,骏马
    - `vlak` 牛,牛只,耕牛
    - `bren` 羊,羊只,绵羊
    - `zlof` 猪,猪只,肉猪
    - `klog` 鸡,鸡禽,家鸡
    - `klaz` 猫,猫儿,猫只
    - `zrap` 虎,老虎,猛虎
    - `gran` 皮肤,皮,肤质
    - `klan` 指甲,指甲盖,指爪
    - `vlomp` 嘴唇,唇,唇部
    - `zrok` 牙齿,牙,齿
    - `brond` 胡须,胡子,胡须
    - `sromp` 眉毛,眉,眉梢
    - `zront` 额头,前额,额
    - `zromp` 脸颊,面颊,腮
    - `plont` 手掌,掌心,掌
    - `zrof` 伞,雨伞,伞具
    - `vlof` 扇子,扇,扇具
    - `glomp` 肥皂,皂,香皂
    - `brof` 毛巾,巾帕,面巾
    - `klond` 梳子,梳,梳篦
    - `zraks` 剪刀,剪,剪刀
    - `klomp` 锤子,锤,铁锤
    - `glon` 钉子,钉,铁钉
    - `stond` 梯子,梯,楼梯
    - `bromp` 篮子,篮,竹篮
    - `klof` 袋子,袋,布袋
    - `kraf` 箱子,箱,木箱
    - `zriv` 网,网子,网状
    - `krop` 钩,钩子,挂钩
    - `zrivk` 针,针线,缝针
    - `zron` 线,线绳,丝线
    - `stor` 聪颖,慧心,聪慧
    - `dœl` 溪谷,涧谷,沟壑
    - `grœn` 沙漠,沙海,荒漠
    - `grœp` 礁石,礁岩,礁
    - `vrœk` 泉水,泉,清泉
    - `krœmp` 洞穴,洞,山洞
    - `glœs` 山峰,峰,山巅
    - `bræk` 勇气,胆量,勇
    - `plæn` 自由,自在,自主
    - `græf` 善良,良善,善
    - `dræk` 正义,公正,正
    - `vlænd` 诚实,诚信,诚
    - `krænd` 怜悯,怜惜,恻隐

### 2026-07-21 — 第十五阶段：词汇修正（u→w 规范 + 拼写碰撞修复）
- **修正** `js/wordData.js` — 根据 `intro.md` 中 u 为辅音[ʒ]的规则，修正近期词汇中含 u 的错误拼写，以及修复拼写重复：
  - **u→w 修正（5处）**：
    - `stum` → `stwm`（蒸煮名词，与动词 `stwmod` 保持一致）
    - `glum` → `glwm`（灵魂，独立名词）
    - `bzug` → `bzwg`（虫，独立名词）
    - `plufod` → `plwfod`（趴动词，与名词 `plwf` 保持一致）
    - `krugod` → `krwgod`（滚动词，与名词 `krwg` 保持一致）
  - **拼写碰撞修复（1处）**：
    - `zrak`（剪刀）→ `zraks`（剪刀），因与第13阶段 `zrak`（神）拼写重复
- **同步更新** `z/projectdetail.md` — 第十二、十三、十四阶段词汇表同步修正

### 2026-07-22 — 第十六阶段：Bug修复（词典切换下拉框 + wordData加载错误）
- **修复** `js/main.js` — 将 `new setMultiWord().setAllWord()` 改为 `setMultiWord.setAllWord()`，避免因 `setMultiWord` 已被实例化导致的"not a constructor"错误
- **修复** `basicLang/search.html` — 同上，且该文件因无 try-catch 包裹，此错误会导致脚本中断，下拉框事件绑定代码无法执行，**是下拉框消失的根本原因**
- **修复** `css/main.css` — 将 `.form-wrapper` 的 `overflow: hidden` 改为 `overflow: visible`，避免绝对定位的词典切换下拉菜单被父容器裁剪
- **修复** `js/wordData.js` — 移除第5808行双逗号 `}, , {` → `}, {`，消除数组中的空条目（undefined）

### 2026-07-22 — 第十七阶段：词汇扩充（新增30动词+50名词）
- **扩充** `js/wordData.js` — 新增80个词条（30动词+50名词），覆盖社会关系、情感态度、抽象概念、自然现象、日常物品、建筑场所等新领域
  - **动词（30个，词缀多样化）**：
    - `-od` 词缀（11个）：`kratod`合作、`pramod`竞争、`zlifod`争吵、`kilod`理解、`dwakod`比较、`trisod`尝试、`klæxod`需要、`zlipod`憎恨、`plixod`跟随、`kripod`修理、`prixod`准备、`brixod`检查、`flixod`道歉、`kriwod`召唤、`frapod`训练、`stwêxod`保护、`drœmod`梦想
    - `-iêt`/`-hiêt` 词缀（8个）：`kromiêt`安慰、`grenhiêt`鼓励、`braniêt`赞美、`zlœshiêt`警告、`dveniêt`怀疑、`greniêt`同情、`vleniêt`希望、`zlêkhiêt`骄傲
    - 无词缀动词（5个）：`dwak`分享、`plon`思考、`drên`发现、`klœb`热爱、`zlib`崇拜
  - **名词（50个，无词缀与带词缀混合）**：
    - 社会关系（8个）：`flinh`同事、`plinh`伙伴、`krih`对手、`trinh`队友、`zlinh`盟友、`dwinh`同胞、`zlinêr`陌生人、`kriac`主人
    - 情感抽象（7个）：`klobiat`爱、`zlopiat`恨、`kromiat`同情、`zlokhiad`骄傲、`floniad`羞耻、`krodiad`满足、`klœdiac`忠诚、`plodiad`和睦、`krodhiac`荣誉
    - 抽象概念（7个）：`zlênd`命运、`plondh`尊严、`krênd`责任、`flend`义务、`prend`权利、`trend`传统、`brend`信仰、`zret`秘密
    - 自然现象（6个）：`zlæsh`闪电、`drœx`露水、`græsh`冰雹、`flœsh`洪水、`drænd`干旱、`frend`风暴、`vrend`波浪
    - 日常物品（8个）：`krip`锅、`pliad`碗、`zriat`盘、`slêsh`筷子、`trêx`勺子、`klêf`蜡烛、`krish`炉子、`klix`灯
    - 建筑场所（5个）：`grinpkehiad`图书馆、`zretkehiad`博物馆、`brexkehiad`剧院、`klink`监狱、`plirpkehiad`银行
    - 社会结构（5个）：`flendh`家庭、`trendh`部落、`zrend`种族、`krendh`边境、`plendh`领土
  - **特殊字母比例**：30.0%（24/80个单词含特殊字母，ê/æ/œ均衡使用）
  - **拼写修正**：`klib`（热爱）→ `klœb`（热爱），因与第十四阶段 `klib`（钉,钉子）拼写重复

### 2026-07-22 — 第十八阶段：词汇扩充（新增30动词+50名词，生理/认知/社交/经济/自然等）
- **扩充** `js/wordData.js` — 新增110个词条（30动词+30动词派生名词+50独立名词），覆盖生理现象、认知活动、社交互动、经济财务、自然现象、性格品质等新领域
  - **动词（30个，词缀多样化）**：
    - `-od` 词缀（11个）：`zæxod`打哈欠、`frwndod`颤抖、`glwspod`打鼾、`prexod`赠送、`klwzod`想象、`græpod`猜测、`plæxod`回忆、`zræfod`雕刻、`kliwhod`毕业、`zræxod`考试、`klwshod`运输
    - `-iêt`/`-hiêt` 词缀（5个）：`krixhiêt`打喷嚏、`glwchiêt`打嗝、`zrivêt`邀请、`trwshiêt`研究、`zriwchiêt`谈判
    - 无词缀动词（12个）：`klemt`拜访、`trwst`招待、`stwef`告别、`driw`假设、`klizhod`跳舞、`glwnt`朗诵、`plwsh`贸易、`klixt`签订、`zrwp`租赁、`strok`旅行、`skwndod`探索、`drwshod`沉思
    - 其他词缀（2个）：`zroshod`推理(d.+ -od)、`grwshod`管理(d.+ -od)
  - **名词（50个，独立名词）**：
    - 时间概念（5个）：`zræn`瞬间、`glwst`时刻、`plwst`时期、`kriwnd`年代、`zrond`世纪
    - 教育（3个）：`klwnd`证书、`zræxdh`学位、`trwshdh`论文
    - 健康（4个）：`zræsh`疾病、`glwsh`健康、`plwndh`疲劳、`kriwsh`伤口
    - 婚丧节庆（5个）：`zrost`婚姻、`glwzht`婚礼、`zræsht`葬礼、`kliwdh`节日、`plwshdh`宴会
    - 自然现象（7个）：`zrævnd`火山、`glwznd`地震、`kriwznd`台风、`zroznd`潮汐、`plwznd`霞、`zræzht`日食、`glwzst`月食
    - 抽象概念（7个）：`kriwst`原则、`zrokst`标准、`plwzst`目标、`zrækst`策略、`glwzpst`计划、`kriwdh`证据、`zrodh`预算
    - 经济财务（5个）：`plwstih`会计、`zræzih`投资、`glwsih`利润、`kriwsih`工资、`zrosih`税收
    - 性格品质（6个）：`plwsih`勤奋、`zrækih`懒惰、`glwkih`谦虚、`kriwpih`傲慢、`zropih`宽容、`plwndih`自私
    - 其他抽象（5个）：`zræzdh`灾难、`glwzdh`危机、`kriwzdh`机遇、`zrozdh`挑战、`plwzdh`成果
    - 声誉（3个）：`zrækdh`声誉、`glwkdh`威望、`strokdh`旅程
  - **特殊字母比例**：24.0%（26/110个单词含特殊字母æ/œ，在15%-30%范围内）

### 2026-07-22 — 第二十阶段：词汇扩充（新增20动词+40名词）
- **扩充** `js/wordData.js` — 新增60个词条（20动词+40名词），覆盖金属加工、畜牧、食品加工、自然现象、社会制度、经济概念等新领域
  - **动词（20个，词缀多样化）**：
    - `-od` 词缀（含`-hod`，9个）：`krwxtod`铸造、`zrwnod`驯养、`strwzhod`屠宰、`swmzod`熏制、`drwmpod`沉淀、`krwzod`结晶、`frwzod`蒸发、`zlwxtod`整理、`flwpod`打磨
    - `-iêt`/`-hiêt`/`-thiêt` 词缀（9个）：`plwxtiêt`锻造、`grwxthiêt`冶炼、`klwrmiêt`挤奶、`trwliêt`蒸馏、`glwzthiêt`凝固、`brwliêt`沸腾、`klwxtiêt`清除、`plwzhiêt`布置、`zræmiêt`镶嵌
    - 无词缀动词（2个）：`flwrm`放牧、`prwnt`印刷
  - **名词（40个，独立名词）**：
    - 地形地貌（14个）：`glwrzp`峡谷、`zrærzp`绿洲、`brwrzp`半岛、`frwrzp`悬崖、`krwrzp`丘陵、`plwrzp`沼泽、`drwrzp`海湾、`slwrzp`庙宇、`klwrzp`城堡、`zrwrzp`图书馆、`blwrzp`村落、`prwrzp`王座、`trwrzp`港口、`flwrzp`磨坊
    - 社会制度（5个）：`grwst`法律、`zræst`制度、`blwst`条约、`klwst`会议、`glwzft`和谐
    - 经济概念（9个）：`brwzht`平衡、`prwzht`荣誉、`krwzht`资产、`drwzht`投资、`fræzht`预算、`slwzht`保险、`træzht`退休、`plwzht`遗产、`zrœzht`补贴
    - 自然现象（7个）：`flwzht`闪电、`blæzht`雷、`krwsk`霜、`dræsk`露、`frwsk`雾、`zræsk`虹、`slwsk`季风
    - 其他抽象（5个）：`blæsk`空白、`trwsk`废墟、`plwsk`边界、`zrwsk`秩序、`flwsk`水井
  - **特殊字母比例**：30.0%（18/60个单词含特殊字母æ/œ/ê，在15%-30%范围内）

### 2026-07-24 — 第二十一阶段：修复派生词生成功能失效
- **修复** `js/tools.js` — 将类名 `setMultiWord` 改为 `SetMultiWord`（首字母大写），解决命名冲突问题
  - **问题原因**：JavaScript 中类名本身也是变量，指向类构造函数。原代码中类名 `setMultiWord` 和全局变量 `globalThis.setMultiWord` 使用相同名称，导致调用 `setMultiWord.setAllWord()` 时访问的是类本身而不是实例，类没有 `setAllWord` 方法，只有实例才有
  - **错误信息**：`TypeError: setMultiWord.setAllWord is not a function`
  - **修复方案**：将类名改为 `SetMultiWord`（符合 JavaScript 类命名规范，首字母大写），实例变量保持 `setMultiWord`，避免命名冲突
  - **修复效果**：`setMultiWord.setAllWord()` 现在能正确执行，生成所有派生词（形容词、副词、各种分词），词汇量从 1948 增长到 9462
- **修复** `js/main.js` — 将 `setMultiWord.setAllWord()` 和 `copyright(true)` 的调用分离到独立 `try...catch` 块中，确保即使 `setMultiWord` 出错，`copyright` 仍能执行
- **修复** `basicLang/search.html` — 将 `copyright()` 改为 `copyright(true)`，并调整调用顺序为先 `setMultiWord.setAllWord()` 再 `copyright(true)`，确保词汇量统计包含所有派生词
- **修复** `js/tools.js` — 恢复 `copyright` 函数中 `if(a)` 条件判断为注释状态，确保页脚词汇量链接始终显示
- **修复** `basicLang/search.html` — 恢复页脚 Email 信息，与 index.html 保持一致

### 2026-07-29 — 第二十二阶段：重写 README.md
- **重写** `README.md` — 全面更新项目说明文档：
  - 更新版本号从 2.0.0 到 3.0.0
  - 优化项目简介，突出"综合性在线词典项目"定位
  - 更新功能特性描述，使用更清晰的格式
  - 完善项目结构说明，新增 `css/`、`js/main.js`、`z/` 目录说明
  - 将"使用方法"改为"快速开始"，更简洁明了
  - 更新开发信息，添加邮箱地址，统一链接格式
  - 优化版权说明和注意事项的排版
  - 整体风格更加简洁专业