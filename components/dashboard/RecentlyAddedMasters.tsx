const masters = [
  { name: "Iso E Super Premium", meta: "Givaudan · Today" },
  { name: "Hedione HC", meta: "Firmenich · Yesterday" },
  { name: "Ambroxan Crystal", meta: "IFF · 2 days ago" },
];

export default function RecentlyAddedMasters() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recently Added to Masters</h3>
        <button className="text-sm text-blue-600">View all</button>
      </div>

      <ul className="space-y-4">
        {masters.map((item) => (
          <li key={item.name}>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.meta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
