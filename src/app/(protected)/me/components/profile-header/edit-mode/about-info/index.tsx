import { Textarea, TextInput } from "@/components";
import { useEditUserStore, useUserStore } from "@/lib/zustand";

export function AboutInfo() {
  const {
    user: {
      profile: { headline, bio },
    },
  } = useUserStore();
  const { setProfileData } = useEditUserStore();

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
          onChange={(e) => setProfileData({ headline: e.target.value })}
        />
        <Textarea
          id="bio"
          name="bio"
          label="Bio"
          defaultValue={bio}
          maxLength={200}
          placeholder="ex.: Eu sou João, programador backend nodejs"
          onChange={(e) => setProfileData({ bio: e.target.value })}
        />
      </div>
    </div>
  );
}
