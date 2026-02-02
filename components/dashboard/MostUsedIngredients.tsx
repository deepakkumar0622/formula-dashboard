import { TrendingDown, TrendingUp, MoveRight } from "lucide-react"

const ingredients = [
  { name: "Iso E Super", count: 45, trendDirection: "up" },
  { name: "Hedione", count: 38, trendDirection: "down" },
  { name: "Ambroxan", count: 32, trendDirection: "neutral" },
  { name: "Galaxolide", count: 28, trendDirection: "up" },
  { name: "Ethyl Linalool", count: 24, trendDirection: "up" },
];

export default function MostUsedIngredients() {
  return (
    <div className="bg-white rounded-xl  p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Most Used Ingredients (This Month)
      </h3>

      <ul className="divide-y divide-gray-100">
        {ingredients.map((item, index) => (
          <li
            key={item.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-3">
              {/* Rank */}
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-xs font-medium text-gray-500">
                {index + 1}
              </span>

              {/* Name */}
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            </div>

            {/* Count */}
            <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              {item.count}
            <span>
              {item.trendDirection === "up" ? 
              <TrendingUp className="h-3 w-3 inline text-green-500" /> 
              : item.trendDirection === "down" ? 
              <TrendingDown className="h-3 w-3 inline text-red-500" /> :
              <MoveRight />}
            </span>
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
