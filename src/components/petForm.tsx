"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, TPetForm } from "@/lib/validations";

export default function PetForm({
  actionType,
  onFormSubmission,
}: {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    trigger,
    register,
    formState: { errors },
    getValues,
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    },
  });

  return (
    <form
      action={async () => {
        const validation = await trigger();
        if (!validation) return;
        onFormSubmission();
        const petData = getValues();
        petData.imageUrl =
          petData.imageUrl ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
        petData.age = parseInt(petData.age as any);
        const error =
          actionType === "add"
            ? await handleAddPet(petData)
            : await handleEditPet(petData, selectedPet!.id);
      }}
    >
      <div className="space-y-3 flex flex-col">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} rows={3} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
        <Button type="submit" className="mt-5 self-end">
          {actionType === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </form>
  );
}
