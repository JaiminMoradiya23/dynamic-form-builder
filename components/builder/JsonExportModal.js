"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  CloseButton,
} from "@headlessui/react";

export default function JsonExportModal({ isOpen, onClose, formName }) {
  const fields = useSelector((state) => state.form.fields);
  const [copied, setCopied] = useState(false);

  const schema = useMemo(() => {
    const cleaned = fields.map(({ id, type, label, required, placeholder, validation, options, layout }) => {
      const obj = { id, type, label, required };
      if (placeholder) obj.placeholder = placeholder;
      if (validation && Object.keys(validation).length > 0) obj.validation = validation;
      if (options && options.length > 0) obj.options = options;
      if (layout && layout.width !== 100) obj.layout = layout;
      return obj;
    });

    return JSON.stringify(
      { name: formName || "Untitled Form", fields: cleaned },
      null,
      2
    );
  }, [fields, formName]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = schema;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div>
              <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Export JSON Schema
              </DialogTitle>
              <Description className="mt-0.5 text-sm text-slate-400 dark:text-slate-500">
                {fields.length} {fields.length === 1 ? "field" : "fields"} in
                schema
              </Description>
            </div>
            <CloseButton className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </CloseButton>
          </div>

          {/* Code Block */}
          <div className="max-h-[50vh] overflow-auto bg-slate-50 p-6 dark:bg-slate-950">
            <pre className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <code>{schema}</code>
            </pre>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {schema.length} characters
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                Close
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                        />
                      </svg>
                      Copy to Clipboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
