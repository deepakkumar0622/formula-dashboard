"use client";
import { useParams } from "next/navigation";
import tabledata from "@/constants/table-data.json";
import INGREDIENTS from "@/constants/Ingredients.json";
import Badge from "@/components/common/Badge";
import { useRef, useState, useEffect } from "react";
import {
  ArrowDownUpIcon,
  ArrowUpRightFromSquareIcon,
  CopyPlus,
  Filter,
  Import,
  Share2,
  Upload,
} from "lucide-react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Page() {
  const params: any = useParams();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstance = useRef<Tabulator | null>(null);

  const formula = tabledata.find((data: any) => data.id === Number(params.id));
  const [count, setCount] = useState(0);

  // const advancedIngredientEditor = (
  //   cell: any,
  //   onRendered: any,
  //   success: any,
  //   cancel: any,
  // ) => {
  //   const cellEl = cell.getElement();

  //   const input = document.createElement("input");
  //   input.className = "w-full border px-2 py-1 rounded outline-none";
  //   input.value = cell.getValue() || "";

  //   const dropdown = document.createElement("div");
  //   dropdown.className =
  //     "fixed bg-white border rounded shadow max-h-52 overflow-auto z-[9999] hidden";

  //   document.body.appendChild(dropdown);

  //   let selectedIndex = -1;
  //   let filtered: any[] = [];

  //   const positionDropdown = () => {
  //     const rect = input.getBoundingClientRect();
  //     dropdown.style.left = rect.left + "px";
  //     dropdown.style.top = rect.bottom + "px";
  //     dropdown.style.width = rect.width + "px";
  //   };

  //   const autoFill = (ingredient: any) => {
  //     const row = cell.getRow();
  //     row.update({
  //       role: ingredient.role,
  //       physicalChar: ingredient.physicalChar,
  //       flash_point: ingredient.flash_point,
  //       quantity: ingredient.quantity,
  //     });
  //   };

  //   const renderList = (value: string) => {
  //     dropdown.innerHTML = "";
  //     selectedIndex = -1;

  //     filtered = INGREDIENTS.filter((i) =>
  //       i.name.toLowerCase().includes(value.toLowerCase()),
  //     );

  //     filtered.forEach((item, index) => {
  //       const option = document.createElement("div");
  //       option.className =
  //         "px-2 py-1 text-sm cursor-pointer flex justify-between hover:bg-blue-100";
  //       option.innerHTML = `
  //       <span>${item.name}</span>
  //       <span class="text-xs text-gray-400">${item.role}</span>
  //     `;

  //       option.addEventListener("mousedown", () => {
  //         success(item.name);
  //         autoFill(item);
  //         dropdown.remove();
  //       });

  //       dropdown.appendChild(option);
  //     });

  //     dropdown.classList.toggle("hidden", filtered.length === 0);
  //     positionDropdown();
  //   };

  //   input.addEventListener("input", () => renderList(input.value));

  //   input.addEventListener("keydown", (e) => {
  //     const items = dropdown.children;

  //     if (e.key === "ArrowDown")
  //       selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
  //     if (e.key === "ArrowUp") selectedIndex = Math.max(selectedIndex - 1, 0);

  //     if (e.key === "Enter" && filtered[selectedIndex]) {
  //       e.preventDefault();
  //       success(filtered[selectedIndex].name);
  //       autoFill(filtered[selectedIndex]);
  //       dropdown.remove();
  //     }

  //     [...items].forEach((el, i) =>
  //       el.classList.toggle("bg-blue-200", i === selectedIndex),
  //     );
  //   });

  //   input.addEventListener("blur", () => {
  //     setTimeout(() => {
  //       dropdown.remove();
  //       success(input.value);
  //     }, 200);
  //   });

  //   onRendered(() => {
  //     input.focus();
  //     positionDropdown();
  //     renderList(input.value);
  //   });

  //   return input;
  // };

  const inlineSelectEditor = (
    cell: { getValue: () => string; getRow: () => any },
    onRendered: (arg0: () => void) => void,
    success: (arg0: string) => void,
    cancel: () => void,
  ) => {
    const input = document.createElement("input");
    input.className = "w-full border px-2 py-1 rounded outline-none";
    input.value = cell.getValue() || "";

    let currentMatch: any = null;
    let lastTyped = "";

    const findMatch = (value: string) => {
      if (value.length < 2) return null;

      return INGREDIENTS.find((i) =>
        i.name.toLowerCase().startsWith(value.toLowerCase()),
      );
    };

    const autoFillRow = (ingredient: any) => {
      const row = cell.getRow();
      row.update({
        role: ingredient.role,
        physicalChar: ingredient.physicalChar,
        flash_point: ingredient.flash_point,
      });
    };

    input.addEventListener("input", () => {
      const typed = input.value;
      lastTyped = typed;

      const match = findMatch(typed);

      if (!match || match.name.toLowerCase() === typed.toLowerCase()) {
        currentMatch = null;
        return;
      }

      currentMatch = match;

      // ✨ Replace value with suggestion
      input.value = match.name;

      // 🎯 Highlight suggestion part
      input.setSelectionRange(typed.length, match.name.length);
    });

    input.addEventListener("keydown", (e) => {
      if ((e.key === "Tab" || e.key === "ArrowRight") && currentMatch) {
        e.preventDefault();
        input.setSelectionRange(input.value.length, input.value.length);
        autoFillRow(currentMatch);
      }

      if (e.key === "Enter") {
        success(input.value);
        if (currentMatch) autoFillRow(currentMatch);
      }

      if (e.key === "Escape") cancel();
    });

    input.addEventListener("blur", () => {
      success(input.value);
      if (currentMatch) autoFillRow(currentMatch);
    });

    onRendered(() => {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });

    return input;
  };

  useEffect(() => {
    if (!tableRef.current) return;

    const initialData = INGREDIENTS.filter(
      (data) => data.formulaId === formula?.id,
    );
    setCount(initialData.length);

    // Initialize Tabulator
    const table = new Tabulator(tableRef.current, {
      data: initialData,
      layout: "fitColumns",
      height: "60vh",
      reactiveData: true,
      columns: [
        {
          title: "Type",
          field: "type",
          width: 70,
          headerSort: false,
          hozAlign: "center",
          formatter: () => `<div class="flex justify-center mt-1">🧪</div>`,
        },
        // {
        //   title: "Ingredient Name",
        //   field: "name",
        //   editor: "list",
        //   editorParams: {
        //     values: INGREDIENTS.map((i) => i.name),
        //     autocomplete: true,
        //     clearable: true,
        //   },
        //   widthGrow: 2,
        // },

        {
          title: "Ingredient Name",
          field: "name",
          editor: inlineSelectEditor,
        },
        { title: "Role", field: "role", editor: "input" },
        { title: "Physical State", field: "physicalChar", editor: "input" },
        { title: "Flash Point", field: "flash_point", editor: "input" },
        { title: "Qty", field: "quantity", editor: "number" },
      ],
    });

    table.on("cellEdited", (cell) => {
      if (cell.getField() === "name") {
        const value = cell.getValue();

        if (!value || value.trim() === "") {
          cell.getRow().delete();
        } else {
          const ingredient = INGREDIENTS.find((i) => i.name === value);
          if (ingredient) {
            cell.getRow().update({
              role: ingredient.role,
              physicalChar: ingredient.physicalChar,
              flash_point: ingredient.flash_point,
            });
          }
        }
      }
    });

    table.on("dataChanged", () => {
      setCount(table.getDataCount());
    });

    tableInstance.current = table;

    return () => {
      table.destroy();
    };
  }, [formula?.id]);

  const addRow = () => {
    if (!tableInstance.current) return;

    const newRow = {
      formulaId: Number(params.id),
      name: "",
      quantity: 0,
      role: "",
      physicalChar: "",
      flash_point: "",
    };

    tableInstance.current.addRow(newRow, false).then((row) => {
      setTimeout(() => {
        row.getCell("name").edit();
      }, 100);
    });
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

        <div className="mt-5 border rounded-xl overflow-hidden shadow-sm">
          <div ref={tableRef} className="tabulator-custom-style" />
        </div>
      </div>
    </div>
  );
}
