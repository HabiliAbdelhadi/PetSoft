import { PetContext } from "@/contexts/petContextProvider";
import { SearchContext } from "@/contexts/searchContextProvider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context)
    throw new Error("usePetContext must be used within a PetContextProvider");

  return context;
}
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );

  return context;
}
