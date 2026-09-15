window.HOMEPAGE_DATA = {
  profile: {
    name: "柯星澜",
    nameEn: "Kstar Ke",
    initials: "Kstar",
    eyebrow: "AI4Semi Independent Builder / Reliability / Simulation Agent",
    headline: "用 AI 产品化半导体可靠性与仿真知识工具。",
    intro:
      "你好，我是柯星澜，一名具备物理化学与微纳材料科研训练背景的 AI4Semi 探索者。我的主线任务是探索大模型与人工智能在半导体器件可靠性领域的落地应用，从可靠性数据工作台、器件寿命预测模型，到由 LLM 驱动的仿真智能体。",
    actions: [
      { label: "查看 AI4Semi 项目", href: "#projects", variant: "solid" },
      { label: "工作台实况", href: "#dashboard", variant: "ghost" },
      { label: "联系交流", href: "#contact", variant: "ghost" },
    ],
    quicklinks: [
      { label: "数据看板", href: "#dashboard" },
      { label: "可靠性工作台", href: "projects/reliability-workbench.html" },
      { label: "仿真智能体", href: "projects/simulation-agent.html" },
      { label: "GitHub", href: "https://github.com/kairos2425" },
    ],
    metrics: [
      { value: "AI4Semi", label: "核心方向" },
      { value: "HCI/BTI", label: "可靠性场景" },
      { value: "Agent", label: "仿真智能体" },
    ],
    facts: [
      { label: "公开身份", value: "AI4Semi 独立研究者与开发者 / 理学博士训练背景" },
      { label: "能力横跨", value: "从材料科研训练，到 AI4S 与 AI4Semi 工程实现" },
      { label: "Builder 属性", value: "懂物理底层机制，也能动手造轮子的 Tool Builder" },
    ],
  },

  projects: [
    {
      title: "基于 AI 赋能的器件可靠性数据中台与寿命预测系统",
      category: "Reliability Data System",
      fx: "flow",
      status: "核心展示",
      image: "assets/showcase/reliability-workbench-poster.png",
      alt: "Reliability Workbench 产品海报图",
      detailUrl: "projects/reliability-workbench.html",
      summary:
        "一套面向半导体可靠性场景的数据工作台，将分散的测试数据整理成可浏览、可比较、可输出的分析视图。系统面向 HCI/BTI 等可靠性场景，试图把工程师在日常分析中反复完成的数据整理、趋势查看与图表生成沉淀为可复用的数据资产。",
      contribution:
        "负责产品方向、前端展示、数据组织思路与分析结果表达，并继续探索把机器学习引入失效模式的早期预测。",
      chips: ["Python", "Pandas/NumPy", "Lifetime Prediction", "HCI/BTI"],
      highlights: ["可靠性数据视图", "寿命趋势表达", "结果审阅支持"],
      links: [
        { label: "产品介绍", href: "projects/reliability-workbench.html" },
      ],
      featured: true,
      progress: { pct: 70, label: "产品雏形已建：方法/预测/数据桥三工作台 + PPT/Word 报告链" },
    },
    {
      title: "Agentic TCAD 全链条工作台",
      category: "Agentic TCAD",
      status: "串链中",
      fx: "chip",
      image: "assets/showcase/reliability-workbench-architecture.png",
      alt: "Agentic TCAD 三层架构图",
      detailUrl: "projects/agentic-tcad.html",
      summary:
        "自然语言 → 受控仿真 → 证据包的三层系统：***REMOVED*** ***REMOVED*** 执行层（Broker+Workbench+***REMOVED***，***REMOVED*** nLDMOS 资格验收 BV=***REMOVED***V 逐位复现，220 tests），***REMOVED*** 物理治理层（***REMOVED*** 个 ***REMOVED*** 工具、HCI ***REMOVED***-***REMOVED*** 内核谱系、证据分级 hypothesis/solver_verified/silicon_calibrated，518 tests），跨层 ***REMOVED*** 编排 + ***REMOVED*** 审计契约。",
      contribution:
        "目标：工艺→器件→老化→寿命一条链，每步有冻结计划、人工闸、制品哈希和独立审计。当前断点：***REMOVED*** 应力-测量 deck 生成器。",
      chips: ["***REMOVED*** ***REMOVED***/Athena", "***REMOVED***", "***REMOVED***", "证据分级"],
      highlights: ["BV 逐位复现", "***REMOVED*** ***REMOVED*** 工具", "逐制品 ***REMOVED***"],
      links: [
        { label: "项目详情", href: "projects/agentic-tcad.html" },
      ],
      featured: true,
      progress: { pct: 60, label: "***REMOVED*** 验收过 / ***REMOVED*** 执行中 / 编排 v0.1 / ***REMOVED*** 阻塞待解" },
    },
    {
      title: "***REMOVED*** 老化预测流水线 · Reliability-Bench 雏形",
      category: "Reliability Benchmark",
      status: "***REMOVED*** 完成",
      fx: "aging",
      image: "assets/showcase/ldmos-hci-aging-fit.png",
      alt: "LDMOS HCI 老化拟合图",
      detailUrl: "projects/reliability-bench.html",
      summary:
        "***REMOVED***-46 + ***REMOVED*** SG13G2 开源 PDK 的端到端老化流水线：fresh ID-Vg 提取 → 应力扫描 → PINN 老化轨迹拟合 → 寿命外推 → 200 器件蒙特卡洛 → 敏感性 tornado → 证据报告。一轮 campaign 约 1 分钟、零 license 成本，是公开基准与 RL 环境的理想成本结构。",
      contribution:
        "正在把它打包成 Reliability-Bench v0：任务池 + golden 解 + 客观评分（对 solver 真值的数值误差），准备开源。",
      chips: ["***REMOVED***", "***REMOVED*** SG13G2", "PINN", "Monte Carlo", "Weibull"],
      highlights: ["~60s/轮", "200 器件 MC", "证据分级报告"],
      links: [
        { label: "项目详情", href: "projects/reliability-bench.html" },
      ],
      progress: { pct: 55, label: "***REMOVED*** 完成 / ***REMOVED*** 基线 / ***REMOVED*** 应力-测量闭环阻塞中" },
    },
    {
      title: "Reliability-PINN-Lab 寿命预测工作台",
      category: "Physics-Informed ML",
      status: "产品雏形",
      fx: "pinn",
      image: "assets/showcase/reliability-workbench-ml-design.png",
      alt: "PINN 寿命预测工作台设计图",
      detailUrl: "projects/pinn-lab.html",
      summary:
        "灰箱 PINN 寿命预测：物理骨干（Arrhenius/逆幂律等）+ NN 残差修正，右删失、单调性、参数物理界约束，深度集成不确定度 + 凸包域检查，输出永远是 diagnostic 不替代签核。已有 Windows EXE、Streamlit、REST、纯静态公网版四种形态。",
      contribution:
        "六步工作流：数据接入 → 列映射 → 骨干项选择 → 集成训练 → 场景预测 → PPT/Word 报告。",
      chips: ["Grey-box PINN", "PyTorch", "Streamlit", "Uncertainty", "Censoring"],
      highlights: ["不确定度区间", "域检查", "一键报告"],
      links: [
        { label: "项目详情", href: "projects/pinn-lab.html" },
      ],
      progress: { pct: 65, label: "四形态已建 / 真实多条件数据待接入" },
    },
    {
      title: "Layout Canvas：Agent 原生的版图编译工作台",
      category: "Layout Compiler",
      status: "架构期",
      fx: "layout",
      image: "assets/showcase/layout-canvas-cover.svg",
      alt: "Layout Canvas 版图编译示意",
      detailUrl: "projects/layout-canvas.html",
      summary:
        "面向 AI Agent 的「电路→版图→验证」编译工作台：事务化编辑引擎（snapshot/transact/dry-run）、显式连接性投影、fail-closed 验证语义、KLayout 实时桥。架构参照 analog-canvas 的事务边界与 ADR 纪律。",
      contribution:
        "负责产品规划与架构移植：session 事务边界、连接性投影、项目文件协议、PDK 描述符。",
      chips: ["TypeScript", "KLayout", "***REMOVED***", "Sky130", "ADR"],
      highlights: ["事务化引擎", "fail-closed 验证", "KLayout 桥"],
      links: [
        { label: "项目详情", href: "projects/layout-canvas.html" },
      ],
      progress: { pct: 25, label: "ADR×6 已冻结契约 / 引擎骨架搭建中" },
    },
    {
      title: "面向半导体器件仿真的大语言模型智能体",
      category: "Simulation Agent",
      status: "进行中",
      fx: "iv",
      image: "assets/showcase/simulation-agent-poster.png",
      alt: "Simulation Agent 产品海报图",
      detailUrl: "projects/simulation-agent.html",
      summary:
        "探索 LLM 在器件仿真中的能力边界，让自然语言进入物理建模、结果对比与分析解读。目标是让 Agent 更好地理解工程师的物理意图，辅助组织仿真任务和结果审阅。",
      contribution:
        "正在开发基于大语言模型的仿真 Agent 交互方向，重点探索物理机制、工程意图与结果表达之间的精准翻译。",
      chips: ["LLM", "Prompt Engineering", "COMSOL API", "FEM"],
      highlights: ["自然语言交互", "仿真任务组织", "结果解释视图"],
      links: [
        { label: "项目详情", href: "projects/simulation-agent.html" },
      ],
      progress: { pct: 40, label: "LLM→仿真意图翻译原型已通 / 接入 TCAD 编排层中" },
    },
    {
      title: "半导体工程效率知识库与计算器",
      category: "Reliability Knowledge Radar",
      status: "线上运行",
      image: "assets/showcase/reliability-copilot-live.png",
      alt: "半导体器件可靠性知识检索与分享看板",
      detailUrl: "projects/reliability-copilot.html",
      productUrl: "https://semiconductor-reliability-copilot.79402635.workers.dev/",
      summary:
        "面向 HCI、BTI、TDDB、SiC 栅氧、电迁移与封装可靠性的专业检索入口，把关键词检索、文献工作台、主题综述、资料库与图解能力整合到一个可靠性知识雷达中。",
      contribution:
        "该系统正在 Cloudflare Workers 线上版本中持续优化，重点强化从检索、综述、资料追踪到图解的工程阅读闭环。",
      chips: ["Knowledge Radar", "Reliability", "Cloudflare Workers", "AI Search"],
      highlights: ["检索入口", "资料追踪", "主题图解"],
      links: [
        { label: "直接进入", href: "https://semiconductor-reliability-copilot.79402635.workers.dev/" },
        { label: "项目详情", href: "projects/reliability-copilot.html" },
      ],
      progress: { pct: 80, label: "Cloudflare Workers 线上版持续迭代" },
    },
    {
      title: "AI Skill Quest：AI 技能学习平台",
      category: "AI Learning Platform",
      status: "线上运行",
      image: "assets/showcase/ai-skill-quest-home.png",
      alt: "AI Skill Quest AI 技能学习平台首页",
      detailUrl: "projects/ai-skill-quest.html",
      productUrl: "https://ai-skill-quest-9u3.pages.dev/",
      summary:
        "一个把 AI / 科研工具学习做成任务地图的技能训练平台，从数据分析、机器学习、MATLAB、OpenClaw、Claude Code 到 SCI 写作，帮助学习者沿着任务、奖励和作品逐步升级。",
      contribution:
        "该项目展示了将 AI 技能学习产品化的能力：不只是课程列表，而是围绕学习地图、任务、自动助教和私有部署构建可执行的训练路径。",
      chips: ["AI Education", "Skill Map", "Learning Product", "Task System"],
      highlights: ["学习地图", "任务卡片", "自动助教"],
      links: [
        { label: "直接进入", href: "https://ai-skill-quest-9u3.pages.dev/" },
        { label: "项目详情", href: "projects/ai-skill-quest.html" },
      ],
      progress: { pct: 75, label: "Pages 线上可访问 / 任务地图持续扩充" },
    },
    {
      title: "可靠性统计学习型网页开发",
      category: "Reliability Learning Web",
      status: "可直接体验",
      image: "assets/showcase/reliability-stats-learning-poster.png",
      alt: "可靠性统计学习型网页开发展示图",
      detailUrl: "projects/reliability-stats-learning.html",
      productUrl: "projects/reliability-stats-learning.html",
      summary:
        "一个面向可靠性方法学习的前端交互网页，覆盖 CDF、Weibull、Lognormal、最小二乘、插值与退化外推等内容，适合公开展示方法理解与可视化表达能力。",
      contribution:
        "作为学习型网页开发项目，它更适合放在产品入口中直接体验，展示的是前端交互组织和方法教学表达，而不是底层分析引擎。",
      chips: ["Learning Web", "Reliability Stats", "Frontend Only", "Interactive"],
      highlights: ["CDF", "概率图", "退化外推"],
      links: [
        { label: "直接进入", href: "projects/reliability-stats-learning.html" },
      ],
      progress: { pct: 90, label: "站内可直接体验" },
    },
  ],

  tools: [
    {
      name: "DCC 报告检查工具",
      en: "DCC Report Checker",
      badge: "v5.1 便携版 · 免安装",
      fx: "flow",
      tagline: "可靠性认证报告的自动化规则审查器",
      summary:
        "把 Process / Product Reliability Qualification Report 的人工逐页核对，变成规则引擎驱动的批量扫描：Excel 规则包加载 → DOCX 解析 → 15 类检查器 → FAIL 清单落 Excel。",
      features: [
        "15 类检查器：必备项 / 术语字典 / 表格比对 / OCR / 版式 / 错别字等",
        "规则包 Excel 驱动，业务可自维护，命中例外可降级",
        "内置 Tesseract OCR，报告内嵌曲线图与扫描表也能查",
      ],
      usecases:
        "器件领域应用：认证报告出具前预审——NBTI / TDDB / HCI / EM 小节必备内容缺漏、氧化层术语别名归一、表值对标 Qual Plan。",
      detailUrl: "tools/dcc-report-checker.html",
      links: [
        { label: "工具详情", href: "tools/dcc-report-checker.html" },
        { label: "使用指南", href: "tools/dcc-guide.html" },
      ],
      path: "***REMOVED***",
    },
    {
      name: "HCI 可靠性数据处理工具",
      en: "HCI Reliability Tool",
      badge: "Release 2026-08 · onedir EXE",
      fx: "aging",
      tagline: "HCI 应力数据：从机台原始文件到认证决策报告",
      summary:
        "SQLite 不可变 Raw + Canonical 双层数据底座，***REMOVED*** 去重与排除/恢复审计；退化拟合 → 寿命外推 → CDF → 认证决策 → Excel/PPT 报告一键交付。",
      features: [
        "无损解析 ***REMOVED***/24 IP+OP、***REMOVED***/03、Auto tmpdatafile",
        "Raw 不可变 + 双向溯源，Auto 时间轴需工程师确认",
        "离线授权分发，可作为只读 EXE 交给产线/客户工程师",
      ],
      usecases:
        "器件领域应用：HCI 应力测试数据的规范化入库、Δ 参数退化轨迹分析、失效判据寿命提取与资格报告生成——分析结果是决策支持，非签核依据。",
      detailUrl: "tools/hci-reliability-tool.html",
      links: [
        { label: "工具详情", href: "tools/hci-reliability-tool.html" },
      ],
      path: "***REMOVED***",
    },
  ],

  dashboard: {
    title: "工作台实况",
    intro:
      "下面是 TCAD/可靠性工作台的真实进展快照——数字都来自各层仓库的测试与验收记录，不是概念图。状态口径：验收过 / 进行中 / 雏形 / 阻塞。",
    metrics: [
      { value: ***REMOVED***, suffix: "", label: "***REMOVED*** ***REMOVED*** 工具数", note: "agentic_tcad 注册工具" },
      { value: ***REMOVED***, suffix: "+", label: "自动化测试", note: "***REMOVED*** 220 + ***REMOVED*** 518" },
      { value: ***REMOVED***, decimals: 4, suffix: " V", label: "nLDMOS BV 复现", note: "***REMOVED*** 5.30 逐位一致" },
      { value: 200, suffix: "", label: "MC 器件数", label2: "", note: "***REMOVED*** 蒙特卡洛统计" },
      { value: 60, prefix: "~", suffix: " s", label: "***REMOVED*** 一轮仿真", note: "***REMOVED*** + 开源 PDK" },
      { value: 5, suffix: "", label: "加速寿命模型", note: "Arrhenius/IPL/Peck 等" },
    ],
    pipeline: [
      { name: "***REMOVED*** ***REMOVED*** 执行层", status: "验收过", tone: "ok", pct: 100, note: "***REMOVED*** nLDMOS 资格链：BV=***REMOVED***V、逐制品哈希、220 tests" },
      { name: "***REMOVED*** 物理治理层", status: "进行中", tone: "run", pct: 80, note: "***REMOVED*** 工具、HCI ***REMOVED***–***REMOVED*** 内核、校准门禁、518 tests" },
      { name: "跨层编排 ***REMOVED***", status: "v0.1", tone: "run", pct: 35, note: "***REMOVED*** + 链级审计已交付，边界收窄" },
      { name: "***REMOVED*** PINN 寿命预测", status: "雏形", tone: "run", pct: 50, note: "灰箱 PINN 四形态已建，真实多条件数据待接入" },
      { name: "***REMOVED*** 应力-测量闭环", status: "阻塞", tone: "warn", pct: 15, note: "deck 生成器写死单 go ***REMOVED***，待放行 stress-measure" },
      { name: "Reliability-Bench 公开基准", status: "待开源", tone: "info", pct: 20, note: "任务池+golden+评分器打包中" },
    ],
  },

  timeline: [
    {
      time: "2020.08 - 2026",
      title: "北京大学 / 国家纳米科学中心（联合培养）",
      body: "理学博士，物理化学与纳米材料方向。博士阶段完成系统科研训练，在微纳材料制备、材料表征与机理分析上积累了扎实经验。",
    },
    {
      time: "OPC 探索阶段",
      title: "从湿实验到 AI4S / AI4Semi",
      body: "从传统材料科学实验台转向 OPC、AI for Science 与半导体交叉领域，把物理直觉、图形工艺、数据分析和自动化工具构建连接起来。",
    },
    {
      time: "近期聚焦",
      title: "AI4Semi Tool Builder",
      body: "围绕半导体器件可靠性、仿真智能体和自动化数据分析系统，构建可被工程师实际使用的科研与工程基础设施。",
    },
  ],

  capabilityGroups: [
    {
      title: "底层科学训练",
      items: ["物理化学", "微纳材料", "器件物理直觉", "HRTEM/SEM/XRD/Raman"],
    },
    {
      title: "AI4Semi 工程栈",
      items: ["Python", "Pandas/NumPy", "LLM API", "Prompt Engineering", "Data Pipeline"],
    },
    {
      title: "Tool Builder 能力",
      items: ["数据中台", "仿真 Agent", "自动报告", "知识库", "工程工具产品化"],
    },
  ],

  honors: [
    "北京大学理学博士",
    "博士生国家奖学金",
    "北京大学三好学生",
    "本科生国家奖学金 2 次",
    "PMC 创新创业大赛二等奖",
  ],

  publications: [
    {
      title: "Graphdiyne: from Preparation to Biomedical Applications",
      authors: "Li, X.D.; Guo, M.Y.; Chen, C.Y.",
      venue: "Chemical Research in Chinese Universities, 2021",
      note: "Review article",
      doi: "10.1007/s40242-021-1343-8",
    },
    {
      title: "Rapid Synthesis of Graphdiyne Films on Hydrogel at the Superspreading Interface for Antibacteria",
      authors: "Kong, Y.; Li, X.D.; Tong, L.M.; Zhang, J.",
      venue: "ACS Nano, 2022",
      note: "Graphdiyne film / antibacteria",
      doi: "10.1021/acsnano.2c04984",
    },
    {
      title: "Controlled Growth of Single-Walled Carbon Nanotube Films by Iron-Assisted Floating Solid Catalyst Chemical Vapor Deposition",
      authors: "Li, X.D.; Tong, T.Z.; Zhang, L.Y.; Qian L.; Gao, X.; Zhang, J.",
      venue: "Small, 2024",
      note: "Carbon nanotube film growth",
      doi: "10.1002/smll.202402839",
    },
  ],

  notes: [
    {
      time: "Kstar / 小红书",
      title: "半导体可靠性：从物理机制到数据管线",
      body: "围绕 HCI、BTI、寿命外推与工程判断，拆解可靠性分析背后的底层逻辑和自动化机会。",
      image: "assets/showcase/xhs-reliability-topic-poster.png",
      href: "projects/xhs-reliability.html",
    },
    {
      time: "Kstar / 小红书",
      title: "AI4Semi 工具链观察",
      body: "分享大模型、Agent、数据分析和仿真自动化如何进入半导体研发流程。",
      image: "assets/showcase/xhs-ai4semi-topic-poster.png",
      href: "projects/xhs-ai4semi.html",
    },
    {
      time: "Kstar / 小红书",
      title: "Simulation Agent 的能力边界",
      body: "记录从自然语言到物理建模、边界条件、求解器调用和结果校验的探索过程。",
      image: "assets/showcase/xhs-simulation-agent-poster.png",
      href: "projects/xhs-simulation-agent.html",
    },
  ],

  research: [
    {
      tag: "AI4Semi",
      title: "器件可靠性数据智能",
      body: "把 HCI/BTI 等可靠性测试数据从静态报表转化为可分析、可预测、可复用的数据资产。",
    },
    {
      tag: "Agent",
      title: "AI 仿真智能体",
      body: "探索 LLM 如何理解物理意图、调度仿真 API、生成模型并进行结果质量检查。",
    },
    {
      tag: "AI4S",
      title: "从湿实验到干代码",
      body: "把材料科学训练中的机理直觉迁移到 AI for Science 工具建设，形成高壁垒的跨学科能力。",
    },
  ],

  contact: {
    title: "欢迎围绕 AI4Semi、器件可靠性、仿真智能体和科研工具建设交流。",
    actionLabel: "发送邮件",
    actionHref: "mailto:akstar2425@gmail.com",
    items: [
      "Email: akstar2425@gmail.com",
      "小红书：Kstar（分享半导体可靠性与 AI 相关见解）",
    ],
  },
};
