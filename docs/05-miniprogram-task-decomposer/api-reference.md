
# 微步 ACTION · API 参考文档

> 本文档面向接入微步 ACTION 后端服务的前端开发者，用于说明任务拆解接口的调用方式、请求参数、响应结构和错误处理。

---

## 基础信息

| 项目       | 说明                                       |
| -------- | ---------------------------------------- |
| Base URL | `https://api.task-decomposer.com/api/v1` |
| 协议       | HTTPS                                    |
| 数据格式     | JSON                                     |
| 字符编码     | UTF-8                                    |
| 认证方式     | Bearer Token                             |

---

## 认证说明

所有接口请求都需要在 Header 中携带有效访问令牌。

```http
Authorization: Bearer {access_token}
Content-Type: application/json
```

其中，`{access_token}` 为用户完成微信授权后获取的访问令牌。

如果 Token 缺失、格式错误或已过期，接口将返回 `401 Unauthorized`。

---

## 接口概览

| 接口                 | 方法     | 说明                    |
| ------------------ | ------ | --------------------- |
| `/tasks/decompose` | `POST` | 将用户输入的大任务拆解为 5 个可执行步骤 |

---

## 任务拆解接口

### Endpoint

```http
POST /tasks/decompose
```

### 功能说明

接收用户输入的原始任务描述，调用 AI 引擎将其拆解为 5 个微小、可立即执行的步骤，并返回结构化步骤列表。

这个接口主要用于小程序首页的 **一键粉碎任务** 功能。

---

## 请求头

| 字段名             | 类型     | 必填 | 说明                         |
| --------------- | ------ | -- | -------------------------- |
| `Authorization` | string | 是  | 格式：`Bearer {access_token}` |
| `Content-Type`  | string | 是  | 固定值：`application/json`     |

---

## 请求体

```json
{
  "task_description": "明天下午准备技术文档岗位面试的 2 分钟自我介绍",
  "language": "zh-CN"
}
```

| 字段名                | 类型     | 必填 | 约束                | 说明                             |
| ------------------ | ------ | -- | ----------------- | ------------------------------ |
| `task_description` | string | 是  | 10 ~ 200 字        | 用户输入的原始任务描述，建议包含具体目标、时间范围和当前状态 |
| `language`         | string | 否  | `zh-CN` / `en-US` | 指定返回步骤语言，默认 `zh-CN`            |

---

## 成功响应

**HTTP 状态码：** `200 OK`

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_id": "task_20260420_abc123",
    "original_description": "明天下午准备技术文档岗位面试的 2 分钟自我介绍",
    "steps": [
      {
        "step_id": 1,
        "content": "打开作品集首页，确认自己最想展示的 3 个项目",
        "estimated_minutes": 10,
        "is_completed": false
      },
      {
        "step_id": 2,
        "content": "写下 3 句话，说明自己为什么适合技术文档岗位",
        "estimated_minutes": 10,
        "is_completed": false
      },
      {
        "step_id": 3,
        "content": "从作品集中选 1 个项目，准备 30 秒说明",
        "estimated_minutes": 15,
        "is_completed": false
      },
      {
        "step_id": 4,
        "content": "把自我介绍控制在 2 分钟内，读一遍并计时",
        "estimated_minutes": 10,
        "is_completed": false
      },
      {
        "step_id": 5,
        "content": "录音回听一遍，删掉重复和太虚的表达",
        "estimated_minutes": 10,
        "is_completed": false
      }
    ],
    "quota_remaining": 17,
    "created_at": "2026-04-20T10:30:00Z"
  }
}
```

---

## 响应字段说明

| 字段名                              | 类型      | 说明                  |
| -------------------------------- | ------- | ------------------- |
| `code`                           | integer | 业务状态码，`0` 表示成功      |
| `message`                        | string  | 响应描述                |
| `data.task_id`                   | string  | 本次任务的唯一标识符          |
| `data.original_description`      | string  | 用户原始输入内容，用于前端回显     |
| `data.steps`                     | array   | AI 生成的步骤列表，固定返回 5 条 |
| `data.steps[].step_id`           | integer | 步骤序号，范围 1 ~ 5       |
| `data.steps[].content`           | string  | 步骤描述                |
| `data.steps[].estimated_minutes` | integer | 预计完成时间，单位为分钟        |
| `data.steps[].is_completed`      | boolean | 步骤完成状态，初始值为 `false` |
| `data.quota_remaining`           | integer | 当前账号今日剩余调用次数        |
| `data.created_at`                | string  | 任务创建时间，ISO 8601 格式  |

---

## 错误响应

所有错误响应均返回统一 JSON 结构：

```json
{
  "code": 4001,
  "message": "任务描述太短啦，再说具体一点",
  "data": null
}
```

| HTTP 状态码 |  业务错误码 | 错误标识                 | 触发场景                        | 建议处理             |
| -------- | -----: | -------------------- | --------------------------- | ---------------- |
| `400`    | `4001` | `ERR_DESC_TOO_SHORT` | `task_description` 少于 10 字  | 提示用户补充目标、时间或当前状态 |
| `400`    | `4002` | `ERR_DESC_TOO_LONG`  | `task_description` 超过 200 字 | 限制输入长度，并提示用户精简描述 |
| `401`    | `4010` | `ERR_UNAUTHORIZED`   | Token 缺失、格式错误或过期            | 引导用户重新登录或授权      |
| `429`    | `4290` | `ERR_RATE_LIMIT`     | 当日调用次数达到上限                  | 提示今日次数已用完，次日再试   |
| `503`    | `5030` | `ERR_AI_UNAVAILABLE` | AI 服务暂时不可用                  | 提示稍后重试，并保留用户输入   |

---

## 调用配额

每个微信账号每日最多调用任务拆解接口 20 次。

配额于每日 `00:00 UTC+8` 重置。

前端可通过成功响应中的 `quota_remaining` 字段展示剩余次数，减少用户在提交后才发现超限的挫败感。

---

## curl 示例

```bash
curl -X POST "https://api.task-decomposer.com/api/v1/tasks/decompose" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "task_description": "明天下午准备技术文档岗位面试的 2 分钟自我介绍",
    "language": "zh-CN"
  }'
```

---

## 版本记录

| 版本     | 日期         | 说明                        |
| ------ | ---------- | ------------------------- |
| v1.0.0 | 2026-04-20 | 初始版本，支持任务拆解核心接口、错误码和调用配额  |
| v1.1.0 | 计划中        | 支持手动编辑步骤、拆解结果反馈和更细的任务类型识别 |

---

## 下一步阅读

1. [用户文档](index.md)：查看微步 ACTION 的用户使用流程；
2. [PRD 产品需求](prd.md)：查看产品目标、用户场景和功能边界；
3. [版本日志](release-notes.md)：查看功能迭代记录；
4. [小程序产品总览](../mini-programs.md)：返回查看其他小程序项目。
