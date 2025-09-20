import Image from "next/image";
import { MapPin } from "lucide-react";
import { FaCheckCircle, FaInfo } from "react-icons/fa";

import { ProfileHeaderViewModeProps } from "../types";

export function ProfileHeaderViewMode({
  user,
}: Readonly<ProfileHeaderViewModeProps>) {
  const {
    avatarUrl,
    name,
    username,
    createdAt,
    profile: { bio, headline, location, availableForOpportunities },
  } = user;

  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="rounded-full border-2 border-dashed border-neutral-200/50"
          src={avatarUrl}
          width={150}
          height={150}
          alt={`Foto de ${name}`}
        />
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-xl px-4 py-2 bg-purple-400/50 rounded-md border-white border-l-2">
              {name}
            </h1>
            <div className="border-l-2 border-white pl-4">
              <span className="text-md">{headline}</span>
              <div className="text-sm text-neutral-400">
                <span>{username}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-neutral-400">
          <span>Membro desde {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col gap-2">
          {availableForOpportunities && (
            <div className="text-sm text-green-600 flex items-center gap-2">
              <FaCheckCircle />
              <span>Disponível para contato</span>
            </div>
          )}
          <div className="text-sm flex items-center gap-2">
            <FaInfo className="w-4" />
            <span className="text-sm">{bio}</span>
          </div>
          <div className="text-sm flex items-center gap-2 text-neutral-400">
            <MapPin className="w-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
