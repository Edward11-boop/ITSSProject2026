type ConfirmDeleteModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDeleteModal({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29255E]/50 p-4 backdrop-blur-sm">
      <div className="w-[min(400px,calc(100vw-32px))] rounded-3xl bg-white p-6 text-center shadow-xl sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3 className="mb-2 text-2xl font-bold text-[#29255E]">Esti sigur?</h3>
        <p className="mb-8 text-sm text-gray-500">
          Aceasta actiune va sterge definitiv rezervarea selectata.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-[#FF6B6B] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-500"
          >
            Da, sterge
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border-2 border-[#6D28D9] py-3 text-sm font-bold text-[#6D28D9] transition hover:bg-purple-50"
          >
            Anuleaza
          </button>
        </div>
      </div>
    </div>
  )
}