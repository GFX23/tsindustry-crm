import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportCSVButton({data}) {
  return (
    <ExcelFile element={<button className="btn btn-accent">XLSX</button>} filename="report">
    <ExcelSheet data={data} name="Zakázky">
        <ExcelColumn label="Datum" value="date"/>
        <ExcelColumn label="Zákazník" value="customer"/>
        <ExcelColumn label="Zakázka" value="orderNum"/>
        <ExcelColumn label="Název dílu" value="partName"/>
        <ExcelColumn label="Počet dílu" value="partCount"/>
        <ExcelColumn label="Cena" value="price"/>
    </ExcelSheet>
</ExcelFile>
  );
}

export default ExportCSVButton