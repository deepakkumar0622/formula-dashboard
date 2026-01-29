"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import "../../lib/AgGrid";
import Badge from "../common/Badge";

export default function IngredientDetailRenderer(props: any) {
  const { data: formula, ingredients } = props;

  const columnDefs = useMemo(
    () => [
      { field: "name", headerName: "Ingredient Name" },
      { field: "role", headerName: "Role" },
      { field: "physicalChar", headerName: "Physical State" },
      { field: "flash_point", headerName: "Flash Point" },
      { field: "quantity", headerName: "Qty" },
    ],
    [],
  );

  const defaultColDef = useMemo(() => ({ flex: 1 }), []);

  const handleAddIngredient = () => {
    alert("Add Ingredient for Formula " + formula.name);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-5 items-center mb-3">
        <h3 className="font-semibold text-gray-700 text-sm">
          Ingredients for {formula.name}
        </h3>
        <Badge title={"READ-ONLY"} type="" />
      </div>

      <div className="ag-theme-alpine h-48 w-full rounded overflow-hidden">
        <AgGridReact
          rowData={ingredients}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
