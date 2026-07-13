import { buttonVariants } from '@/components/ui/button'

export function Home() {
  return (
    <main className="container mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">a-solid-ui-template</h1>
      <p className="text-muted-foreground">
        监控 / 后台面板脚手架。消费后端 <code>/api</code> 接口。
      </p>
      <a href="/about" className={buttonVariants()}>
        前往 About
      </a>
    </main>
  )
}
