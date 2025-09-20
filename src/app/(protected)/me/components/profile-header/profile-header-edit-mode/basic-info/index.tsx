import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { TextInput } from "@/components";
import { useEditUserStore, useUserStore } from "@/lib/zustand";
import { useDebouncedCallback } from "use-debounce";

export function BasicInfo() {
  const {
    user: { avatarUrl, name, username },
  } = useUserStore();
  const { setUserData, setUsername, errors } = useEditUserStore();

  const debounced = useDebouncedCallback(async (value: string) => {
    await setUsername(value);
  }, 200);

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex items-center justify-center relative">
          <button
            className="absolute top-7 left-4/6 bg-gray-800 rounded-full p-2 border-2 border-neutral-400 cursor-pointer hover:bg-gray-500 transition-colors"
            onClick={() => alert("Alterar foto de perfil")}
          >
            <CiCamera size={20} />
          </button>
          <Image
            src={avatarUrl}
            width={100}
            height={100}
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
          <div>
            <TextInput
              id="username"
              name="username"
              label="Nome de usuário"
              defaultValue={username}
              placeholder="ex.: jodaodasilva"
              onChange={(e) => debounced(e.target.value)}
              errors={errors.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
