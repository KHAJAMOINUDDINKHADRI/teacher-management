import React from "react";

const tabList = [
  "Availability",
  "Unavailabilities",
  "Students",
  "Schedule",
  "Invoiced Lessons",
  "Unscheduled Lesson",
  "Time Voucher",
  "Comments",
  "History",
];

type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-4 rounded-xl shadow bg-white dark:bg-gray-900 px-4 py-2">
      <nav className="overflow-x-auto">
        <ul className="flex flex-nowrap border-b border-gray-200 dark:border-gray-800 min-w-max">
          {tabList.map((tab) => (
            <li key={tab} className="flex-shrink-0">
              <button
                className={`px-2 py-1 text-sm rounded-t font-medium focus:outline-none transition-colors
                ${
                  activeTab === tab
                    ? "bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 border-b-2 border-blue-500"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
                aria-selected={activeTab === tab}
                aria-controls={`tabpanel-${tab}`}
                role="tab"
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
