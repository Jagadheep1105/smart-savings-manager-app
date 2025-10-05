 
import React from "react";
import { BUDGET_CATEGORIES } from "../../utils/constants";
import { generatePieChart } from "../../utils/pieChart";
import EMICalculator from "../common/EMICalculator";
import InterestCalculator from "../common/InterestCalculator";

const UserHomePage = ({ currentUser, handleBudgetChange, error }) => {
  const user = currentUser;
  const totalAllocated = Object.values(user.budget).reduce(
    (sum, p) => sum + p,
    0
  );
  const remainingPercentage = 100 - totalAllocated;
  const remainingAmount = user.salary * (remainingPercentage / 100);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">
        Welcome Back, {user.username}!
      </h2>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* --- Budget Chart and Allocation --- */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Pie Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Current Budget Snapshot
          </h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {generatePieChart(user.budget)}
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Total Salary:{" "}
            <span className="font-semibold text-green-600">
              ${user.salary.toLocaleString()}
            </span>
          </p>
          <p className="text-center text-sm text-gray-500">
            Allocated: {totalAllocated}% | Remaining:{" "}
            <span
              className={`${
                remainingPercentage < 10 ? "text-red-500" : "text-green-500"
              } font-semibold`}
            >
              {remainingPercentage}%
            </span>{" "}
            (${remainingAmount.toFixed(2)})
          </p>
        </div>

        {/* Allocation Sliders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Dynamic Budget Allocation (%)
          </h3>
          <div className="space-y-4">
            {BUDGET_CATEGORIES.map((category, index) => {
              const percentage = user.budget[category] || 0;
              const amount = user.salary * (percentage / 100);
              const color = ["indigo", "green", "yellow", "red"][index % 4];

              return (
                <div
                  key={category}
                  className="p-4 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-gray-700">
                      {category}
                    </label>
                    <span className={`text-${color}-600 font-bold`}>
                      {percentage}% (${amount.toFixed(2)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={percentage}
                    onChange={(e) =>
                      handleBudgetChange(category, e.target.value)
                    }
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50`}
                    style={{
                      "--webkit-slider-thumb-color": `var(--color-${color}-500)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Calculators --- */}
      <h3 className="text-3xl font-bold text-gray-700 mb-6">Financial Tools</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <EMICalculator />
        <InterestCalculator />
      </div>
    </div>
  );
};

export default UserHomePage;