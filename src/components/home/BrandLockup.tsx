type BrandLockupProps = {
  logoSrc: string
  name: string
}

export default function BrandLockup({ logoSrc, name }: BrandLockupProps) {
  return (
    <div className="flex items-center gap-3 text-64px">
      <img src={logoSrc} alt="Logo" className="h-20" />
      <h1 className="text-[64px] font-semibold text-white">
        {name}
      </h1>
    </div>
  )
}
