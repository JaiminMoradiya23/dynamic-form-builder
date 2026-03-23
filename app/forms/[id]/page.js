"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import FieldLibrary from "@/components/builder/FieldLibrary";
import FormCanvas from "@/components/builder/FormCanvas";
import FieldSettings from "@/components/builder/FieldSettings";
import { getFormById, updateForm } from "@/utils/storageHelpers";
import { setFields, addField, removeField, updateField } from "@/store/slices/formSlice";
import { setSelectedField } from "@/store/slices/uiSlice";

export default function FormBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const fields = useSelector((state) => state.form.fields);
  const selectedFieldId = useSelector((state) => state.ui.selectedFieldId);

  const [form, setForm] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  useEffect(() => {
    const loaded = getFormById(id);
    if (loaded) {
      setForm(loaded);
      dispatch(setFields(loaded.fields));
    } else {
      setNotFound(true);
    }
    return () => {
      dispatch(setFields([]));
      dispatch(setSelectedField(null));
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (form && fields) {
      updateForm(form.id, { fields });
    }
  }, [fields, form]);

  function handleAddField(type) {
    const defaultLabels = {
      text: "Text Input",
      email: "Email Address",
      number: "Number",
      textarea: "Long Text",
      select: "Dropdown",
      checkbox: "Checkbox",
      radio: "Radio Group",
    };

    const newField = {
      id: crypto.randomUUID(),
      type,
      label: defaultLabels[type] || type,
      required: false,
      placeholder: "",
      validation: {},
      options: type === "select" || type === "radio" ? ["Option 1", "Option 2"] : [],
    };

    dispatch(addField(newField));
  }

  function handleSelectField(fieldId) {
    dispatch(setSelectedField(fieldId === selectedFieldId ? null : fieldId));
  }

  function handleDeleteField(fieldId) {
    dispatch(removeField(fieldId));
    if (selectedFieldId === fieldId) {
      dispatch(setSelectedField(null));
    }
  }

  function handleUpdateField(fieldId, updates) {
    dispatch(updateField({ id: fieldId, updates }));
  }

  if (notFound) {
    return (
      <ProtectedLayout>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
            <svg
              className="h-7 w-7 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Form not found
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400 dark:text-slate-500">
            The form you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <button
            onClick={() => router.push("/forms")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
          >
            Back to Forms
          </button>
        </motion.div>
      </ProtectedLayout>
    );
  }

  if (!form) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="flex h-[calc(100vh-80px)] flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex shrink-0 items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {form.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              {fields.length} {fields.length === 1 ? "field" : "fields"}
            </p>
          </div>
          <button
            onClick={() => router.push("/forms")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Back to Forms
          </button>
        </motion.div>

        {/* 3-Panel Layout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex min-h-0 flex-1 gap-4"
        >
          <FieldLibrary onAddField={handleAddField} />

          <FormCanvas
            fields={fields}
            selectedFieldId={selectedFieldId}
            onSelectField={handleSelectField}
            onDeleteField={handleDeleteField}
          />

          <FieldSettings
            field={selectedField}
            onUpdate={handleUpdateField}
          />
        </motion.div>
      </div>
    </ProtectedLayout>
  );
}
