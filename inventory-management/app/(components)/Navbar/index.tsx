"use client";
import React from "react";
import { Bell, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button
          className="px-3 py-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-700 dark:text-white" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-36 md:w-60 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-300" size={20} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-5">

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? (
              <Sun
                className="cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors"
                size={24}
              />
            ) : (
              <Moon
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                size={24}
              />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <Bell
              className="cursor-pointer text-gray-500 dark:text-gray-300"
              size={24}
            />
            <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 dark:border-gray-600 mx-3" />

          {/* User Avatar */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-white border-2 border-gray-300 dark:border-gray-500">
              S
            </div>
            <span className="font-semibold text-gray-800 dark:text-white">
              Shubham
            </span>
          </div>
        </div>

        {/* Settings Icon */}
        <Link href="/settings">
          <Settings
            className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;