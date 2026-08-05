type ErrorPopUpProps = {
  title: string
  message: string
  sideMessage?: string
  onClose: () => void
}

const ErrorPopUp = ({ title, message, sideMessage, onClose }: ErrorPopUpProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29255E]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[32px] border border-[#C4B5FD] bg-white px-6 py-8 text-center shadow-xl sm:rounded-[48px] sm:px-10 sm:py-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold text-[#29255E] sm:text-[30px]">
          {title}
        </h2>

        <p className="mb-3 text-center text-base font-semibold text-[#29255E] sm:text-lg">
          {message}
        </p>

        {sideMessage && (
          <p className="mb-8 text-center text-sm text-[#6B7280]">
            {sideMessage}
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-[#F87171] px-6 py-4 text-lg font-semibold text-white transition hover:bg-red-500 sm:text-xl"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default ErrorPopUp