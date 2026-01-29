import { ArrowUpRightFromSquareIcon, MoveUpRight } from "lucide-react";
import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import Link from "next/link";

const ActionCellrenderer = (params: ICellRendererParams) => {
  const formula_id = params.data.id;

  return (
    <Link href={`/formula/${formula_id}`}>
      <button className="cursor-pointer  text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
        <ArrowUpRightFromSquareIcon size={12} />
        Open
      </button>
    </Link>
  );
};

export default ActionCellrenderer;
