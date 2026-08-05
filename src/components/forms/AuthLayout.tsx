import type { ReactNode } from "react"

type AuthLayoutProps = {
  title: string
  description?: string
  children: ReactNode
  compactTitle?: boolean
}

export default function AuthLayout({
  title,
  description,
  children,
  compactTitle = false,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3FF] p-4">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-[#DDD6FE] bg-white p-8 text-[#1E1B4B]">
        <h1 className={`text-center font-semibold ${compactTitle ? "mb-2 text-[40px]" : "mb-4 text-[48px]"}`}>
          {title}
        </h1>

        {description && (
          <p className="mb-4 text-center text-gray-500">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  )
}
