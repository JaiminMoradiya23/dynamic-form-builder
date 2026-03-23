"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@headlessui/react";

export default function FieldSettings({ field, onUpdate }) {
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState([]);

  const hasOptions = field?.type === "select" || field?.type === "radio";

  useEffect(() => {
    if (field) {
      setLabel(field.label || "");
      setPlaceholder(field.placeholder || "");
      setRequired(field.required || false);
      setOptions(field.options || []);
    }
  }, [field]);

  function handleUpdate(key, value) {
    onUpdate(field.id, { [key]: value });
  }

  function handleAddOption() {
    const updated = [...options, `Option ${options.length + 1}`];
    setOptions(updated);
    handleUpdate("options", updated);
  }

  function handleOptionChange(index, value) {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
    handleUpdate("options", updated);
  }

  function handleRemoveOption(index) {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    handleUpdate("options", updated);
  }

  if (!field) {
    return (
      <div className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Field Settings
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Configure field properties
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <svg
                className="h-6 w-6 text-slate-400 dark:text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Select a field to edit its settings
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          Field Settings
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Editing:{" "}
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {field.label}
          </span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex-1 space-y-6 overflow-y-auto p-6"
        >
          {/* Label */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                handleUpdate("label", e.target.value);
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
              placeholder="Field label"
            />
          </div>

          {/* Placeholder */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => {
                setPlaceholder(e.target.value);
                handleUpdate("placeholder", e.target.value);
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
              placeholder="Placeholder text"
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Required
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Mark this field as mandatory
              </p>
            </div>
            <Switch
              checked={required}
              onChange={(val) => {
                setRequired(val);
                handleUpdate("required", val);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ${
                required
                  ? "bg-indigo-500"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-all duration-200 ${
                  required ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </Switch>
          </div>

          {/* Validation (UI shell) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Validation
            </label>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-400">
                Validation rules will be available soon
              </p>
            </div>
          </div>

          {/* Options (for select/radio) */}
          {hasOptions && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Options
                </label>
                <button
                  onClick={handleAddOption}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-indigo-500 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
                    />
                    <button
                      onClick={() => handleRemoveOption(idx)}
                      className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {options.length === 0 && (
                  <p className="py-2 text-center text-xs text-slate-400">
                    No options yet. Click &quot;+ Add&quot; to create one.
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
