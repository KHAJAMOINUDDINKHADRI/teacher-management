import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa";

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="w-full flex items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-20">
      <div className="flex flex-1 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {setSidebarOpen && (
            <button
              className="p-2 text-2xl text-gray-700 dark:text-gray-200 block md:hidden"
              onClick={() => setSidebarOpen((prev: boolean) => !prev)}
            >
              <FaBars />
            </button>
          )}
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Teacher Management
          </span>
        </div>
        {/* User avatar and dropdown */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-lg bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">
          <span className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
            A
          </span>
          <span className="text-black dark:text-white font-medium">Admin</span>
          <IoIosArrowDown className="text-gray-500 text-lg" />
        </button>
      </div>
    </header>
  );
}
