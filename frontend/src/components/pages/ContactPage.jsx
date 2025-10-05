 
import React from "react";

const ContactPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
        Contact Details
      </h2>
      <div className="space-y-6 text-lg text-gray-700">
        <div className="flex items-start">
          <span className="text-indigo-500 mr-3 text-2xl">📧</span>
          <div>
            <p className="font-semibold">Email Support:</p>
            <p>support@smartsavings.com</p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-indigo-500 mr-3 text-2xl">📞</span>
          <div>
            <p className="font-semibold">Phone (Admin):</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-indigo-500 mr-3 text-2xl">📍</span>
          <div>
            <p className="font-semibold">Head Office:</p>
            <p>101 Wealth St, Financial District, Anytown 90210</p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-indigo-500 mr-3 text-2xl">💼</span>
          <div>
            <p className="font-semibold">Financier Hotline:</p>
            <p>+1 (555) 987-6543 (Ask for Finan 1 or Finan 2)</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage("landing")}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Back to Landing
      </button>
    </div>
  </div>
);

export default ContactPage;