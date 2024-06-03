"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import PetForm from "./petForm";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function PetButton({
  children,
  actionType,
  onClick,
  disabled,
}: {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (actionType === "checkout")
    return (
      <Button variant={"secondary"} onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={actionType === "add" ? "icon" : "default"}
          variant={actionType === "edit" ? "secondary" : "default"}
          onClick={onClick}
        >
          {actionType === "edit" ? children : <PlusIcon className="h-6 w-6" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a pet" : "Edit the pet info"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
