"use client";
import { useParams, useRouter } from "next/navigation";

import INGREDIENTS from "@/constants/Ingredients.json";
import Badge from "@/components/common/Badge";
import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@/lib/AgGrid";
import IngredientAutoCompleteEditor from "@/components/Ag-Grid/Inputs/AutoCompleteEditor";
import {
  ArrowDownUpIcon,
  ArrowUpRightFromSquareIcon,
  CopyPlus,
  Filter,
  Import,
  Share2,
  Upload,
} from "lucide-react";
import IconCellRenderer from "@/components/Ag-Grid/Cell Renderers/IconCellRenderer";
import IngredientDropDownEditor from "@/components/Ag-Grid/Inputs/InfDropDown";
import Modal from "@/components/common/Modal";
import InputField from "@/components/common/Input";
import { useFormula } from "@/context/Data";

export default function Page() {
  const params = useParams();
  const navigate = useRouter();
  const { formulas, addFormula, getFormulaById } = useFormula();
  const formula: any = getFormulaById(Number(params.id));

  const [copyData, setCopyData] = useState({
    name: "",
    code: "",
    type: "",
    project: "Luxury Collection 2025",
    description: "",
  });

  const gridRef: any = useRef(0);

  const [isOpen, setIsOpen] = useState(false);

  const [rowData, setRowData] = useState(() =>
    INGREDIENTS.filter((i) => formula?.ingredients.includes(i.id)),
  );

  const columnDefs: any = useMemo(
    () => [
      {
        field: "type",
        headerName: "Type",
        cellRenderer: IconCellRenderer,
        width: 50,
        minWidth: 70,
        maxWidth: 100,
        flex: 0,
        resizable: true,
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

          if (
            isEditing &&
            ["Enter", "ArrowUp", "ArrowDown", "Tab"].includes(key)
          ) {
            return true;
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

  const incrementVersion = (version: string) => {
    const match = version.match(/\d+/); // Extract number from "V3"
    if (!match) return "V1";
    const next = Number(match[0]) + 1;
    return `V${next}`;
  };

  const handleCopyFormula = () => {
    if (!formula) return;

    const newId =
      formulas.length > 0 ? Math.max(...formulas.map((f) => f.id)) + 1 : 1;

    const lastCodeNumber = Math.max(
      ...formulas.map((f) => Number(f.code.split("-").pop())),
    );
    const newCodeNumber = String(lastCodeNumber + 1).padStart(3, "0");
    const newCode = `FA-2025-${newCodeNumber}`;

    const newVersion = incrementVersion(formula.version);

    const newFormula = {
      ...formula,
      id: newId,
      name: copyData.name, // 🔥 from modal
      code: newCode,
      version: newVersion,
      status: "Draft",
      description: copyData.description,
      updated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      ingredients: [...formula.ingredients],
    };

    addFormula(newFormula);
    setIsOpen(false);

    navigate.push("/formula");
  };

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
            <button
              className="cursor-pointer border border-gray-300 text-xs text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200"
              onClick={() => {
                if (!formula) return;

                const lastCodeNumber = Math.max(
                  ...formulas.map((f) => Number(f.code.split("-").pop())),
                );
                const newCodeNumber = String(lastCodeNumber + 1).padStart(
                  3,
                  "0",
                );
                const newCode = `FA-2025-${newCodeNumber}`;

                const newVersion = incrementVersion(formula.version);

                setCopyData({
                  name: `${formula.name} - Copy`,
                  code: newCode,
                  type: formula.type,

                  project: "Luxury Collection 2025",
                  description: "",
                });

                setIsOpen(true);
              }}
            >
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

      {/* Modals */}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Copy Formula"
      >
        {/* Grid Pattern */}
        <div className="grid grid-cols-2 grid-rows-2 gap-8 space-x-5">
          <InputField
            label="Formula Name"
            value={copyData.name}
            onChange={(e: any) =>
              setCopyData((p) => ({ ...p, name: e.target.value }))
            }
          />

          <InputField
            label="Formula Code"
            value={copyData.code}
            editable={false}
          />

          <InputField
            label="Formula Type"
            value={copyData.type}
            editable={false}
          />

          <InputField
            label="Project / Workspace"
            value={copyData.project}
            editable={false}
          />
        </div>

        <div className="mt-2">
          <p className="font-semibold text-sm">Description :</p>
          <textarea
            value={copyData.description}
            onChange={(e) =>
              setCopyData((p) => ({ ...p, description: e.target.value }))
            }
            className="border w-full border-gray-200 mt-2 rounded-sm h-32"
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-200 flex items-center justify-end pr-5 gap-5 h-[10vh] ">
          <button className="cursor-pointer border border-gray-200 text-black  bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200">
            Cancel
          </button>
          <button
            onClick={handleCopyFormula}
            className="cursor-pointer border border-gray-200 text-white  bg-black px-2 py-2 rounded-lg font-semibold text-sm hover:bg-zinc-300 transition-all ease-in duration-200"
          >
            Copy Formula
          </button>
        </div>
      </Modal>
    </div>
  );
}
