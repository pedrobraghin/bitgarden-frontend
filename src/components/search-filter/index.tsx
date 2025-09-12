import { memo } from "react";

interface Filter {
  label: string;
  id: string;
  checked: boolean;
}

interface SearchFilterProps {
  filters: Filter[];
  handleChange: (checked: boolean, id: string) => void;
}

export function BaseSearchFilter({
  filters,
  handleChange,
}: Readonly<SearchFilterProps>) {
  return (
    <div className="flex items-center-safe gap-4">
      {filters.map((filter) => (
        <div className="flex items-center mb-4" key={filter.id}>
          <input
            id={filter.id}
            type="checkbox"
            value={filter.id}
            checked={filter.checked}
            onChange={(e) => handleChange(e.target.checked, e.target.value)}
            className="appearance-none w-4 h-4 bg-neutral-300/20 focus:ring-neutral-100 checked:bg-neutral-100 focus:ring-2 rounded-sm cursor-pointer"
          />
          <label
            htmlFor={filter.id}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          >
            {filter.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export const SearchFilter = memo(BaseSearchFilter);
