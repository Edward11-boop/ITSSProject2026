import type { ChangeEventHandler } from "react"

type FormFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: string
  placeholder?: string
  labelClassName?: string
  inputClassName?: string
}

export default function FormField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  labelClassName = "text-24",
  inputClassName = "w-full rounded-lg border-2 border-[#DDD6FE] px-4 py-2 focus:outline-none",
}: FormFieldProps) {
  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={inputClassName}
      />
    </>
  )
}
