"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetDto } from "@/lib/types";
import { Pet } from "@prisma/client";
import { useState, createContext, useOptimistic } from "react";
import { toast } from "sonner";

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  petsCount: number;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleAddPet: (pet: PetDto) => Promise<void>;
  handleEditPet: (newPet: PetDto, petId: Pet["id"]) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
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
  const handleAddPet = async (newPet: PetDto) => {
    setPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (newPet: PetDto, petId: Pet["id"]) => {
    setPets({ action: "edit", payload: { id: petId, newPet } });
    const error = await editPet(newPet, petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setPets({ action: "delete", payload: { id } });
    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId("");
  };

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
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
