"use client";
import { usePetContext } from "@/lib/hooks";
import { TPet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./petButton";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  if (!selectedPet) return <EmptyView />;
  return (
    <section className="h-full w-full flex flex-col">
      <TopBar selectedPet={selectedPet} />
      <OtherInfo selectedPet={selectedPet} />
      <Notes selectedPet={selectedPet} />
    </section>
  );
}

function TopBar({ selectedPet }: { selectedPet: TPet }) {
  const { handleCheckoutPet } = usePetContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={selectedPet.imageUrl || ""}
        alt="Pet Image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => {
            await handleCheckoutPet(selectedPet.id);
          }}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}
function OtherInfo({ selectedPet }: { selectedPet: TPet }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
      </div>
    </div>
  );
}
function Notes({ selectedPet }: { selectedPet: TPet }) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {selectedPet?.notes}
    </section>
  );
}
function EmptyView() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-2xl font-medium">Select a pet to view details</p>
    </div>
  );
}
