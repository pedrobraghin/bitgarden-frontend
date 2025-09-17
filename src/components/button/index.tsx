import { PulseLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

type ButtonStyles = "outlined" | "default";
type ButtonTypes = "confirm" | "cancel" | "default";

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: ButtonStyles;
  icon?: React.ReactNode;
  type?: ButtonTypes;
  loading?: boolean;
}

export function Button({
  label,
  onClick,
  icon,
  style = "default",
  type = "default",
  loading = false,
}: Readonly<ButtonProps>) {
  const styleMap: Record<ButtonStyles, string> = {
    outlined: "border-none",
    default: "border border-neutral-400",
  };

  const typeMap: Record<ButtonTypes, string> = {
    cancel: "bg-red-400/80 hover:bg-red-400/50",
    confirm: "bg-green-400/80 hover:bg-green-400/50",
    default: "hover:bg-gray-800 hover:text-slate-400",
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "px-4 py-2 rounded-lg cursor-pointer text-sm flex items-center gap-2  transition-colors disabled:cursor-wait",
        styleMap[style],
        typeMap[type]
      )}
      disabled={loading}
    >
      {icon}
      {label}
      {loading && <PulseLoader size={8} color="#fff" />}
    </button>
  );
}
