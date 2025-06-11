import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="ARGPS Logo" className="h-12 w-auto" />
        <div className="text-left">
          <h1 className="text-lg font-bold text-[#002060] leading-5">ARGPS</h1>
          <p className="text-sm text-[#002060]">Nutritious Lifestyle</p>
        </div>
      </div>
      <a
        href="https://www.instagram.com/argps_nutritious_lifestyle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/instagram.jpg" alt="Instagram" className="h-6 w-6" />
      </a>
    </header>
  );
};

export default Header;
