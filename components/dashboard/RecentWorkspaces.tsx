const workspaces = [
  { name: "Luxury Collection 2025", meta: "8 formulas · Today" },
  { name: "Summer Collection 2026", meta: "5 formulas · Yesterday" },
  { name: "Oriental Series", meta: "12 formulas · 2 days ago" },
];

export default function RecentWorkspaces() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recently Accessed Workspaces</h3>
        <button className="text-sm text-blue-600">View all</button>
      </div>

      <ul className="space-y-4">
        {workspaces.map((ws) => (
          <li key={ws.name}>
            <p className="font-medium">{ws.name}</p>
            <p className="text-sm text-gray-500">{ws.meta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
