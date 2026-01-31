
export type StatItem = {
  label: string
  value: number
  trend?: string       
  trendDirection?: "up" | "down"
  badge?: string        
  footer?: string       
}

type Props = {
  state: StatItem[]
}



export default function StatsCards({ state: stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 rounded-2xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {stat.label}
            </p>

            {stat.badge && (
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-yellow-100 text-yellow-700">
                {stat.badge}
              </span>
            )}
          </div>

          {/* Value + Trend */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-3xl font-semibold text-gray-900">
              {stat.value}
            </p>

            {stat.trend && (
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.trendDirection === "down"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {stat.trendDirection !== "down" && "↗"}
                {stat.trendDirection === "down" && "↘"}
                <span className="ml-1">{stat.trend}</span>
              </span>
            )}
          </div>

          {/* Footer */}
          {stat.footer && (
            <p className="mt-2 text-sm text-gray-400">
              {stat.footer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
