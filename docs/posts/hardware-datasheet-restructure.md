# 从官方资料到开发者文档集

这个项目以 TI OPT4001YMNEVM 为对象，把分散在 *OPT4001 Datasheet* 和 *OPT4001YMNEVM User's Guide* 中的器件、板卡、软件与故障信息，重新组织成面向开发任务的文档集。

最终交付从第一次环境光采集开始，再进入系统结构、底层数据读取和故障排查。作者没有 OPT4001YMNEVM 实物，因此项目完成的是官方资料核对、任务路径设计和文档重组，没有把工程判断写成已经完成的硬件测试。

## 项目背景

目标读者是第一次评估 OPT4001YMNEVM，或需要继续理解底层配置与数据格式的开发者。他们通常要完成四项任务：

1. 连接评估板，并在 EVM GUI 中看到第一组 lux 数据；
2. 理解 PC、母板、coupon board 和 OPT4001YMN 之间的关系；
3. 配置 Continuous 模式，读取结果寄存器并换算 lux；
4. 根据异常现象，判断问题位于 USB、I²C、数据解析还是光学路径。

## 原始资料与限制

*OPT4001 Datasheet* 说明器件封装、工作模式、I²C、结果寄存器和光学结构；*OPT4001YMNEVM User's Guide* 说明评估板、板卡关系、软件界面、连接步骤和局部故障。资料中还包含官方硬件图片、GUI 截图、原理图与布局图。

两份官方文档共 89 页。项目按文档名称、编号、页码和图号保留来源，但没有真实硬件、当前 Windows 软件环境或目标 MCU 可用于复现。因此软件安装、USB 枚举、首次采集、代码编译和故障复现不属于已验证结果。

## 原页面的问题

旧作品使用虚构器件、SPI 时序和虚构寄存器，无法作为真实技术资料核对的证据。改用 OPT4001YMNEVM 后，新的问题变成：一次开发任务所需的信息跨越两份资料，读者需要在器件知识、板卡安装、GUI 操作和故障章节之间来回查找。

官方资料各自按产品知识组织，却没有直接形成“连接设备 → 开始测量 → 读取结果 → 判断异常”的连续路径。母板接口、YMN 封装和不同地址层级如果只看局部页面，也容易被混写。

## 我怎样确定优先级

我先定义第一次成功路径，再补支撑这条路径的系统知识。Quick Start 只保留准备、操作、预期结果和最短恢复动作；寄存器字段进入配置与数据读取；完整故障判断进入独立排查页。

不会阻止首次采集的完整寄存器表、I²C 波形推导和量产 PCB 参数没有进入 Quick Start。无法由官方资料确认的软件兼容性和实测结果也没有凭常识补写。

## 关键取舍

### 把两份资料接成四类文档

| 文档 | 主要职责 |
| --- | --- |
| [Quick Start：首次采集](../02-hardware.md) | 建立第一次成功路径，不要求读者先理解全部寄存器 |
| [评估系统与光学硬件结构](../core-projects/hardware/information-architecture.md) | 解释板卡职责，以及控制、电气和光学链路 |
| [配置与数据读取](../core-projects/hardware/configure-and-read-lux.md) | 按读取任务解释工作模式、I²C、结果寄存器和 lux 换算 |
| [故障排查](../core-projects/hardware/troubleshooting.md) | 从可观察现象进入对应检查层级 |

四页的边界保持具体：Quick Start 不展开底层原理；系统说明不承担操作步骤；数据读取页不复制完整 Datasheet；故障页通过链接复用寄存器定义。

### 把系统拆成三条链路

- **控制链路**：EVM GUI → USB → MSP430 → I²C → OPT4001YMN；
- **电气链路**：VDD / GND / SCL / SDA；
- **光学链路**：环境光 → FPCB 开孔 → 朝向 PCB 的感光区域。

I²C 可以访问器件，只能说明控制和电气链路可能已经建立；如果 coupon board 方向错误或进光开孔被遮挡，lux 响应仍可能异常。这是根据系统结构作出的工程判断，尚未通过实物验证。

### 跨资料核对四类事实

**封装与接口。** OPTMBEVM 的通用接口可见 `ADDR` 和 `INT`，但 OPT4001YMN / PicoStar 本身只有 VDD、GND、SCL 和 SDA。器件能力以当前封装的引脚表为准，不能从母板丝印反推。

**板卡层级。** 官方概览从功能上把系统分成母板和 coupon board；物理结构继续展开后，coupon board 又包含 rigid board、flex board 和 OPT4001YMN。两种说法描述不同层级。

**通信与测量。** OPT4001YMN 上电默认处于 Power-down。它仍然可以响应 I²C，却不会持续产生新的测量结果，因此“能读寄存器”和“已经开始测量”需要分别判断。

**地址层级。** `0x45` 定位 I²C 总线上的器件；`0x00`、`0x01` 和 `0x0A` 等定位器件内部寄存器。两类地址在读取流程中分开说明。

### 保留图表和代码的边界

官方硬件照片的图注保留文档名称、Figure 和页码。解释控制链路、光学路径和寄存器字段的重绘图只保留当前任务需要的关系，并标为“根据 TI 官方资料重绘”。

参考代码只解析已经读取到的 `0x00` 和 `0x01`，不虚构目标 MCU 的 I²C HAL。代码旁同时注明尚未编译，也没有经过实物验证。

## 修改前后对比

| 检查项 | 修改前 | 修改后 |
| --- | --- | --- |
| 技术对象 | 虚构 XYZ-2024 器件 | TI OPT4001YMNEVM 与 OPT4001YMN |
| 通信内容 | 虚构 SPI 时序和寄存器 | 官方资料确认的 USB、MSP430 与 I²C 路径 |
| 信息顺序 | 按器件知识平铺 | 按首次采集、系统理解、数据读取和故障排查组织 |
| 完成标准 | 以页面内容完整为主 | 以可观察的 GUI lux 数值和曲线更新为首次采集标准 |
| 验证边界 | 模拟内容与事实边界不够清楚 | 官方资料、工程判断和实物验证分别说明 |

## 验证结果

器件型号、封装、板卡关系、工作模式、I²C 地址、结果字段和 lux 公式已经根据 TI 官方资料交叉核对。页面中的来源保留文档编号、页码和官方链接；站点构建与 Vale 结果由仓库检查记录提供。

## 当前限制

作者目前没有 OPT4001YMNEVM 实物。软件安装、USB 枚举、首次采集、参考代码运行、读数随光照变化和故障复现仍待验证。页面只能说明官方资料支持的操作和预期现象，不能证明作者已经独立跑通硬件。

## 最终交付物

- [项目概览](../core-projects/hardware/index.md)
- [Quick Start：首次采集](../02-hardware.md)
- [评估系统与光学硬件结构](../core-projects/hardware/information-architecture.md)
- [配置与数据读取](../core-projects/hardware/configure-and-read-lux.md)
- [故障排查](../core-projects/hardware/troubleshooting.md)

## 相关方法

- [如何写一篇让读者真正跑通的 Quick Start](quick-start-reader-success.md)
- [同一份技术资料为什么需要不同阅读路径](multiple-reader-paths.md)
- [怎样与 AI 协作写技术文档](ai-assisted-docs-boundaries.md)

<div class="bottom-pager">
    <a href="../../core-projects/hardware/" class="pager-link">返回项目概览</a>
    <a href="../../case-studies/" class="pager-link pager-link-primary">返回复盘与方法</a>
</div>
