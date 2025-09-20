import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Readonly<ContainerProps>) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 border border-neutral-500/30 rounded-2xl p-10",
        className
      )}
    >
      {children}
    </div>
  );
}
