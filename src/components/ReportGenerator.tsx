// src/components/ReportGenerator.tsx
import React, { useState } from 'react';
import { generateExcelReport } from '../utils/excelGenerator';
import { Expense } from '../types';

interface ReportGeneratorProps {
  data: Expense[];
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (data.length === 0) {
      alert('No data to export!');
      return;
    }

    try {
      setLoading(true);
      const url = await generateExcelReport(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expenses_${new Date().toISOString().slice(0,10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={loading || data.length === 0}
      className="export-button"
    >
      {loading ? 'Generating Report...' : 'Export to Excel'}
    </button>
  );
};

export default ReportGenerator;