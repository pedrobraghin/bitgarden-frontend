interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
}

export function Modal({ children, visible }: Readonly<ModalProps>) {
  if (!visible) return null;

  return (
    <div className="fixed w-screen h-screen overflow-y-auto inset-0">
      {children}
    </div>
  );
}
