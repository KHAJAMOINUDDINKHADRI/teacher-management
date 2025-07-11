import ScheduleCalendar from "@/components/ScheduleCalendar";
import { FaCalendar } from "react-icons/fa";
import { mockSchedule } from "@/data/scheduleMock";

export default function PaymentPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-2 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl text-blue-600 dark:text-blue-400">
          <FaCalendar />
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Calendaer
        </h2>
      </div>
      <ScheduleCalendar lessons={mockSchedule} />
    </div>
  );
}