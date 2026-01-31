'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import tableData from '../../../../constants/table-data.json';

export default function FormulasTable() {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstance = useRef<Tabulator | null>(null);

  const [formulas, setFormulas] = useState(
    tableData.map((f) => ({ ...f, status: 'active' }))
  );

  // Soft delete toggle
  const softDeleteRow = (row: any) => {
    const data = row.getData();
    data.status = data.status === 'deleted' ? 'active' : 'deleted';
    row.update(data);
  };

  useEffect(() => {
    if (!tableRef.current) return;

    tableInstance.current = new Tabulator(tableRef.current, {
      data: formulas,
      layout: 'fitColumns',
      movableColumns: true,
      columns: [
        { title: 'Formula Name', field: 'name' },
        { title: 'Code', field: 'code' },
        { title: 'Type', field: 'type' },
        { title: 'Version', field: 'version' },
        { title: 'Class', field: 'class' },
        { title: 'Status', field: 'status' },
        { title: 'Updated', field: 'updated' },
        {
          title: 'Actions',
          hozAlign: 'center',
          formatter: () => `
            <button class="edit-btn px-2 py-1 mr-1 border rounded">Edit</button>
            <button class="softdel-btn px-2 py-1 mr-1 border rounded">Soft Delete</button>
            <button class="delete-btn px-2 py-1 border rounded">Delete</button>
          `,
          cellClick: (e, cell) => {
            const row = cell.getRow();
            const rowData = row.getData();
            const btn = (e.target as HTMLElement).closest('button');
            if (!btn) return;

            if (btn.classList.contains('edit-btn')) {
              alert('Edit: ' + rowData.name);
            } else if (btn.classList.contains('softdel-btn')) {
              softDeleteRow(row);
            } else if (btn.classList.contains('delete-btn')) {
              if (confirm('Delete: ' + rowData.name)) {
                row.delete();
                setFormulas((prev) =>
                  prev.filter((f) => f.id !== rowData.id)
                );
              }
            }
          },
        },
      ],
      rowFormatter: (row) => {
        const data = row.getData();
        const el = row.getElement();
        if (data.status === 'deleted') {
          el.style.textDecoration = 'line-through';
          el.style.opacity = '0.5';
        } else {
          el.style.textDecoration = '';
          el.style.opacity = '1';
        }
      },
    });

    return () => {
      tableInstance.current?.destroy();
    };
  }, [formulas]);

  return <div ref={tableRef} className="w-full h-[60vh] border rounded-xl" />;
}
