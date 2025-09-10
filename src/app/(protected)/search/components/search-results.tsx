import { UserResults } from "./user-results";
import { ProjectResults } from "./project-results";
import { SearchResultProps } from "./types";

export function SearchResults({
  isError,
  isLoading,
  projects,
  term,
  users,
}: Readonly<SearchResultProps>) {
  if (!term) {
    return (
      <div>
        <span className="italic text-sm text-neutral-400">
          Comece a digitar para exibir resultados.
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <span>Pesquisando...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>
          Erro ao realizar pesquisa. Tente novamente em alguns segundos.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UserResults users={users} />
      <ProjectResults projects={projects} />
    </div>
  );
}
