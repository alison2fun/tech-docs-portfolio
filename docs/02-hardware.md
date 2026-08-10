# 快速开始：采集第一组环境光数据

<div class="hardware-doc" markdown>

本页帮助第一次使用 OPT4001YMNEVM 的读者完成首次环境光数据采集。完成后，EVM GUI 中应显示实时 lux 数值，曲线区域持续出现新的数据点。

!!! info "验证状态"

    本页根据 TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)和 [《OPT4001 Datasheet》](https://www.ti.com/lit/ds/symlink/opt4001.pdf)整理。操作步骤、界面状态和错误提示均有官方资料依据。

    作者目前没有 OPT4001YMNEVM 实物，尚未独立复现软件安装、硬件连接和数据采集。页面中的界面图片来自 TI 官方文档，不代表作者的实测结果。

## 开始前准备

| 项目 | 要求 |
| --- | --- |
| 评估套件 | OPT4001YMNEVM |
| 板卡状态 | OPT4001YMN coupon board 已插入 OPTMBEVM 母板 |
| 连接线 | USB-A 转 USB-C 线 |
| 电脑 | Windows 电脑 |
| 软件 | 已安装 OPT4001EVM GUI（基于 TI Latte） |

本页假设 EVM GUI 已经完成安装。软件可从 [TI OPT4001EVM 官方产品页](https://www.ti.com/tool/OPT4001EVM)获取；官方指南第 7—11 页提供安装过程。

## 检查 coupon board

连接 USB 前，确认 coupon board 已完整插入母板插座，安装方向与官方图片一致，并且 flex coupon board 没有受到按压或弯折。

![OPT4001YMN coupon board 插入 OPTMBEVM 母板后的状态](assets/opt4001/opt4001-coupon-installed.png){ .doc-figure .figure--medium .figure--photo }

*OPT4001YMN coupon board 的安装位置。来源：TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，Figure 4-1，第 19 页。*
{: .figure-caption }

!!! warning "拿取 coupon board"

    插拔时只握住 rigid coupon board，不要按压 flex coupon board。柔性 PCB 较薄，操作时还应遵守基本的静电防护要求。

**预期结果**

Coupon board 稳固插入母板，安装方向与图片一致，flex PCB 没有受到挤压。

!!! tip "方向不确定"

    暂时不要连接 USB。先对照图片确认板卡方向，并检查插针是否完整进入插座。板卡职责见[评估系统与光学硬件结构](core-projects/hardware/information-architecture.md#board-structure)。

## 连接评估板

1. 将 USB-C 接头插入 OPTMBEVM 母板。
2. 将 USB-A 接头插入 Windows 电脑。
3. 等待 Windows 完成设备识别。

![OPT4001YMNEVM 通过 USB 连接电脑](assets/opt4001/opt4001-usb-connection.png){ .doc-figure .figure--small .figure--photo }

*OPT4001YMNEVM 的 USB 连接方式。来源：TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，Figure 3-9，第 11 页。*
{: .figure-caption }

**预期结果**

- OPTMBEVM 母板上的绿色 LED 亮起；
- Windows 设备管理器中出现两个 COM 端口。

![Windows 设备管理器识别出两个 COM 端口](assets/opt4001/opt4001-com-ports.png){ .doc-figure .figure--small .figure--screenshot }

*评估板正常枚举后，Windows 设备管理器中出现两个 COM 端口。来源：TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，Figure 3-10，第 12 页。*
{: .figure-caption }

!!! tip "没有出现两个 COM 端口"

    依次检查 USB 线、母板绿色 LED 和设备管理器中的未正确安装设备，再重新连接 USB。官方指南第 28—34 页的手动驱动说明只针对 Windows 7；其他 Windows 版本应先检查 TI 官方下载说明。

## 启动 EVM GUI

从 Windows 开始菜单启动 OPT4001EVM GUI（基于 TI Latte），等待 OPT4001 主操作界面打开。

![OPT4001EVM GUI 主操作界面](assets/opt4001/opt4001-gui-main-screen.png){ .doc-figure .figure--large .figure--screenshot }

*OPT4001EVM GUI 主操作界面。来源：TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，Figure 3-11，第 13 页。*
{: .figure-caption }

**预期结果**

主操作界面正常打开，页面中没有显示母板连接错误。

!!! tip "出现 `OPT4001 Connection Problem`"

    该提示表示 EVM GUI 没有检测到 OPTMBEVM 母板。检查 USB、母板绿色 LED 和两个 COM 端口，确认连接后重启 EVM GUI。

## 开始连续采集

在主操作界面中：

1. 打开 `Operation Select`；
2. 选择 `Continuous`；
3. 点击 `Start Capture`。

![在 OPT4001EVM GUI 中开始连续采集](assets/opt4001/opt4001-gui-capture-running.png){ .doc-figure .figure--large .figure--screenshot }

*选择 `Continuous` 并点击 `Start Capture` 后，EVM GUI 显示 lux 数据和实时曲线。来源：TI [《OPT4001YMNEVM User's Guide》](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)，Figure 3-13，第 14 页。*
{: .figure-caption }

OPT4001 上电后默认处于 Power-down。选择 `Continuous` 后，器件才会持续进行环境光测量并更新结果。

**预期结果**

- EVM GUI 中出现 lux 数值；
- 曲线区域持续增加新的测量点。

!!! tip "出现 `REGRx01 Failed`"

    该错误表示母板未能正常读取 OPT4001 IC 或 coupon board。官方优先检查项是 coupon board 是否已经插入，以及安装方向是否正确。检查时只握住 rigid coupon board。

## 确认结果

满足以下条件，表示首次采集路径已经完成：

- [ ] EVM GUI 已正常打开；
- [ ] `Operation Select` 已设为 `Continuous`；
- [ ] 已点击 `Start Capture`；
- [ ] 页面显示 lux 数值；
- [ ] 曲线持续出现新的测量点。

??? note "资料来源"

    **[OPT4001YMNEVM User's Guide](https://www.ti.com/lit/ug/sbou278/sbou278.pdf)**，SBOU278，December 2021

    - coupon board 操作注意事项：第 6 页；
    - 软件获取与安装：第 7—11 页；
    - USB 连接和绿色 LED：第 11 页；
    - 两个 COM 端口：第 12 页；
    - EVM GUI 与连接错误：第 13 页；
    - `Continuous`、`Start Capture` 和 lux 曲线：第 14 页；
    - Windows 7 手动驱动安装：第 28—34 页。

    **[OPT4001 Datasheet](https://www.ti.com/lit/ds/symlink/opt4001.pdf)**，SBOS993A，revised December 2022

    - Power-down 与 Continuous 工作模式：第 13 页；
    - `OPERATING_MODE` 字段：第 31 页。

## 继续阅读

- [理解评估系统](core-projects/hardware/information-architecture.md)
- [配置与数据读取](core-projects/hardware/configure-and-read-lux.md)
- [故障排查](core-projects/hardware/troubleshooting.md)

</div>
