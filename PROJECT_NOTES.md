# RoboOpus WAM 项目记录

World Action Model（WAM）轻量知识库种子工程。

## 发布约束

- GitHub 普通仓库：`RoboOpus/wam`
- 项目站：`https://roboopus.github.io/wam/`
- 禁止目标：不创建、不修改、不部署 `RoboOpus/RoboOpus.github.io`
- 当前状态：WAM 一级领域地图、28 篇种子论文总览、两篇精读样例与 arXiv Radar 已完成；候选池每日增量更新

## 当前目标

当前阶段采用“先广度、后深度”，先把五件事做正确：

1. 形成可执行的 WAM 纳入标准，避免把普通 VLA、纯视频生成器和通用模拟器混为一谈。
2. 建立定义、时间线、方法、论文、数据、开源生态、学习材料、机器人场景和开放问题等十个一级入口。
3. 用多条 taxonomy 交叉组织论文，而不是形成单轴列表。
4. 建立 World Model → 早期 WAM → 近期 WAM 的阅读路线。
5. 把人工精选内容和机器可读元数据同时保存，并以候选池承接 arXiv 日更。

## 内容入口

- [WAM 范围、边界与分类](content/00-WAM范围与分类.md)
- [WAM 一级领域地图](content/01-一级领域地图.md)
- [WAM 论文总览](https://roboopus.github.io/wam/papers/)
- [经典论文阅读路线](content/papers/01-经典论文阅读路线.md)
- [2026 arXiv 前沿论文池](content/papers/02-2026-arXiv前沿论文.md)
- [arXiv 雷达工作流](content/papers/03-arXiv雷达工作流.md)
- [机器可读论文种子](data/papers.seed.yaml)
- [机器生成候选池](data/arxiv/papers.json)

## 内容状态

每篇论文使用四级状态：

- `candidate`：自动或人工发现，尚未完成元数据核验。
- `verified`：标题、作者、日期、arXiv/项目/代码链接已核对。
- `reviewed`：已读论文并完成结构化论文卡。
- `reproduced`：已运行官方代码或独立实现，记录环境、结果和偏差。

DreamZero 与 Fast-WAM 已完成结构化精读页；两者均尚未完成独立复现。其他 Markdown 条目仍以元数据核验和阅读路线为主。

## 来源原则

事实优先级：

1. 论文正式页面、arXiv、OpenReview、会议论文集；
2. 作者项目页和官方代码仓库；
3. 综述及其维护仓库；
4. Awesome 列表、媒体、访谈和社交平台讨论。

二手来源只用于发现和观点补充。关键性能数字、训练数据规模、硬件成本和开源状态必须回到第一或第二级来源核验。

## 下一步

接下来优先做一级仓库的工程化工作：

- 为 10 个板块增加统一字段、来源级别与交叉标签；
- 增加链接检查、内容 schema 校验和覆盖度统计；
- 补齐 Benchmark、数据、开源实现、团队和学习材料的广度；
- 建立“场景 × 方法 × 数据 × 评测”的关联关系；
- 候选元数据可以自动更新；升级为 `reviewed` 或正式知识页仍需人工核验；
- 在一级入口稳定前，不以连续新增论文精读作为主要进度指标。
