"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { TPet } from "@/lib/types";
import { useState, createContext, useOptimistic } from "react";
import { toast } from "sonner";

type TPetContext = {
  pets: TPet[];
  selectedPetId: string | null;
  selectedPet: TPet | undefined;
  petsCount: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (pet: Omit<TPet, "id">) => Promise<void>;
  handleEditPet: (newPet: Omit<TPet, "id">, petId: string) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TPet[];
}) {
  //----------------------------------------------------------------------states

  const [pets, setPets] = useOptimistic(data, (state, { action, payload }) => {
    switch (action) {
      case "add":
        return [...state, { ...payload, id: Math.random().toString() }];
      case "edit":
        return state.map((state) =>
          state.id === payload.id ? { ...state, ...payload.newPet } : state
        );
      case "delete":
        return state.filter((state) => state.id !== payload.id);
      default:
        return state;
    }
  });

  const [selectedPetId, setSelectedPetId] = useState("");

  //----------------------------------------------------------------------derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const petsCount = pets.length;

  //----------------------------------------------------------------------handlers
  const handleAddPet = async (newPet: Omit<TPet, "id">) => {
    setPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleEditPet = async (newPet: Omit<TPet, "id">, petId: string) => {
    setPets({ action: "edit", payload: { id: petId, newPet } });
    const error = await editPet(newPet, petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: string) => {
    setPets({ action: "delete", payload: { id } });
    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId("");
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        petsCount,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
