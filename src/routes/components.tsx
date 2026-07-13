import { useState } from 'react'
import {
  ChevronDown,
  Loader2,
  Mail,
  Plus,
  Settings,
  Trash2,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { GroovyEditor } from '@/components/groovy-editor'

/** 一个分组容器，统一标题 + 描述 + 内容间距 */
function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="rounded-xl border bg-card p-5">{children}</div>
    </section>
  )
}

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'viewer' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'editor' },
]

export function Components() {
  const [email, setEmail] = useState('')
  const [groovy, setGroovy] = useState(
    `// 示例：一个简单的 Groovy 规则脚本
def process(evt) {
    if (evt.level == 'ERROR') {
        return [alert: true, message: "错误事件: " + evt.msg]
    }
    return [alert: false]
}`,
  )

  return (
    <main className="container mx-auto max-w-5xl space-y-10 p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">组件展示</h1>
        <p className="text-muted-foreground">
          shadcn/ui (base-nova preset <code>b39gyUEtc</code>) 当前已安装的全部组件与主题。
        </p>
      </header>

      {/* 排版 / 主题色板 */}
      <Section
        title="主题与排版"
        description="字体（Geist + Inter）、语义色与文字层级"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="size-12 rounded-lg bg-primary" />
            <span className="size-12 rounded-lg bg-secondary" />
            <span className="size-12 rounded-lg bg-muted" />
            <span className="size-12 rounded-lg bg-accent" />
            <span className="size-12 rounded-lg bg-destructive" />
            <span className="size-12 rounded-lg bg-background border" />
            <span className="size-12 rounded-lg bg-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-xs muted</p>
            <p className="text-sm">text-sm default</p>
            <p className="text-base font-medium">text-base medium</p>
            <p className="text-lg font-semibold">text-lg semibold</p>
            <p className="text-2xl font-bold">text-2xl bold</p>
          </div>
        </div>
      </Section>

      {/* Button */}
      <Section
        title="Button"
        description="6 个 variant × 多个 size，以及 loading / icon / disabled 状态"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="default">Default</Button>
            <Button size="lg">LG</Button>
            <Button size="icon" aria-label="设置">
              <Settings />
            </Button>
            <Button size="icon-sm" aria-label="新增">
              <Plus />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Mail data-icon="inline-start" /> 带图标
            </Button>
            <Button disabled>禁用</Button>
            <Button disabled>
              <Loader2 className="animate-spin" /> 加载中
            </Button>
            <Button
              onClick={() => toast.success('已触发', { description: '来自 Button 的 toast' })}
            >
              触发 Toast
            </Button>
          </div>
        </div>
      </Section>

      {/* Input + Label */}
      <Section
        title="Input & Label"
        description="表单输入控件（受控）"
      >
        <div className="grid max-w-md gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              当前值：{email || '（空）'}
            </p>
          </div>
          <Input type="password" placeholder="密码" defaultValue="secret" />
          <Input disabled placeholder="禁用输入" />
        </div>
      </Section>

      {/* Card */}
      <Section title="Card" description="信息卡片">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>总览</CardTitle>
              <CardDescription>过去 24 小时的关键指标</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-3xl font-bold">12,847</p>
              <p className="text-sm text-muted-foreground">事件数 ↑ 12%</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                查看详情
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>告警</CardTitle>
              <CardDescription>活跃告警列表</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-3xl font-bold text-destructive">3</p>
              <p className="text-sm text-muted-foreground">需立即处理</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" size="sm">
                处理告警
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* Table */}
      <Section title="Table" description="数据表格">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    {u.role}
                  </code>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" aria-label="删除">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* DropdownMenu */}
      <Section title="DropdownMenu" description="下拉菜单">
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline">
                  操作 <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>账户</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => toast.info('选择了「个人资料」')}>
                <User data-icon="inline-start" /> 个人资料
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('选择了「设置」')}>
                <Settings data-icon="inline-start" /> 设置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => toast.error('选择了「删除」')}
              >
                <Trash2 data-icon="inline-start" /> 删除账户
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Section>

      {/* Dialog */}
      <Section title="Dialog" description="模态对话框">
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline">打开对话框</Button>}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认操作</DialogTitle>
              <DialogDescription>
                此操作不可撤销。确定要继续吗？
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <p className="text-sm">
                这是一个模态对话框示例，展示 Dialog / DialogContent / DialogHeader
                / DialogFooter 等子组件的协作。
              </p>
            </div>
            <DialogFooter>
              <DialogClose
                render={<Button variant="outline">取消</Button>}
              />
              <DialogClose
                render={
                  <Button
                    onClick={() =>
                      toast.success('已确认', { description: '操作执行成功' })
                    }
                  >
                    确认
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* Sonner Toast */}
      <Section
        title="Sonner (Toast)"
        description="右上角通知（点击下方按钮触发）"
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast('普通通知')}>普通</Button>
          <Button onClick={() => toast.success('成功')}>成功</Button>
          <Button
            variant="outline"
            onClick={() => toast.warning('警告')}
          >
            警告
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error('出错了')}
          >
            错误
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.info('带描述的通知', {
                description: '这是 detail 描述文字',
              })
            }
          >
            带描述
          </Button>
        </div>
      </Section>

      {/* GroovyEditor */}
      <Section
        title="GroovyEditor"
        description="CodeMirror 6 + Java 近似高亮；语法校验交后端，组件只管文本进出"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>可编辑（受控）</Label>
            <GroovyEditor
              value={groovy}
              onChange={setGroovy}
              minHeight="180px"
            />
            <p className="text-xs text-muted-foreground">
              当前字节数：{new Blob([groovy]).size}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              onClick={() =>
                toast.success('已提交', {
                  description: `共 ${groovy.length} 字符已发送到后端（模拟）`,
                })
              }
            >
              提交到后端
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(groovy)
                toast.success('已复制到剪贴板')
              }}
            >
              复制
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label>只读模式</Label>
            <GroovyEditor
              value={'// 只读展示：用户无法编辑\ndef version = "1.0.0"\nprintln version'}
              readOnly
              minHeight="80px"
            />
          </div>
        </div>
      </Section>

      <footer className="pt-4">
        <a href="/" className="text-primary underline-offset-4 hover:underline">
          ← 回首页
        </a>
      </footer>
    </main>
  )
}
