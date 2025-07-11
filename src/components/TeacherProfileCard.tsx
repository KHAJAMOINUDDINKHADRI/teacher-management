import React, { useState } from "react";
import type { Teacher } from "../data/teachers";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

export type EditableTeacher = Omit<Teacher, "email" | "phone" | "address"> & {
  emails: string[];
  phones: string[];
  addresses: string[];
};

interface TeacherProfileCardProps {
  teacher: EditableTeacher;
  onChange: (teacher: EditableTeacher) => void;
  errors?: unknown;
}

export default function TeacherProfileCard({
  teacher,
  onChange,
}: TeacherProfileCardProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<EditableTeacher>(teacher);

  // Handlers for editing
  const handleField = (field: keyof EditableTeacher, value: unknown) => {
    setEditData({ ...editData, [field]: value });
  };
  const handleListChange = (
    field: "emails" | "phones" | "addresses",
    idx: number,
    value: string
  ) => {
    const arr = [...editData[field]];
    arr[idx] = value;
    setEditData({ ...editData, [field]: arr });
  };
  const handleListAdd = (field: "emails" | "phones" | "addresses") => {
    setEditData({ ...editData, [field]: [...editData[field], ""] });
  };
  const handleListRemove = (
    field: "emails" | "phones" | "addresses",
    idx: number
  ) => {
    const arr = [...editData[field]];
    arr.splice(idx, 1);
    setEditData({ ...editData, [field]: arr });
  };
  const startEdit = () => {
    setEditData(teacher);
    setEditing(true);
  };
  const cancelEdit = () => {
    setEditData(teacher);
    setEditing(false);
  };
  const saveEdit = () => {
    onChange(editData);
    setEditing(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl text-white font-bold">
          {editData.name && editData.name.length > 0 ? editData.name[0] : "?"}
        </div>
        <div className="flex-1">
          {editing ? (
            <input
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-b border-blue-300 focus:outline-none w-full"
              value={editData.name}
              onChange={(e) => handleField("name", e.target.value)}
            />
          ) : (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {teacher.name}
            </h2>
          )}
          {editing ? (
            <input
              className="text-gray-500 dark:text-gray-400 bg-transparent border-b border-blue-100 focus:outline-none w-full"
              value={editData.role}
              onChange={(e) => handleField("role", e.target.value)}
              placeholder="Role"
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">{teacher.role}</p>
          )}
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={saveEdit}
                className="text-green-600 hover:text-green-800"
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
            <button
              onClick={startEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-400">ID</div>
          {editing ? (
            <input
              className="text-sm text-gray-700 dark:text-gray-200 bg-transparent border-b border-blue-100 focus:outline-none w-full"
              value={editData.id}
              onChange={(e) => handleField("id", e.target.value)}
            />
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {teacher.id}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-400">Birth Date</div>
          {editing ? (
            <input
              type="date"
              className="text-sm text-gray-700 dark:text-gray-200 bg-transparent border-b border-blue-100 focus:outline-none w-full"
              value={editData.birthDate}
              onChange={(e) => handleField("birthDate", e.target.value)}
            />
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {teacher.birthDate}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-400">Emails</div>
          {editing ? (
            <div className="flex flex-col gap-1">
              {editData.emails.map((email, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <input
                    className="text-sm text-gray-700 dark:text-gray-200 bg-transparent border-b border-blue-100 focus:outline-none flex-1"
                    value={email}
                    onChange={(e) =>
                      handleListChange("emails", i, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleListRemove("emails", i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleListAdd("emails")}
                className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 mt-1"
              >
                <FaPlus /> Add Email
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
              {teacher.emails.map((email, i) => (
                <span key={i}>{email}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-400">Phone Numbers</div>
          {editing ? (
            <div className="flex flex-col gap-1">
              {editData.phones.map((phone, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <input
                    className="text-sm text-gray-700 dark:text-gray-200 bg-transparent border-b border-blue-100 focus:outline-none flex-1"
                    value={phone}
                    onChange={(e) =>
                      handleListChange("phones", i, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleListRemove("phones", i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleListAdd("phones")}
                className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 mt-1"
              >
                <FaPlus /> Add Phone
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
              {teacher.phones.map((phone, i) => (
                <span key={i}>{phone}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-400">Addresses</div>
          {editing ? (
            <div className="flex flex-col gap-1">
              {editData.addresses.map((address, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <input
                    className="text-sm text-gray-700 dark:text-gray-200 bg-transparent border-b border-blue-100 focus:outline-none flex-1"
                    value={address}
                    onChange={(e) =>
                      handleListChange("addresses", i, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleListRemove("addresses", i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleListAdd("addresses")}
                className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 mt-1"
              >
                <FaPlus /> Add Address
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
              {teacher.addresses.map((address, i) => (
                <span key={i}>{address}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
