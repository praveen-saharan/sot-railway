import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line, ResponsiveContainer
} from "recharts";

const InsightsDashboard = () => {
  const [financialData, setFinancialData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#9966FF", "#FF33A1"];

  useEffect(() => {
    fetchFinancialData();
    fetchTransactionData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/revenue/calculate-and-save");
      const sortedData = response.data.sort((a, b) => b.earnings - a.earnings);
      const total = sortedData.reduce((sum, station) => sum + station.earnings, 0);
      setTotalEarnings(total);
      setFinancialData(sortedData);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/transactions/all-transactions");
      const data = await response.json();
      setTransactionData(data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const aggregateAmountByDate = () => {
    const dateSpend = {};
    transactionData.forEach(({ transactionDateTime, amount }) => {
      const date = transactionDateTime.split("T")[0];
      dateSpend[date] = (dateSpend[date] || 0) + amount;
    });
    return Object.entries(dateSpend).map(([date, amount]) => ({ date, amount }));
  };

  const totalTransactions = transactionData.length;
  const totalAmount = transactionData.reduce((sum, { amount }) => sum + amount, 0);
  const uniqueUsers = new Set(transactionData.map(({ userFirstname }) => userFirstname)).size;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>

<h2 class="text-2xl font-bold text-center mb-6">Financial & Transaction Insights</h2>
<div className="bg-white shadow-lg p-6 rounded-xl text-left border border-gray-200">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-semibold text-gray-800">Transaction Overview</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">Total Transactions</p>
      <p className="text-xl font-semibold text-gray-800">{totalTransactions}</p>
    </div>

    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">Total Amount Spent</p>
      <p className="text-xl font-semibold text-blue-600">¥{totalAmount.toFixed(2)}</p>
    </div>

    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">Unique Users</p>
      <p className="text-xl font-semibold text-green-600">{uniqueUsers}</p>
    </div>
  </div>

  <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
    <p className="text-sm text-red-600">Total Earnings</p>
    <p className="text-2xl font-bold text-red-500">¥{totalEarnings.toLocaleString()}</p>
  </div>
</div>
   
<div className="mt-6 flex">
      <h3 className="text-left underline font-semibold">Earnings by Station</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={financialData}
            dataKey="earnings"
            nameKey="stationName"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label
          >
            {financialData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <h3 className="text-left underline font-semibold">Daily Spending Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={aggregateAmountByDate()}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `¥${value.toFixed(2)}`} />
          <Tooltip formatter={(value) => `¥${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="amount" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      </div>  
    </div>
  );
};

export default InsightsDashboard;
