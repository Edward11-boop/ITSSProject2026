type AuthMessageProps = {
  children?: string
  tone?: "error" | "success"
}

export default function AuthMessage({ children, tone = "error" }: AuthMessageProps) {
  if (!children) {
    return null
  }

  return (
    <p className={tone === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>
      {children}
    </p>
  )
}
