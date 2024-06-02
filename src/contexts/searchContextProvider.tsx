"use client";

import { useState, createContext } from "react";

type TSerachContext = {
  search: string;
  handleSearchChange: (string: string) => void;
};

export const SearchContext = createContext<TSerachContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //states
  const [search, setSearch] = useState("");

  //derived states

  //handlers
  const handleSearchChange = (string: string) => {
    setSearch(string);
  };

  return (
    <SearchContext.Provider value={{ search, handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
}
