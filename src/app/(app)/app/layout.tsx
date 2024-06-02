import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import BackgroundPattern from "@/components/backgroundPattern";
import PetContextProvider, { PetContext } from "@/contexts/petContextProvider";
import SearchContextProvider from "@/contexts/searchContextProvider";
import { TPet } from "@/lib/types";

import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) throw new Error("Failed to fetch pets");
  const data: TPet[] = await response.json();
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
