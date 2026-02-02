"use client";
import { createContext, useContext, useState } from "react";
import formulaData from "@/constants/table-data.json";
export interface Formula {
  id: number;
  name: string;
  code: string;
  type: string;
  version: string;
  class: string;
  status: string;
  updated: string;
}

interface FormulaContextType {
  formulas: Formula[];
  addFormula: (formula: Formula) => void;
  updateFormula: (id: number, updatedData: Partial<Formula>) => void;
  deleteFormula: (id: number) => void;
  getFormulaById: (id: number) => Formula | undefined;
}

const FormulaContext = createContext<FormulaContextType | null>(null);

export const FormulaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formulas, setFormulas] = useState<any>(formulaData);

  const addFormula = (formula: Formula) => {
    setFormulas((prev: any) => [...prev, formula]);
  };

  const updateFormula = (id: number, updatedData: Partial<Formula>) => {
    setFormulas((prev: any[]) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedData } : f)),
    );
  };

  const deleteFormula = (id: number) => {
    setFormulas((prev: any[]) => prev.filter((f) => f.id !== id));
  };

  const getFormulaById = (id: number) => {
    return formulas.find((f: any) => f.id === id);
  };

  return (
    <FormulaContext.Provider
      value={{
        formulas,
        addFormula,
        updateFormula,
        deleteFormula,
        getFormulaById,
      }}
    >
      {children}
    </FormulaContext.Provider>
  );
};

export const useFormula = () => {
  const context = useContext(FormulaContext);
  if (!context)
    throw new Error("useFormula must be used inside FormulaProvider");
  return context;
};
