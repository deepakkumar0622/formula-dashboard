import StatsCards from "@/components/common/StatsCards";
import { StatItem } from "@/components/common/StatsCards";
import RecentFormulas from "@/components/dashboard/RecentFormulas";
import MostUsedIngredients from "@/components/dashboard/MostUsedIngredients";
import RecentWorkspaces from "@/components/dashboard/RecentWorkspaces";
import RecentlyAddedMasters from "@/components/dashboard/RecentlyAddedMasters";

export default function Dashboard() {
  // Dummy data for stats cards
 const stats = [
  {
    label: "Total Formulas",
    value: 86,
    trend: "+12%",
    trendDirection: "up",
    footer: "vs last month",
  },
  {
    label: "In Testing",
    value: 14,
    badge: "ACTIVE",
    footer: "2 awaiting results",
  },
  {
    label: "Workspaces",
    value: 12,
    footer: "3 recently accessed",
  },
  {
    label: "Projects",
    value: 8,
    footer: "5 active projects",
  },
] satisfies StatItem[]


  return (
    <div className="p-6 space-y-6">
      <StatsCards
      state={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentFormulas />
        <MostUsedIngredients />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentWorkspaces />
        <RecentlyAddedMasters />
      </div>
    </div>
  );
};

