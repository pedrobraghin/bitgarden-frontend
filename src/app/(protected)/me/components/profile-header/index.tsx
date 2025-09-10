import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaInfo } from "react-icons/fa";

interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
  headline?: string;
  bio?: string;
  location?: string;
}

export function ProfileHeader({
  avatarUrl,
  bio,
  headline,
  location,
  name,
}: Readonly<ProfileHeaderProps>) {
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
      <div className="flex flex-col gap-3 flex-1">
        <div>
          <h1 className="font-medium text-2xl">{name}</h1>
          <span className="text-md text-neutral-400">{headline}</span>
        </div>
        <div className="text-sm flex items-center gap-2 text-neutral-400">
          <FaInfo className="w-4" />
          <span className="text-sm text-neutral-400">{bio}</span>
        </div>
        <div className="text-sm flex items-center gap-2 text-neutral-400">
          <MapPin className="w-4" />
          <span>{location}</span>
        </div>
      </div>
      <div>
        <span>Aberto para oportunidades</span>
      </div>
    </div>
  );
}
