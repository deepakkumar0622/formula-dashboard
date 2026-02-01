import { Badge } from "../common/Badges";
import { FolderOpen, MoveRight } from "lucide-react";
const workspaces = [
  { name: "Luxury Collection 2025", meta: "8 formulas · Today" },
  { name: "Summer Collection 2026", meta: "5 formulas · Yesterday" },
  { name: "Oriental Series", meta: "12 formulas · 2 days ago" },
];

export default function RecentWorkspaces() {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recently Accessed Workspaces</h3>
      </div>

      <ul className="space-y-5 divide-y divide-gray-100">
        {workspaces.map((ws) => (
          <div className="flex items-center justify-between">
          <div className="flex gap-2 py-3">
            <Badge  icon={<FolderOpen />}/>
          <li key={ws.name}>
            <p className="font-medium">{ws.name}</p>
            <p className="text-sm text-gray-500">{ws.meta}</p>
          </li>
          </div>
            <MoveRight />
          </div>
        ))}
      </ul>
    </div>
  );
}
