"use client";
import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

import Logo from "./Logo";
import PrimaryButton from "./PrimaryButton";

// import { useAuth } from "@/context/authContext";

import { getAuthenticatedUserName } from "@/lib/getAuthenticatedUserName";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      getAuthenticatedUserName(user).then(setUserName);
    }
  }, [user]); // Effect runs when 'user' changes

  const handleLogout = () => {
    logout(); // Call the logout function from the auth context
  };

  // Determine whether to show the username
  const shouldShowUsername = !!user; // True if user exists, false otherwise

  // Do not show button on pages /signin and /signup
  const shouldShowButton = pathname !== "/signin" && pathname !== "/signup";

  return (
    <div className="bg-white shadow-md">
      <header className="container mx-auto">
        <nav className="flex items-center justify-between py-4 px-8">
          <Logo />
          <div className="flex flex-row items-center justify-center gap-5">
            {shouldShowUsername && (
              <p className="text-gray-700 text-sm font-semibold leading-tight">
                {userName}
              </p>
            )}
            {shouldShowButton && (
              <PrimaryButton
                textOnly={user ? "Logout" : "Login"}
                onClick={user ? handleLogout : undefined}
                href={user ? undefined : "/signin"}
              />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
