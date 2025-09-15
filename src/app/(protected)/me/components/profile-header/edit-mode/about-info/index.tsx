import { Button, Textarea, TextInput } from "@/components";
import { useUserStore } from "@/lib/zustand";
import { CiSaveDown2 } from "react-icons/ci";

export function AboutInfo() {
  const {
    user: {
      profile: { headline, bio },
    },
  } = useUserStore();

  return (
    <div>
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
