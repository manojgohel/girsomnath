"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const TALUKAS_LIST = [
  "All Talukas",
  "Veraval",
  "Somnath",
  "Talala",
  "Kodinar",
  "Una",
  "Sutrapada",
  "Gir Gadhada"
];

const TalukaContext = createContext({
  selectedTaluka: "All Talukas",
  setSelectedTaluka: () => {},
  isPickerOpen: false,
  setIsPickerOpen: () => {},
  selectTaluka: () => {}
});

export function TalukaProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [internalTaluka, setInternalTaluka] = useState(null);

  const urlTaluka = searchParams.get("taluka");
  const selectedTaluka = internalTaluka ?? urlTaluka ?? "All Talukas";

  const selectTaluka = (taluka) => {
    setInternalTaluka(taluka);
    setIsPickerOpen(false);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (!taluka || taluka === "All Talukas") {
        params.delete("taluka");
      } else {
        params.set("taluka", taluka);
      }
      const query = params.toString();
      const targetPath = pathname === "/" ? "/directory" : pathname;
      router.push(query ? `${targetPath}?${query}` : targetPath);
    });
  };

  return (
    <TalukaContext.Provider
      value={{
        selectedTaluka,
        setSelectedTaluka: setInternalTaluka,
        isPickerOpen,
        setIsPickerOpen,
        selectTaluka
      }}
    >
      {children}
    </TalukaContext.Provider>
  );
}

export const useTaluka = () => useContext(TalukaContext);
