import PaymentForm from "@/components/PaymentForm";
import { FaCreditCard } from "react-icons/fa";

export default function PaymentPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-2 sm:px-6">
      <div className="flex justify-center items-center gap-3 mb-8">
        <span className="text-3xl text-blue-600 dark:text-blue-400">
          <FaCreditCard />
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Payment Form
        </h2>
      </div>
      <PaymentForm />
    </div>
  );
}
