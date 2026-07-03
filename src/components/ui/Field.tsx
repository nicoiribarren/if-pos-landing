import { forwardRef, type ReactNode } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

const controlBase =
  'w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] px-3.5 text-sm text-fg ' +
  'placeholder:text-[var(--color-faint)] transition-colors duration-200 ' +
  'focus:border-[var(--color-accent-bright)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)] ' +
  'disabled:opacity-60 aria-[invalid=true]:border-[var(--color-danger)]'

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
      {children}
      {required && <span className="ml-0.5 text-[var(--color-cyan)]">*</span>}
    </label>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-1.5 text-xs text-[var(--color-danger)]">
      <AlertCircle className="size-3.5 shrink-0" />
      {children}
    </p>
  )
}

interface FieldShellProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

export function FieldShell({ id, label, required, error, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function Input({ className, invalid, ...props }, ref) {
    return <input ref={ref} aria-invalid={invalid} className={cn(controlBase, 'h-11', className)} {...props} />
  },
)

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid}
      className={cn(controlBase, 'min-h-24 resize-y py-2.5', className)}
      {...props}
    />
  )
})

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function Select({ className, invalid, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid}
      className={cn(
        controlBase,
        'h-11 appearance-none bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM5NGEzYjgiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+)] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
})
