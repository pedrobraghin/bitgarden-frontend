interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: Readonly<ContainerProps>) {
  return (
    <div className="flex flex-col gap-4 border border-neutral-500/30 rounded-2xl p-10">
      {children}
    </div>
  );
}
