type PageTitleProps = {
  title: string
  description?: string
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-slate-800">{title}</h1>
      {description && <p className="text-slate-500">{description}</p>}
    </>
  )
}
