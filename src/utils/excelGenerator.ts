// src/utils/excelGenerator.ts
import ExcelJS from 'exceljs';
import { Expense } from '../types';

export const generateExcelReport = async (data: Expense[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Expenses Report');

  // Define headers
  const headers: Array<keyof Expense> = ['title', 'amount', 'category', 'date'];
  worksheet.addRow(headers.map(h => h.toString().toUpperCase()));

  // Add data rows
  data.forEach(expense => {
    worksheet.addRow([
      expense.title,
      expense.amount,
      expense.category,
      new Date(expense.date)
    ]);
  });

  // Format columns with correct style properties
  worksheet.columns = [
    { header: 'TITLE', key: 'title', width: 30 },
    { 
      header: 'AMOUNT', 
      key: 'amount', 
      width: 15,
      style: { 
        numFmt: '"$"#,##0.00',
        // Removed invalid 'type' property
      }
    },
    { header: 'CATEGORY', key: 'category', width: 20 },
    { 
      header: 'DATE', 
      key: 'date', 
      width: 15,
      style: { 
        numFmt: 'mm/dd/yyyy',
        // Removed invalid 'type' property
      }
    }
  ];

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return URL.createObjectURL(blob);
};