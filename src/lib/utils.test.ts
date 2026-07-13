import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('合并多个 class 字符串', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('处理条件类名（falsy 值被忽略）', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c')
  })

  it('tailwind 冲突类后者覆盖前者', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
