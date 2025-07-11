import React from "react";

export type Lesson = {
  day: string; // e.g., 'Monday'
  start: string; // e.g., '10:00'
  end: string; // e.g., '11:00'
  label: string;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const hours = Array.from({ length: 13 }, (_, i) => 8 + i); // 8am to 8pm

function getTimeIndex(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h + (m >= 30 ? 0.5 : 0) - 8;
}

function getLessonColor(label: string) {
  switch (label) {
    case "Available":
      return "bg-green-200 text-green-900 border-green-300 dark:bg-green-700 dark:text-green-100 dark:border-green-800";
    case "Unavailable":
      return "bg-red-200 text-red-900 border-red-300 dark:bg-red-700 dark:text-red-100 dark:border-red-800";
    case "Lesson":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800";
    case "Invoiced":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-800";
    case "Unscheduled":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800";
    case "Voucher":
      return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-800";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800";
  }
}

export default function ScheduleCalendar({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-20"></th>
            {days.map((day) => (
              <th
                key={day}
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 px-2 py-1 text-center"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIdx) => (
            <tr key={hour}>
              <td className="text-xs text-gray-400 px-2 py-1 align-top w-20">
                {hour}:00
              </td>
              {days.map((day) => {
                const lesson = lessons.find(
                  (l) => l.day === day && getTimeIndex(l.start) === rowIdx
                );
                if (lesson) {
                  const startIdx = getTimeIndex(lesson.start);
                  const endIdx = getTimeIndex(lesson.end);
                  const rowSpan = Math.max(1, endIdx - startIdx);
                  return (
                    <td
                      key={day}
                      rowSpan={rowSpan}
                      className={`${getLessonColor(
                        lesson.label
                      )} rounded-md text-xs px-2 py-1 align-top border font-medium text-center`}
                    >
                      {lesson.label}
                    </td>
                  );
                }
                // Don't render a cell if it's covered by a rowSpan above
                const covered = lessons.some((l) => {
                  if (l.day !== day) return false;
                  const startIdx = getTimeIndex(l.start);
                  const endIdx = getTimeIndex(l.end);
                  return rowIdx > startIdx && rowIdx < endIdx;
                });
                if (covered) return null;
                return (
                  <td
                    key={day}
                    className="border border-gray-100 dark:border-gray-800"
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
