"use client";

import { BookCheck, CircleStar, Home } from "lucide-react";
import { NavLink } from "./nav-link";
import { useUserStore } from "@/lib/zustand";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export function Sidebar() {
  const { user } = useUserStore();
  return (
    <div className="p-10 w-60 h-screen flex flex-col justify-between">
      <div>
        <Link href="/">BitGarden</Link>
      </div>
      <nav className="w-full">
        <ul className="flex flex-col gap-4">
          <li className="w-full">
            <NavLink to="/feed" text="Início" left={<Home size={20} />} />
          </li>
          <li className="w-full">
            <NavLink
              to="/search"
              text="Pesquisar"
              left={<FaSearch size={20} />}
            />
          </li>
          <li>
            <NavLink
              to="/me"
              text="Perfil"
              left={
                <Image
                  src={user.avatarUrl}
                  width={20}
                  height={20}
                  alt={`Foto de ${user.name}`}
                  className="rounded-full"
                />
              }
            />
          </li>
          <li>
            <NavLink
              to="/projects"
              text="Projetos"
              left={<BookCheck size={20} />}
            />
          </li>
          <li>
            <NavLink
              to="/achievements"
              text="Conquistas"
              left={<CircleStar size={20} />}
            />
          </li>
        </ul>
      </nav>
      <div>Card</div>
    </div>
  );
}
