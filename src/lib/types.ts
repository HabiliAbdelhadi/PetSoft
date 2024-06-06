import { Pet } from "@prisma/client";

export type PetDto = Omit<Pet, "id" | "createdAt" | "updatedAt">;

// export type TPet = {
//   id: string;
//   name: string;
//   ownerName: string;
//   imageUrl: string;
//   age: number;
//   notes: string;
// };
