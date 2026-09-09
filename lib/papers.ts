export type PaperRecord = {
  slug: 'dreamzero' | 'fast-wam';
  index: string;
  name: string;
  title: string;
  subtitle: string;
  accent: 'blue' | 'orange';
  question: string;
  answer: string;
  route: string[];
  meta: Array<[string, string]>;
  metrics: Array<{ value: string; label: string; note: string }>;
  mechanism: Array<{ title: string; body: string }>;
  evidence: Array<{ title: string; body: string }>;
  caveats: string[];
  reproduction: Array<[string, string]>;
  verdict: string;
  nextQuestions: string[];
  sources: Array<{ label: string; href: string; note: string }>;
};

export const papers: Record<PaperRecord['slug'], PaperRecord> = {
  dreamzero: {
    slug: 'dreamzero',
    index: '01',
    name: 'DreamZero',
    title: 'World Action Models are Zero-shot Policies',
    subtitle: '把生成未来留在闭环策略里：一个 14B 视频扩散模型如何直接成为机器人控制器。',
    accent: 'blue',
    question: '大规模视频生成模型能否不只“看懂”动作，而是直接产出可执行动作？',
    answer:
      '作者给出的答案是可以：DreamZero 在同一自回归扩散模型里联合预测未来视频与动作，把视频当成稠密的物理状态表示。',
    route: ['当前观察 + 指令', '自回归未来视频', '联合动作预测', '闭环执行'],
    meta: [
      ['版本', 'arXiv v1 · 2026-02-17'],
      ['作者', 'Seonghyeon Ye 等 36 人'],
      ['机构', 'NVIDIA'],
      ['状态', '预印本；页面未标注同行评审 venue'],
    ],
    metrics: [
      {
        value: '14B / 7 Hz',
        label: '模型与闭环频率',
        note: '论文与项目页的作者报告；项目页同时给出约 150 ms/action chunk。',
      },
      {
        value: '62.2 vs 27.4',
        label: 'AgiBot 平均任务进度',
        note: '作者项目页对 DreamZero 与最佳预训练 VLA 基线的比较。',
      },
      {
        value: '+42%+',
        label: '跨 embodiment 相对提升',
        note: '来自 10–20 分钟人类或其他机器人 video-only demonstrations。',
      },
    ],
    mechanism: [
      {
        title: '从视频先验出发',
        body: '基于预训练视频 diffusion backbone，让模型先拥有视觉动力学先验，再接入异构机器人数据。公开代码说明其基础模型为 Wan2.1-I2V-14B-480P。',
      },
      {
        title: '视频与动作联合生成',
        body: '未来帧不是旁路监督，而与动作共同位于生成路径中；这正是 DreamZero 属于强耦合 WAM 的关键。',
      },
      {
        title: '系统级闭环优化',
        body: '作者通过少步扩散、异步推理与 action chunk smoothing，把原本昂贵的视频生成模型压入实时控制回路。',
      },
    ],
    evidence: [
      {
        title: '异构机器人数据上的泛化',
        body: '作者在 AgiBot 与 DROID 设置中测试已见/未见任务、未见物体与环境；项目页称未见任务的整体进度显著超过所比较的 VLA。',
      },
      {
        title: '跨 embodiment 视频迁移',
        body: '只加入少量其他机器人或人类视频，也能提升目标机器人上的未见任务表现，说明视频监督可能绕开部分动作空间差异。',
      },
      {
        title: '少样本新机器人适配',
        body: '项目页报告用 30 分钟 play data（55 条轨迹）适配 YAM，并保留对新物体的语言条件泛化。',
      },
    ],
    caveats: [
      '“zero-shot”针对论文设定中的未见任务、对象或环境；模型本身仍接受过大规模视频与机器人数据训练，不能理解为零数据机器人学习。',
      '7 Hz 是论文/项目页展示的优化部署路径。公开仓库当前 README 另报 DiT cache 后约 0.6 s（GB200）与约 3 s（H100），硬件、实现与计时口径不同，不应直接等同。',
      '核心性能数字来自作者团队的预印本和项目页；需要等待独立复现、统一硬件成本与公平的数据规模对照。',
      '显式视频生成带来可观察的未来，但“画面合理”并不自动等于接触动力学正确或动作安全。',
    ],
    reproduction: [
      ['开放程度', '训练/微调/评测代码、DROID/AgiBot checkpoints 与预处理 DROID 数据已公开'],
      ['许可', 'Apache-2.0（代码仓库）'],
      ['基础依赖', 'Wan2.1-I2V-14B-480P、umt5-xxl、Python 3.11、CUDA 12.9+'],
      ['计算门槛', '仓库注明分布式推理至少 2 张 GPU，测试环境为 GB200/H100'],
      ['RoboOpus 状态', '资料核验完成；尚未在本地或云端复现'],
    ],
    verdict:
      'DreamZero 最重要的贡献不是“生成视频很好看”，而是证明大视频模型的动态先验可以被压进真实机器人闭环。它抬高了泛化上限，也把计算成本、动作安全与独立复现变成不可回避的问题。',
    nextQuestions: [
      '把未来视频替换成更紧凑的 latent、flow 或接触状态，能否保留同等泛化？',
      '哪些任务真的需要逐步显式想象，哪些任务只需要训练期世界建模？',
      '跨 embodiment 增益来自视觉动力学、语言语义，还是数据覆盖面的扩大？',
    ],
    sources: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.15922', note: '题名、作者、摘要、版本' },
      { label: 'Project', href: 'https://dreamzero0.github.io/', note: '方法、实验展示与部署口径' },
      { label: 'Code', href: 'https://github.com/dreamzero0/dreamzero', note: '代码、权重、数据与运行要求' },
    ],
  },
  'fast-wam': {
    slug: 'fast-wam',
    index: '02',
    name: 'Fast-WAM',
    title: 'Do World Action Models Need Test-time Future Imagination?',
    subtitle: '保留训练期世界建模，部署时跳过未来生成：WAM 的价值可能首先来自表示学习。',
    accent: 'orange',
    question: 'WAM 的收益究竟来自训练期视频共训，还是推理期真的把未来画出来？',
    answer:
      'Fast-WAM 的受控变体支持前一种解释：保留 video co-training、推理时只看当前帧，动作表现仍有竞争力，而延迟显著下降。',
    route: ['当前观察 + 指令', '世界表征', 'Action Expert', '直接执行'],
    meta: [
      ['版本', 'arXiv v2 · 2026-03-23'],
      ['作者', 'Tianyuan Yuan, Zibin Dong, Yicheng Liu, Hang Zhao'],
      ['机构', '清华大学 IIIS · Galaxea AI'],
      ['状态', '预印本；页面未标注同行评审 venue'],
    ],
    metrics: [
      {
        value: '190 ms',
        label: '论文推理延迟',
        note: '作者项目页口径：单张 RTX 5090D V2 32GB。',
      },
      {
        value: '91.8',
        label: 'RoboTwin 2.0 平均分',
        note: '作者报告；不使用 embodied pretraining。',
      },
      {
        value: '97.6',
        label: 'LIBERO 平均成功率',
        note: '作者项目页初始论文结果；40 个任务的四套件平均。',
      },
    ],
    mechanism: [
      {
        title: '训练时保留世界监督',
        body: 'Wan2.2-5B video DiT 与 1B action expert 在共享注意力架构中联合学习视频建模和动作预测。',
      },
      {
        title: '用 mask 做受控拆分',
        body: '结构化 attention mask 把“视频共训”与“推理期未来生成”拆成可比较因素，避免只比较两个完全不同的系统。',
      },
      {
        title: '推理只走第一帧路径',
        body: '部署时只保留当前观察的 clean latent tokens，视频 backbone 前向一次后直接生成动作，不执行迭代未来视频去噪。',
      },
    ],
    evidence: [
      {
        title: '移除视频共训损失更大',
        body: 'RoboTwin 平均分从 91.8 降至 83.8；LIBERO 从 97.6 降至 93.5。它比跳过推理期想象带来的差异更明显。',
      },
      {
        title: '显式想象不是免费午餐',
        body: '作者项目页报告 Fast-WAM 为 190 ms，而 Fast-WAM-IDM 为 810 ms；论文摘要据此给出相对现有 imagine-then-execute WAM 超过 4× 的加速。',
      },
      {
        title: '模拟与真实任务覆盖',
        body: '评测包含 LIBERO、RoboTwin 2.0，以及 Galaxea R1 Lite 的真实毛巾折叠，尝试覆盖标准 benchmark 与长时程柔性物体操作。',
      },
    ],
    caveats: [
      '“不需要 test-time imagination”是当前实验条件下的结论，不代表候选动作搜索、风险预演或长时程规划中的显式未来没有价值。',
      '190 ms 是论文快照。代码仓库后续优化另报约 110 ms（RTX 4090）与 210 ms（H20）；模型版本、硬件与计时口径变了，应与论文结果分栏记录。',
      '不同基线可能使用不同 embodied pretraining、backbone、数据与算力；排行榜数字不能替代受控消融。',
      '项目页明确称其为基于当前手稿与图表生成的初始页面，核心结论仍需独立复现。',
    ],
    reproduction: [
      ['开放程度', '训练/评测代码、LIBERO/RoboTwin 数据与 released checkpoints 已公开'],
      ['模型结构', 'Wan2.2-5B video DiT + 1B action expert'],
      ['软件环境', 'Python 3.10；README 固定 PyTorch 2.7.1 + CUDA 12.8'],
      ['后续更新', '原仓库现支持 LeRobot 2.1/3.0 与 Optional IDM 双推理模式'],
      ['RoboOpus 状态', '资料核验完成；尚未复现实验结果'],
    ],
    verdict:
      'Fast-WAM 把一个很容易被宏大叙事掩盖的问题变成可测的工程假设：世界模型也许首先是一种训练信号，而非部署时必须运行的模拟器。它不是 DreamZero 的否定，而是给 WAM 增加了一条更轻的产品化路线。',
    nextQuestions: [
      '怎样根据任务不确定性，在 direct action 与显式 imagination 之间动态切换？',
      '训练期 video loss 的哪一部分真正改善动作：几何、语义、接触还是时间一致性？',
      '在同一硬件、同一数据与同一 backbone 下，精度—延迟—能耗曲线如何变化？',
    ],
    sources: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2603.16666', note: '题名、作者、摘要、版本' },
      { label: 'Project', href: 'https://yuantianyuan01.github.io/FastWAM/', note: '架构、表格与论文延迟口径' },
      { label: 'Code', href: 'https://github.com/yuantianyuan01/FastWAM', note: '复现流程与论文后更新' },
    ],
  },
};

export const paperList = [papers.dreamzero, papers['fast-wam']];
