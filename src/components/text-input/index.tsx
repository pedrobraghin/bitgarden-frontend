import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextInput({ label, id, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        autoComplete="off"
        className="w-full rounded-lg border border-neutral-400 px-4 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-200"
      />
    </div>
  );
}
