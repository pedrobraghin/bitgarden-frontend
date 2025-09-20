import { useEditUserStore, useUserStore } from "@/lib/zustand";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

export function CareerInfo() {
  const {
    user: {
      profile: { availableForOpportunities },
    },
  } = useUserStore();
  const { setProfileData } = useEditUserStore();
  const [checked, setChecked] = useState(availableForOpportunities);

  const activeStyle: Record<string, string> = {
    true: "text-green-500",
    false: "text-red-500",
  };

  const handleChange = useCallback(
    (checked: boolean) => {
      setProfileData({ availableForOpportunities: checked });
      setChecked(checked);
    },
    [setProfileData]
  );

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">Carreira</h2>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          value="available"
          id="available"
          onChange={(e) => handleChange(e.target.checked)}
          defaultChecked={availableForOpportunities}
          className={twMerge(
            "appearance-none w-4 h-4 bg-neutral-300/20 focus:ring-neutral-100 checked:bg-neutral-100 focus:ring-2 rounded-sm cursor-pointer",
            activeStyle[String(checked)]
          )}
        />
        <label
          htmlFor="available"
          className={twMerge(
            "ms-2 text-sm font-medium text-gray-300 cursor-pointer",
            activeStyle[String(checked)]
          )}
        >
          {checked ? "Aberto para contato" : "Indisponível para contato"}
        </label>
      </div>
    </div>
  );
}
