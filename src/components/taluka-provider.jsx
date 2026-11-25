"use client";

import { createContext, useContext, useState } from "react";
import { TALUKAS, TALUKAS_LIST } from "@/lib/constants";

export { TALUKAS, TALUKAS_LIST };

const TalukaContext = createContext({
  selectedTaluka: "All Talukas",
  setSelectedTaluka: () => {},
  isPickerOpen: false,
  setIsPickerOpen: () => {},
  selectTaluka: () => {}
});

export function TalukaProvider({ children }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTaluka, setSelectedTaluka] = useState("All Talukas");

  const selectTaluka = (taluka) => {
    setSelectedTaluka(taluka);
    setIsPickerOpen(false);
  };

  return (
    <TalukaContext.Provider
      value={{
        selectedTaluka,
        setSelectedTaluka,
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
