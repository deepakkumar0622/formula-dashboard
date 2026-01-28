"use client";

import { useEffect, useRef, useCallback } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import tableData from "../../constants/table-data.json";
import ingredients from "../../constants/Ingredients.json";

export default function TabulatorTable() {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstance = useRef<Tabulator | null>(null);

  // 🔹 Create Child Table
  const createDetailTable = useCallback(
    (container: HTMLElement, formulaId: number) => {
      const childData = ingredients.filter(
        (item: any) => item.formulaId === formulaId,
      );

      new Tabulator(container, {
        data: childData,
        layout: "fitColumns",
        height: "200px",
        columns: [
          { title: "Ingredient", field: "name" },
          { title: "Role", field: "role" },
          { title: "Physical", field: "physicalChar" },
          { title: "Flash Point", field: "flash_point" },
          { title: "Qty", field: "quantity" },
        ],
      });
    },
    [],
  );

  // 🔹 Initialize Main Table
  useEffect(() => {
    if (!tableRef.current) return;

    tableInstance.current = new Tabulator(tableRef.current, {
      data: tableData,
      layout: "fitColumns",
      responsiveLayout: false,
      movableColumns: true,
      columns: [
        { title: "Formula Name", field: "name" },
        { title: "Code", field: "code" },
        { title: "Type", field: "type" },
        { title: "Version", field: "version" },
        { title: "Class", field: "class" },
        {
          title: "Status",
          field: "status",
          formatter: (cell) => {
            const value = cell.getValue()?.toLowerCase();

            const colors =
              value === "draft"
                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                : "bg-emerald-100 text-emerald-700 border-emerald-300";

            return `<span class="px-2 py-1 text-xs rounded border ${colors}">
              ${cell.getValue()}
            </span>`;
          },
        },

        { title: "Updated", field: "updated" },
        {
          title: "Actions",
          field: "actions",
          hozAlign: "center",
          formatter: () => {
            return `
     <div className="">
      <button className="cursor-pointer text-black flex gap-2 bg-white  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
        <ArrowUpRightFromSquareIcon size={12} />
        Open
      </button>
    </div>
    `;
          },
          cellClick: (e, cell) => {
            const data = cell.getRow().getData();

            if ((e.target as HTMLElement).classList.contains("view-btn")) {
              alert("View " + data.name);
            }
          },
        },
      ],

      rowFormatter: (row: any) => {
        const rowData = row.getData();
        const rowEl = row.getElement();
        console.log(rowEl);
        const toggle = document.createElement("span");
        toggle.innerHTML = "▶";
        toggle.className =
          "mr-2 cursor-pointer text-gray-500 hover:text-blue-600";

        rowEl.querySelector(".tabulator-cell")?.prepend(toggle);

        let detailHolder: HTMLDivElement | null = null;

        toggle.addEventListener("click", (e) => {
          e.stopPropagation();

          const isOpen = rowEl.classList.contains("detail-open");

          if (isOpen) {
            detailHolder?.remove();
            rowEl.classList.remove("detail-open");
            toggle.innerHTML = "▶";
          } else {
            detailHolder = document.createElement("div");
            detailHolder.className = "p-4 bg-slate-50 border-t rounded-b-lg";

            const title = document.createElement("div");
            title.innerHTML = `<div class="flex justify-between items-center mb-2">
                                  <h3 class="font-semibold text-sm">Ingredients</h3>
                                  <button class="px-2 py-1 bg-blue-600 text-white text-xs rounded">Add</button>
                               </div>`;

            const tableEl = document.createElement("div");

            detailHolder.appendChild(title);
            detailHolder.appendChild(tableEl);

            rowEl.appendChild(detailHolder);

            createDetailTable(tableEl, rowData.id);

            rowEl.classList.add("detail-open");
            toggle.innerHTML = "▼";
          }
        });
      },
    });

    return () => {
      tableInstance.current?.destroy();
    };
  }, [createDetailTable]);

  return (
    <div className="w-full h-[60vh] overflow-hidden border rounded-xl">
      <div ref={tableRef} className="w-full h-full" />
    </div>
  );
}
