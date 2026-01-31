import { Badge } from "./Badges"

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
          className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {stat.label}
            </p>

            {stat.badge && (
              <Badge
                label={stat.badge}
                variant={stat.badge === "ACTIVE" ? "sent" : "default"}
                className="uppercase text-[10px] px-2 py-0.5"
              />
            )}
          </div>

          {/* Value + Trend */}
          <div className="mt-3 flex items-center gap-3">
            <p className="text-4xl font-semibold text-gray-900">
              {stat.value}
            </p>

            {stat.trend && (
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.trendDirection === "down"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <span className="mr-1">
                  {stat.trendDirection === "down" ? "↘" : "↗"}
                </span>
                {stat.trend}
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

