import React, { useState } from "react";
import { FilterParams } from "../types";

interface FilterControlsProps {
  onFilter: (filters: FilterParams) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleApply = () => {
    onFilter({ category, dateRange });
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Housing">Housing</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Month:</label>
        <input
          type="month"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        />
      </div>

      <button onClick={handleApply} className="apply-btn">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterControls;