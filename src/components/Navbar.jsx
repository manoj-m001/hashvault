import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import "./button.css";
const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-600"> &lt;</span>
          <span>Hash</span>
          <span className="text-green-600">Vault/&gt;</span>
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <button className="save-button px-4 py-2">
              <SignInButton />
            </button>
            <button className="save-button px-4 py-2">
              <SignUpButton />
            </button>
          </Show>
          <Show when="signed-in">
            <button className="text-4xl text-white px-4 py-2">
              <UserButton />
            </button>
          </Show>
          <a
            href="https://github.com/manoj-netizenn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white rounded-full flex justify-between items-center ring-white ring-1">
              <img
                className="invert w-10 p-1"
                src="/icons/github.png"
                alt="github logo"
              />
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
