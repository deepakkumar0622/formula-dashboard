import React from "react";

type BadgeVariant =
  | "draft"
  | "versioned"
  | "exported"
  | "sent"
  | "default";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  draft: "bg-gray-100 text-gray-700 border border-gray-300",
  versioned: "bg-blue-100 text-blue-700 border border-blue-300",
  exported: "bg-green-100 text-green-700 border border-green-300",
  sent: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  default: "bg-gray-100 text-gray-700 border border-gray-300",
};

// tiny helper (no deps)
const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  icon,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {icon && (
        <span className="flex h-3.5 w-3.5 items-center justify-center">
          {icon}
        </span>
      )}
      {label}
    </span>
  );
};
