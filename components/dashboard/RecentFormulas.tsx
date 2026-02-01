import {Badge} from "../common/Badges";
import { FolderOpen, Clock } from "lucide-react";
const formulas = [
  {
    name: "Citrus Fresh",
    code: "AC",
    status: "Testing",
    collection: "Luxury Collection 2025",
    updated: "1d",
  },
  {
    name: "Amber Base",
    code: "AA",
    status: "Draft",
    collection: "Oriental Series",
    updated: "2d",
  },
  {
    name: "Ocean Mist",
    code: "AB",
    status: "Exported",
    collection: "Aquatic Research",
    updated: "3d",
  },
  {
    name: "Vanilla Woods",
    code: "AA",
    status: "Draft",
    collection: "Woody Essentials",
    updated: "5d",
  },
];


export default function RecentFormulas() {
  return (
    <div className="bg-white rounded-xl  p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Recent Formulas
      </h3>

      <ul className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
        {formulas.map((item) => (
          <li
            key={item.name}
            className="py-4 flex items-center justify-between gap-4"
          >
            {/* Left */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.name}
                </span>

                {/* Code badge */}
                <span className="px-1.5 py-0.5 text-xs rounded border border-gray-200 text-gray-600">
                  {item.code}
                </span>

                {/* Status badge */}
                <Badge label={item.status} variant={'exported'} />
              </div>

              {/* Collection */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span><FolderOpen /></span>
                <span>{item.collection}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <span><Clock /></span>
                <span>{item.updated}</span>
              </div>
              <span className="text-gray-300">→</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
