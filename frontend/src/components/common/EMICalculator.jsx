 
import React, { useState, useMemo } from "react";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10); // Annual interest rate in %
  const [tenure, setTenure] = useState(120); // Tenure in months

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    if (monthlyRate === 0) return (principal / tenure).toFixed(2);
    if (tenure === 0) return 0;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
    ).toFixed(2);
  };

  const emi = useMemo(calculateEMI, [principal, rate, tenure]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">EMI Calculator</h3>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Principal Loan Amount"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Tenure (Months)"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Monthly EMI:</p>
        <p className="text-3xl font-extrabold text-indigo-600">${emi}</p>
      </div>
    </div>
  );
};

export default EMICalculator;