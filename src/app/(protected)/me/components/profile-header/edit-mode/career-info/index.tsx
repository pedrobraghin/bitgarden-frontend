import { useEditUserStore, useUserStore } from "@/lib/zustand";

export function CareerInfo() {
  const {
    user: {
      profile: { availableForOpportunities },
    },
  } = useUserStore();
  const { setProfileData } = useEditUserStore();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">Carreira</h2>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          value="available"
          id="available"
          onChange={(e) =>
            setProfileData({ availableForOpportunities: e.target.checked })
          }
          defaultChecked={availableForOpportunities}
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
  );
}
