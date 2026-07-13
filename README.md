# a-solid-ui-template

`a-solid-observe` 后端配套的前端监控 / 后台面板。React 19 + Vite + TypeScript SPA。

## 环境要求

- **Node.js 24**（见 `.nvmrc`）。支持 >=22 <27。
- 推荐用 [fnm](https://github.com/Schniz/fnm) 或 [volta](https://volta.sh) 自动读取 `.nvmrc` 切版本：
  ```bash
  fnm use        # 进目录自动切到 24
  ```

## 安装

```bash
npm ci          # 按锁文件安装（推荐）
# 或
npm install
```

## 开发

```bash
npm run dev     # http://localhost:5173，/api 代理到 http://localhost:8080
```

开发时 `/api/**` 请求由 Vite proxy 转发到本地 Java 后端（`a-solid-observe`）。

## 构建

| 命令 | 用途 | 产物 |
|---|---|---|
| `npm run build` | A 模式：独立部署（nginx / 容器） | `dist/`，资源路径根绝对 |
| `npm run build:springboot` | B 模式：打进 Spring Boot static 目录 | 后端 `observe-bootstrap/.../static/ui/`，带 `/ui/` 前缀 |

> `build:springboot` 的目标目录与 `BASE_URL` 在与后端联调时确认。

## 其它

```bash
npm test            # Vitest 单测（单次）
npm run test:watch  # 监听模式
npm run lint        # oxlint
npm run format      # Prettier 格式化
```

## 技术栈

Vite · React 19 · TypeScript (strict) · Tailwind v4 · shadcn/ui · React Router v7 · TanStack Query v5 · axios · react-hook-form + zod · Vitest + Testing Library。
