import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaUserGear, FaGear, FaClock, FaUserGraduate } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { FaCalendar, FaCreditCard, FaFileAlt } from "react-icons/fa";

const navLinks = [
  { name: "Students", href: "/students", icon: <FaUserGraduate /> },
  { name: "Schedule", href: "/calendar", icon: <FaCalendar /> },
  { name: "Payments", href: "/payment", icon: <FaCreditCard /> },
  { name: "Release Notes", href: "/", icon: <FaFileAlt /> },
  { name: "Items", href: "/", icon: <BsFillGridFill /> },
  { name: "Admin", href: "/", icon: <FaUserGear /> },
  { name: "Setup", href: "/", icon: <FaGear /> },
  { name: "Timeline", href: "/", icon: <FaClock /> },
];

export default function Sidebar({
  className = "",
  open: sidebarOpen = false,
  setOpen,
}: {
  className?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  // Overlay for mobile only, when sidebarOpen
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={sidebarOpen ? "false" : "true"}
        onClick={() => setOpen && setOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-black dark:bg-gray-950 border-r border-gray-800 dark:border-gray-900 shadow-sm
          transform transition-all duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
          md:static md:flex md:flex-col
          ${className}
        `}
      >
        {/* Close button for mobile only */}
        <button
          className="md:hidden self-end m-4 text-white text-2xl"
          style={{ display: sidebarOpen ? undefined : "none" }}
          onClick={() => setOpen && setOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
        <div className="px-6 py-5.5 border-b shadow-sm border-gray-800 dark:border-gray-900 flex items-center justify-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white dark:text-white"
          >
            Dashboard
          </Link>
        </div>
        <nav className="flex flex-col gap-1 py-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors group"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.innerWidth < 768 &&
                  setOpen
                ) {
                  setOpen(false);
                }
              }}
            >
              <span className="text-lg text-blue-500 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              <span className="truncate text-xl">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
