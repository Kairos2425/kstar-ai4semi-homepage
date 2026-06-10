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
      { label: "联系交流", href: "#contact", variant: "ghost" },
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
    },
    {
      title: "面向半导体器件仿真的大语言模型智能体",
      category: "Simulation Agent",
      status: "Prototype",
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
        { label: "产品介绍", href: "projects/simulation-agent.html" },
      ],
    },
    {
      title: "半导体工程效率知识库与计算器",
      category: "Reliability Knowledge Radar",
      status: "补充生态",
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
        { label: "产品介绍", href: "projects/reliability-copilot.html" },
      ],
    },
    {
      title: "AI Skill Quest：AI 技能学习平台",
      category: "AI Learning Platform",
      status: "学习系统",
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
        { label: "产品介绍", href: "projects/ai-skill-quest.html" },
      ],
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
    },
  ],

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
