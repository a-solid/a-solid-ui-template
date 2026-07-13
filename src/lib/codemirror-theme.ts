import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'

/**
 * 对齐 shadcn preset 的 CodeMirror 主题。
 *
 * 直接读取页面 CSS 变量（--background / --foreground / --muted 等），
 * 这样编辑器配色自动跟随 shadcn 主题（含 light/dark），无需硬编码颜色。
 *
 * 注意：CodeMirror 的 theme 在创建时读取一次 CSS 变量值。若运行时切换
 * 深浅色主题，需要重新挂载编辑器（key 变化）才会刷新配色——当前脚手架
 * 未做运行时主题切换，故可接受。
 */
export const shadcnTheme = createTheme({
  theme: 'light',
  settings: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    caret: 'var(--primary)',
    selection: 'var(--accent)',
    selectionMatch: 'var(--muted)',
    lineHighlight: 'var(--muted)',
    gutterBackground: 'var(--background)',
    gutterForeground: 'var(--muted-foreground)',
    gutterBorder: 'var(--border)',
  },
  styles: [
    { tag: t.comment, color: 'var(--muted-foreground)', fontStyle: 'italic' },
    { tag: t.string, color: 'var(--chart-2)' },
    { tag: t.number, color: 'var(--chart-3)' },
    { tag: t.bool, color: 'var(--chart-3)' },
    { tag: t.keyword, color: 'var(--chart-1)' },
    { tag: t.variableName, color: 'var(--foreground)' },
    { tag: t.function(t.variableName), color: 'var(--chart-4)' },
    { tag: t.typeName, color: 'var(--chart-4)' },
    { tag: t.propertyName, color: 'var(--foreground)' },
    { tag: t.operator, color: 'var(--primary)' },
    { tag: t.punctuation, color: 'var(--muted-foreground)' },
  ],
})
