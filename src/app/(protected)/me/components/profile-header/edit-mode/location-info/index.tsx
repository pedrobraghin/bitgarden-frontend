import { TextInput } from "@/components";
import { useEditUserStore, useUserStore } from "@/lib/zustand";

export function LocationInfo() {
  const {
    user: {
      profile: { location },
    },
  } = useUserStore();

  const { setProfileData } = useEditUserStore();
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
          onChange={(e) => setProfileData({ location: e.target.value })}
        />
      </div>
    </div>
  );
}
