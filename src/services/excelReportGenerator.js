import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportCSVButton({data}) {
  return (
    <ExcelFile element={<button>Download Data</button>}>
    <ExcelSheet data={data} name="Employees">
        <ExcelColumn label="Name" value="name"/>
        <ExcelColumn label="Wallet Money" value="amount"/>
        <ExcelColumn label="Gender" value="sex"/>
        <ExcelColumn label="Marital Status"
                     value={(col) => col.is_married ? "Married" : "Single"}/>
    </ExcelSheet>
</ExcelFile>
  );
}

export default ExportCSVButton