# 获取设备最新光照数据

本文面向需要读取设备光照数据的应用开发者。完成下面的操作后，你将发送一次 GET 请求，并获得指定设备最近一次成功保存的光照测量结果。

!!! info "样例说明"
    本文用于展示 API 信息组织与接口文档写作。域名、访问令牌、设备编号和响应数据均为示例，未连接真实平台或设备。

## 完成标准

请求返回 HTTP 200，响应中包含设备编号、采集时间、光照度和本次请求的追踪编号。你还需要检查设备编号是否正确，并根据采集时间判断数据是否足够新。

## 调用前准备

开始前，准备下面三项信息。

| 项目 | 示例值 | 用途 |
| --- | --- | --- |
| Base URL | `https://api.example.com/v1` | 测试环境的 API 地址 |
| Device ID | `light-sensor-01` | 指定要查询的设备 |
| Access Token | `YOUR_ACCESS_TOKEN` | 验证调用者身份和读取权限 |

把示例中的占位值替换为测试环境提供的实际值。本文假定你已经取得 Access Token，不包含令牌签发和刷新步骤。

## 发送请求

接口使用 Bearer Token 认证。把访问令牌放入 `Authorization` 请求头，然后发送下面的请求。

```bash
curl --request GET \
  --url 'https://api.example.com/v1/devices/light-sensor-01/measurements/latest' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Accept: application/json'
```

`Bearer` 与 Token 之间需要保留一个空格。发送请求前，再检查 URL 中的 `device_id` 是否与目标设备一致。

## 检查响应

请求成功时，接口返回 HTTP 200。

```json
{
  "device_id": "light-sensor-01",
  "measured_at": "2026-08-06T03:10:00Z",
  "illuminance_lux": 328.4,
  "request_id": "req_7f42c19a"
}
```

按照下面的顺序检查结果。

1. 确认 `device_id` 与请求中的设备编号一致。
2. 查看 `measured_at`，根据业务需要判断数据是否足够新。
3. 读取 `illuminance_lux`。该字段使用 lux 作为单位，数值大于或等于 0。
4. 保存 `request_id`。需要排查问题时，可以用它关联服务端日志。

这个接口只返回最近一次成功保存的记录。请求结束以后，它不会继续推送新数据。

## 处理错误

请求失败时，接口返回统一的错误对象。

```json
{
  "error": {
    "code": "MEASUREMENT_NOT_FOUND",
    "message": "No measurement was found for device 'light-sensor-01'.",
    "request_id": "req_51a6c902"
  }
}
```

根据 HTTP 状态码和 `error.code` 选择下一步操作。

| HTTP 状态码 | 错误码 | 恢复动作 |
| --- | --- | --- |
| 401 | `AUTHENTICATION_FAILED` | 取得有效 Token，并检查 `Bearer` 后的空格 |
| 403 | `ACCESS_DENIED` | 检查当前凭证是否拥有设备读取权限 |
| 404 | `DEVICE_NOT_FOUND` | 使用设备列表中的实际编号重新请求 |
| 404 | `MEASUREMENT_NOT_FOUND` | 等待设备上报数据后再次请求 |
| 429 | `RATE_LIMIT_EXCEEDED` | 按照 `Retry-After` 指定的秒数等待 |
| 500 | `INTERNAL_ERROR` | 保存 `request_id`，稍后重试或提交问题 |

提交问题时，请同时提供请求时间、Endpoint、HTTP 状态码、业务错误码和 `request_id`。不要在截图或日志中暴露完整的 Access Token。

## 当前范围

本文只说明怎样读取最新一条光照数据。历史记录、分页、时间筛选、WebSocket、SSE、Token 签发与刷新、设备管理都不在当前范围内。

字段约束、完整错误定义和频率限制见[光照测量 API Reference](api-reference.md)。文档的设计过程与验证状态见[光照测量 API 文档案例](index.md)。
