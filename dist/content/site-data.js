window.HOMEPAGE_DATA = {
  profile: {
    name: "Xiaodan Li",
    nameEn: "Kairos Li",
    initials: "Kstar",
    eyebrow: "AI for Semiconductor · 厂内可部署的工程 AI",
    headline: "让 AI 在厂内落地：懂器件物理，数据不出厂。",
    intro:
      "我是 Xiaodan Li（Kairos），北京大学理学博士，做半导体工程 AI 的研究与工具开发。工作集中在三件事：用物理模型加小样本数据做器件可靠性与寿命预测；让 AI 在人工审批下驱动 TCAD 等专业工具；把失效案例和测试数据沉淀成可检索、可追溯的本地知识库。所有系统都按离线可部署、每个结论有证据链来设计。",
    actions: [
      { label: "先看精选演示", href: "#start", variant: "solid" },
      { label: "全部项目", href: "#projects", variant: "ghost" },
      { label: "联系交流", href: "#contact", variant: "ghost" },
    ],
    quicklinks: [
      { label: "3D NAND 纵深案例", href: "demo/ai4chip.html#nand" },
      { label: "失效案例检索实拍", href: "demo/failcase-rag.html" },
      { label: "JEDEC 标准解读库", href: "https://jedec-docs.pages.dev/" },
      { label: "GitHub", href: "https://github.com/kairos2425" },
    ],
    metrics: [
      { value: "10", label: "个可在线交互的演示模块" },
      { value: "3", label: "款已打包交付的离线工具" },
      { value: "离线", label: "本地模型，数据不出域" },
    ],
    visual: { fx: "chip", caption: "PROCESS → DEVICE → AGING → LIFETIME" },
    facts: [
      { label: "背景", value: "北京大学理学博士 · 半导体工程 AI 研究与开发" },
      { label: "方法", value: "物理机理做骨干，机器学习补残差，结论带不确定度" },
      { label: "原则", value: "AI 只给建议，关键动作由工程师审批，全程留痕" },
    ],
  },

  spotlight: {
    title: "从这四个演示看起",
    intro: "每个演示对应芯片研发或制造里的一个具体环节。数据来源和成熟度都如实标在卡片上。",
    items: [
      {
        no: "01",
        tag: "在线可交互",
        title: "3D NAND 纵深案例",
        body: "CP Fail Bit Map 的失效模式自动分离并回溯到工艺站；Retention 与 Vt 漂移的寿命外推和提前预警。",
        proof: "合成数据，展示方法与输出形态",
        image: "demo/shots/nand-fbm.png",
        alt: "3D NAND Fail Bit Map 失效模式分离演示",
        href: "demo/ai4chip.html#nand",
        cta: "打开演示",
      },
      {
        no: "02",
        tag: "本机运行实拍",
        title: "失效案例智能检索",
        body: "一句话描述异常，返回相似历史案例、按可能性排序的根因假设和下一步排查动作，结论可追到具体案例。",
        proof: "单机离线，小模型即可运行",
        image: "demo/shots/failcase-rag-answer.png",
        alt: "失效案例检索平台运行截图",
        href: "demo/failcase-rag.html",
        cta: "看运行实拍",
      },
      {
        no: "03",
        tag: "原型运行中",
        title: "Agentic TCAD 工作台",
        body: "工程师一句话发起仿真任务，AI 规划并调用求解器，提交前人工审批，每一版结果进入可追溯的台账。",
        proof: "功率器件工艺到老化全链路已跑通",
        fx: "chip",
        href: "demo/tcad-workbench.html",
        cta: "看工作方式",
      },
      {
        no: "04",
        tag: "产品雏形",
        title: "器件寿命预测",
        body: "把加速应力下的退化数据外推到使用工况。经典加速模型做骨干，神经网络只学残差，输出带不确定度区间。",
        proof: "退化预测流程在实测数据上做过留出检验",
        fx: "pinn",
        href: "projects/pinn-lab.html",
        cta: "看项目详情",
      },
    ],
    principles: [
      { title: "数据不出厂", body: "模型、索引、数据全部本地部署，不依赖外网。" },
      { title: "不替换现有系统", body: "只读接入已有数据，输出是建议表和报告。" },
      { title: "小样本也能用", body: "物理模型提供约束，不靠堆数据。" },
      { title: "人始终在环", body: "关键动作需工程师批准，每次模型更新先过验证。" },
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
      status: "原型运行中",
      fx: "chip",
      image: "assets/showcase/reliability-workbench-architecture.png",
      alt: "Agentic TCAD 工作台概念图",
      detailUrl: "projects/agentic-tcad.html",
      summary:
        "让 AI 安全地驱动专业 TCAD 仿真工具链：工程师用一句话描述验证需求，系统规划受控仿真、调用求解器、产出有据可查的结果。器件电性指标在真实求解器上逐位复现，每一步都可追溯、可审计。",
      contribution:
        "愿景是打通「工艺 → 器件 → 老化 → 寿命」的完整链条，让器件仿真从专家手艺变成可复用的基础设施——AI 设计芯片的速度越快，可靠性验证越是瓶颈。",
      chips: ["TCAD 仿真", "AI 编排", "证据链", "器件可靠性"],
      highlights: ["求解器级精度复现", "全流程可追溯", "人机协同闸门"],
      links: [
        { label: "项目详情", href: "projects/agentic-tcad.html" },
        { label: "工作台预览", href: "demo/tcad-workbench.html" },
      ],
      featured: true,
      progress: { pct: 65, label: "统一工作台原型已在本机跑通，器件覆盖面持续扩展" },
    },
    {
      title: "数字芯片设计智能体：从规格到验证的闭环",
      category: "Digital Design Agent",
      status: "原型运行中",
      fx: "flow",
      image: "assets/showcase/agentic-tcad-pipeline.svg",
      alt: "数字芯片设计智能体流程图",
      detailUrl: "projects/chip-agent.html",
      summary:
        "用一句话写下功能规格，系统自动完成数字电路设计、测试环境生成、仿真验证与缺陷修复——每一个「通过」都经过独立判卷，而不是模型自说自话。",
      contribution:
        "把「写电路、写测试、跑仿真、看波形」这条原本靠资深工程师经验的链路，变成可审计的自动闭环；所有结果按证据等级如实标注，对标开源 agentic EDA 的公开基准。",
      chips: ["数字 IC", "设计自动化", "自动验证", "AI Agent"],
      highlights: ["规格驱动设计", "独立判卷不自证", "失败可归因可恢复"],
      links: [
        { label: "项目详情", href: "projects/chip-agent.html" },
        { label: "界面预览", href: "demo/chip-agent.html" },
      ],
      featured: true,
      progress: { pct: 45, label: "本地设计-验证闭环已跑通，复杂题型能力持续提升" },
    },
    {
      title: "AI4Chip 智能测试数据中枢 · 全景演示",
      category: "数据智能 / 演示",
      status: "线上 Demo",
      fx: "iv",
      productUrl: "demo/ai4chip.html",
      summary:
        "面向芯片测试环节的数据智能中枢概念演示：从测试数据接入、良率洞察到高风险筛选与 AI 问答的完整链路，用合成数据呈现全景能力。",
      contribution:
        "把「测试数据 → 产线决策」的产品想象做成可交互的演示，为合作伙伴与团队提供直观的形态参照。",
      chips: ["测试数据", "良率分析", "AI 问答", "概念演示"],
      highlights: ["全链路交互", "合成数据", "断网可开"],
      links: [
        { label: "在线体验", href: "demo/ai4chip.html" },
      ],
      progress: { pct: 100, label: "线上可访问（演示数据）" },
    },
    {
      title: "失效案例智能检索平台",
      category: "知识库 / RAG",
      status: "原型可用",
      fx: "aging",
      image: "assets/showcase/reliability-copilot-live.png",
      alt: "失效案例检索平台概念图",
      detailUrl: "projects/failcase-rag.html",
      summary:
        "把历史失效案例与 8D 分析报告沉淀为本地可检索的知识库：工程师用一句话描述异常，系统找出相似案例并汇总根因线索——全部数据不出本机。",
      contribution:
        "面向产线与可靠性团队的失效知识复用：把散落在个人电脑里的案例报告，变成可问答的组织记忆。",
      chips: ["失效分析", "知识库", "本地部署", "隐私优先"],
      highlights: ["表格与报告全格式", "离线单机运行", "案例级去重溯源"],
      links: [
        { label: "项目详情", href: "projects/failcase-rag.html" },
        { label: "界面预览", href: "demo/failcase-rag.html" },
      ],
      progress: { pct: 55, label: "单机离线版已可用，知识库持续扩充" },
    },
    {
      title: "JEDEC 标准解读库",
      category: "Standards Knowledge Base",
      status: "线上运行 · 新作",
      image: "assets/showcase/jedec-docs-cover.svg",
      alt: "JEDEC 标准解读库封面",
      detailUrl: "projects/jedec-docs.html",
      productUrl: "https://jedec-docs.pages.dev/",
      summary:
        "把 JEDEC 标准按芯片走过的路重新组织：器件设计、版图、仿真模型、晶圆监控、机理级可靠性、封装级认证——每一条测试要求都落到一份具体的方法文件（JESD / JEP / J-STD / JS 联合文件）。交互版图与轨道式总览，让标准从案头文档变成可导航的工程地图。",
      contribution:
        "独立整理与解读：以一颗芯片从设计到认证的路径为主轴重构标准体系，把失效机理、加速模型、应力判据串成可查阅的知识库——器件可靠性知识的公开化表达。",
      chips: ["JEDEC 标准", "可靠性认证", "失效机理", "知识库"],
      highlights: ["按生命周期组织", "机理 → 方法文件映射", "交互式导览"],
      links: [
        { label: "直接进入", href: "https://jedec-docs.pages.dev/" },
        { label: "项目详情", href: "projects/jedec-docs.html" },
      ],
      featured: true,
      progress: { pct: 100, label: "线上可访问，收录持续扩充中" },
    },
    {
      title: "IC World 2026 大会汇报 · 驭智拓芯途",
      more: true,
      category: "Industry Report",
      status: "线上运行 · 新作",
      image: "assets/showcase/ic-world-2026-cover.svg",
      alt: "IC World 2026 大会汇报封面",
      detailUrl: "projects/ic-world-2026.html",
      productUrl: "https://ic-world-2026-report.pages.dev/",
      summary:
        "把 66 页大会汇报重构为单页动态演示：以北京微电子国际研讨会七场论坛、40+ 场演讲与 46 幅实拍为一手素材，结合 WSTS / IEEE HIR / JEDEC 与 Nature·JSSC·TED 文献交叉验证，讲清两条主线——3D IC×异质异构集成、AI 赋能全链条——如何交汇于器件可靠性。",
      contribution:
        "独立完成素材采集、文献交叉验证与叙事重构：从万亿美元市场周期到混合键合间距路线图，再到 AI×可靠性的逐条深读——一份可溯源的产业全景判断。",
      chips: ["3D IC", "Chiplet", "AI × 可靠性", "产业分析"],
      highlights: ["一手大会素材", "文献可溯源", "单页动态叙事"],
      links: [
        { label: "直接进入", href: "https://ic-world-2026-report.pages.dev/" },
        { label: "项目详情", href: "projects/ic-world-2026.html" },
      ],
      featured: false,
      progress: { pct: 100, label: "线上可访问" },
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
      status: "介绍站点已上线",
      fx: "layout",
      image: "assets/showcase/layout-canvas-cover.svg",
      alt: "Layout Canvas 版图编译示意",
      detailUrl: "projects/layout-canvas.html",
      productUrl: "https://kairos2425.github.io/layout-canvas/",
      summary:
        "面向 AI Agent 的版图工作台：让「给我一个满足指标的版图」成为可执行的编译过程，每次修改可回滚、可验证，验证不通过绝不报假通过。",
      contribution:
        "版图是模拟芯片自动化最难啃的一段。这个方向探索的是：当 Agent 真正开始动版图时，编辑、验证、回滚的工程底座应该长什么样。",
      chips: ["模拟版图", "AI Agent", "验证驱动", "自动化"],
      highlights: ["可回滚编辑", "验证驱动", "人机同一接口"],
      links: [
        { label: "在线介绍", href: "https://kairos2425.github.io/layout-canvas/" },
        { label: "项目详情", href: "projects/layout-canvas.html" },
      ],
      progress: { pct: 30, label: "公开介绍站点已上线，编译器原型持续开发" },
    },
    {
      title: "面向半导体器件仿真的大语言模型智能体",
      more: true,
      category: "Simulation Agent",
      status: "进行中",
      fx: "iv",
      image: "assets/showcase/simulation-agent-poster.png",
      alt: "Simulation Agent 产品海报图",
      detailUrl: "projects/simulation-agent.html",
      summary:
        "探索 LLM 在器件仿真中的能力边界，让工程师的描述直接进入物理建模、结果对比与分析解读。目标是让 Agent 更好地理解工程师的物理意图，辅助组织仿真任务和结果审阅。",
      contribution:
        "正在开发基于大语言模型的仿真 Agent 交互方向，重点探索物理机制、工程意图与结果表达之间的精准翻译。",
      chips: ["LLM", "Prompt Engineering", "COMSOL API", "FEM"],
      highlights: ["描述式交互", "仿真任务组织", "结果解释视图"],
      links: [
        { label: "项目详情", href: "projects/simulation-agent.html" },
      ],
      progress: { pct: 45, label: "从描述到受控仿真的翻译层已在工作台落地" },
    },
    {
      title: "半导体工程效率知识库与计算器",
      more: true,
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
      more: true,
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
      more: true,
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
      name: "HCI Reliability SaaS",
      en: "HCI Reliability SaaS",
      badge: "Web · 内测中",
      fx: "aging",
      tagline: "HCI 应力数据：浏览器里上传即分析，报告直接下载",
      summary:
        "把可靠性分析引擎做成浏览器可用的内测服务：多文件混合上传、自动识别格式与配对关系，退化画像、寿命模型评估与资格报告一键产出，全程审计留痕。",
      features: [
        "多格式自动识别与应力/量测配对",
        "工作区数据隔离，不可变账本",
        "Excel / PPT 资格报告一键下载",
      ],
      usecases:
        "器件领域应用：产线与客户工程师无需安装软件，上传应力数据即可获得退化画像与寿命评估（诊断级参考，非签核依据）。",
      links: [
        { label: "申请内测", href: "#contact-me" },
      ],
      access: "内测版，访问口令请联系作者获取。",
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
    title: "能力版图与成熟度",
    intro:
      "下面按环节列出目前能做什么、做到哪一步。成熟度按实际情况标注，没做完的不写成做完。",
    metrics: [
      { value: "可靠性×AI", label: "核心方向", note: "器件可靠性与数字设计智能体两条线" },
      { value: "HCI·BTI·TDDB·EM", label: "可靠性场景", note: "覆盖主流失效机理" },
      { value: "物理+ML", label: "寿命预测", note: "加速模型做骨干，带不确定度" },
      { value: "描述即任务", label: "驱动方式", note: "中文描述即可发起任务" },
      { value: "全程留痕", label: "证据链", note: "每个结论可追溯可审计" },
      { value: "桌面+Web", label: "交付形态", note: "离线工具与内测服务并行" },
    ],
    pipeline: [
      { name: "器件仿真执行", status: "已可用", tone: "ok", pct: 100, note: "多求解器受控调用，结果可复核" },
      { name: "可靠性数据分析", status: "已可用", tone: "ok", pct: 90, note: "机台数据入库、退化画像、统计分布" },
      { name: "数字芯片设计智能体", status: "产品化中", tone: "run", pct: 45, note: "规格到电路再到验证的自动闭环" },
      { name: "寿命预测", status: "产品化中", tone: "run", pct: 65, note: "物理约束 ML，带不确定度与适用范围" },
      { name: "报告与交付自动化", status: "已可用", tone: "ok", pct: 85, note: "认证报告预审 + 报告一键生成" },
      { name: "AI 编排与 Agent", status: "演进中", tone: "run", pct: 50, note: "从一句话到受控执行的完整链路" },
      { name: "公开基准与知识库", status: "筹备中", tone: "info", pct: 30, note: "让能力可客观评分、可公开复用" },
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
      body: "记录从需求描述到物理建模、边界条件、求解器调用和结果校验的探索过程。",
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
    {
      tag: "Chip Agent",
      title: "数字 IC 设计智能体",
      body: "探索规格驱动的数字电路自动设计：模型生成电路与验证环境，独立判卷保证结果可信——对标开源 agentic EDA 的公开基准。",
    },
  ],

  contact: {
    title: "欢迎就器件可靠性、仿真自动化和厂内 AI 落地交流合作。",
    actionLabel: "发送邮件",
    actionHref: "mailto:akstar2425@gmail.com",
    items: [
      "Email: akstar2425@gmail.com",
      "Email: lixd@alumni.pku.edu.cn",
      "小红书：Kstar（分享半导体可靠性与 AI 相关见解）",
    ],
  },
};
