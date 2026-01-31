const formulas = [
  { name: "Citrus Fresh", status: "Testing", updated: "1d" },
  { name: "Amber Base", status: "Draft", updated: "2d" },
  { name: "Ocean Mist", status: "Exported", updated: "3d" },
  { name: "Vanilla Woods", status: "Draft", updated: "5d" },
];

export default function RecentFormulas() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-4">Recent Formulas</h3>

      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {formulas.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="font-medium">{item.name}</span>
            <div className="flex items-center gap-3 text-gray-500">
              <span>{item.status}</span>
              <span>{item.updated}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
