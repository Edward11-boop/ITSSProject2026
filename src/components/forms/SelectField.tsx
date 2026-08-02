import type { ChangeEventHandler } from "react"

type SelectFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: Array<{ value: string; label: string }>
}

export default function SelectField({ id, name, label, value, onChange, options }: SelectFieldProps) {
  return (
    <>
      <label htmlFor={id} className="text-24">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border-2 border-[#DDD6FE] bg-white px-4 py-2 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
