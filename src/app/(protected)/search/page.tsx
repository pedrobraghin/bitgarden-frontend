"use client";

import { SearchFilter, SearchInput } from "@/components";
import { useEffect } from "react";
import { useSearchData } from "./hooks";
import { SearchResults } from "./components";

export default function SearchPage() {
  const {
    handleSearch,
    handleSelectFilter,
    term,
    setSearchTerm,
    filters,
    isError,
    isLoading,
    searchResponse,
  } = useSearchData();

  useEffect(() => {
    handleSearch();
  }, [handleSearch, term]);

  return (
    <div className="pt-10 pr-20">
      <div className="flex flex-col gap-4">
        <h1>Pesquise por um usuário ou projeto</h1>
        <div className="flex items-center gap-4">
          <SearchInput onChange={setSearchTerm} onEnter={handleSearch} />
        </div>

        <SearchFilter handleChange={handleSelectFilter} filters={filters} />

        <div>
          <SearchResults
            isError={isError}
            isLoading={isLoading}
            projects={searchResponse.projects}
            users={searchResponse.users}
            term={term}
          />
        </div>
      </div>
    </div>
  );
}
