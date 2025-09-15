import { Button, TextInput } from "@/components";
import { useUserStore } from "@/lib/zustand";
import Image from "next/image";
import { CiCamera, CiSaveDown2 } from "react-icons/ci";

export function BasicInfo() {
  const {
    user: { avatarUrl, name, username },
  } = useUserStore();

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex items-center justify-center relative">
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
          <TextInput id="name" name="name" label="Nome" defaultValue={name} />
          <TextInput
            id="username"
            name="username"
            label="Nome de usuário"
            defaultValue={username}
            placeholder="ex.: jodaodasilva"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button label="Cancelar" onClick={() => undefined} style="outlined" />
        <Button
          label="Salvar"
          type="confirm"
          onClick={() => undefined}
          icon={<CiSaveDown2 size={18} />}
        />
      </div>
    </div>
  );
}
