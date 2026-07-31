// 湩语（Irelav）例句库
// 基于 intro.md 语法规则和 wordData.js 词汇创建
// 包含90个涵盖不同时态和语法点的例句
// 注意：例句与词汇的关联通过 exampleUtils.js 中的算法自动匹配，无需手动维护 words 数组
//
// 更新日志：2026-07-31 第二十九阶段（40句）
// 更新日志：2026-07-31 第三十阶段（新增50句，累计90句）
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
		// 现在时smad+if=smadif
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
		// 现在时+时间状语在句末
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
		// 现在时og+if=ogif
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
		// 现在时+hr并列宾语
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

	// === 第八组：更多动词的现在时 ===
	{
		dh: "Mad haorif cao.",
		cn: "我想你。"
		// 现在时，haor+if=haorif
	},
	{
		dh: "Ton sarbib kornd.",
		cn: "他喜欢苹果。"
		// 一般现在时，无需时态词尾
	},
	{
		dh: "Faks blanif tosh.",
		cn: "大家在玩游戏。"
		// 现在时，blan+if=blanif
	},
	{
		dh: "Caos neuif hrpwiniad.",
		cn: "你们在学习语法。"
		// 现在时，neu+if=neuif
	},
	{
		dh: "Mad zipwshiêtif hvaif ich.",
		cn: "我在公园里跑步。"
		// 现在时+地点状语，zipwshiêt+if=zipwshiêtif
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
		dh: "Cao wadheo zœbif rih?",
		cn: "你为什么要完成这个？"
		// 特殊疑问词wadheo（为什么）
	},
	{
		dh: "Ton tlipodit taichê wno?",
		cn: "他什么时候开始做作业？"
		// 特殊疑问词wno（何时）+宾语
	},
	{
		dh: "Cao woh smadif rih?",
		cn: "你怎么做这个？"
		// 特殊疑问词woh（如何，怎样）
	},

	// === 第十四组：连词与复合句 ===
	{
		dh: "Hinhh ton sarbib rih, ton hanhh smadif.",
		cn: "因为他喜欢这个，所以他做。"
		// 因果句：hinhh（因为）+hanhh（所以）
	},
	{
		dh: "Hihh cao og fench, mad whr ogit.",
		cn: "如果你去学校，我也去。"
		// 条件句：hihh（如果）+whr（也）
	},
	{
		dh: "Ton haorif blan, hohh ton hreh smad taichê.",
		cn: "他想玩，但是他应该做作业。"
		// 转折句：hohh（但是）
	},
	{
		dh: "Mad klæxod cao fak kdagæu hr krwes.",
		cn: "我需要你的帮助和协助。"
		// 连词hr连接两个并列宾语
	},
	{
		dh: "Mad sht valæhiêt rih, hohh mad trisodif.",
		cn: "我不懂这个，但是我尝试。"
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
		cn: "我坐在椅子上。"
		// 现在时+介动词短语opdên（在...上）
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
		dh: "Mads nih tons ogif fench.",
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
		cn: "我开始读书，和我结束了作业。"
		// 现在时+过去时+hr连接两个分句
	}
];