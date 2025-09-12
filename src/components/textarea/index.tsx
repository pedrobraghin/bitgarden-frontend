import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="w-full resize-none rounded-lg border border-neutral-400 px-4 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-200"
      />
    </div>
  );
}
