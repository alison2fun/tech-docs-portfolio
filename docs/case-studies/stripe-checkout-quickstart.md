# Stripe Checkout Quickstart：把第一次付款串成一条路径

[查看 Stripe Checkout Quickstart](https://docs.stripe.com/checkout/quickstart)

## 网页步骤

Stripe 有一条主任务路径，页面会支持多种编程语言和框架。读者可以先选择自己的技术栈页面，再显示对应的代码。

| 阶段 | 网页让读者做什么 | 完成后得到什么 |
| --- | --- | --- |
| 1. 安装 SDK | 安装对应语言的 Stripe 库 | 项目能够调用 Stripe |
| 2. 创建 Checkout Session | 在服务端增加一个创建会话的接口 | 服务端得到 Checkout 页面 URL |
| 3. 定义商品 | 设置商品、价格和货币 | Stripe 知道这次要卖什么 |
| 4. 选择付款模式 | 选择一次性付款、订阅或仅保存付款方式 | Stripe 知道怎样处理付款 |
| 5. 设置成功地址 | 提供付款成功后的返回 URL | Stripe 知道付款后把用户送到哪里 |
| 6. 跳转到 Checkout | 使用 Session 返回的 URL | 顾客进入 Stripe 托管的付款页 |
| 7. 添加成功页面 | 显示付款完成信息 | 顾客知道操作已经完成 |
| 8. 添加订单预览和按钮 | 让顾客检查订单并开始付款 | 网站拥有完整的入口 |
| 9. 配置密钥 | 将测试密钥放进环境变量 | 应用可以安全连接 Stripe |
| 10. 运行应用 | 启动客户端和服务端 | 可以在浏览器里测试流程 |
| 11. 使用测试卡付款 | 分别测试成功、验证和拒付情况 | 证明集成真的可以运行 |

上述步骤后，页面会显示祝贺信息，告诉读者基本的 Checkout 集成已经可以工作。

## 可以学习之处

### 开头就让读者看到最终场景

这篇文章在开头就告知读者最后的成功场景。比如：会得到一个结账按钮，有一个付款页面，实行一次测试付款后，会得到一个付款成功的页面。

### 新概念出现时，立即解释用途

文档在出现 Checkout Session 这个新的概念时，马上进行解释，极大降低了读者的理解成本。

> A Checkout Session controls what your customer sees on the payment page, such as line items, the order amount and currency, and acceptable payment methods.

这是一个可以学习的 Quick Start 写作方法：

1. 读者遇到一个新对象；
2. 文档说明该对象解决什么问题；
3. 读者立刻使用它。

### 安全提醒放在相关步骤附近

例如，页面在配置 API 密钥时提醒读者使用环境变量，不要把密钥直接写进代码。

> `# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.`
>
> `# Find your keys at https://dashboard.stripe.com/apikeys.`

提醒出现的位置很重要。读者刚要执行有风险的操作，就能看到对应限制，比集中放在文末更有效。

### 成功之后才展开拓展内容

Stripe 先给出明确的完成提示，才介绍接下来的扩展功能，如外观、税费、配送地址和客户数据。这些都放在成功节点之后，不会妨碍整个主任务流程。

读者因此知道：到这里已经完成基本任务，后面的内容可以按需继续。

## 英文写作方法

### 大量使用“动词 + 对象”推动步骤

- Install the Stripe library
- Create a Checkout Session
- Define a product
- Choose a mode
- Add a Checkout button
- Run the application
- Try it out

### 积累句型

说明动作和目的：

- Add an endpoint that creates a Checkout Session.
- Specify a URL for the success page.
- Use the returned URL to redirect the customer to Checkout.
- Use the following test card to simulate a successful payment.

<div class="bottom-pager">
    <a href="../github-rest-api-troubleshooting-breakdown/" class="pager-link">上一篇：GitHub REST API 故障排查</a>
    <a href="../cloudflare-workers-quick-start-breakdown/" class="pager-link pager-link-primary">下一篇：Cloudflare Workers Quick Start</a>
</div>
