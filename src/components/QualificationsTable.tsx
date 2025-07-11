import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

type Qualification = {
  name: string;
  rate: string;
};

type QualificationsTableProps = {
  title: string;
  data: Qualification[];
  onChange: (data: Qualification[]) => void;
};

export default function QualificationsTable({
  title,
  data,
  onChange,
}: QualificationsTableProps) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Qualification>({ name: "", rate: "" });

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setEditRow(data[idx]);
  };
  const cancelEdit = () => {
    setEditIdx(null);
    setEditRow({ name: "", rate: "" });
  };
  const saveEdit = (idx: number) => {
    const newData = [...data];
    newData[idx] = editRow;
    onChange(newData);
    setEditIdx(null);
  };
  const removeRow = (idx: number) => {
    const newData = [...data];
    newData.splice(idx, 1);
    onChange(newData);
  };
  const addRow = () => {
    onChange([...data, { name: "", rate: "" }]);
    setEditIdx(data.length);
    setEditRow({ name: "", rate: "" });
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 w-full max-w-4xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <button
          onClick={addRow}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm"
        >
          <FaPlus /> Add
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 text-xs text-gray-400 font-medium">
              Name
            </th>
            <th className="py-2 px-3 text-xs text-gray-400 font-medium">
              Rate ($/hr)
            </th>
            <th className="py-2 px-3 text-xs text-gray-400 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-400">
                No qualifications
              </td>
            </tr>
          ) : (
            data.map((q, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 dark:border-gray-800"
              >
                <td className="py-2 px-3 text-gray-700 dark:text-gray-200">
                  {editIdx === i ? (
                    <input
                      className="bg-transparent border-b border-blue-200 focus:outline-none w-full"
                      value={editRow.name}
                      onChange={(e) =>
                        setEditRow({ ...editRow, name: e.target.value })
                      }
                    />
                  ) : (
                    q.name
                  )}
                </td>
                <td className="py-2 px-3 text-gray-700 dark:text-gray-200">
                  {editIdx === i ? (
                    <input
                      className="bg-transparent border-b border-blue-200 focus:outline-none w-full"
                      value={editRow.rate}
                      onChange={(e) =>
                        setEditRow({ ...editRow, rate: e.target.value })
                      }
                    />
                  ) : (
                    q.rate
                  )}
                </td>
                <td className="py-2 px-3">
                  {editIdx === i ? (
                    <>
                      <button
                        onClick={() => saveEdit(i)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(i)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => removeRow(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
