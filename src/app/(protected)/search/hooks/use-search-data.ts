import { Project, User } from "@/@types";
import { api } from "@/lib/api";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearchData() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [term] = useDebounce(searchTerm, 200);
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    users: true,
    projects: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchResponse, setSearchResponse] = useState<{
    users: User[];
    projects: Project[];
  }>({
    users: [],
    projects: [],
  });

  const handleSearch = useCallback(async () => {
    try {
      if (!term?.trim()) return;
      setIsLoading(true);
      setIsError(false);

      const { data } = await api.get(`/search/${term}`, {
        params: {
          users: selectedFilters.users,
          projects: selectedFilters.projects,
        },
      });
      setSearchResponse(data);
    } catch {
      setIsError(true);
      setSearchResponse({ projects: [], users: [] });
    } finally {
      setIsLoading(false);
    }
  }, [term, selectedFilters]);

  const handleSelectFilter = useCallback((checked: boolean, id: string) => {
    setSelectedFilters((prev) => {
      if (id === "all") {
        return {
          all: checked,
          users: checked,
          projects: checked,
        };
      }

      const newState = {
        ...prev,
        [id]: checked,
      };

      return {
        ...newState,
        all: newState.projects && newState.users,
      };
    });
  }, []);

  const filters = useMemo(() => {
    return [
      {
        id: "all",
        label: "Todos",
        checked: selectedFilters.all,
      },
      {
        id: "users",
        label: "Usuários",
        checked: selectedFilters.users,
      },
      {
        id: "projects",
        label: "Projetos",
        checked: selectedFilters.projects,
      },
    ];
  }, [selectedFilters]);

  return {
    handleSearch,
    handleSelectFilter,
    term,
    setSearchTerm,
    filters,
    isLoading,
    isError,
    searchResponse,
  };
}
