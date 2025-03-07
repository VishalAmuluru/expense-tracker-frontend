import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartData } from "../types";  // This should now work

interface ChartProps {
  data: ChartData[];
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spent" fill="#8884d8" name="Actual Spending" />
          <Bar dataKey="limit" fill="#82ca9d" name="Budget Limit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;