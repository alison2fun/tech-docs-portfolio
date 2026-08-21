# GitHub 英文文档写作复盘

在写 GitHub 这两篇英文文档之前，我阅读了较多行业内的优秀文档。在这篇文章里，我想总结一些要点，作为以后写技术文档时使用的写作工具箱。

## 1. 先告诉我“这页能帮我干什么”

GitHub、Stripe、Cloudflare、TiDB 的任务型页面开头都很快进入目标，很少先写一大段产品背景。

典型逻辑是：

> **This guide shows you how to + 动作 + 结果。**

例如 Cloudflare 的 Getting Started 直接围绕“build your first Worker”，CLI 页面进一步明确目标是设置并部署第一个 Worker；Stripe 的 API 入门也直接告诉用户会完成第一次 API 请求。([Cloudflare Docs](https://developers.cloudflare.com/workers/get-started/?utm_source=chatgpt.com "Getting started · Cloudflare Workers docs"))

这类表达可以复用。

**英文：**

- This guide shows you how to...
    
- This guide walks you through...
    
- In this guide, you will...
    
- Learn how to...
    
- Use this guide to...
    
- By the end of this guide, you will...
    
- This tutorial demonstrates how to...
    
- This article explains how to...
    

其中也会有一些细微差别：

|表达|更适合|
|---|---|
|`This guide shows you how to...`|How-to / 普通指南|
|`This guide walks you through...`|有连续步骤的教程|
|`Learn how to...`|页面简介、导航卡片|
|`This article explains...`|Concept / Explanation|
|`This reference describes...`|Reference|
|`Use ... to ...`|非常直接的任务型标题/导语|

**中文对应：**

- 本文介绍如何……
    
- 本文演示如何……
    
- 本指南介绍如何……
    
- 按照以下步骤……
    
- 通过本文，你将完成……
    
- 你将学习如何……
    
- 使用本文的方法，你可以……
    

TiDB 就经常采用“本文档演示如何……”以及“通过学习本教程，你将……”这种写法，把预期结果提前。([PingCAP Docs](https://docs.pingcap.com/zh/ai/quickstart-via-python/?utm_source=chatgpt.com "使用Python 快速上手TiDB + AI | TiDB 文档中心"))

---

## 2. 用动词开头
Microsoft 的技术写作规范明确建议步骤使用**祈使动词**，每一步写成完整句子，而且整个 procedure 应尽可能短。([Microsoft Learn](https://learn.microsoft.com/en-us/style-guide/checklists/procedures-and-instructions-checklist?utm_source=chatgpt.com "Procedures and instructions checklist"))

优秀文档里的步骤通常不写：

> Configuration of the environment

写：

> Configure your environment.

不写：

> API key configuration

写：

> Configure your API key.

### 值得积累的动作词

#### 环境与准备

- install
    
- configure
    
- set up
    
- create
    
- enable
    
- obtain
    
- generate
    
- download
    
- clone
    
- open
    
- sign in
    

比如：

- Install the CLI.
    
- Configure your environment.
    
- Create a project.
    
- Generate an API key.
    
- Set the environment variable.
    

#### 执行

- run
    
- send
    
- call
    
- execute
    
- start
    
- deploy
    
- build
    
- connect
    
- request
    
- upload
    

比如：

- Run the following command.
    
- Send a request to the endpoint.
    
- Deploy your application.
    
- Start the development server.
    

#### 验证

这个是你特别应该增加的一组。

- verify
    
- confirm
    
- check
    
- validate
    
- inspect
    

比如：

- Verify the response.
    
- Confirm that the request succeeds.
    
- Check the returned status code.
    
- Verify that `full_name` matches the requested repository.
    

这就是你现在 GitHub API 文档里很适合强化的东西。

技术文档不应该停在：

> Run this command.

而应该继续：

> Run → Observe → Verify.

---

## 3. 好用的结构：Action → Result → Verify

好的 Quickstart 会让用户不断确认：

> **我现在到底有没有做对？**

Stripe 的 Quickstart 强调逐步实现和可运行代码，Cloudflare 则让用户从创建项目一路到开发和部署；TiDB 的示例同样会把配置值、运行结果等放在对应操作附近。([Stripe Docs](https://docs.stripe.com/quickstarts?utm_source=chatgpt.com "Quickstart guides"))

可以形成自己的固定模板，例如：

### Step 2. Send the request

**Action**

```bash
curl ...
```

**Expected result**

The API returns repository metadata in JSON format.

**Verify**

Confirm that:

- `full_name` matches the repository you requested.
    
- `default_branch` contains the expected branch.
    

以后写任何 Quickstart，都可以首先考虑：

> **动作 → 用户看到什么 → 如何知道成功**


---

## 4. Before you start / Prerequisites 要克制

这些优秀文档的前置条件普遍很克制。

Cloudflare 会直接说需要什么账号或工具；TiDB 和阿里云则把环境、版本、API Key、地域等真正影响任务完成的条件放在开始之前。([Cloudflare Docs](https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/?utm_source=chatgpt.com "First Worker · Cloudflare Learning Paths"))

推荐结构：

### Before you start

Make sure you have:

- ...
    
- ...
    
- ...
    

或者：

### Prerequisites

Before you begin, you need:

- ...
    
- ...
    

高频表达：

- Before you begin,...
    
- Before you start,...
    
- Make sure you have...
    
- You need...
    
- This guide requires...
    
- You must have...
    
- Make sure that...
    
- Ensure that...
    

其中最好区分：

**need**  
普通要求。

**must**  
强制条件。

**make sure / ensure**  
要求用户检查状态。

例如：

> Make sure that Git is installed.

比：

> Git installation is required prior to proceeding with this tutorial.

好很多。

Microsoft 的整体写作建议也是偏向短句、直接表达、少限定语和少废话。([Microsoft Learn](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips?utm_source=chatgpt.com "Writing tips - Microsoft Style Guide"))

---

## 5. 标题不要写“内容是什么”，尽量写“用户要做什么”

这是非常重要的区别。

普通写法：

> API Key  
> Configuration  
> Repository  
> Deployment

任务型文档更好的标题：

> Get your API key  
> Configure your environment  
> Create a repository  
> Deploy your application

Stripe 的 Get Started 页面就是典型的：

**Create → Set up → Get → Start**。

它实际上直接把整个阅读目录写成一条任务路径。([Stripe Docs](https://docs.stripe.com/get-started?locale=en-GB&utm_source=chatgpt.com "Get started"))

所以以后你的 Quickstart 标题可以尽量：

> **动词 + 对象**

比如：

- Install the CLI
    
- Create a project
    
- Configure authentication
    
- Send the request
    
- Check the response
    
- Deploy the Worker
    

而 Concept / Reference 才更多使用名词标题：

- Authentication
    
- Request headers
    
- Response format
    
- Error codes
    
- Rate limits
    

这是一个很好的判断方法。

---

## 6. Overview 的好结构

Cloudflare Workers 的 Overview 非常典型：先用极短的一句话说明**是什么 + 可以做什么**，然后再进入能力和概念。([Cloudflare Docs](https://developers.cloudflare.com/workers/?utm_source=chatgpt.com "Overview · Cloudflare Workers docs"))

可以抽象成：

<!-- vale Microsoft.Contractions = NO -->

### What it is

> X is a ... that lets you ...

### What you can do

- ...
    
- ...
    
- ...
    

### How it works

简单架构/流程。

### Next steps

- Get started
    
- Read the guide
    
- View the reference

<!-- vale Microsoft.Contractions = YES -->
    

英文非常好用的表达：

- X is a...
    
- X lets you...
    
- You can use X to...
    
- With X, you can...
    
- X provides...
    
- X supports...
    
- X consists of...
    
- X works by...
    
- Under the hood,...
    
- When you..., X...
    

注意：

> **Overview 不是把所有内容都解释完。**

它主要解决：

> 这是什么？  
> 为什么和我有关？  
> 大概怎么工作？  
> 下一页去哪？

---

## 7. How-to 的核心结构：Goal → Preconditions → Steps → Result

How-to 和 Quickstart 很像，但区别在于：

Quickstart：

> 第一次成功。

How-to：

> 完成一个具体任务。

所以可以固定成：

```text
# Configure authentication

介绍：完成什么任务。

## Before you begin

真正必要的条件。

## Configure ...

1. ...
2. ...
3. ...

## Verify the configuration

确认成功。

## Next steps

下一项相关任务。
```

非常常见的过渡词：

- To...
    
- First,...
    
- Next,...
    
- Then,...
    
- After...
    
- Once...
    
- When...
    
- Finally,...
    

但要注意：**不需要每个步骤都写 First / Next / Then。**

编号已经表达顺序。

所以：

> 1. First, open...
>     
> 2. Next, select...
>     
> 3. Then, enter...
>     

其实有点啰嗦。

直接：

> 1. Open...
>     
> 2. Select...
>     
> 3. Enter...
>     

---

## 8. Reference 是准确描述

Stripe API Reference 很值得学这一点是，Reference 不是“带你做”，而是：

> **准确描述一个对象。**

例如 API 对象一般是：

```text
Object / Endpoint

一句话定义

Parameters
Responses
Example request
Example response
Errors
```

Stripe 会首先非常简洁地定义 API 对象是什么，再说明它与其他对象之间的关系。([Stripe Docs](https://docs.stripe.com/api/checkout/sessions?utm_source=chatgpt.com "Checkout Sessions | Stripe API Reference"))

这种页面经常使用：

- represents
    
- specifies
    
- identifies
    
- indicates
    
- determines
    
- controls
    
- contains
    
- returns
    
- accepts
    
- supports
    
- defaults to
    
- must be
    
- can be
    
- is required
    
- is optional
    

比如参数描述：

> `limit` specifies the maximum number of items to return.

> `owner` identifies the repository owner.

> The response contains...

> The API returns...

这类表达比：

> This parameter is used to...

通常更短。

---

## 9. Troubleshooting 值得复用的症状语言

Troubleshooting 和普通 Guide 最大区别是，它从用户看到的问题出发。

可以固定使用：

### Problem / Symptom

- The request fails with...
    
- You receive a `403` response.
    
- The command returns...
    
- The application doesn't start.
    
- You can't connect to...
    
- X is missing from the response.
    

### Cause

- This usually happens when...
    
- This can occur if...
    
- A common cause is...
    
- The request fails because...
    
- This indicates that...
    

### Check

- Check whether...
    
- Verify that...
    
- Make sure that...
    
- Inspect...
    
- Run the following command to check...
    

### Fix

- To resolve the issue,...
    
- To fix this problem,...
    
- Update...
    
- Replace...
    
- Reconfigure...
    
- Retry the request.
    

### Verify

- Retry the request.
    
- Confirm that...
    
- You should now see...
    

 因此，Troubleshooting 可以固定成：

> **Symptom → Cause → Check → Fix → Verify**

---

## 10. 条件、限制要提前写

这是阿里云和 TiDB 文档中特别明显的地方。

例如 API Key、地域、TLS、版本要求等，如果不满足就根本做不了任务，它们会被放进**前提条件、注意、重要**这些位置，而不是用户执行到最后才告诉他。([阿里云帮助中心](https://help.aliyun.com/zh/model-studio/application-obtain-temporary-authentication-token?utm_source=chatgpt.com "生成临时API Key-大模型服务平台百炼(Model Studio) - 阿里云帮助文档"))

英文很好用：

- If...
    
- When...
    
- For...
    
- Only...
    
- Unless...
    
- Depending on...
    
- This feature is available only...
    
- X requires...
    
- X isn't supported...
    
- If you're using X,...
    

特别推荐 Microsoft 的一个原则：

> **如果一句话有重要条件，把条件尽量提前。** ([Microsoft Learn](https://learn.microsoft.com/en-us/contribute/content/style-quick-start?utm_source=chatgpt.com "Microsoft Learn style guide - Quick start - Contributor guide"))

例如不要：

> Select **Connect** if you're using a public endpoint.

改成：

> If you're using a public endpoint, select **Connect**.

因为用户第一眼就知道：

**这一条是不是我的情况。**

---

## 11. 中文技术文档同样应该多用“短动作句”

中文很容易出现这种 AI / 公文味：

> 为了能够进一步完成对于相关 API 接口功能的调用，需要首先完成 API Key 的相关配置工作。

完全可以改成：

> 先配置 API Key。

或者：

> 调用 API 前，先配置 API Key。

再比如：

❌

> 用户可以通过执行以下命令的方式来创建一个新的项目。

✅

> 运行以下命令创建项目。

❌

> 在完成上述操作之后，可以看到系统将返回如下所示的响应结果。

✅

> 请求成功后，系统返回以下响应。

这其实就是中英文共通的原则：

> **删掉“进行、相关、通过……的方式、可以看到、完成上述操作之后”等空壳词。**

---

## 沉淀物

### 12. 技术写作基本词库
#### 任务

`create / configure / install / set up / enable / connect / send / run / deploy / update / delete`

#### 查看

`view / check / inspect / review / locate / find`

#### 验证

`verify / confirm / validate / test`

#### 描述

`provide / contain / include / represent / specify / indicate / identify`

#### API

`send / request / return / response / endpoint / parameter / header / payload / status code`

#### 条件

`require / support / available / optional / required / default`

#### 排错

`fail / error / issue / cause / check / resolve / retry`

仅仅把这些最基础的动词用准确，技术英语已经会比堆：

> utilize / facilitate / leverage / enable seamless...

专业很多。

---

### 13. 五种万能骨架

以后拿到任何陌生产品，都可以先套这五种。

**Overview**

<!-- vale Microsoft.Contractions = NO -->

> What is it?  
> What can it do?  
> How does it work?  
> Where should I go next?

<!-- vale Microsoft.Contractions = YES -->

**Quickstart**

> Goal  
> Before you start  
> Step 1  
> Step 2  
> Step 3  
> Verify the result  
> Next steps

**How-to**

> Goal  
> Prerequisites  
> Procedure  
> Expected result  
> Next task

**Reference**

> Definition  
> Syntax / Endpoint  
> Parameters  
> Request  
> Response  
> Errors  
> Notes

**Troubleshooting**

> Symptom  
> Cause  
> Check  
> Fix  
> Verify

**看到一堆技术资料，不是跟着原资料的顺序重写，而是先判断用户处于什么任务，再选择对应的文档骨架。**
