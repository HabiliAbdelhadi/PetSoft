"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addPet = async (pet) => {
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return { message: "Could not add pet." };
  }

  revalidatePath("/app", "layout");
};

export async function editPet(pet, petId: string) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: pet,
    });
  } catch (error) {
    return { message: "Could not edit pet." };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: string) {
  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return { message: "Could not delete pet." };
  }

  revalidatePath("/app", "layout");
}
