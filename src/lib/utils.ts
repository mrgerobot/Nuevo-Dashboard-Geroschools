import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ExportColumn<T> = {
  key: keyof T;
  header: string;
  format?: (value: any, row: T) => any;
};

export function exportTableToExcel<T>(
  rows: T[],
  columns: ExportColumn<T>[],
  filename: string
) {
  const data = rows.map((row) => {
    const out: Record<string, any> = {};
    columns.forEach((col) => {
      const raw = row[col.key];
      out[col.header] = col.format ? col.format(raw, row) : raw;
    });
    return out;
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`
  );
}

