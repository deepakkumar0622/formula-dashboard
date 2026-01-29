import React from "react";

interface Props {
  title?: string;
  version?: string;
  type: string;
}

const statusStyles: Record<string, string> = {
  gray: "border-gray-300 bg-gray-100 text-gray-600",
  blue: "border-blue-300 bg-blue-100 text-blue-600",
  green: "border-emerald-300 bg-emerald-100 text-emerald-600",
  "Sent to Robot": "border-amber-300 bg-amber-100 text-amber-700",
};

const Badge = ({ title, version, type }: Props) => {
  const style = statusStyles[type!] || "border-red-300 bg-red-100 text-red-600"; // fallback style

  return (
    <span
      className={`px-3 py-1 rounded-md border text-xs font-medium inline-block ${style}`}
    >
      {title} {version}
    </span>
  );
};

export default Badge;
