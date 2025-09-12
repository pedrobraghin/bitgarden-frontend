import Link from "next/link";

interface NavLinkProps {
  text: string;
  to: string;
  left?: React.ReactNode;
}

export function NavLink({ text, to, left }: Readonly<NavLinkProps>) {
  return (
    <Link
      href={to}
      className="block w-full px-4 py-2 rounded-md hover:bg-gray-800"
    >
      <div className="flex items-center gap-4">
        <div>{left}</div>
        <span>{text}</span>
      </div>
    </Link>
  );
}
