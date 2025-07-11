"use client";

import React, { useState } from "react";

const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "Other"];

// State type for the payment form
// Each field is a string for easy binding to input values
// 'method' is one of the paymentMethods
// 'notes' is optional
type PaymentFormState = {
  student: string;
  amount: string;
  date: string;
  method: string;
  notes: string;
};

// Feedback type for user feedback after submission
// type: 'success' or 'error', message: string
type Feedback = { type: "success" | "error"; message: string } | null;

const initialState: PaymentFormState = {
  student: "",
  amount: "",
  date: "",
  method: paymentMethods[0],
  notes: "",
};

export default function PaymentForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<PaymentFormState>>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  // Validate the form fields and return an object of errors
  function validate(f: PaymentFormState) {
    const errs: Partial<PaymentFormState> = {};
    if (!f.student.trim()) errs.student = "Student name is required.";
    if (!f.amount.trim() || isNaN(Number(f.amount)) || Number(f.amount) <= 0)
      errs.amount = "Enter a valid positive amount.";
    if (!f.date.trim() || isNaN(Date.parse(f.date)))
      errs.date = "Enter a valid date.";
    if (!f.method.trim()) errs.method = "Select a payment method.";
    return errs;
  }

  // Handle form submission: validate, show loading, simulate async, show feedback
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    // Simulate async payment processing (replace with real API call in production)
    setTimeout(() => {
      setLoading(false);
      if (form.student.toLowerCase() === "error") {
        setFeedback({
          type: "error",
          message: "Payment failed. Please try again.",
        });
      } else {
        setFeedback({
          type: "success",
          message: "Payment recorded successfully!",
        });
        setForm(initialState);
      }
    }, 1200);
  }

  // Handle input changes: update form state and clear error for the field
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow mt-8"
      aria-label="Record Payment Form"
      autoComplete="off"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Record Payment
      </h3>
      {/* Student Name Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          htmlFor="student"
        >
          Student Name<span className="text-red-500">*</span>
        </label>
        <input
          id="student"
          name="student"
          type="text"
          className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
            errors.student ? "border-red-500" : "border-gray-300"
          }`}
          value={form.student}
          onChange={handleChange}
          disabled={loading}
          aria-invalid={!!errors.student}
          aria-describedby={errors.student ? "student-error" : undefined}
          required
        />
        {errors.student && (
          <div id="student-error" className="text-xs text-red-600 mt-1">
            {errors.student}
          </div>
        )}
      </div>
      {/* Amount Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          htmlFor="amount"
        >
          Amount ($)<span className="text-red-500">*</span>
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
          value={form.amount}
          onChange={handleChange}
          disabled={loading}
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? "amount-error" : undefined}
          required
        />
        {errors.amount && (
          <div id="amount-error" className="text-xs text-red-600 mt-1">
            {errors.amount}
          </div>
        )}
      </div>
      {/* Date Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          htmlFor="date"
        >
          Date<span className="text-red-500">*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
            errors.date ? "border-red-500" : "border-gray-300"
          }`}
          value={form.date}
          onChange={handleChange}
          disabled={loading}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
          required
        />
        {errors.date && (
          <div id="date-error" className="text-xs text-red-600 mt-1">
            {errors.date}
          </div>
        )}
      </div>
      {/* Payment Method Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          htmlFor="method"
        >
          Payment Method<span className="text-red-500">*</span>
        </label>
        <select
          id="method"
          name="method"
          className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
            errors.method ? "border-red-500" : "border-gray-300"
          }`}
          value={form.method}
          onChange={handleChange}
          disabled={loading}
          aria-invalid={!!errors.method}
          aria-describedby={errors.method ? "method-error" : undefined}
          required
        >
          {paymentMethods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        {errors.method && (
          <div id="method-error" className="text-xs text-red-600 mt-1">
            {errors.method}
          </div>
        )}
      </div>
      {/* Notes Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          htmlFor="notes"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.notes}
          onChange={handleChange}
          disabled={loading}
          rows={2}
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>
      {/* Feedback Message */}
      {feedback && (
        <div
          className={`mt-2 text-center text-sm font-medium ${
            feedback.type === "success" ? "text-green-700" : "text-red-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
}
