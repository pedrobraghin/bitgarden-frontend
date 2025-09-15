import { Button, TextInput } from "@/components";
import { useUserStore } from "@/lib/zustand";
import { CiSaveDown2 } from "react-icons/ci";

export function LocationInfo() {
  const {
    user: {
      profile: { location },
    },
  } = useUserStore();

  return (
    <div>
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
