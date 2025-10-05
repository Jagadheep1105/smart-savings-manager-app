 
import React, { useState, useMemo } from "react";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(5);

  const calculateSimpleInterest = () => {
    const interest = (principal * rate * time) / 100;
    return interest.toFixed(2);
  };

  const simpleInterest = useMemo(calculateSimpleInterest, [
    principal,
    rate,
    time,
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Simple Interest Calculator
      </h3>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Principal Amount"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
        <input
          type="number"
          placeholder="Time (Years)"
          value={time}
          onChange={(e) => setTime(Number(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">
          Total Interest Earned:
        </p>
        <p className="text-3xl font-extrabold text-purple-600">
          ${simpleInterest}
        </p>
      </div>
    </div>
  );
};

export default InterestCalculator;