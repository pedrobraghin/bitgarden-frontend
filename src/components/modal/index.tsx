import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
}

export function Modal({ children, visible, className }: Readonly<ModalProps>) {
  if (!visible) return null;

  return (
    <div
      className={twMerge(
        "fixed w-screen h-screen overflow-y-auto inset-0 bg-black/80",
        className
      )}
    >
      {children}
    </div>
  );
}
