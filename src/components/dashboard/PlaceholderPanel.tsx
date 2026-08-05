type PlaceholderPanelProps = {
  label: string
  heightClassName: string
}

export default function PlaceholderPanel({ label, heightClassName }: PlaceholderPanelProps) {
  return (
    <div className={`mt-4 flex items-center justify-center rounded-lg bg-gray-50 ${heightClassName}`}>
      <p className="text-gray-400">{label}</p>
    </div>
  )
}
