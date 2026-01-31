"use client";

import React, { useMemo } from "react";
import tableData from "../../constants/table-data.json";
import "../../lib/AgGrid";
import { AgGridReact } from "ag-grid-react";
import ActionCellrenderer from "../Ag-Grid/ActionCellrenderer";
import ingredients from "@/constants/Ingredients.json";
import IngredientDetailRenderer from "./IngredientTable";
import StatusCellRenderer from "../Ag-Grid/StatusCellRenderer";

const AgGrid = () => {
  const colDefs: any = useMemo(
    () => [
      {
        field: "name",
        headerName: "Formula Name",
        cellRenderer: "agGroupCellRenderer",
        flex: 2, //takes 2x space of others
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
      const formulaId = params.data.id;

      const relatedIngredients = ingredients.filter(
        (item) => item.formulaId === formulaId,
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
          rowData={tableData}
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
