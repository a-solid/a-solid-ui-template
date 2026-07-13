import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type Health = { status?: string; [k: string]: unknown }

function fetchHealth() {
  return api.get<Health>('/health').then((res) => res.data)
}

export function Health() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    retry: 1,
  })

  return (
    <main className="container mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">后端健康检查</h1>
      {isLoading && <p className="text-muted-foreground">加载中…</p>}
      {error && <p className="text-red-500">无法连接后端 /api/health（脚手架阶段属正常）。</p>}
      {data && (
        <pre className="bg-muted p-4 rounded text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <a href="/" className="text-primary underline">
        回首页
      </a>
    </main>
  )
}
