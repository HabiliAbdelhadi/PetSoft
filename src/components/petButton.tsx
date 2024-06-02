import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { MouseEventHandler } from "react";

export default function PetButton({
  children,
  actionType,
  onClick,
}: {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
}) {
  if (actionType === "add")
    return (
      <Button size={"icon"} onClick={onClick}>
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  if (actionType === "edit")
    return (
      <Button variant={"secondary"} onClick={onClick}>
        {children}
      </Button>
    );
  if (actionType === "checkout")
    return (
      <Button variant={"secondary"} onClick={onClick}>
        {children}
      </Button>
    );
}
