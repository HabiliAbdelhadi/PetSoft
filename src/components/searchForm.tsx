"use client";
import { useSearchContext } from "@/lib/hooks";
import React, { use } from "react";

export default function SearchForm() {
  const { search, handleSearchChange } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder-white/50 text-base"
        type="search"
        placeholder="Search Pets"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={search}
      />
    </form>
  );
}
