type SubmitButtonProps = {
  disabled: boolean
  loading: boolean
  label: string
  loadingLabel: string
}

export default function SubmitButton({ disabled, loading, label, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-4 rounded-lg p-2 text-24 font-semibold transition-colors ${
        disabled
          ? "cursor-not-allowed bg-[#DDD6FE] text-[#6B7280]"
          : "bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
      }`}
    >
      {loading ? loadingLabel : label}
    </button>
  )
}
