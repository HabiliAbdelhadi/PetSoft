import { z } from "zod";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(15, "Name is too long"),
    ownerName: z
      .string()
      .trim()
      .min(1, "Owner Name is required")
      .max(20, "Owner Name is too long"),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url is invalid" }),
    ]),
    age: z.coerce.number().positive().int().max(100), //coece converts string to number //not compatible with getValues from react-hook-form
    notes: z.union([
      z.literal(""),
      z.string().trim().max(250, "Notes are too long"),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.jpg",
  }));

export const petIdSchema = z.string().cuid();

export type TPetForm = z.infer<typeof petFormSchema>;
