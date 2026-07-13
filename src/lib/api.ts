import axios from 'axios'

/**
 * 统一的 axios 实例。
 * - baseURL: '/api'，开发时由 vite proxy 转发到 http://localhost:8080
 * - 生产（B 模式，打进 Spring Boot）时由后端 serve
 * 所有 API 调用都应走此实例，便于统一加拦截器/错误处理。
 */
export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一错误日志出口，后续可在此接 toast/上报
    console.error('[api error]', error?.response?.status, error?.message)
    return Promise.reject(error)
  },
)
