import * as XLSX from "xlsx";
import { arrayToString, objectToString } from "./stringify";

export const exportToExcel = (
  data,
  fileName = "output.xlsx",
  sheetName = "PolyMarket"
) => {
  if (!data?.length) {
    throw new Error("No data provided to exprt.");
  }
  
  // format data:
  const formattedData = data.map(row => {
    const formattedRow = {...row};
    for(const [field, value] of Object.entries(formattedRow)) {
        if(!value)
            continue;
        if(value instanceof Array)
            formattedRow[field] = arrayToString(value, true);
        else if(typeof value === 'object')
            formattedRow[field] = objectToString(value);
    }
    return formattedRow;
  })

  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
