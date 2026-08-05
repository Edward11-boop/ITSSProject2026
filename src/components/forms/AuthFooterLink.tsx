import { Link } from "react-router-dom"

type AuthFooterLinkProps = {
  text: string
  to: string
  linkLabel: string
}

export default function AuthFooterLink({ text, to, linkLabel }: AuthFooterLinkProps) {
  return (
    <p className="mt-4 text-center text-20 text-[#6B7280]">
      {text}
      <Link to={to} className="ml-1 font-semibold text-[#6D28D9]">
        {linkLabel}
      </Link>
    </p>
  )
}
