"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { useCallback, useMemo, useState } from "react";
import ActionRenderer from "./ActionRenderer";
import EditModal from "./FormModal";
import "../../../lib/AgGrid";
import FormModal from "./FormModal";
// import theme from "./them";

type Props = {
  rowData: any[];
  columnDefs: ColDef[];
  defaultColDef: ColDef;
  detailCellRendererParams?: (params: any) => any;
};

export default function AgGrid({
  rowData,
  columnDefs,
  defaultColDef,
  detailCellRendererParams,
}: Props) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [editingRow, setEditingRow] = useState<any>(null);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const getRowStyle = useCallback((params: any) => {
    if (params.data.deleted) {
      return { textDecoration: "line-through", opacity: 0.5 };
    }
    return undefined;
  }, []);
    const defCols = useMemo(() => ({ flex: 1, sortable: false }), []);
  return (
    <>
      <div className="ag-theme-alpine h-[450px]">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={detailCellRendererParams ? true : false}
          detailRowHeight={260}
          animateRows={true}
          detailCellRendererParams={detailCellRendererParams}


          components={{
            actionRenderer: (props: any) => (
              <ActionRenderer
                {...props}
                gridApi={gridApi}
                onEdit={setEditingRow}
              />
            ),
          }}
          getRowStyle={getRowStyle}
          suppressClickEdit
          onGridReady={onGridReady}
        />
      </div>

      {editingRow && (
        <FormModal
          type="edit"
          data={editingRow}
          onClose={() => setEditingRow(null)}
          onSave={(updated) => {
            gridApi?.applyTransaction({ update: [updated] });
            setEditingRow(null);
          }}
        />
      )}
    </>
  );
}
