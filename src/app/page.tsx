"use client";

import React, { useState, useEffect } from "react";
import TeacherProfileCard, {
  EditableTeacher,
} from "../components/TeacherProfileCard";
import QualificationsTable from "../components/QualificationsTable";
import Tabs from "../components/Tabs";
import ScheduleCalendar from "../components/ScheduleCalendar";
import type { Lesson } from "../components/ScheduleCalendar";
import { teachers, Teacher } from "../data/teachers";
import { students } from "../data/students";
import type { Qualification } from "../data/teachers";
import { IoIosArrowDown } from "react-icons/io";
import {
  mockAvailability,
  mockUnavailabilities,
  mockSchedule,
  mockInvoicedLessons,
  mockUnscheduledLesson,
  mockTimeVoucher,
} from "../data/scheduleMock";

type TeacherWithExtras = Teacher & {
  emails?: string[];
  phones?: string[];
  addresses?: string[];
};

function getTabPanels(activeTeacher: Teacher): Record<string, React.ReactNode> {
  return {
    Availability: (
      <div className="p-6">Availability content coming soon...</div>
    ),
    Unavailabilities: (
      <div className="p-6">Unavailabilities content coming soon...</div>
    ),
    Students: (
      <div className="p-6 overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Courses</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((s) => s.assignedTeacherId === activeTeacher.id)
              .map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="px-3 py-2">{s.name}</td>
                  <td className="px-3 py-2">{s.email}</td>
                  <td className="px-3 py-2">{s.phone}</td>
                  <td className="px-3 py-2">{s.enrolledCourses.join(", ")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    ),
    Schedule: <ScheduleCalendar lessons={mockSchedule} />,
    "Invoiced Lessons": (
      <div className="p-6">Invoiced Lessons content coming soon...</div>
    ),
    "Unscheduled Lesson": (
      <div className="p-6">Unscheduled Lesson content coming soon...</div>
    ),
    "Time Voucher": (
      <div className="p-6">Time Voucher content coming soon...</div>
    ),
    Comments: <div className="p-6">Comments content coming soon...</div>,
    History: <div className="p-6">History content coming soon...</div>,
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Availability");
  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherWithExtras | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hydration-safe: load from localStorage on mount
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("teacher-profile")
        : null;
    if (stored) {
      setSelectedTeacher(JSON.parse(stored));
    } else {
      setSelectedTeacher(teachers[0]);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (selectedTeacher) {
      localStorage.setItem("teacher-profile", JSON.stringify(selectedTeacher));
    }
  }, [selectedTeacher]);

  if (!selectedTeacher) return null;

  // Convert to EditableTeacher
  const editableTeacher: EditableTeacher = {
    ...selectedTeacher,
    emails: Array.isArray((selectedTeacher as TeacherWithExtras).emails)
      ? (selectedTeacher as TeacherWithExtras).emails!
      : selectedTeacher.email
      ? [selectedTeacher.email]
      : [],
    phones: Array.isArray((selectedTeacher as TeacherWithExtras).phones)
      ? (selectedTeacher as TeacherWithExtras).phones!
      : selectedTeacher.phone
      ? [selectedTeacher.phone]
      : [],
    addresses: Array.isArray((selectedTeacher as TeacherWithExtras).addresses)
      ? (selectedTeacher as TeacherWithExtras).addresses!
      : selectedTeacher.address
      ? [selectedTeacher.address]
      : [],
  };

  // Handlers for profile and qualifications
  const handleProfileChange = (updated: EditableTeacher) => {
    setSelectedTeacher({
      ...selectedTeacher,
      name: updated.name,
      role: updated.role,
      id: updated.id,
      birthDate: updated.birthDate,
      email: updated.emails[0] || "",
      phone: updated.phones[0] || "",
      address: updated.addresses[0] || "",
      // Store arrays as extra fields for persistence
      emails: updated.emails,
      phones: updated.phones,
      addresses: updated.addresses,
      qualifications: selectedTeacher.qualifications,
      groupQualifications: selectedTeacher.groupQualifications,
    });
  };
  const handlePrivateQualsChange = (quals: Qualification[]) => {
    setSelectedTeacher({ ...selectedTeacher, qualifications: quals });
  };
  const handleGroupQualsChange = (quals: Qualification[]) => {
    setSelectedTeacher({ ...selectedTeacher, groupQualifications: quals });
  };

  // Select lessons data based on activeTab
  let lessons: Lesson[] = [];
  if (activeTab === "Availability") lessons = mockAvailability;
  else if (activeTab === "Unavailabilities") lessons = mockUnavailabilities;
  else if (activeTab === "Schedule") lessons = mockSchedule;
  else if (activeTab === "Invoiced Lessons") lessons = mockInvoicedLessons;
  else if (activeTab === "Unscheduled Lesson") lessons = mockUnscheduledLesson;
  else if (activeTab === "Time Voucher") lessons = mockTimeVoucher;

  return (
    <div className="flex flex-col gap-8 items-center w-full mt-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex-1 max-w-fit md:w-full">
          <div className="relative">
            <button
              className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-600 dark:text-gray-100 focus:outline-none w-full"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span>Teachers</span>
              <span className="mx-1 text-gray-600 dark:text-gray-100">/</span>
              <span className="text-gray-900 dark:text-white">
                {selectedTeacher.name}
              </span>
              <IoIosArrowDown className="text-gray-900 dark:text-white" />
            </button>
            {dropdownOpen && (
              <ul
                className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {teachers.map((t) => (
                  <li key={t.id}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                        selectedTeacher.id === t.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedTeacher(t);
                        setDropdownOpen(false);
                      }}
                      role="option"
                      aria-selected={selectedTeacher.id === t.id}
                    >
                      {t.name}{" "}
                      <span className="text-xs text-gray-400 ml-2">
                        ({t.role})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex-1">
          <TeacherProfileCard
            teacher={editableTeacher}
            onChange={handleProfileChange}
          />
          <QualificationsTable
            title="Private Qualifications"
            data={selectedTeacher.qualifications}
            onChange={handlePrivateQualsChange}
          />
          <QualificationsTable
            title="Group Qualifications"
            data={selectedTeacher.groupQualifications}
            onChange={handleGroupQualsChange}
          />
        </div>
      </div>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow mt-2">
        {[
          "Availability",
          "Unavailabilities",
          "Schedule",
          "Invoiced Lessons",
          "Unscheduled Lesson",
          "Time Voucher",
        ].includes(activeTab) ? (
          <ScheduleCalendar lessons={lessons} />
        ) : activeTab === "Students" ? (
          <div className="overflow-x-auto p-4">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Phone</th>
                  <th className="px-3 py-2 text-left">Courses</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">{s.email}</td>
                    <td className="px-3 py-2">{s.phone}</td>
                    <td className="px-3 py-2">
                      {s.enrolledCourses.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          getTabPanels(selectedTeacher)[activeTab]
        )}
      </section>
    </div>
  );
}
