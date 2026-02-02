"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FormModal from "../FormModal";
import ingredients from "@/constants/Ingredients.json";
import AgDataGrid from "../AgDataGrid";
import StatusCellRenderer from "@/components/Ag-Grid/StatusCellRenderer";
import ActionCellrenderer from "../ActionRenderer";
import tableData from "../../../../constants/table-data.json";

export default function FormulasPage() {
  
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

const colDefs: any = useMemo(
    () => [
      {
        field: "name",
        headerName: "Formula Name",
        cellRenderer: "agGroupCellRenderer",
        flex: 2,
        minWidth: 220,
      },
      { field: "code", headerName: "Formula Code" },
      { field: "type", headerName: "Formula Type" },
      { field: "version", headerName: "Version" },
      { field: "class", headerName: "Class" },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: StatusCellRenderer,
      },
      { field: "updated", headerName: "Last Updated Date" },
      {
        field: "actions",
        headerName: "Actions",
        cellRenderer: ActionCellrenderer,
      },
    ],
    [],
  );
  
  return (
  <div>
    <AgDataGrid
          rowData={tableData}
          columnDefs={colDefs} 
          defaultColDef={defaultColDef} 
           />
  </div>
  );
}
