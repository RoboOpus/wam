# WAM 范围、边界与分类

> 状态：种子页  
> 更新：2026-09-08  
> 目的：规定 RoboOpus 如何判断一项工作是否属于 World Action Model。

## 1. 工作定义

本知识库采用一个可执行的纳入规则：

> **模型必须预测某种未来信号，并且该预测实际进入动作生成、动作评分、策略训练或安全检查路径。**

未来信号不必是完整 RGB 视频，也可以是视觉 latent、几何、光流、轨迹、affordance、价值、触觉或其他与控制有关的预测表示。这个定义主要依据 [World Action Models: A Survey](https://arxiv.org/abs/2606.20781)，并与 [World Action Models: The Next Frontier in Embodied AI](https://arxiv.org/abs/2605.12090) 中“统一预测世界状态与动作生成”的定义交叉校验。

WAM 是 2026 年才被系统化定义的快速演进概念。UniPi、VLP、GR-1、PAD 等较早工作在原论文中未必使用 WAM 这一名称；本库称它们为“按 2026 taxonomy 回溯归类的 WAM 先驱”，而不是改写作者的原始自我定位。

## 2. 与相邻概念的边界

| 系统 | 是否纳入 WAM | 判断理由 |
|---|---|---|
| 直接从观测/语言输出动作的普通 VLA | 否 | 没有预测未来，或未来预测未进入动作路径 |
| 只生成机器人视频、没有动作接口的生成模型 | 否 | 能想象未来，但未来没有服务于可执行动作 |
| 动作条件世界模型，只作为独立模拟器展示 | 通常否 | 若不生产、评分、训练或检查动作，应归入 World Model |
| 先生成未来视频，再用逆动力学/跟踪/几何恢复动作 | 是 | 预测未来直接被解码为动作 |
| 联合生成未来视觉表示和 action chunk | 是 | 世界预测与动作生成在统一模型内耦合 |
| 训练时用未来 latent 监督策略，推理时不显式生成视频 | 是 | 未来预测进入策略训练路径；属于隐式/latent 路线 |
| 用预测 rollout 给候选动作打分或做安全过滤 | 是 | 未来被用于选择或检查动作 |

边界有争议时，不强行二值化，使用 `wam_relation`：

- `core`：满足定义，且论文核心贡献就是预测—动作耦合；
- `precursor`：符合后来的 WAM 结构，但原论文早于或未采用 WAM 名称；
- `world-model-for-policy`：世界模型服务于策略，但不是统一的 WAM；
- `adjacent`：VLA、视频生成、模拟器等相邻方向；
- `excluded`：只有关键词相似，不满足操作化定义。

## 3. 三套分类视角

### 3.1 架构耦合：Cascaded 与 Joint

[OpenMOSS/Awesome-WAM](https://github.com/OpenMOSS/Awesome-WAM) 配套综述采用：

- **Cascaded WAM**：先预测未来，再由单独模块提取或规划动作。
  - 像素未来 + 学习式动作提取；
  - 像素/深度/点轨迹 + 几何动作提取；
  - 不解码完整视频的 latent 隐式规划。
- **Joint WAM**：同一模型联合建模未来和动作。
  - 自回归：显式解耦、统一离散 token、预测 latent；
  - 扩散：单流或多流，并通过 cross-attention、hidden state 或共享表示耦合。

### 3.2 预测载体：生成多少“未来”

[awesome-world-action-models](https://github.com/world-action-models/awesome-world-action-models) 采用：

- **Render-and-Decode**：产生可见或可渲染未来，例如 RGB、RGB-D、多视角视频，再读取或反演动作。
- **Latent-Only**：未来停留在 feature、denoising state、flow、mask、value map 等隐空间。
- **Video-Generation-Free**：不用视频生成核心，而以 LLM/VLM、JEPA、几何或其他预测信号连接未来与动作。

### 3.3 机器人设计范式

[From World Models to World Action Models: A Concise Tutorial for Robotics](https://arxiv.org/abs/2607.00836) 总结四种范式：

1. imagine-then-execute；
2. video-feature-conditioned action prediction；
3. joint video-action modeling；
4. auxiliary video prediction for policy learning。

## 4. 分类交叉表

三套分类不是一一对应关系。RoboOpus 为每篇论文同时记录“耦合方式、预测载体、动作使用方式”，不强迫只放进一个目录。

| 典型结构 | 耦合方式 | 预测载体 | 机器人范式 | 代表工作 |
|---|---|---|---|---|
| 生成视频 → IDM/跟踪器 → 动作 | Cascaded | Render-and-Decode | Imagine-then-execute | UniPi、AVDC、VLP |
| 预测未来 feature → policy | Cascaded 或弱耦合 Joint | Latent-Only | Video-feature-conditioned | VLA-JEPA、Fast-WAM |
| 同一 Transformer 自回归生成图像 token 与动作 | Joint/AR | Render 或 latent | Joint video-action | GR-1、WorldVLA |
| 同一扩散过程联合去噪未来与动作 | Joint/Diffusion | 多为 latent，也可解码 | Joint video-action | PAD、DreamZero、LingBot-VA |
| 训练时预测未来，部署时只输出动作 | Joint 或辅助头 | Latent-Only | Auxiliary prediction | Fast-WAM 等效率路线 |
| 世界模型 rollout + value → 候选动作选择 | 可级联也可联合 | Render/latent/value | Planning/evaluation | Cosmos Policy、WAV |

## 5. RoboOpus 论文页最小字段

每篇论文至少记录：

```yaml
id: arxiv:2602.15922
title: World Action Models are Zero-shot Policies
first_submitted: 2026-02-17
venue: arXiv
status: verified
wam_relation: core
coupling: joint-diffusion
future_substrate: pixel-latent
action_use: joint-generation
robot_setting: real-and-sim
paper_url: https://arxiv.org/abs/2602.15922
project_url: null
code_url: null
reviewed_by_human: false
```

后续扩展字段：backbone、参数量、训练数据、action representation、控制频率、benchmark、真实机器人、代码/权重/数据开放状态、许可证、主要结果、局限、复现成本和关系边。

## 6. 关系边

第一版直接写在 Markdown/YAML 中，不上图数据库：

- `builds_on`：方法直接建立在另一工作之上；
- `contrasts_with`：论文明确对比或反驳的路线；
- `uses_backbone`：使用的视频模型、VLM、VLA 或 world model；
- `evaluated_on`：LIBERO、CALVIN、RoboTwin、RoboCasa 等；
- `implemented_by`：官方或可信第三方实现；
- `surveyed_by`：被哪篇综述收录；
- `related`：弱关系，仅用于导航。

## 7. 纳入与升级流程

```text
arXiv/人工 URL 发现
  → 标题与 arXiv ID 去重
  → WAM 边界检查
  → 作者/日期/链接核验
  → candidate 论文卡
  → 人工阅读
  → reviewed
  → 代码复现
  → reproduced
```

自动流程只能把条目推进到 `candidate`；元数据程序校验后可以标记 `verified`，但 `reviewed` 和 `reproduced` 必须有人类证据。

## 8. 当前核心问题

后续阅读应持续围绕这些问题组织，而不是只累计论文数量：

- 显式生成视频对控制究竟是必要条件，还是训练表征的辅助信号？
- pixel、latent、geometry、flow、value 哪种未来表示最适合哪些任务？
- 联合生成相对级联方案的收益来自共享表征、数据规模，还是测试时规划？
- 视频先验如何真正形成动作因果，而不只是视觉相关性？
- WAM 如何达到闭环控制所需的延迟、频率和稳定性？
- 真实机器人、跨 embodiment、接触丰富任务和长时程任务的评测是否可信？
- 未来预测质量与最终动作成功率是否稳定相关？
