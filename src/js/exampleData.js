// 湩语（Irelav）例句库
// 基于 intro.md 语法规则和 wordData.js 词汇创建
// 包含230个涵盖不同时态和语法点的例句
// 注意：例句与词汇的关联通过 exampleUtils.js 中的算法自动匹配，无需手动维护 words 数组
//
// 更新日志：2026-07-31 第二十九阶段（40句）
// 更新日志：2026-07-31 第三十阶段（新增50句，累计90句）
// 更新日志：2026-11-26 第三十一阶段（新增20句，累计110句）
// 更新日志：2026-11-26 第三十二阶段（新增20句，累计130句）
// 更新日志：2026-11-26 第三十三阶段（新增100句，累计230句）
// - 新增家居、维修、交通、旅行、自然、园艺、数码、育儿、购物与手工场景，并加入频率、可能性、处所和时间副词。
// - 新增校园、金融、医疗、职业、饮食、乐器和运动场景；主语涵盖学生、职业者与器具，不使用第一人称。
// - 补充 Duniverse 地名用法，以及过去/将来、否定、疑问、被动、祈使、条件和比较句
// - 例句从40句扩充至90句，新增50个涵盖更多语法点和词汇的例句
// - 新增语法点覆盖：比较级/最高级、情态词、条件句、因果句、更多时态与特殊疑问词等
// - 新增词汇覆盖：动词（haor/sarbib/blan/neu/zipwshiêt/apui/plon/zœb/glwxtod 等）、
//   名词（dailog/haoriat/takst/dronch/frinch/bwzê/knishfê/plirp/sdint/hvaif 等）、
//   连词（hihh/hohh/hinhh/hanhh/whr）、情态词（kiah/hreh/daajd/xiet/hirh）、
//   特殊疑问词（tah/wni/wadheo/wno/woh）、副词（shbir/flikt/nesh/loht/zind/neshn/zindn）、
//   介动词（apdên/nih/zanz）等

