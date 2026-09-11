# arXiv 雷达工作流

## 目标

每天发现与 World Action Model、robot world model、VLA 和机器人动作生成相关的新论文，形成可审阅候选池。自动化只负责发现、去重和排序，不替代论文阅读与事实核验。

## 流程

1. 每天北京时间 08:00 调用 arXiv 官方 API。
2. 查询 `cs.RO`、`cs.AI`、`cs.CV`、`cs.LG` 中与 WAM、VLA、robot world model 相关的最新条目。
3. 仅在内存中读取摘要用于主题相关度计算；仓库只保存题名、作者、日期、分类、链接、命中词和状态。
4. 按 arXiv ID 去重，与历史候选池合并；人工设置的 `reviewing`、`reviewed`、`ignored` 状态不会被自动覆盖。
5. 数据发生变化时才提交并重新部署项目站。

## 相关度不是质量分

相关度分数由关键词位置、机器人分类和发布时间组成。它不能判断实验是否可信、论文是否被接收、代码是否可运行，也不能代替引用量或同行评审。

正式知识页仍需人工检查：

- arXiv 版本与作者列表；
- 官方项目页和代码仓库；
- 数据集、基线与实验口径；
- 作者主张与论文证据是否一致；
- 限制、复现成本和潜在负面结果。

## 手动运行

```bash
npm run papers:fetch
```

可选参数：

```bash
node scripts/fetch-arxiv.mjs --max-results=60 --pool-limit=24 --min-relevance=7
```
