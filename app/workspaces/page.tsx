"use client";

import RecentlyWSCard from "@/components/Workspace/RecentlyWSCard";
import WorkspaceList from "@/components/Workspace/WorkspaceList";
import { ChevronUp, Plus } from "lucide-react";

import { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export const recentlyAccessed = [
  {
    name: "Luxury Collection 2025",
    type: "Client Project",
    formulaCount: 8,
    updatedAt: "2h",
    iconBg: "bg-blue-100",
  },
  {
    name: "Summer Collection 2025",
    type: "Fine Fragrance",
    formulaCount: 5,
    updatedAt: "3d",
    iconBg: "bg-yellow-100",
  },
  {
    name: "Oriental Series",
    type: "Research Initiative",
    formulaCount: 12,
    updatedAt: "2d",
    iconBg: "bg-green-100",
  },
  {
    name: "Aquatic Research",
    type: "Research Initiative",
    formulaCount: 6,
    updatedAt: "2d",
    iconBg: "bg-red-100",
  },
  {
    name: "Gourmand Series",
    type: "Fine Fragrance",
    formulaCount: 9,
    updatedAt: "5d",
    iconBg: "bg-purple-100",
  },
  {
    name: "Floral Collections",
    type: "Client Project",
    formulaCount: 15,
    updatedAt: "7d",
    iconBg: "bg-blue-300",
  },
];

export const archivedWorkspaces = [
  {
    name: "Old Client Campaign",
    type: "Client Project",
    formulaCount: 4,
    updatedAt: "2 months ago",
    iconBg: "bg-gray-200",
  },
  {
    name: "Discontinued Research",
    type: "Research Initiative",
    formulaCount: 7,
    updatedAt: "5 months ago",
    iconBg: "bg-gray-300",
  },
];

const page = () => {
  const [showArchived, setShowArchived] = useState(false);
  const archiveRef: any = useRef(null);

  const archiveClick = () => {
    const next = !showArchived;
    setShowArchived(next);

    if (next) {
      setTimeout(() => {
        archiveRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-xl">Workspaces</p>
          <p className="font-light text-sm text-black/50">
            Organize formulas by project , client , or purpose
          </p>
        </div>
        <div>
          <button className="cursor-pointer border text-white flex gap-2  items-center bg-black px-4 py-2 rounded-lg font-medium text-base hover:bg-black/80 transition-all ease-in duration-200">
            <Plus size={15} />
            New Workspace
          </button>
        </div>
      </div>

      {/* Recently Accessed */}
      <div className="mt-10">
        <p className="font-medium ">Recently Accessed</p>
        <div className="flex items-center gap-3 justify-between my-5">
          {recentlyAccessed.slice(0, 3).map((v, i) => (
            <div className="flex-1" key={i}>
              <RecentlyWSCard
                title={v.name}
                type={v.type}
                formulaCount={v.formulaCount}
                updatedAt={v.updatedAt}
                iconBg={v.iconBg}
              />
            </div>
          ))}
        </div>
      </div>

      {/* All */}
      <div className="mt-10">
        <p>All Workspaces</p>
        <div className="my-3 bg-white p-4 rounded-xl border border-gray-200">
          {recentlyAccessed.map((v, i) => (
            <div key={i}>
              <WorkspaceList
                title={v.name}
                type={v.type}
                updatedAt={v.updatedAt}
                formulaCount={v.formulaCount}
                iconBg={v.iconBg}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Archived */}
      <div className="my-10" ref={archiveRef}>
        <div
          onClick={archiveClick}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <p className="font-medium">Archived ({archivedWorkspaces.length})</p>
          {showArchived ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {showArchived && (
          <div className="my-3 bg-white p-4 rounded-xl border border-gray-200">
            {archivedWorkspaces.map((v, i) => (
              <WorkspaceList
                key={i}
                title={v.name}
                type={v.type}
                updatedAt={v.updatedAt}
                formulaCount={v.formulaCount}
                iconBg={v.iconBg}
                isArchived
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