globalThis.exampleData = [
	// === 第一组：基础时态（简单句） ===
	{
		dh: "Jadot mad rerr kornd.",
		cn: "今天我吃苹果。"
		// 现在时简单句，SVO语序，时间状语jadot在句首
	},
	{
		dh: "Grêld ton ogah fench.",
		cn: "昨天他去了学校。"
		// 过去时，og+ah=ogah
	},
	{
		dh: "Brêld mads dwênhodit grinp.",
		cn: "明天我们将写书。"
		// 将来时，dwênhod+it=dwênhodit
	},
	{
		dh: "Kornd aizêr mad rerrop.",
		cn: "苹果被我吃了。"
		// 被动语态：受事 aizêr 施事 动词(被动分词)
	},
	{
		dh: "Cmar kikdagæu mad!",
		cn: "请帮助我！"
		// 祈使句：cmar + ki-使动分词 + 动词
	},

	// === 第二组：副词与地点状语 ===
	{
		dh: "Ton piwfakesht cwpodif fench ich.",
		cn: "他正在快速地走向学校。"
		// 副词piwfakesht修饰动词cwpodif，地点状语fench ich
	},
	{
		dh: "Mad rerr kornd hr epsh.",
		cn: "我吃苹果和水。"
		// 连词hr连接两个宾语
	},
	{
		dh: "Snixodif snixih ais madfak zrind.",
		cn: "正在读书的学生是我的朋友。"
		// 现在分词snixodif作定语修饰snixih
	},
	{
		dh: "Grêld mad rrerrah kornd, hr mad repah epsh.",
		cn: "我昨天吃了苹果，和喝了水。"
		// 过去时+逗号+hr连接两个分句
	},
	{
		dh: "Brêld cao ogit fench?",
		cn: "明天你去学校吗？"
		// 将来时疑问句
	},

	// === 第三组：形容词与介动词 ===
	{
		dh: "Th bejan kehiad ais fwash.",
		cn: "这栋红色的楼房很高。"
		// 形容词bejan修饰kehiad，系动词ais
	},
	{
		dh: "Mad ich kehiad.",
		cn: "我在楼房里。"
		// 介动词ich（在...里）直接作谓语
	},
	{
		dh: "Grinp opdên rwzê.",
		cn: "书在桌子上。"
		// 介动词opdên（在...上）直接作谓语
	},
	{
		dh: "Mad ais snixih.",
		cn: "我是学生。"
		// 系动词ais（是）表身份
	},
	{
		dh: "Rih grinp ais madfak.",
		cn: "这本书是我的。"
		// 指示代词rih + 所有格madfak
	},

	// === 第四组：各种动词时态 ===
	{
		dh: "Mad smadif taichê.",
		cn: "我正在做作业。"
		// 进行体；-if 表示动作正在做
	},
	{
		dh: "Ton kdagæuah mad.",
		cn: "他帮助了我。"
		// 过去时kdagæu+ah=kdagæuah
	},
	{
		dh: "Mads ogit fench brêld.",
		cn: "我们明天将去学校。"
		// 将来时，时间状语brêld在句末
	},
	{
		dh: "Wna ton dwênhodah taichê?",
		cn: "他写了作业吗？"
		// 过去时疑问句
	},
	{
		dh: "Tons snixodif grinp.",
		cn: "他们正在读书。"
		// 现在分词snixodif
	},

	// === 第五组：否定与被动 ===
	{
		dh: "Mad sht rerr kornd.",
		cn: "我不吃苹果。"
		// 否定句：sht置于被否定成分之前
	},
	{
		dh: "Mad rerrif martiad jadot.",
		cn: "我今天正在吃食品。"
		// 进行体 -if + 时间状语在句末
	},
	{
		dh: "Ton piwfakesht cwpodah.",
		cn: "他快速地走了。"
		// 过去时+副词修饰
	},
	{
		dh: "Kornd aizêr ton rerrop.",
		cn: "苹果被他吃了。"
		// 被动语态，施事为ton
	},
	{
		dh: "Mad snixodif grinp.",
		cn: "我正在读书。"
		// 现在分词snixodif
	},

	// === 第六组：复合结构与祈使句 ===
	{
		dh: "Grêld mad snixodah grinp ich fench.",
		cn: "我昨天在学校里读了书。"
		// 过去时+地点状语ich fench
	},
	{
		dh: "Mad ogif fench.",
		cn: "我正在去学校。"
		// 进行体；-if 表示正在前往
	},
	{
		dh: "Brêld ton ogit fench, hr mad ogit kehiad.",
		cn: "明天他去学校，和我去楼房。"
		// 将来时+逗号+hr连接两个分句
	},
	{
		dh: "Cmar kirerr!",
		cn: "请吃！"
		// 祈使句：cmar + ki-使动分词 + rerr
	},
	{
		dh: "Mad rerrif tonhaich hr repui.",
		cn: "我正在吃泡面和刺梨。"
		// 进行体；hr 连接并列宾语
	},

	// === 第七组：原有例句（保留） ===
	{
		dh: "Jadot mad rerr repui.",
		cn: "今天我吃刺梨。"
	},
	{
		dh: "Grêld ton snixodah grinp.",
		cn: "昨天他读了书。"
	},
	{
		dh: "Brêld mad dwênhodit taichê.",
		cn: "明天我将写作业。"
	},
	{
		dh: "Repui aizêr mad rerrop.",
		cn: "刺梨被我吃了。"
	},
	{
		dh: "Snixodif snixih ais madfak zrind.",
		cn: "正在读书的学生是我的朋友。"
	},
	{
		dh: "Cmar kirep banpui!",
		cn: "请唱歌！"
	},
	{
		dh: "Grêld mad rrerrah tonhaich, hr mad repah banpui.",
		cn: "我昨天吃了泡面，和唱了歌曲。"
	},
	{
		dh: "Dwênhodah taichê opdên rwzê.",
		cn: "已写的作业在桌子上。"
	},
	{
		dh: "Ton piwfakesht cwpodif.",
		cn: "他正在快速地走。"
	},
	{
		dh: "Wna brêld cao ogit fench?",
		cn: "明天你去学校吗？"
	},

	// ============================================
	// 第三十阶段新增（50句，累计90句）
	// 语法点：更多动词时态、被动语态、祈使句与情态词、
	//         疑问句（特殊疑问词）、连词与复合句、否定句与所有格、
	//         介动词与地点、比较级/最高级
	// ============================================

	// === 第八组：进行体与普通现在句 ===
	{
		dh: "Mad haor cao.",
		cn: "我想你。"
		// 普通现在句：haor 后不加 -if
	},
	{
		dh: "Ton sarbib kornd.",
		cn: "他喜欢苹果。"
		// 一般现在时，无需时态词尾
	},
	{
		dh: "Faks blanif tosh.",
		cn: "大家在玩游戏。"
		// 进行体；-if 表示大家正在玩
	},
	{
		dh: "Caos neuif hrpwiniad.",
		cn: "你们在学习语法。"
		// 进行体；-if 表示正在学习
	},
	{
		dh: "Mad zipwshiêtif hvaif ich.",
		cn: "我正在公园里跑步。"
		// 进行体+地点状语；-if 表示正在跑步
	},

	// === 第九组：不同动词的过去时 ===
	{
		dh: "Mad apuipah dailog.",
		cn: "我说了对话。"
		// 过去时（元音结尾），apui+pah=apuipah
	},
	{
		dh: "Ton plonah haoriat.",
		cn: "他思考了理想。"
		// 过去时，plon+ah=plonah
	},
	{
		dh: "Mads zœbah taichê.",
		cn: "我们完成了作业。"
		// 过去时，zœb+ah=zœbah
	},
	{
		dh: "Ton drênpah rih bwbæ.",
		cn: "他发现这个词。"
		// 过去时（元音结尾），drên+pah=drênpah
	},
	{
		dh: "Mad glwxtodah takst.",
		cn: "我创作了文章。"
		// 过去时，glwxtod+ah=glwxtodah
	},

	// === 第十组：不同动词的将来时 ===
	{
		dh: "Mad klemtit cao fak kehiad.",
		cn: "我将拜访你的家。"
		// 将来时，klemt+it=klemtit
	},
	{
		dh: "Ton glwntit grinp.",
		cn: "他将朗诵书。"
		// 将来时，glwnt+it=glwntit
	},
	{
		dh: "Mads strokit dhinh brêld.",
		cn: "我们明天将旅行去城市。"
		// 将来时+时间状语，strok+it=strokit
	},
	{
		dh: "Cao kriwhiêtit cao fak zrind.",
		cn: "你将介绍你的朋友。"
		// 将来时，kriwhiêt+it=kriwhiêtit
	},
	{
		dh: "Ton krwêshit rih grinp mad.",
		cn: "他将推荐这本书给我。"
		// 将来时+双宾语，krwêsh+it=krwêshit
	},

	// === 第十一组：被动语态 ===
	{
		dh: "Dronch aizêr ton shlanzop.",
		cn: "门被他打开了。"
		// 被动语态：shlanzod→shlanzop（被动分词）
	},
	{
		dh: "Frinch aizêr mad klêmpop.",
		cn: "窗被我关上了。"
		// 被动语态：klêmpod→klêmpop
	},
	{
		dh: "Rih kornd aizêr ton rerrop.",
		cn: "这个苹果被他吃了。"
		// 被动语态，rerr→rerrop
	},
	{
		dh: "Banpui aizêr tons repop.",
		cn: "歌曲被他们唱了。"
		// 被动语态，rep→repop
	},
	{
		dh: "Epsh aizêr ton yerrop.",
		cn: "水被他喝了。"
		// 被动语态，yerr→yerrop
	},

	// === 第十二组：祈使句与情态词 ===
	{
		dh: "Cmar kizanod!",
		cn: "请坐下！"
		// 祈使句：cmar+ki-使动分词+zanod
	},
	{
		dh: "Cmar kineu hrpwiniad!",
		cn: "请学习语法！"
		// 祈使句：cmar+ki-使动分词+neu
	},
	{
		dh: "Daajd hanuref disht!",
		cn: "禁止打别人！"
		// 否定命令：daajd+动词原形
	},
	{
		dh: "Cao hreh flixod ton.",
		cn: "你应该向他道歉。"
		// 情态词hreh（应该）
	},
	{
		dh: "Ton kiah trwst mads.",
		cn: "他可以招待我们。"
		// 情态词kiah（可以）
	},

	// === 第十三组：疑问句（特殊疑问词） ===
	{
		dh: "Tah cao plonif?",
		cn: "你在想什么？"
		// 特殊疑问词tah（什么）
	},
	{
		dh: "Wni ogah fench grêld?",
		cn: "谁昨天去了学校？"
		// 特殊疑问词wni（谁）+时间状语
	},
	{
		dh: "Cao wadheo zœb rih?",
		cn: "你为什么要完成这个？"
		// 特殊疑问词wadheo（为什么）
	},
	{
		dh: "Ton tlipodit taichê wno?",
		cn: "他什么时候开始做作业？"
		// 特殊疑问词wno（何时）+宾语
	},
	{
		dh: "Cao woh smad rih?",
		cn: "你怎么做这个？"
		// 特殊疑问词woh（如何，怎样）
	},

	// === 第十四组：连词与复合句 ===
	{
		dh: "Hinhh ton sarbib rih, ton hanhh smad.",
		cn: "因为他喜欢这个，所以他做。"
		// 因果句：hinhh（因为）+hanhh（所以）
	},
	{
		dh: "Hihh cao og fench, mad whr ogit.",
		cn: "如果你去学校，我也去。"
		// 条件句：hihh（如果）+whr（也）
	},
	{
		dh: "Ton haor blan, hohh ton hreh smad taichê.",
		cn: "他想玩，但是他应该做作业。"
		// 转折句：hohh（但是）
	},
	{
		dh: "Mad klæxod cao fak kdagæu hr krwes.",
		cn: "我需要你的帮助和协助。"
		// 连词hr连接两个并列宾语
	},
	{
		dh: "Mad sht valæhiêt rih, hohh mad trisod.",
		cn: "我不懂这个，但我仍然尝试。"
		// 否定句+转折连词
	},

	// === 第十五组：否定句与所有格 ===
	{
		dh: "Mad sht valæhiêt rih bwbæ.",
		cn: "我不懂这个词。"
		// 否定句：sht置于被否定动词前
	},
	{
		dh: "Ton sht sarbib kornd.",
		cn: "他不喜欢苹果。"
		// 否定句
	},
	{
		dh: "Rih grinp ais madfak, sht caofak.",
		cn: "这本书是我的，不是你的。"
		// 所有格+否定
	},
	{
		dh: "Mad sht ogit fench brêld.",
		cn: "我明天不去学校。"
		// 将来时否定句
	},
	{
		dh: "Ton sht sorch plirp.",
		cn: "他没有钱。"
		// 否定句：sht sorch（没有）
	},

	// === 第十六组：介动词与地点 ===
	{
		dh: "Mad zanodif bwzê opdên.",
		cn: "我正坐在椅子上。"
		// 进行体 -if + 地点补语 opdên（在……上）
	},
	{
		dh: "Grinp ich knishfê.",
		cn: "书在房间里。"
		// 介动词ich（在...里）直接作谓语
	},
	{
		dh: "Ton apdên.",
		cn: "他在地上。"
		// 介动词apdên（在地面上）直接作谓语
	},
	{
		dh: "Mads nih tons og fench.",
		cn: "我们和他们一起去学校。"
		// 介动词nih（与...一起）作状语
	},
	{
		dh: "Ton zanz mad ogah fench.",
		cn: "他随着我去了学校。"
		// 介动词zanz（随着）作状语
	},

	// === 第十七组：比较级与最高级 ===
	{
		dh: "Rih sdint nesh fwash rah sdint.",
		cn: "这棵树比那棵树高。"
		// 比较级：nesh fwash（更高）
	},
	{
		dh: "Madfak grinp ais loht fwash caofak grinp.",
		cn: "我的书和你的书一样高。"
		// 同级比较：loht fwash（一样高）
	},
	{
		dh: "Rih kehiad ais neshn fwash ich rih tork.",
		cn: "这栋楼是这个城市里最高的。"
		// 最高级：neshn fwash（最高）
	},
	{
		dh: "Ton zind piw mad.",
		cn: "他比我慢。"
		// 比较级（更少）：zind piw（更慢）
	},
	{
		dh: "Mad tlipodif snixod grinp, hr mad dlopodah taichê.",
		cn: "我正在开始读书，并且我已经做完了作业。"
		// 进行体+过去时；hr 连接两个分句
	},
	{
		dh: "Grêld, mad ogah Græt.",
		cn: "昨天我去了臭都。"
		// 过去时；时间状语置于句首，并使用城市名作目的地
	},
	{
		dh: "Jadot, mad ogif Cwasain.",
		cn: "今天我正在前往出塞。"
		// 进行体；-if 表示正在前往特别行政区
	},
	{
		dh: "Mads ogif Is'hiadonhfak.",
		cn: "我们正前往东𣿅大区。"
		// 进行体；-if 表示正在前往大区
	},
	{
		dh: "Ton strokit Wendfsfaks.",
		cn: "他将前往群岛大区。"
		// 将来时；以官方大区名为旅行目的地
	},
	{
		dh: "Mad sht sarbib plirp.",
		cn: "我不喜欢钱。"
		// sht 放在被否定的谓语前
	},
	{
		dh: "Wna ton rerrif kornd?",
		cn: "他正在吃苹果吗？"
		// 一般疑问句；-if 表示动作正在进行
	},
	{
		dh: "Tah ton krwêshit mad?",
		cn: "他将向我推荐什么？"
		// 特殊疑问词前置；将来时
	},
	{
		dh: "Th bwbæ ais caofak.",
		cn: "这个词是你的。"
		// 系词 ais 与所有格形容词
	},
	{
		dh: "Th fwash kehiad ais bejan.",
		cn: "这栋高楼是红色的。"
		// 形容词置于名词前作肯定修饰
	},
	{
		dh: "Th kehiad bejan.",
		cn: "这栋楼不红。"
		// 名词后置形容词表示否定
	},
	{
		dh: "Ton piwfakesht ogif fench.",
		cn: "他正在快速地去学校。"
		// 进行体；动词副词置于谓语之前
	},
	{
		dh: "Taichê aizêr mads smadop.",
		cn: "作业被我们完成了。"
		// 被动语态；过去被动分词 -op
	},
	{
		dh: "Cmar kisnixod grinp!",
		cn: "请读一本书！"
		// 礼貌祈使句；ki- 使动前缀
	},
	{
		dh: "Daajd og fench!",
		cn: "禁止去学校！"
		// 否定命令使用 daajd 加动词原形
	},
	{
		dh: "Hinhh mad sarbib kornd, mad hanhh rerr kornd.",
		cn: "因为我喜欢苹果，所以我吃苹果。"
		// 因果连接词引导两个分句
	},
	{
		dh: "Hihh cao og Græt, mad whr ogit Græt.",
		cn: "如果你去臭都，我也会去臭都。"
		// 条件句用普通现在动词 og；结果分句用将来式 ogit
	},
	{
		dh: "Mad haor blan, hohh mad hreh dwênhod taichê.",
		cn: "我想玩，但我应该写作业。"
		// 普通现在句 haor 不加 -if；hohh 转折，hreh 表应当
	},
	{
		dh: "Mad zind piw ton.",
		cn: "我比他慢。"
		// 比较级 zind piw
	},
	{
		dh: "Rih kehiad ais zindn fwash.",
		cn: "这栋楼是最低的。"
		// 最高级 zindn
	},
	{
		dh: "Grêld, ton klemtah madfak kehiad, hr mads dwênhodah taichê.",
		cn: "昨天他拜访了我家，我们写了作业。"
		// 过去时；hr 连接两个分句
	},
	// === 第三十二组：日常生活场景与多样主语（20句） ===
	{
		dh: "Snixih snixod stame.",
		cn: "学生读教科书。"
		// 普通现在时用动词原形；学生阅读教科书。
	},
	{
		dh: "Brefgrwghih brefgrwg glachfry.",
		cn: "校长管理校园。"
		// 普通现在时；校长管理校园。
	},
	{
		dh: "Shypprêhih shypprê snixih.",
		cn: "学术导师指导学生。"
		// 普通现在时；主语为学术导师。
	},
	{
		dh: "Trokzhachhih dwênhod mæng.",
		cn: "助教写讲义。"
		// 普通现在时；助教撰写讲义。
	},
	{
		dh: "Plamahih plama stame.",
		cn: "图书管理员整理教科书。"
		// 普通现在时；图书管理员管理藏书。
	},
	{
		dh: "Vœshzibhih vœshzib trœththwiad.",
		cn: "银行职员办理存款。"
		// 普通现在时；使用本批配套的职业动词与动作名词。
	},
	{
		dh: "Kêchyrhih kêchyr swifœ.",
		cn: "会计师核算账簿。"
		// 普通现在时；会计师核算账簿。
	},
	{
		dh: "Wna swwlhih swwlif?",
		cn: "律师正在提供法律咨询吗？"
		// 一般疑问句；-if/-kif 只表示正在进行。
	},
	{
		dh: "Brêld retohih retoxit.",
		cn: "明天法官将审理案件。"
		// 将来时；动词按末尾元音选择 -it/-xit。
	},
	{
		dh: "Brêthnibhih brêthnib.",
		cn: "警察维护治安。"
		// 普通现在时；动词不加进行体词尾。
	},
	{
		dh: "Vwchslovhih vwchslovif.",
		cn: "消防员正在扑救火灾。"
		// 进行体；-if/-kif 表示动作正在发生。
	},
	{
		dh: "Klægpœkhih pezækif flæzy.",
		cn: "麻醉师正在注射麻醉剂。"
		// 进行体；新动作动词支配药物宾语。
	},
	{
		dh: "Grêld plwharhih stævechah grærshi.",
		cn: "昨天外科医生为病人做了手术。"
		// 过去时；时间状语置于句首。
	},
	{
		dh: "Swichhih swichif grærshi.",
		cn: "物理治疗师正在帮助病人康复。"
		// 进行体；治疗师是动作主体，病人是宾语。
	},
	{
		dh: "Bræthhih gryshiêtif.",
		cn: "孩子正在穿上雨衣。"
		// 进行体；名词雨衣派生的动词，动作正在进行。
	},
	{
		dh: "Bækerhih bækeriêt zhênsni.",
		cn: "面包师烘焙吐司。"
		// 普通现在时；使用已有职业动词，宾语为新增食品名词。
	},
	{
		dh: "Nærshih prwtæbiêt grærshi.",
		cn: "护士用轮椅转运病人。"
		// 普通现在时；“轮椅”派生的动词表示用轮椅转运。
	},
	{
		dh: "Dongshaiêr dongsha flwvæ.",
		cn: "计算器计算账户余额。"
		// 普通现在时；器具名词与对应动词配合使用。
	},
	{
		dh: "Spychw zyshet fika.",
		cn: "管弦乐团演奏钢琴。"
		// 普通现在时；主语为团体，宾语为乐器。
	},
	{
		dh: "Snixih krêbêkif.",
		cn: "学生正在滑雪。"
		// 进行体；词干以元音结尾，使用 -kif。
	},
	// === 第三十三组：多主题日常表达与新副词（100句） ===
	{
		dh: "Slæzstœfhih wnp slæzstœf.",
		cn: "物业管理员常常管理住宅物业。"
		// 频率副词 wnp 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Klêfohih klêfo nyksnop.",
		cn: "房屋检查员检查屋檐。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Frwfonhih eft frwfon swwngwinh.",
		cn: "家电维修员有时维修电饭煲。"
		// 频率副词 eft 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Swengsnihih swengsni.",
		cn: "电梯维修工检修电梯。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Krihræthhih krihræth swêniad.",
		cn: "锁匠配制钥匙。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Fenpdesh, fwv kririhih kririxit.",
		cn: "也许装修工以后会装修房间。"
		// 句首副词 fenpdesh 表示也许。 时间副词 fwv 放在句首。 将来时；按词干末尾元音选择 -it/-xit。
	},
	{
		dh: "Tokonk, rênbenhih rênbenit.",
		cn: "瓷砖工大概会铺贴瓷砖。"
		// 句首副词 tokonk 表示大概。 将来时；按词干末尾元音选择 -it/-xit。
	},
	{
		dh: "Rêngæhih rêngæ nyksnop.",
		cn: "屋顶工修理屋檐。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Pav gythhih gythah.",
		cn: "之前玻璃工切割过玻璃。"
		// 时间副词 pav 放在句首。 过去时；按词干末尾元音选择 -ah/-pah。
	},
	{
		dh: "Kichstœhih kichstœ.",
		cn: "焊工焊接金属构件。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Drachwnhih ledh drachwn stongw.",
		cn: "水暖工通常安装水管。"
		// 频率副词 ledh 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Shashhih shash trastrwn.",
		cn: "空调维修工维修空调。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Klarkrwnhih sht klarkrwn pœgflyp.",
		cn: "电缆工没有铺设电源线。"
		// 否定句，sht 放在被否定的谓语前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dahœrhih dahœr rafon.",
		cn: "木地板安装工在那里铺设木地板。"
		// 地点副词 rafon 放在句末。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Byhwhih byhw nosfræz.",
		cn: "园林设计师设计花圃。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Prompehih prompe frêshte.",
		cn: "室内设计师围绕扶手椅规划室内空间。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Stechzhophih stechzhop plêbas.",
		cn: "景观设计师设计菜园。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Rypvœrhih rypvœrif.",
		cn: "摄像师正在拍摄影像。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Plongêfhih plongêf.",
		cn: "录音师录制声音。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gængephih gængep flagy.",
		cn: "灯光师调整落地灯的角度。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Wna shyvihih shyvikif?",
		cn: "舞台监督正在统筹舞台演出吗？"
		// 一般疑问句，wna 置于句首。 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Pytflihih pytfli masa.",
		cn: "旅行顾问为旅行团规划路线。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Privæhih privæ sængy.",
		cn: "船长驾驶渡轮。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dia ledh rosêv.",
		cn: "父亲通常做家庭清洁。"
		// 频率副词 ledh 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Tia sœgypif.",
		cn: "母亲正在护理衣物。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Pav rêngæhih glisah nyksnop.",
		cn: "之前屋顶工修过屋檐。"
		// 时间副词 pav 放在句首。 过去时；按词干末尾元音选择 -ah/-pah。
	},
	{
		dh: "Frwfonhih pongakif swwngwinh.",
		cn: "家电维修员正在维修电饭煲。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Drachwnhih hyshflir rithæf.",
		cn: "水暖工疏通下水道。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gardhih noth rynspef.",
		cn: "园丁很少修剪草坪。"
		// 频率副词 noth 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Mechhih slœt.",
		cn: "汽车修理工给轮胎充气。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gec'hih krivif.",
		cn: "工人正在检查车辆。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Mechhih ledh hithzha.",
		cn: "汽车修理工通常保养汽车。"
		// 频率副词 ledh 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Pytflihih trœftrœkif.",
		cn: "旅行顾问正在规划路线。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Fwv snixih rêbkræmit firking.",
		cn: "学生以后会搭建帐篷。"
		// 时间副词 fwv 放在句首。 将来时；按词干末尾元音选择 -it/-xit。
	},
	{
		dh: "Bræthhih eft drœfœr.",
		cn: "孩子有时去户外野餐。"
		// 频率副词 eft 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zrind gygwkif.",
		cn: "朋友正在野外徒步。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Priv rifon snixih stœmekif.",
		cn: "学生现在正在这里观星。"
		// 时间副词 priv 放在句首。 时间状语先于地点状语。 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Gardhih demthe zlan.",
		cn: "园丁修剪花木。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gardhih progipif thwzgrœg.",
		cn: "园丁正在为盆栽换盆。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Tia byth bræthhih.",
		cn: "母亲喂养孩子。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Bræthhih vaby zresp.",
		cn: "孩子训练狗。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Snixih rint styzek.",
		cn: "学生从不维护网站。"
		// 频率副词 rint 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Pav plochih kœvepah tribi.",
		cn: "之前老师把数据备份到闪存盘。"
		// 时间副词 pav 放在句首。 过去时；按词干末尾元音选择 -ah/-pah。
	},
	{
		dh: "Swwngwinh swwngw bromk.",
		cn: "电饭煲煮米饭。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Fakyiêr fakykif kornd.",
		cn: "食物处理机正在切碎苹果。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Wna gremlefinh gremlefif kœrv?",
		cn: "咖啡机正在冲泡咖啡吗？"
		// 一般疑问句，wna 置于句首。 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Sêtwiêr wnp sêtw epsh.",
		cn: "电热水壶常常烧开水。"
		// 频率副词 wnp 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Titœthinh titœth.",
		cn: "平底锅煎食物。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zremhih prelzækif.",
		cn: "厨师正在翻炒食材。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Slidêthinh slidêth.",
		cn: "汤锅煮汤。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zremhih tehwkif.",
		cn: "厨师正在烤制食物。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Zremhih greb kornd.",
		cn: "厨师用菜刀切苹果。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Pægnæiêr pægnæ kornd.",
		cn: "砧板垫住苹果，方便切割。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Shegilinh shegil kornd.",
		cn: "削皮器削去苹果的外皮。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Nybsoviêr nybsov.",
		cn: "量匙量取调料。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Datkryinh datkry.",
		cn: "开罐器打开罐头。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dichiêr dich.",
		cn: "开瓶器打开瓶子。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Kekodiêr ledh kekod.",
		cn: "蒸汽拖把通常清洁地面。"
		// 频率副词 ledh 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Pyhfræinh pyhfræ slidêthinh.",
		cn: "钢丝球刷洗汤锅。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Fromsnohinh fromsnohif thwzgrœg.",
		cn: "喷壶正在给盆栽喷水。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Triliêr tril.",
		cn: "缝纫机缝制衣物。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dræmkytinh dræmkyt trir.",
		cn: "活动扳手拧紧螺母。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Feshinh fesh rwzê.",
		cn: "卷尺测量桌面。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Kririhih stêrafiêtif.",
		cn: "装修工正在安装窗纱。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Bræthhih wnp snêpyviêt.",
		cn: "孩子常常在门垫上擦净鞋底。"
		// 频率副词 wnp 置于谓语动词前。 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dia fazzhyhiêt.",
		cn: "父亲展开沙发床。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Tia prœvêpiêt.",
		cn: "母亲铺设床单。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Bræthhih fagwhiêt.",
		cn: "孩子用毛毯盖住身体。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Snixih kræsiêt.",
		cn: "学生挂起蚊帐。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dia lwgæliêt.",
		cn: "父亲把鞋收进鞋柜。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Plochih slœzahiêt.",
		cn: "老师整理并摆放物品。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Flagy flagyhiêt.",
		cn: "落地灯照亮房间。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Trastrwn trastrwniêtif.",
		cn: "空调正在调节室温。"
		// 进行体；-if/-kif 只表示动作正在进行。
	},
	{
		dh: "Prechmœ prechmœhiêt kornd.",
		cn: "冷冻柜冷冻苹果。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Thoch thochiêt bromk.",
		cn: "保鲜盒保存剩饭。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zremhih shæmœpiêt kornd.",
		cn: "厨师用保鲜膜包住苹果。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zremhih trashiêt kornd.",
		cn: "厨师用锡纸包裹苹果。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Styzœ styzœhiêt.",
		cn: "调味罐给菜肴调味。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Snixih rikstehiêt rwzê.",
		cn: "学生用餐巾纸擦拭桌子。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Vêtha vêthahiêt.",
		cn: "杯垫垫住杯子。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Dia gwthiêt.",
		cn: "父亲铺设餐垫。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Nezê nezêhiêt.",
		cn: "拖车拖走故障车辆。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Chidhih flwfathiêt.",
		cn: "农民用皮卡运货。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Ton krêmshœhiêt krêmshœ.",
		cn: "他驾驶越野车穿越野地。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Zêgkli zêgklihiêt grærshi.",
		cn: "救护车转运病人。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Lwta lwtahiêt.",
		cn: "消防车出动灭火。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Niraf nirafiêt.",
		cn: "垃圾车收集垃圾。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Fêthkly fêthklyhiêt.",
		cn: "邮政车投递邮件。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gêshslœ gêshslœhiêt hœshge.",
		cn: "叉车搬运包装箱。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Swezhe swezhehiêt.",
		cn: "起重机吊运重物。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Tryfnœ tryfnœhiêt.",
		cn: "拖拉机耕地。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Frengo frengohiêt.",
		cn: "收割机收割庄稼。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Sængy sængyhiêt pweq.",
		cn: "渡轮运送乘客。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Snixih firkingiêt firking.",
		cn: "学生搭建帐篷。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Tia rwchæhiêt.",
		cn: "母亲装好野餐食物。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Bræthhih snyshiêt snysh.",
		cn: "孩子穿上救生衣。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Gardhih thwzgrœgiêt thwzgrœg.",
		cn: "园丁给盆栽浇水。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Chidhih plêbasiêt.",
		cn: "农民在菜园种植蔬菜。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Bræthhih gælœhiêt thwd.",
		cn: "孩子用移动电源给智能手表充电。"
		// 普通现在时使用动词原形，不加进行体词尾。
	},
	{
		dh: "Snixih snixod gœchsty.",
		cn: "学生阅读旅游地图。"
		// 普通现在时使用动词原形，不加进行体词尾。
	}
];