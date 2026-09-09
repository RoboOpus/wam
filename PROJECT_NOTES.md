# RoboOpus WAM 项目记录

World Action Model（WAM）轻量知识库种子工程。

## 发布约束

- GitHub 普通仓库：`RoboOpus/wam`
- 项目站：`https://roboopus.github.io/wam/`
- 禁止目标：不创建、不修改、不部署 `RoboOpus/RoboOpus.github.io`
- 当前状态：本地项目站和两篇详情页已完成，等待创建远程仓库并部署

## 当前目标

第一阶段不追求大而全，先把四件事做正确：

1. 形成可执行的 WAM 纳入标准，避免把普通 VLA、纯视频生成器和通用模拟器混为一谈。
2. 用两套主流 taxonomy 交叉组织论文。
3. 建立 World Model → 早期 WAM → 2026 WAM 的阅读路线。
4. 把人工精选内容和机器可读元数据同时保存，为后续 arXiv 日更做准备。

## 内容入口

- [WAM 范围、边界与分类](content/00-WAM范围与分类.md)
- [经典论文阅读路线](content/papers/01-经典论文阅读路线.md)
- [2026 arXiv 前沿论文池](content/papers/02-2026-arXiv前沿论文.md)
- [机器可读论文种子](data/papers.seed.yaml)

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

接下来再做这些工程化工作：

- 增加标准论文卡模板和字段校验；
- 接入 arXiv API，自动生成候选列表但不自动发布；
- 首次发布后核验 GitHub Pages 的 `/wam/` 子路径；
- 增加链接检查和内容 schema 校验；
- 所有自动更新通过 Pull Request 审核。
