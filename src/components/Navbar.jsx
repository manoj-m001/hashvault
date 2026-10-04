import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import "./button.css";
const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="logo text-left font-bold text-white text-lg sm:text-xl">
          <span className="text-green-600"> &lt;</span>
          <span>Hash</span>
          <span className="text-green-600">Vault/&gt;</span>
        </div>

        <div className="ml-auto flex items-center justify-end gap-2 sm:ml-0 sm:justify-self-end">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="nav-auth-button nav-auth-button--secondary">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="nav-auth-button nav-auth-button--primary">
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
