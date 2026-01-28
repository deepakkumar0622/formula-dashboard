import { ArrowUpRightFromSquareIcon, MoveUpRight } from "lucide-react";
import React from "react";

const ActionCellrenderer = () => {
  return (
    <div>
      <button className="cursor-pointer  text-black flex gap-2  items-center  p-2 h-8 mt-1 rounded-lg   transition-all ease-in duration-200">
        <ArrowUpRightFromSquareIcon size={12} />
        Open
      </button>
    </div>
  );
};

export default ActionCellrenderer;
