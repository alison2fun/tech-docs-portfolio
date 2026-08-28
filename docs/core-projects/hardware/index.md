# OPT4001YMNEVM 开发者文档重构

<div class="hardware-doc" markdown>

## 项目说明

这个项目基于 TI 的 [《OPT4001 Datasheet》](https://www.ti.com/lit/ds/symlink/opt4001.pdf)和 [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，把分散在两份官方资料中的板卡结构、首次采集、I²C 读写、结果寄存器和故障信息，重组为 4 篇任务导向型的文档。

这套文档面向第一次使用 OPT4001YMNEVM，并希望继续理解底层逻辑的开发者。它集中处理两个问题：

- 怎样尽快连接评估板，并在 EVM GUI 中看到第一组 lux 数据；
- 需要集成或调试时，到哪里查找系统链路、工作模式、结果寄存器和故障判断。

由于官方 Datasheet 的 54 页内容按器件知识组织，EVM User's Guide 的 35 页内容按评估板安装和操作组织，完成一次首次采集或底层读取，往往需要跨越不同章节，甚至同时查阅两份资料，因此这套文档按照用户任务重新连接相关信息，使得用户能够快速查找并得到所需要的信息。

![从官方资料到开发者任务文档](../../assets/opt4001/opt4001-source-task-map.svg){ .doc-figure .figure--medium .figure--diagram }

*图 1：将 Datasheet 和 EVM User's Guide 中的分散信息，按开发者任务重组。*
{: .figure-caption }

## 三项关键判断

### 先建立第一次成功路径

Quick Start 只解决一个任务：

连接评估板，启动 EVM GUI，并看到第一组 lux 数据。

器件原理、寄存器细节和进阶配置放到后续页面，不阻塞第一次成功。

### 把三条系统链路分开

分别解释：

- PC、控制板、coupon board 与传感器的系统关系；
- I²C、工作模式、结果寄存器与 lux 数据的读取逻辑。

避免系统架构、寄存器配置和光学结构混在同一条阅读路径中。

### 把异常路径独立出来

COM 端口、GUI 连接、采集失败和数据异常等问题统一进入 Troubleshooting。

正常操作页面只保留完成任务所需的信息。

更完整的资料重组、交叉核对与写作判断，见[《从官方资料到开发者文档集》](../../posts/hardware-datasheet-restructure.md)。

## 文档交付

| 页面 | 读者任务 |
| --- | --- |
| [Quick Start](../../02-hardware.md) | 连接硬件、启动 GUI，获得第一组 lux 数据 |
| [评估系统与光学硬件结构](information-architecture.md) | 理解 PC、控制板、coupon board、传感器及光学结构 |
| [配置与数据读取](configure-and-read-lux.md) | 配置工作模式、读取结果寄存器并理解 lux 数据 |
| [故障排查](troubleshooting.md) | 从异常现象进入 COM、GUI、采集和数据问题排查 |

## 验证状态

| 内容 | 当前状态 |
| --- | --- |
| 器件型号、封装、引脚和地址 | TI 官方资料确认 |
| 板卡结构、工作模式、I²C 与结果寄存器 | 已完成跨资料核对 |
| 文档结构、任务路径和重绘示意图 | 本项目完成 |
| 软件安装、USB 枚举和首次采集 | 待真实硬件验证 |
| 参考代码编译、运行和故障复现 | 待目标平台或真实硬件验证 |

作者目前没有 OPT4001YMNEVM 实物。页面中的官方界面截图和操作现象来自 TI 资料，不代表作者已经独立复现。资料确认、工程判断和实物验证在正文中保持区分。

## 进入文档

第一次查看时，从 [Quick Start：首次采集](../../02-hardware.md)开始。完成首次采集后，再依次阅读：

1. [评估系统与光学硬件结构](information-architecture.md)
2. [配置与数据读取](configure-and-read-lux.md)
3. [故障排查](troubleshooting.md)

</div>
