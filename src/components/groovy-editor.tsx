import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { EditorView } from '@codemirror/view'
import { indentUnit } from '@codemirror/language'
import { bracketMatching } from '@codemirror/language'
import { cn } from '@/lib/utils'
import { shadcnTheme } from '@/lib/codemirror-theme'

export interface GroovyEditorProps {
  /** 当前 Groovy 源码（受控） */
  value: string
  /** 源码变化回调（只读模式下可不传） */
  onChange?: (value: string) => void
  /** 失焦时回调（常用于触发轻量保存/校验） */
  onBlur?: () => void
  /** 占位符（文档为空时显示） */
  placeholder?: string
  /** 只读模式 */
  readOnly?: boolean
  /** 是否显示行号，默认 true */
  showLineNumbers?: boolean
  /** 最小高度（任意 CSS 高度值），默认 '120px' */
  minHeight?: string
  /** 透传到外层包裹 div 的 className */
  className?: string
}

/**
 * Groovy 代码编辑器。
 *
 * 设计目标：业务无关、内核可替换。
 * - 对外只暴露文本进出（value / onChange）+ 常用编辑开关。
 * - Groovy 无官方 CodeMirror 语法模式，这里用 Java 近似高亮
 *   （关键字 / 字符串 / 注释 / 数字 / 函数 / 类型 覆盖良好）。
 * - 语法校验与执行一律交后端，前端不做。
 *
 * 将来若要换 Monaco 等其它内核，只需替换本文件内部实现，
 * 保持 props 接口不变，调用方零改动。
 */
export function GroovyEditor({
  value,
  onChange,
  onBlur,
  placeholder = '// 在此编写 Groovy 脚本',
  readOnly = false,
  showLineNumbers = true,
  minHeight = '120px',
  className,
}: GroovyEditorProps) {
  const extensions = useMemo(
    () => [
      java(),
      bracketMatching(),
      indentUnit.of('    '),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': { fontSize: '13px', height: '100%' },
        '.cm-scroller': { fontFamily: 'var(--font-mono, ui-monospace, monospace)' },
        '.cm-content': { minHeight },
        '.cm-gutters': { display: showLineNumbers ? '' : 'none' },
      }),
    ],
    [minHeight, showLineNumbers],
  )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border bg-background text-foreground',
        readOnly && 'opacity-95',
        className,
      )}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        theme={shadcnTheme}
        extensions={extensions}
        basicSetup={{
          lineNumbers: showLineNumbers,
          highlightActiveLine: !readOnly,
          highlightActiveLineGutter: !readOnly,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          tabSize: 4,
          indentOnInput: true,
          foldGutter: false,
        }}
        height="100%"
        style={{ height: '100%' }}
      />
    </div>
  )
}

export default GroovyEditor
