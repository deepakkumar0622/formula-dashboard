"use client";

import { useMemo } from "react";

import "../../lib/AgGrid";
import { AgGridReact } from "ag-grid-react";
import ActionCellrenderer from "../Ag-Grid/Cell Renderers/ActionCellrenderer";
import ingredients from "@/constants/Ingredients.json";
import IngredientDetailRenderer from "./IngredientTable";
import StatusCellRenderer from "../Ag-Grid/Cell Renderers/StatusCellRenderer";
import { useFormula } from "@/context/Data";

const AgGrid = () => {
  const { formulas } = useFormula();
  console.log(formulas);

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

  const defCols = useMemo(() => ({ flex: 1, sortable: false }), []);

  const detailCellRendererParams = useMemo(() => {
    return (params: any) => {
      const formula = params.data;

      const relatedIngredients = ingredients.filter((i) =>
        formula?.ingredients.includes(i.id),
      );

      return {
        ingredients: relatedIngredients,
      };
    };
  }, []);

  return (
    <div>
      <div className="h-[60vh] w-full">
        <AgGridReact
          rowData={formulas}
          columnDefs={colDefs}
          defaultColDef={defCols}
          masterDetail={true}
          detailCellRenderer={IngredientDetailRenderer}
          detailCellRendererParams={detailCellRendererParams}
          detailRowHeight={260}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default AgGrid;
