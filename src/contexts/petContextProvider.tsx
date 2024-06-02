"use client";
import { TPet } from "@/lib/types";
import { useState, createContext } from "react";

type TPetContext = {
  pets: TPet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: TPet | undefined;
  petsCount: number;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TPet[];
}) {
  //states
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState("");
  //derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const petsCount = pets.length;

  //handlers
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId("");
  };
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        petsCount,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
