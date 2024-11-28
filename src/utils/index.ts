import { SortOrder } from "antd/es/table/interface";

export function colorFilterIcon(filtered: boolean) {
  return filtered ? "#FF9800" : "#fff";
}

export function colorSortUpIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "ascend" ? "#FF9800" : "#fff";
}

export function colorSortDownIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "descend" ? "#FF9800" : "#fff";
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
