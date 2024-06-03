import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import BackgroundPattern from "@/components/backgroundPattern";
import PetContextProvider, { PetContext } from "@/contexts/petContextProvider";
import SearchContextProvider from "@/contexts/searchContextProvider";
import prisma from "@/lib/db";
import { TPet } from "@/lib/types";

import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4 flex-col flex min-h-screen">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
    </>
  );
}
