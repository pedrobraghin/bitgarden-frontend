import { InputHTMLAttributes } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string[];
}

export function TextInput({ label, id, errors, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        autoComplete="off"
        className={twMerge(
          "w-full rounded-lg border border-neutral-400 px-4 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-200",
          errors?.length && "border-red-400"
        )}
      />
      <span className="text-red-400 text-sm italic">
        {errors?.map((error, i) => (
          <div key={`ERR_${i}`} className="flex items-center gap-2">
            <RiErrorWarningFill />
            <span>{error}</span>
          </div>
        ))}
      </span>
    </div>
  );
}
