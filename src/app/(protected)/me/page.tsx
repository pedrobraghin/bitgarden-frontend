"use client";

import { ProfileHeader, LinksContainer } from "./components";

export default function MePage() {
  return (
    <div className="pt-20 pr-20 flex flex-col gap-5">
      <ProfileHeader />
      <LinksContainer />
    </div>
  );
}
