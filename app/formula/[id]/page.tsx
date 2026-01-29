"use client";
import { useParams } from "next/navigation";
import tabledata from "../../../constants/table-data.json";
import INGREDIENTS from "../../../constants/Ingredients.json";
import Badge from "@/components/common/Badge";
import { useMemo, useRef, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@/lib/AgGrid";
import IngredientAutoCompleteEditor from "@/components/Ag-Grid/AutoCompleteEditor";
import {
  ArrowDownUpIcon,
  ArrowUpRightFromSquareIcon,
  CopyPlus,
  Filter,
  Import,
  Share2,
  Upload,
} from "lucide-react";
import IconCellRenderer from "@/components/Ag-Grid/IconCellRenderer";
import IngredientDropDownEditor from "@/components/Ag-Grid/InfDropDown";

export default function Page() {
  const params: any = useParams();
  const gridRef: any = useRef(0);

  const formula = tabledata.find((data: any) => data.id === Number(params.id));

  const [rowData, setRowData] = useState(() =>
    INGREDIENTS.filter((data) => data.formulaId === formula?.id),
  );

  const columnDefs: any = useMemo(
    () => [
      {
        field: "type",
        headerName: "Type",
        cellRenderer: IconCellRenderer,
        width: 50, // Set a fixed small width
        minWidth: 70, // Force a smaller minimum width than default
        maxWidth: 100, // Prevent it from growing
        flex: 0, // Ensure it doesn't expand to fill space
        resizable: true, // Optional: prevent users from resizing it
        suppressMovable: true,
      },
      {
        field: "name",
        headerName: "Ingredient Name",
        editable: true,
        cellEditor: IngredientDropDownEditor,
        cellEditorPopup: true,
        suppressKeyboardEvent: (params: any) => {
          const isEditing = params.editing;
          const key = params.event.key;

          // When editing, let editor handle these keys
          if (
            isEditing &&
            ["Enter", "ArrowUp", "ArrowDown", "Tab"].includes(key)
          ) {
            return true; // 🚨 GRID WILL IGNORE
          }
          return false;
        },
      },
      { field: "role", headerName: "Role" },
      { field: "physicalChar", headerName: "Physical State" },
      { field: "flash_point", headerName: "Flash Point" },
      { field: "quantity", headerName: "Qty", editable: true },
    ],
    [],
  );

  const defaultColDef = useMemo(() => ({ flex: 1 }), []);

  const addRow = () => {
    setRowData((prev: any) => [...prev, {}]);

    setTimeout(() => {
      const rowIndex = gridRef.current.api.getDisplayedRowCount() - 1;
      gridRef.current.api.setFocusedCell(rowIndex, "name");
      gridRef.current.api.startEditingCell({ rowIndex, colKey: "name" });
    }, 50);
  };

  const count = useMemo(() => rowData.length, [rowData]);

  return (
    <div>
      {/* Header */}
      <div>
        <div className="flex my-5 gap-2 text-xs text-black/40">
          <p>Projects</p>
          <p>&gt;</p>
          <p>Luxury Collection 2025</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{formula?.name}</p>
            <Badge
              title={formula?.status?.toUpperCase()}
              type="gray"
              version="AA"
            />
          </div>

          <div className="flex gap-3">
            <button className="cursor-pointer border border-gray-300 text-xs text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
              <CopyPlus size={13} />
              Copy
            </button>
            <button className="cursor-pointer border border-gray-300 text-xs text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
              <Import size={13} />
              Import
            </button>
            <button className="cursor-pointer border border-gray-300 text-xs text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
              <Upload size={13} />
              Export
            </button>
            <button className="cursor-pointer border border-gray-300 text-xs text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
              <Share2 size={13} />
              Share
            </button>
            <button className="cursor-pointer text-xs text-white bg-black flex gap-2 items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
              <ArrowUpRightFromSquareIcon size={10} />
              Send to Robot
            </button>
          </div>
        </div>
        <div className="text-black/40 text-xs flex gap-2 my-3">
          <p>Last edited {formula?.updated}</p>
          <p>•</p>
          <p>Formula {formula?.code}</p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <p className="font-bold">Ingredients ({count})</p>
            <div className="text-black/40 items-center flex text-xs gap-1">
              <Filter size={15} />
              <p>Filter</p>
            </div>
            <div className="text-black/40 flex items-center text-xs gap-1">
              <ArrowDownUpIcon size={15} />
              <p>Sort</p>
            </div>
          </div>
          <div>
            <button
              onClick={addRow}
              className="px-4 py-2 text-black border border-gray-300 text-sm rounded cursor-pointer hover:bg-zinc-200 transition-all hover:scale-110 duration-500"
            >
              + Add Ingredient
            </button>
          </div>
        </div>
        <div className="h-[60vh] w-full mt-5">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            context={{ allIngredients: INGREDIENTS, updateRowData: setRowData }}
            singleClickEdit={true}
          />
        </div>
      </div>
    </div>
  );
}
