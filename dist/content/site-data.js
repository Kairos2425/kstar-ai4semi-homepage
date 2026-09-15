window.HOMEPAGE_DATA = {
  profile: {
    name: "Xiaodan Li",
    nameEn: "Kairos Li",
    initials: "Kstar",
    eyebrow: "AI4Semi Independent Builder / Reliability / Simulation Agent",
    headline: "用 AI 产品化半导体可靠性与仿真知识工具。",
    intro:
      "你好，我是 Xiaodan Li（Kairos），一名具备物理化学与微纳材料科研训练背景的 AI4Semi 探索者。我的主线任务是探索大模型与人工智能在半导体器件可靠性领域的落地应用，从可靠性数据工作台、器件寿命预测模型，到由 LLM 驱动的仿真智能体。",
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
      status: "核心方向",
      fx: "chip",
      image: "assets/showcase/reliability-workbench-architecture.png",
      alt: "Agentic TCAD 工作台概念图",
      detailUrl: "projects/agentic-tcad.html",
      summary:
        "让 AI 安全地驱动专业 TCAD 仿真工具链：工程师用自然语言描述验证需求，系统规划受控仿真、调用求解器、产出有据可查的结果。器件电性指标在真实求解器上逐位复现，每一步都可追溯、可审计。",
      contribution:
        "愿景是打通「工艺 → 器件 → 老化 → 寿命」的完整链条，让器件仿真从专家手艺变成可复用的基础设施——AI 设计芯片的速度越快，可靠性验证越是瓶颈。",
      chips: ["TCAD 仿真", "AI 编排", "证据链", "器件可靠性"],
      highlights: ["求解器级精度复现", "全流程可追溯", "人机协同闸门"],
      links: [
        { label: "项目详情", href: "projects/agentic-tcad.html" },
      ],
      featured: true,
      progress: { pct: 60, label: "核心链路已跑通，持续扩展器件覆盖面" },
    },
    {
      title: "Reliability-Bench：开源工艺上的老化预测基准",
      category: "Reliability Benchmark",
      status: "持续演进",
      fx: "aging",
      image: "assets/showcase/ldmos-hci-aging-fit.png",
      alt: "器件老化拟合示意图",
      detailUrl: "projects/reliability-bench.html",
      summary:
        "在开源工艺平台上构建端到端的器件老化预测流水线：从电性曲线提取、应力扫描、老化轨迹拟合到寿命外推与统计分布分析，一轮完整实验只需分钟级、零授权成本。",
      contribution:
        "目标是把它做成公开的可靠性基准任务集——让「AI 能不能做器件可靠性分析」有一个可客观评分的答案，也为可靠性数据智能积累方法论资产。",
      chips: ["器件老化", "寿命外推", "Monte Carlo", "统计建模"],
      highlights: ["分钟级完整实验", "零授权成本", "客观可评分"],
      links: [
        { label: "项目详情", href: "projects/reliability-bench.html" },
      ],
      progress: { pct: 55, label: "基准流水线可用，器件族与应力场景扩展中" },
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
        "物理规律与机器学习结合的寿命预测：经典加速模型做骨干、神经网络只学残差，预测永远带不确定度区间和适用范围提示——输出是工程决策支持，不替代签核。",
      contribution:
        "回答的是可靠性工程师每天的问题：加速应力下的数据，外推到使用工况还能活多久、这个答案有多可信。从数据接入到一键报告，全流程一个界面完成。",
      chips: ["Physics-Informed ML", "寿命预测", "不确定度", "决策支持"],
      highlights: ["不确定度区间", "适用范围提示", "一键报告"],
      links: [
        { label: "项目详情", href: "projects/pinn-lab.html" },
      ],
      progress: { pct: 65, label: "多种交付形态已就绪，真实数据场景持续接入" },
    },
    {
      title: "Layout Canvas：Agent 原生的版图工作台",
      category: "Layout Compiler",
      status: "早期探索",
      fx: "layout",
      image: "assets/showcase/layout-canvas-cover.svg",
      alt: "Layout Canvas 版图编译示意",
      detailUrl: "projects/layout-canvas.html",
      summary:
        "面向 AI Agent 的版图工作台：让「给我一个满足指标的版图」成为可执行的编译过程，每次修改可回滚、可验证，验证不通过绝不报假通过。",
      contribution:
        "版图是模拟芯片自动化最难啃的一段。这个方向探索的是：当 Agent 真正开始动版图时，编辑、验证、回滚的工程底座应该长什么样。",
      chips: ["模拟版图", "AI Agent", "验证驱动", "自动化"],
      highlights: ["可回滚编辑", "验证驱动", "人机同一接口"],
      links: [
        { label: "项目详情", href: "projects/layout-canvas.html" },
      ],
      progress: { pct: 25, label: "架构探索期，核心设计理念已成型" },
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
      badge: "桌面版 · 免安装",
      fx: "flow",
      tagline: "可靠性认证报告的自动化规则审查器",
      summary:
        "把 Process / Product Reliability Qualification Report 的人工逐页核对，变成规则引擎驱动的批量扫描：Excel 规则包加载 → DOCX 解析 → 15 类检查器 → FAIL 清单落 Excel。",
      features: [
        "15 类检查器：必备项 / 术语字典 / 表格比对 / OCR / 版式 / 错别字等",
        "规则包 Excel 驱动，业务可自维护，命中例外可降级",
        "内置 OCR，报告内嵌曲线图与扫描表也能查",
      ],
      usecases:
        "器件领域应用：认证报告出具前预审——NBTI / TDDB / HCI / EM 小节必备内容缺漏、氧化层术语别名归一、表值对标 Qual Plan。",
      detailUrl: "tools/dcc-report-checker.html",
      links: [
        { label: "工具详情", href: "tools/dcc-report-checker.html" },
        { label: "使用指南", href: "tools/dcc-guide.html" },
        { label: "申请体验", href: "#contact-me" },
      ],
      access: "本工具为内部授权桌面软件，体验或试用请联系作者获取。",
    },
    {
      name: "HCI 可靠性数据处理工具",
      en: "HCI Reliability Tool",
      badge: "桌面版 · 离线运行",
      fx: "aging",
      tagline: "HCI 应力数据：从机台原始文件到认证决策报告",
      summary:
        "不可变原始数据底座 + 规范化分析层，全程溯源审计；退化拟合 → 寿命外推 → 统计分布 → 认证决策 → 资格报告一键交付。",
      features: [
        "兼容主流机台导出格式，原始文件无损解析入库",
        "原始数据不可变 + 排除/恢复留痕，分析可完全回溯",
        "离线授权分发，可作为只读桌面端交给产线/客户工程师",
      ],
      usecases:
        "器件领域应用：HCI 应力测试数据的规范化入库、Δ 参数退化轨迹分析、失效判据寿命提取与资格报告生成——分析结果是决策支持，非签核依据。",
      detailUrl: "tools/hci-reliability-tool.html",
      links: [
        { label: "工具详情", href: "tools/hci-reliability-tool.html" },
        { label: "申请体验", href: "#contact-me" },
      ],
      access: "本工具为内部授权桌面软件，体验或试用请联系作者获取。",
    },
    {
      name: "PPT 模板工作台",
      en: "PPT Workbench",
      badge: "桌面版 · 全离线",
      image: "assets/showcase/ppt-workbench-ui.png",
      tagline: "本地大模型驱动的 PPT 排版与文献速读工作台",
      summary:
        "上传自己的 PPT 模板，AI 生成大纲与润色，规则引擎产出原生可编辑的 PPTX——文本、图表、表格都能继续改。另带文献速读：多篇论文一次性结构化精读、跨文献综述与可拖拽脑图。全程离线，数据不出本机。",
      features: [
        "模板库：识别主题色/版式/页面尺寸，富版式引擎实际套用",
        "14 种页面类型 + 原生图表/表格 + 生成后质量审计",
        "扫描版 PDF 自动 OCR，中英文开箱可用",
      ],
      usecases:
        "器件领域应用：可靠性评审汇报、项目立项 PPT 快速出稿；文献速读服务可把 3-5 篇器件可靠性论文一次抽成结构化精读 + 综述 + 专利点提示。",
      detailUrl: "tools/ppt-workbench.html",
      links: [
        { label: "工具详情", href: "tools/ppt-workbench.html" },
        { label: "申请体验", href: "#contact-me" },
      ],
      access: "本工具为内部授权桌面软件，在线体验版筹备中，可邮件预约。",
    },
  ],

  dashboard: {
    title: "能力版图",
    intro:
      "用 AI 把器件可靠性分析做成可复用的基础设施——下面是目前覆盖的能力面与推进方向。",
    metrics: [
      { value: 4, suffix: "", label: "可靠性场景", note: "HCI / BTI / TDDB / EM" },
      { value: 5, suffix: "", label: "加速寿命模型", note: "Arrhenius / 逆幂律 / Peck 等" },
      { value: 200, suffix: "", label: "器件统计样本", note: "蒙特卡洛寿命分布分析" },
      { value: 60, prefix: "~", suffix: " s", label: "一轮仿真实验", note: "开源平台端到端" },
      { value: 15, suffix: "+", label: "报告检查规则", note: "认证报告自动预审" },
      { value: 3, suffix: "", label: "已交付桌面工具", note: "离线运行 · 授权分发" },
    ],
    pipeline: [
      { name: "器件仿真执行", status: "已可用", tone: "ok", pct: 100, note: "专业求解器驱动，电性指标逐位复现" },
      { name: "可靠性数据分析", status: "已可用", tone: "ok", pct: 90, note: "机台数据入库、退化轨迹、统计分布" },
      { name: "寿命预测", status: "产品化中", tone: "run", pct: 65, note: "物理约束 ML，带不确定度与适用范围" },
      { name: "报告与交付自动化", status: "已可用", tone: "ok", pct: 85, note: "认证报告预审 + PPT/Word 一键生成" },
      { name: "AI 编排与 Agent", status: "演进中", tone: "run", pct: 50, note: "自然语言到受控执行的完整链路" },
      { name: "公开基准 Reliability-Bench", status: "筹备中", tone: "info", pct: 30, note: "让器件可靠性分析可客观评分" },
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
