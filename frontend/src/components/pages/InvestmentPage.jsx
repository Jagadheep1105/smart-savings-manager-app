 
import React, { useState } from "react";

const InvestmentPage = ({ schemes }) => {
  const [filter, setFilter] = useState("all"); // all, post, lic, new

  const filteredSchemes = schemes.filter(
    (scheme) => filter === "all" || scheme.type === filter
  );

  const downloadChart = (schemeTitle) => {
    // Mock download logic
    console.log(`Simulating chart download for: ${schemeTitle}`);
    // Cannot use alert()
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Investment Schemes
      </h2>
      <div className="flex space-x-4 mb-6">
        {["all", "post", "lic", "new"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-200 capitalize ${
              filter === f
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All Schemes" : f === "post" ? "Post Scheme" : f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-green-500 transition duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {scheme.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4 capitalize">
              {scheme.type} Scheme
            </p>
            <p className="text-gray-600 mb-4">{scheme.description}</p>
            <img
              src={scheme.chartUrl}
              alt={`${scheme.title} chart`}
              className="w-full h-40 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x300/e5e7eb/374151?text=Chart+Unavailable";
              }}
            />

            <button
              onClick={() => downloadChart(scheme.title)}
              className="w-full mt-2 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 11.586V3a1 1 0 112 0v8.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Download Chart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPage;