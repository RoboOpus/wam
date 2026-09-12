export type LandscapeEntry = {
  title: string;
  kind: string;
  status: string;
  note: string;
  href?: string;
};

export type LandscapeSection = {
  id: string;
  index: string;
  title: string;
  english: string;
  description: string;
  entries: LandscapeEntry[];
};

const scopeDocument =
  'https://github.com/RoboOpus/wam/blob/main/content/00-WAM%E8%8C%83%E5%9B%B4%E4%B8%8E%E5%88%86%E7%B1%BB.md';

export const landscapeSections: LandscapeSection[] = [
  {
    id: 'scope',
    index: '01',
    title: '定义与边界',
    english: 'Scope',
    description: '明确什么进入 WAM，什么只是相邻的 VLA、视频生成或通用世界模型。',
    entries: [
      {
        title: 'WAM 核心纳入标准',
        kind: '规则',
        status: '已编目',
        note: '未来状态、潜在动力学或可预测环境信号，必须进入动作生成、评分、训练或安全约束。',
        href: scopeDocument,
      },
      {
        title: '与 VLA / World Model 的关系',
        kind: '边界',
        status: '已编目',
        note: '采用 core、precursor、world-model-for-policy、adjacent、excluded 五类关系标签。',
        href: scopeDocument,
      },
      {
        title: '三条分类轴',
        kind: '分类',
        status: '已编目',
        note: '耦合方式、预测载体、世界信号用途共同定位一个方法，而不是只按论文自称分类。',
        href: `${scopeDocument}#%E4%B8%89%E6%9D%A1%E4%B8%BB%E5%88%86%E7%B1%BB%E8%BD%B4`,
      },
      {
        title: '内容成熟度',
        kind: '治理',
        status: '已编目',
        note: 'candidate → verified → reviewed → reproduced，机器发现不能直接升级为知识结论。',
        href: 'https://github.com/RoboOpus/wam/blob/main/PROJECT_NOTES.md#%E5%86%85%E5%AE%B9%E7%8A%B6%E6%80%81',
      },
    ],
  },
  {
    id: 'timeline',
    index: '02',
    title: '发展时间线',
    english: 'Timeline',
    description: '从视觉预测、潜在动力学到联合视频—动作建模，保留关键脉络。',
    entries: [
      {
        title: 'Deep Visual Foresight for Planning Robot Motion',
        kind: '2016 · 视觉预测',
        status: '前置脉络',
        note: '以预测未来图像支持机器人动作规划，是显式视觉想象路线的重要早期节点。',
        href: 'https://arxiv.org/abs/1610.00696',
      },
      {
        title: 'World Models',
        kind: '2018 · 世界模型',
        status: '前置脉络',
        note: '把环境压缩为可学习的潜在动力学，为后续潜空间想象建立经典范式。',
        href: 'https://arxiv.org/abs/1803.10122',
      },
      {
        title: 'PlaNet',
        kind: '2018 · 潜在规划',
        status: '前置脉络',
        note: '从像素学习潜在动力学，并在潜空间中进行规划。',
        href: 'https://arxiv.org/abs/1811.04551',
      },
      {
        title: 'MuZero',
        kind: '2019 · 任务相关动力学',
        status: '前置脉络',
        note: '不重建完整观测，直接学习适合规划的价值、策略与动力学表征。',
        href: 'https://arxiv.org/abs/1911.08265',
      },
      {
        title: 'Dreamer',
        kind: '2019 · 潜在想象',
        status: '前置脉络',
        note: '在学习到的潜在动态中想象轨迹并学习行为。',
        href: 'https://arxiv.org/abs/1912.01603',
      },
      {
        title: 'TD-MPC',
        kind: '2022 · 控制',
        status: '前置脉络',
        note: '把任务导向的潜在模型、价值学习与模型预测控制结合。',
        href: 'https://arxiv.org/abs/2203.04955',
      },
      {
        title: 'DreamerV3',
        kind: '2023 · 通用世界模型',
        status: '前置脉络',
        note: '展示单一世界模型算法跨不同领域与任务的适应能力。',
        href: 'https://arxiv.org/abs/2301.04104',
      },
    ],
  },
  {
    id: 'methods',
    index: '03',
    title: '架构与技术路线',
    english: 'Architectures',
    description: '按耦合方式、预测载体和世界信号用途组织技术路线，而非只按模型名罗列。',
    entries: [
      {
        title: 'Cascaded / 级联式',
        kind: '耦合方式',
        status: '已编目',
        note: '先产生未来、轨迹或中间表示，再交给独立策略或控制器解码动作。',
        href: scopeDocument,
      },
      {
        title: 'Joint / 联合式',
        kind: '耦合方式',
        status: '已编目',
        note: '视频或状态预测与动作生成共享模型、表征或训练目标。',
        href: scopeDocument,
      },
      {
        title: 'Render-and-Decode',
        kind: '预测载体',
        status: '已编目',
        note: '显式生成可见未来，再从生成结果提取动作或控制信号。',
        href: scopeDocument,
      },
      {
        title: 'Latent-Only',
        kind: '预测载体',
        status: '已编目',
        note: '在潜变量或特征空间建模环境变化，不要求渲染可见视频。',
        href: scopeDocument,
      },
      {
        title: 'Video-Generation-Free',
        kind: '预测载体',
        status: '持续更新',
        note: '保留视频预测的训练信号，但在部署时绕过或移除显式视频生成。',
        href: scopeDocument,
      },
      {
        title: 'Planning / Feature / Auxiliary',
        kind: '信号用途',
        status: '已编目',
        note: '区分想象后执行、视频特征条件、联合预测与辅助训练等作用位置。',
        href: scopeDocument,
      },
    ],
  },
  {
    id: 'papers',
    index: '04',
    title: '论文与前沿雷达',
    english: 'Papers',
    description: '经典路线、近期候选和已核验精读分层管理。',
    entries: [
      {
        title: 'WAM 论文总览',
        kind: '结构索引',
        status: '已编目',
        note: '28 篇已核验种子，按基础、级联、联合、效率前沿与综述分组。',
        href: '/wam/papers/',
      },
      {
        title: '经典论文阅读路线',
        kind: '路线图',
        status: '已编目',
        note: '从 World Model 基础、早期机器人视频规划走向近期联合 WAM。',
        href: 'https://github.com/RoboOpus/wam/blob/main/content/papers/01-%E7%BB%8F%E5%85%B8%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB%E8%B7%AF%E7%BA%BF.md',
      },
      {
        title: '每日 arXiv Radar',
        kind: '自动发现',
        status: '持续更新',
        note: '每天北京时间 08:00 搜索并排序；结果只进入候选队列。',
        href: '/wam/radar/',
      },
      {
        title: '2026 arXiv 前沿论文池',
        kind: '候选池',
        status: '待核验',
        note: '保留候选题名、作者、日期、分类与原始来源链接。',
        href: 'https://github.com/RoboOpus/wam/blob/main/content/papers/02-2026-arXiv%E5%89%8D%E6%B2%BF%E8%AE%BA%E6%96%87.md',
      },
      {
        title: 'DreamZero',
        kind: '论文卡',
        status: '已精读',
        note: '显式生成未来并联合预测动作的代表样例。',
        href: '/wam/papers/dreamzero/',
      },
      {
        title: 'Fast-WAM',
        kind: '论文卡',
        status: '已精读',
        note: '视频共训、部署时移除显式生成路径的代表样例。',
        href: '/wam/papers/fast-wam/',
      },
    ],
  },
  {
    id: 'benchmarks',
    index: '05',
    title: 'Benchmark 与数据',
    english: 'Benchmarks',
    description: '区分策略评测、世界模型评测、训练数据与评测基础设施。',
    entries: [
      {
        title: 'LIBERO',
        kind: 'Benchmark',
        status: '已索引',
        note: '面向终身学习、迁移与多任务机器人操作的任务套件。',
        href: 'https://github.com/Lifelong-Robot-Learning/LIBERO',
      },
      {
        title: 'CALVIN',
        kind: 'Benchmark',
        status: '已索引',
        note: '语言条件下的长时序机器人操作评测环境。',
        href: 'https://github.com/mees/calvin',
      },
      {
        title: 'RLBench',
        kind: 'Benchmark',
        status: '已索引',
        note: '建立在 CoppeliaSim 上的大规模机器人学习任务与环境。',
        href: 'https://github.com/stepjam/RLBench',
      },
      {
        title: 'DROID',
        kind: '真实数据',
        status: '已索引',
        note: '面向通用机器人操作的大规模、多场景真实机器人数据入口。',
        href: 'https://github.com/droid-dataset/droid',
      },
      {
        title: 'Open X-Embodiment',
        kind: '数据集合',
        status: '已索引',
        note: '跨数据集、跨机器人本体的开放数据与模型生态入口。',
        href: 'https://github.com/google-deepmind/open_x_embodiment',
      },
      {
        title: 'BridgeData V2',
        kind: '真实数据',
        status: '已索引',
        note: '支持通用机器人操作学习的多任务真实数据资源。',
        href: 'https://github.com/rail-berkeley/bridge_data_v2',
      },
      {
        title: 'RoboTwin 2.0',
        kind: '仿真与基准',
        status: '已索引',
        note: '面向可扩展双臂数据生成与具身智能评测的开放平台。',
        href: 'https://github.com/RoboTwin-Platform/RoboTwin',
      },
      {
        title: 'RoboDojo',
        kind: '仿真—真机基准',
        status: '已索引',
        note: '统一 42 个仿真任务与 18 个真机任务，从泛化、记忆、精度、长时序和开放指令五个维度评测通用操作策略。',
        href: 'https://github.com/RoboDojo-Benchmark/RoboDojo',
      },
      {
        title: 'RoboWM-Bench',
        kind: '世界模型基准',
        status: '已索引',
        note: '把生成的操作视频转换为动作并在仿真中执行，检查视觉未来是否具有具身可执行性。',
        href: 'https://github.com/fffstrong/RoboWM-Bench',
      },
    ],
  },
  {
    id: 'opensource',
    index: '06',
    title: '开源模型与工具',
    english: 'Open Source',
    description: '聚合可运行代码、训练框架、模型权重和数据工具链。',
    entries: [
      {
        title: 'DreamZero',
        kind: 'WAM 实现',
        status: '已索引',
        note: '论文官方训练、推理与模型资源入口。',
        href: 'https://github.com/dreamzero0/dreamzero',
      },
      {
        title: 'Fast-WAM',
        kind: 'WAM 实现',
        status: '已索引',
        note: '训练时视频—动作共建模、快速动作推理的官方实现。',
        href: 'https://github.com/yuantianyuan01/FastWAM',
      },
      {
        title: 'OpenWAM',
        kind: 'WAM 框架',
        status: '已索引',
        note: '用于探索视频—动作世界模型组件的开放模块化框架。',
        href: 'https://github.com/OpenWAM-Official/OpenWAM',
      },
      {
        title: 'OpenVLA',
        kind: 'VLA 基线',
        status: '相邻基础',
        note: '开放的 VLA 训练、微调和机器人操作评测代码基线。',
        href: 'https://github.com/openvla/openvla',
      },
      {
        title: 'Octo',
        kind: '通用策略',
        status: '相邻基础',
        note: '从多样机器人轨迹训练的开放通用机器人策略。',
        href: 'https://github.com/octo-models/octo',
      },
      {
        title: 'LeRobot',
        kind: '工具链',
        status: '相邻基础',
        note: '覆盖数据、模型、训练和真实机器人部署的开放机器人学习工具链。',
        href: 'https://github.com/huggingface/lerobot',
      },
      {
        title: 'robomimic',
        kind: '训练框架',
        status: '相邻基础',
        note: '模块化机器人示范学习与基线复现实验框架。',
        href: 'https://github.com/ARISE-Initiative/robomimic',
      },
      {
        title: 'XPolicyLab',
        kind: '评测基础设施',
        status: '已索引',
        note: '以统一策略适配器连接 RoboDojo、RoboTwin 和真机部署，减少策略与环境之间的重复集成。',
        href: 'https://github.com/XPolicyLab/XPolicyLab',
      },
    ],
  },
  {
    id: 'ecosystem',
    index: '07',
    title: '团队与生态入口',
    english: 'Ecosystem',
    description: '连接研究团队、维护中的列表与社区知识入口。',
    entries: [
      {
        title: 'OpenMOSS / Awesome-WAM',
        kind: '专题索引',
        status: '参考来源',
        note: '覆盖定义、架构、数据、评测、挑战与论文资源的 WAM 索引。',
        href: 'https://github.com/OpenMOSS/Awesome-WAM',
      },
      {
        title: 'Awesome World Action Models',
        kind: '专题索引',
        status: '参考来源',
        note: '按渲染、潜在、特征和几何等表征路径组织 WAM 项目。',
        href: 'https://github.com/world-action-models/awesome-world-action-models',
      },
      {
        title: 'World Models for Robots',
        kind: '专题索引',
        status: '参考来源',
        note: '面向机器人世界模型论文、项目与相关资源的社区列表。',
        href: 'https://github.com/operator22th/awesome-world-models-for-robots',
      },
      {
        title: 'Xbotics Embodied Guide',
        kind: '社区指南',
        status: '参考来源',
        note: '具身智能学习路线、论文与工程资源入口。',
        href: 'https://github.com/Xbotics-Embodied-AI-club/Xbotics-Embodied-Guide',
      },
      {
        title: 'Embodied AI Guide',
        kind: '社区指南',
        status: '参考来源',
        note: '机器人学习与具身智能资料的中文索引入口。',
        href: 'https://github.com/TianxingChen/Embodied-AI-Guide',
      },
    ],
  },
  {
    id: 'learning',
    index: '08',
    title: '综述、教程与访谈',
    english: 'Learning',
    description: '把综述、课程、教程和观点材料放到同一学习路径中。',
    entries: [
      {
        title: 'World Model for Robot Learning',
        kind: '综述',
        status: '已索引',
        note: '机器人学习世界模型的系统性综述入口。',
        href: 'https://arxiv.org/abs/2605.00080',
      },
      {
        title: 'World Action Models: A Survey',
        kind: '综述',
        status: '已索引',
        note: '聚焦 World Action Model 定义、架构与研究挑战。',
        href: 'https://arxiv.org/abs/2606.20781',
      },
      {
        title: 'World Action Models: The Next Frontier',
        kind: '综述',
        status: '已索引',
        note: '从生成世界模型走向具身动作建模的研究视角。',
        href: 'https://arxiv.org/abs/2605.12090',
      },
      {
        title: 'World Action Models: A Concise Tutorial',
        kind: '教程',
        status: '已索引',
        note: '面向概念、训练和推理机制的紧凑教程入口。',
        href: 'https://arxiv.org/abs/2607.00836',
      },
      {
        title: 'Vision-Language-Action Datasets Survey',
        kind: '数据综述',
        status: '已索引',
        note: '从 VLA 数据角度补齐数据组成、质量与评测维度。',
        href: 'https://arxiv.org/abs/2604.23001',
      },
      {
        title: '访谈与观点材料',
        kind: '观点层',
        status: '待扩展',
        note: '后续单列作者访谈、研究讲座与高质量讨论，并与论文事实分开呈现。',
      },
      {
        title: '中文教程与复现笔记',
        kind: '教程层',
        status: '待扩展',
        note: '优先建立概念、公式、代码和实验结果可互相定位的教程索引。',
      },
    ],
  },
  {
    id: 'settings',
    index: '09',
    title: '机器人场景与硬件',
    english: 'Settings',
    description: '观察操作、移动、具身平台与传感配置对 WAM 的约束。',
    entries: [
      {
        title: '固定基座操作',
        kind: '场景',
        status: '基础覆盖',
        note: '单臂、双臂、桌面任务与接触操作，是当前论文和基准最密集的入口。',
      },
      {
        title: '移动操作',
        kind: '场景',
        status: '待扩展',
        note: '同时建模底盘、机械臂、视角变化和长时序任务。',
      },
      {
        title: '人形与全身控制',
        kind: '场景',
        status: '待扩展',
        note: '关注全身动力学、平衡、双手协同与高维动作空间。',
      },
      {
        title: '导航与移动机器人',
        kind: '场景',
        status: '待扩展',
        note: '连接视频预测、空间记忆、规划和闭环纠错。',
      },
      {
        title: '自动驾驶',
        kind: '相邻领域',
        status: '借鉴入口',
        note: '借鉴生成式世界模型、闭环仿真和多主体未来预测，但与机器人操作分开标注。',
      },
      {
        title: '触觉与多模态传感',
        kind: '硬件轴',
        status: '待扩展',
        note: '记录视觉、深度、力矩、触觉与本体感觉如何改变世界状态建模。',
      },
    ],
  },
  {
    id: 'questions',
    index: '10',
    title: '开放问题与 Idea',
    english: 'Questions',
    description: '把尚未解决的问题变成可追踪的研究议程，而不是散落的灵感。',
    entries: [
      {
        title: '显式想象何时真正必要？',
        kind: '核心问题',
        status: '研究议程',
        note: '需要按任务时长、接触复杂度、算力预算和候选动作评估需求拆分回答。',
      },
      {
        title: '应该预测像素、潜变量还是几何？',
        kind: '表征问题',
        status: '研究议程',
        note: '比较可解释性、控制充分性、误差累积和计算开销。',
      },
      {
        title: '世界预测与动作预测如何耦合？',
        kind: '架构问题',
        status: '研究议程',
        note: '联合参数不等于联合因果，需要辨别共享表征与真实控制收益。',
      },
      {
        title: '预测指标是否对应任务成功率？',
        kind: '评测问题',
        status: '研究议程',
        note: '视频质量、潜在一致性与闭环控制效果之间仍缺少统一桥梁。',
      },
      {
        title: '如何满足实时控制预算？',
        kind: '系统问题',
        status: '研究议程',
        note: '延迟、动作频率、滚动预测长度和硬件配置需要共同报告。',
      },
      {
        title: '如何跨机器人本体迁移？',
        kind: '泛化问题',
        status: '研究议程',
        note: '研究动作空间、传感器布局和动力学差异下可复用的世界知识。',
      },
      {
        title: '世界模型能否提高安全性？',
        kind: '安全问题',
        status: '研究议程',
        note: '区分用于风险预判、约束候选动作与生成失败解释的不同路径。',
      },
    ],
  },
];

export const landscapeOverview = landscapeSections.map(({ entries, ...section }) => ({
  ...section,
  entryCount: entries.length,
}));

export const landscapeEntryCount = landscapeSections.reduce(
  (sum, section) => sum + section.entries.length,
  0,
);
