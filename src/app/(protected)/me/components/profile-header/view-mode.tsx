import Image from "next/image";
import { MapPin } from "lucide-react";
import { FaEdit, FaInfo } from "react-icons/fa";

import { ViewModeProps } from "./types";

export function ViewMode({
  avatarUrl,
  bio,
  headline,
  location,
  name,
  onEdit,
}: Readonly<ViewModeProps>) {
  return (
    <div className="flex gap-8">
      <div>
        <Image
          className="rounded-full border-2 border-dashed border-neutral-200/50"
          src={avatarUrl}
          width={150}
          height={150}
          alt={`Foto de ${name}`}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <h1 className="font-medium text-2xl">{name}</h1>
          <span className="text-md text-neutral-400">{headline}</span>
        </div>
        <div className="text-sm flex items-center gap-2 mb-2">
          <FaInfo className="w-4" />
          <span className="text-sm">{bio}</span>
        </div>
        <div className="text-sm flex items-center gap-2 text-neutral-400">
          <MapPin className="w-4" />
          <span>{location}</span>
        </div>
      </div>
      <div>
        <button
          className="cursor-pointer hover:text-neutral-400 transition-colors"
          onClick={onEdit}
        >
          <FaEdit size={20} />
        </button>
      </div>
    </div>
  );
}
