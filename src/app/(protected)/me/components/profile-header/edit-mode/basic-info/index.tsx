import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { TextInput } from "@/components";
import { useEditUserStore, useUserStore } from "@/lib/zustand";

export function BasicInfo() {
  const {
    user: { avatarUrl, name, username },
  } = useUserStore();
  const { setUserData } = useEditUserStore();

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex items-center justify-center relative -z-10">
          <button className="absolute top-0 left-4/6 bg-gray-800 rounded-full p-2 border-2 border-neutral-400 cursor-pointer hover:bg-gray-500 transition-colors">
            <CiCamera size={20} />
          </button>
          <Image
            src={avatarUrl}
            width={150}
            height={150}
            alt={`Foto de ${name}`}
            className="rounded-full border-2 border-dashed border-neutral-200/50"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <TextInput
            id="name"
            name="name"
            label="Nome"
            defaultValue={name}
            minLength={6}
            onChange={(e) => setUserData({ name: e.target.value })}
          />
          <TextInput
            id="username"
            name="username"
            label="Nome de usuário"
            defaultValue={username}
            placeholder="ex.: jodaodasilva"
            onChange={(e) => setUserData({ username: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
