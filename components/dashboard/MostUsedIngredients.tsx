const ingredients = [
  { name: "Iso E Super", count: 45 },
  { name: "Hedione", count: 38 },
  { name: "Ambroxan", count: 32 },
  { name: "Galaxolide", count: 28 },
  { name: "Ethyl Linalool", count: 24 },
];

export default function MostUsedIngredients() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Most Used Ingredients (This Month)
      </h3>

      <ul className="space-y-3">
        {ingredients.map((item, index) => (
          <li
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-gray-400">{index + 1}</span>
              <span className="font-medium">{item.name}</span>
            </div>
            <span className="font-semibold">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
