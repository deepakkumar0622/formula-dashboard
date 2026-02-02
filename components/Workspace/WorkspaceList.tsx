import { ArrowRight, FolderOpen } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  type: string;
  formulaCount: number;
  updatedAt: string;
  iconBg?: string;
  isArchived?: boolean;
}

const WorkspaceList = ({
  title,
  type,
  updatedAt,
  iconBg = "bg-gray-200",
  formulaCount,
  isArchived = false,
}: Props) => {
  return (
    <div
      className={`flex justify-between px-2 border-b pb-4 my-4 border-gray-200 transition
      ${isArchived ? "opacity-50 grayscale" : "hover:bg-gray-50 cursor-pointer"}`}
    >
      <div className="flex items-center gap-5">
        {/* Icon */}
        <div className={`p-3 rounded ${isArchived ? "bg-gray-200" : iconBg}`}>
          <FolderOpen size={18} />
        </div>

        {/* Data */}
        <div>
          <p
            className={`text-[14px] font-normal ${
              isArchived ? "text-gray-500" : "text-black"
            }`}
          >
            {title}
          </p>

          <div
            className={`flex items-center gap-1 text-xs ${
              isArchived ? "text-gray-400" : "text-black/50"
            }`}
          >
            <p>{type}</p>
            <p>•</p>
            <p>{formulaCount} Formulas</p>
            <p>•</p>
            <p>Last Activity {updatedAt}</p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div>
        <ArrowRight
          size={20}
          className={isArchived ? "text-gray-300" : "text-gray-400"}
        />
      </div>
    </div>
  );
};

export default WorkspaceList;
