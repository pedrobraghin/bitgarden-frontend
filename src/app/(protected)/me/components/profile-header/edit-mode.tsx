import Image from "next/image";
import { EditModeProps } from "./types";
import { Button, TextInput, Textarea } from "@/components";
import { CiCamera, CiSaveDown2 } from "react-icons/ci";

export function EditMode({
  avatarUrl,
  bio,
  headline,
  location,
  name,
  username,
  onSave,
  onCancel,
}: Readonly<EditModeProps>) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold">Editar dados do perfil</h1>

      {/* Informações básicas */}
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

      {/* Sobre você */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Sobre você</h2>
        <TextInput
          id="headline"
          name="headline"
          label="Headline"
          defaultValue={headline}
          placeholder="ex.: Dev Backend | Node"
        />
        <Textarea
          id="bio"
          name="bio"
          label="Bio"
          defaultValue={bio}
          maxLength={200}
          placeholder="ex.: Eu sou João, programador backend nodejs"
        />
      </div>

      {/* Localização */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Localização</h2>
        <TextInput
          id="location"
          name="location"
          label="Cidade/Estado"
          defaultValue={location}
          placeholder="ex.: São Paulo/SP"
        />
      </div>

      {/* Trabalho */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Carreira</h2>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            value="available"
            id="available"
            className="appearance-none w-4 h-4 bg-neutral-300/20 focus:ring-neutral-100 checked:bg-neutral-100 focus:ring-2 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="available"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          >
            Aberto para contato
          </label>
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-2">
        <Button label="Cancelar" onClick={onCancel} style="outlined" />
        <Button
          label="Salvar"
          type="confirm"
          onClick={onSave}
          icon={<CiSaveDown2 size={18} />}
        />
      </div>
    </div>
  );
}
