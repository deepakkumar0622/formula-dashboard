import { Clock, File, Folder, FolderOpen } from "lucide-react";
import React from "react";

interface props {
  title: string;
  type: string;
  formulaCount: number;
  updatedAt: string;
  iconBg?: string;
}

const RecentlyWSCard = ({
  title,
  type,
  updatedAt,
  formulaCount,
  iconBg,
}: props) => {
  return (
    <div className="border p-4 rounded-xl border-gray-200 cursor-pointer hover:shadow-lg bg-white">
      <div className={`p-4 ${iconBg} w-fit rounded`}>
        <FolderOpen size={20} />
      </div>
      <div className="border-b border-gray-200 my-2 pb-2">
        <p className="text-[15px]">{title}</p>
        <p className="text-xs text-black/50 mt-2">{type}</p>
      </div>
      <div className="flex justify-between text-xs mt-4 mb-2 text-black/40">
        <p>{formulaCount} Formulas</p>
        <div className="flex gap-2 items-center">
          <Clock size={10} />
          <p>{updatedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentlyWSCard;
