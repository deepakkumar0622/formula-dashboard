import { themeQuartz } from "ag-grid-community";

export const AgTheme = themeQuartz.withParams({
  /* ===== Base ===== */
  browserColorScheme: "light",
  fontFamily: "Inter, Segoe UI, Roboto, Arial, sans-serif",
  fontSize: 14,

  /* ===== Backgrounds ===== */
  backgroundColor: "#FFFFFF",
  headerBackgroundColor: "#FAFAFA",
  oddRowBackgroundColor: "#FFFFFF",
  rowHoverColor: "#F9FAFB",

  /* ===== Borders ===== */
  borderColor: "#E5E7EB",
  headerColumnBorder: false,
  rowBorder: true,

  /* ===== Header ===== */
  headerFontSize: 14,
  headerFontWeight: 600,
  headerTextColor: "#6B7280",
  headerHeight: 44,

  /* ===== Cells ===== */
  textColor: "#181D1F",

  /* ===== Selection ===== */
  selectedRowBackgroundColor: "#EFF6FF",
  rangeSelectionBorderColor: "#2196F3",

  /* ===== Icons ===== */
  iconColor: "#6B7280",
});
