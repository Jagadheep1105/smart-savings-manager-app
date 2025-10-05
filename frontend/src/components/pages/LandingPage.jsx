 
import React from "react";
import { feedbackCards } from "../../utils/constants";

const LandingPage = ({ setCurrentPage }) => (
  <div
    className="min-h-screen flex flex-col justify-between bg-cover bg-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
  >
    <div className="flex flex-col items-center justify-center flex-grow text-white p-8">
      <h1 className="text-7xl font-extrabold tracking-tight mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-500 shadow-2xl">
        Smart Savings Manager
      </h1>
      <p className="text-xl font-light italic mb-12 max-w-2xl text-center">
        "Control your money, control your future."
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPage("auth")}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={() => setCurrentPage("contact")}
          className="px-8 py-3 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full shadow-2xl hover:bg-white hover:text-indigo-600 transition duration-300 transform hover:scale-105"
        >
          Contact Us
        </button>
      </div>
    </div>

    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-t-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        User Feedback
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {feedbackCards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-lg border border-indigo-100 transition duration-300 hover:bg-indigo-50"
          >
            <p className="text-lg italic text-gray-700 mb-4">"{card.text}"</p>
            <p className="font-semibold text-indigo-600">{card.name}</p>
            <p className="text-sm text-gray-500">{card.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LandingPage;