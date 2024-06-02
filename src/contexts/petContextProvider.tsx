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
  handleAddPet: (pet: Omit<TPet, "id">) => void;
  handleEditPet: (newPet: TPet) => void;
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
  const handleAddPet = (pet: Omit<TPet, "id">) => {
    setPets((prev) => [...prev, { ...pet, id: `${prev.length + 1}` }]);
  };
  const handleEditPet = (newPet: TPet) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === newPet.id ? { ...newPet } : pet))
    );
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
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
