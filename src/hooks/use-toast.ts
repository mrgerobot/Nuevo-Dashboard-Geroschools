// src/hooks/use-toast.ts
import * as React from "react"
import type { ToastActionElement } from "@/components/ui/toast"

export type ToastProps = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toast: () => {},
})

export function useToast() {
  return React.useContext(ToastContext)
}

export const ToastProvider = ToastContext.Provider
