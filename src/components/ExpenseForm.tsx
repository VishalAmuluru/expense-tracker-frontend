import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Expense } from "../types";

interface ExpenseFormProps {
  onSuccess: () => void;
  existingExpense?: Expense;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, existingExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // Pre-fill form fields when editing an existing expense
  useEffect(() => {
    if (existingExpense) {
      setTitle(existingExpense.title);
      setAmount(existingExpense.amount);
      setCategory(existingExpense.category);
      setDate(existingExpense.date);
    }
  }, [existingExpense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || amount <= 0 || !category || !date) {
      setError("Please fill in all fields correctly");
      return;
    }

    try {
      // Use PUT for updating and POST for creating new expenses
      const method = existingExpense ? "put" : "post";
      const url = existingExpense 
        ? `/api/expenses/${existingExpense.id}` 
        : "/api/expenses";
      
      await api[method](url, { title, amount, category, date });
      onSuccess();

      // Clear the form if it's a new expense
      if (!existingExpense) {
        setTitle("");
        setAmount(0);
        setCategory("");
        setDate("");
      }
    } catch (err) {
      setError("Error saving expense. Please try again.");
      console.error("Expense save error:", err);
    }
  };

  return (
    <div className="expense-form">
      <h2>{existingExpense ? "Edit Expense" : "New Expense"}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {existingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
