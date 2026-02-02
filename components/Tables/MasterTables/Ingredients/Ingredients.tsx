"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FormModal from "../FormModal";
import ingredients from "@/constants/Ingredients.json";
import AgDataGrid from "../AgDataGrid";

export default function IngredientsPage() {
  
  const [create, setCreate] = useState(false);
  const defaultColDef = useMemo(
  () => ({
    filter: false,
    editable: (params: any) =>
      params.data?.isEditing === true &&
      params.colDef.field !== "id",
    enablePivot: true,
    enableValue: true,
    enableRowGroup: true,
    resizable: true,
    sortable: false
  }),
  []
);

const [editingRow, setEditingRow] = useState<any | null>(null);
const [showForm, setShowForm] = useState(false);

const handleEdit = (row: any) => {
  setEditingRow(row);
  setShowForm(true);
};

const handleSave = (data: any) => {
  console.log("Saved:", data);

  setShowForm(false);
  setEditingRow(null);

  // refresh grid data
};

const handleCreate = () => {
  setEditingRow(null);
  setShowForm(true);
};

const columnDefs = useMemo(
    () => [
      { field: "name", headerName: "Ingredient Name" },
      { field: "role", headerName: "Role" },
      { field: "physicalChar", headerName: "Physical State" },
      { field: "flash_point", headerName: "Flash Point" },
      { field: "quantity", headerName: "Qty" },
    {
      headerName: "Actions",
      cellRenderer: "actionRenderer",
      width: 180,
    },
    ],
    [],
  );
  
  return (
  <div>
    <AgDataGrid
          rowData={ingredients}
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
           />
  </div>
  );
}
