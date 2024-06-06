"use server";

import prisma from "@/lib/db";
import { PetDto } from "@/lib/types";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addPet = async (pet: unknown) => {
  const validation = petFormSchema.safeParse(pet);
  if (!validation.success) {
    return { message: "Invalid form data." };
  }
  try {
    await prisma.pet.create({
      data: validation.data,
    });
  } catch (error) {
    return { message: "Could not add pet." };
  }

  revalidatePath("/app", "layout");
};

export async function editPet(pet: unknown, petId: unknown) {
  const validation = petFormSchema.safeParse(pet);
  const idValidation = petIdSchema.safeParse(petId);
  if (!validation.success || !idValidation.success) {
    return { message: "Invalid form data." };
  }
  try {
    await prisma.pet.update({
      where: { id: idValidation.data },
      data: validation.data,
    });
  } catch (error) {
    return { message: "Could not edit pet." };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const idValidation = petIdSchema.safeParse(petId);
  if (!idValidation.success) {
    return { message: "Invalid pet id." };
  }
  try {
    await prisma.pet.delete({
      where: { id: idValidation.data },
    });
  } catch (error) {
    return { message: "Could not delete pet." };
  }

  revalidatePath("/app", "layout");
}
