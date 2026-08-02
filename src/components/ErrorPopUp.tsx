import React from 'react'

const ErrorPopUp = ({title, message, sideMessage, onClose}) => {
  return (
    <div className="w-full max-w-xl rounded-[48px] border border-[#C4B5FD] bg-[#FFFFFF] px-10 py-10 shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>

      <h2 className="mb-10 text-center text-[30px] font-medium text-[#000000]">
        {title}
      </h2>

      <h3 className="mb-2 text-center text-2xl font-bold text-[#000000]">{message}</h3>
        <p className="mb-8 text-center text-sm text-[#6B7280]">
          {sideMessage}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={"mt-12 w-full rounded-full px-6 py-4 text-xl font-semibold bg-[#F87171] text-white"}
        >
          Try again
        </button>
    </div>
  )
}

export default ErrorPopUp
