"use client";

import React from "react";
import { students } from "@/data/students";
import { FaUserGraduate } from "react-icons/fa6";

function getAvatarColor(name: string) {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-orange-100 text-orange-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

export default function StudentsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-2 sm:px-6">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl text-blue-600 dark:text-blue-400">
          <FaUserGraduate />
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Students
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="group bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center transition-all duration-200 hover:shadow-lg hover:scale-[1.025] w-full max-w-xs mx-auto"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-5 shadow-sm ${getAvatarColor(
                student.name
              )}`}
            >
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="text-center w-full">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {student.name}
              </div>
              <div className="flex flex-col xs:flex-row justify-center items-center gap-1 xs:gap-3 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="truncate">
                  <span className="font-medium">Email:</span> {student.email}
                </span>
                <span className="truncate">
                  <span className="font-medium">Phone:</span> {student.phone}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {student.enrolledCourses.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium dark:bg-blue-900 dark:text-blue-200"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
