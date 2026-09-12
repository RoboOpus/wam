# WAM · RoboOpus Research Index

RoboOpus 的 World Action Model 领域地图。项目先建立定义、时间线、方法、论文、数据、代码、生态和开放问题等一级入口，再逐步建立“自动发现、人工核验、可追溯发布”的知识流水线。

当前采用三层深度：L1 领域地图、L2 结构索引、L3 精读与复现。DreamZero 和 Fast-WAM 是 L3 的两个结构样例，不再承担首页的主叙事。

目标项目站：<https://roboopus.github.io/wam/>  
目标仓库：<https://github.com/RoboOpus/wam>

本项目不会创建、修改或部署 `RoboOpus/RoboOpus.github.io`。

## 当前页面

- WAM 领域地图：10 个一级板块、65 个首批索引位
- WAM 论文总览：28 篇已核验种子、5 条阅读路线和 2 个精读样例
- arXiv Radar：每日增量发现、相关度排序和人工审阅入口
- 首页：领域入口、自动雷达和精读样例的总导航
- DreamZero：方法路径、作者报告证据、限制与复现快照
- Fast-WAM：训练/推理解耦、受控消融、限制与复现快照

每篇知识页都区分：

1. 论文与项目页中的可核验事实；
2. 作者团队报告的结果和主张；
3. RoboOpus 的编辑判断；
4. 尚未完成的独立复现。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

本地地址为 `http://localhost:3000/wam/`。

手动刷新 arXiv 候选池：

```bash
npm run papers:fetch
```

脚本只保存题名、作者、日期、分类和来源链接，不复制摘要；已有人工审阅状态会在后续增量更新中保留。

## 构建与发布

```bash
npm run lint
npm run build
```

`vinext build` 使用 `output: "export"` 生成纯静态站到 `dist/client/`，随后 `postbuild` 会整理 `/wam` 静态资源和目录路由。推送到 `main` 后，GitHub Actions 会把该目录部署为 `/wam/` 项目站。

`Refresh arXiv Radar` 工作流每天北京时间 08:00 运行。只有候选数据发生变化时才提交并重新部署；所有新条目默认标记为 `candidate`，不会自动升级为已核验知识。

首次创建仓库后，需要在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。

## 内容资料

- [WAM 范围、边界与分类](content/00-WAM范围与分类.md)
- [WAM 一级领域地图](content/01-一级领域地图.md)
- [WAM 论文总览](https://roboopus.github.io/wam/papers/)
- [评测与数据版图](content/benchmarks/00-评测与数据版图.md)
- [经典论文阅读路线](content/papers/01-经典论文阅读路线.md)
- [2026 arXiv 前沿论文池](content/papers/02-2026-arXiv前沿论文.md)
- [arXiv 雷达工作流](content/papers/03-arXiv雷达工作流.md)
- [机器可读论文种子](data/papers.seed.yaml)
- [自生长知识库架构方案](planning/RoboOpus_自生长知识库_架构方案.md)
- [参考案例与模板调研](planning/参考案例与模板调研.md)

## 设计来源

页面借鉴的是信息组织方法，不复制第三方文字、图像或品牌资产：

- [OpenMOSS/Awesome-WAM](https://github.com/OpenMOSS/Awesome-WAM)：WAM taxonomy、paper blog 与 leaderboard 思路
- [world-action-models/awesome-world-action-models](https://github.com/world-action-models/awesome-world-action-models)：WAM 操作化定义与分类轴
- [ImChong/Robotics_Notebooks](https://github.com/ImChong/Robotics_Notebooks)：路线、互链知识节点与来源追踪
- [DreamZero 项目页](https://dreamzero0.github.io/) 与 [Fast-WAM 项目页](https://yuantianyuan01.github.io/FastWAM/)：论文页的研究问题—方法—证据结构

更完整的案例统计见 [参考案例与模板调研](planning/参考案例与模板调研.md)。

## 内容许可与引用

站内中文分析为原创整理；论文、项目、代码和性能数字均回链其原始来源。第三方论文、图片、视频、代码与数据仍适用各自许可证和版权条款。
