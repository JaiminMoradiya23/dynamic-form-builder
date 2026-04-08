"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import FieldLibrary from "@/components/builder/FieldLibrary";
import FormCanvas from "@/components/builder/FormCanvas";
import FieldSettings from "@/components/builder/FieldSettings";
import FormPreview from "@/components/builder/FormPreview";
import DragOverlayCard from "@/components/builder/DragOverlayCard";
import JsonExportModal from "@/components/builder/JsonExportModal";
import { getFormById, updateForm } from "@/utils/storageHelpers";
import {
  setFields,
  addField,
  removeField,
  reorderFields,
  duplicateField,
} from "@/store/slices/formSlice";
import { setSelectedField, setPreviewMode } from "@/store/slices/uiSlice";
import { Field, Input } from "@headlessui/react";

const DEFAULT_LABELS = {
  text: "Text Input",
  email: "Email Address",
  number: "Number",
  textarea: "Long Text",
  select: "Dropdown",
  checkbox: "Checkbox",
  radio: "Radio Group",
};

const INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 data-[focus]:border-indigo-400 data-[focus]:bg-white data-[focus]:ring-2 data-[focus]:ring-indigo-400/20 data-[hover]:border-slate-300 dark:data-[focus]:bg-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:data-[focus]:border-indigo-500 dark:data-[focus]:ring-indigo-500/20 dark:data-[hover]:border-slate-600";

function createFieldObject(type) {
  return {
    id: crypto.randomUUID(),
    type,
    label: DEFAULT_LABELS[type] || type,
    required: false,
    placeholder: "",
    validation: {},
    options:
      type === "select" || type === "radio"
        ? ["Option 1", "Option 2"]
        : [],
    layout: { width: 100 },
  };
}

export default function FormBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const fields = useSelector((state) => state.form.fields);
  const selectedFieldId = useSelector((state) => state.ui.selectedFieldId);
  const isPreviewMode = useSelector((state) => state.ui.isPreviewMode);

  const [form, setForm] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [formName, setFormName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [activeDrag, setActiveDrag] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  const nameInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // --- Data loading ---

  useEffect(() => {
    const loaded = getFormById(id);
    if (loaded) {
      setForm(loaded);
      setFormName(loaded.name);
      dispatch(setFields(loaded.fields));
    } else {
      setNotFound(true);
    }
    return () => {
      dispatch(setFields([]));
      dispatch(setSelectedField(null));
      dispatch(setPreviewMode(false));
    };
  }, [id, dispatch]);

  // --- Auto-save ---

  const persistToStorage = useCallback(
    (fieldsToSave, nameToSave) => {
      if (!form) return;
      setSaveStatus("saving");
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        updateForm(form.id, { fields: fieldsToSave, name: nameToSave });
        setSaveStatus("saved");
      }, 400);
    },
    [form]
  );

  useEffect(() => {
    if (form) {
      persistToStorage(fields, formName);
    }
  }, [fields, formName, form, persistToStorage]);

  useEffect(() => {
    return () => clearTimeout(saveTimeoutRef.current);
  }, []);

  // --- Name editing ---

  function handleNameBlur() {
    setIsEditingName(false);
    if (!formName.trim()) setFormName(form.name);
  }

  function handleNameKeyDown(e) {
    if (e.key === "Enter") nameInputRef.current?.blur();
    if (e.key === "Escape") {
      setFormName(form.name);
      setIsEditingName(false);
    }
  }

  // --- Field CRUD ---

  function handleAddField(type) {
    dispatch(addField(createFieldObject(type)));
  }

  function handleSelectField(fieldId) {
    dispatch(setSelectedField(fieldId === selectedFieldId ? null : fieldId));
  }

  function handleDeleteField(fieldId) {
    dispatch(removeField(fieldId));
    if (selectedFieldId === fieldId) dispatch(setSelectedField(null));
  }

  function handleDuplicateField(fieldId) {
    dispatch(duplicateField(fieldId));
  }

  // --- Drag & Drop ---

  function handleDragStart(event) {
    const { active } = event;
    const data = active.data.current;

    if (data?.source === "library") {
      setActiveDrag({ source: "library", type: data.type });
    } else if (data?.source === "canvas") {
      setActiveDrag({
        source: "canvas",
        field: data.field,
      });
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveDrag(null);

    if (!active || !over) return;

    const activeData = active.data.current;

    if (activeData?.source === "library") {
      const isOverCanvas =
        over.id === "canvas" || over.data.current?.source === "canvas";
      if (isOverCanvas) {
        dispatch(addField(createFieldObject(activeData.type)));
      }
      return;
    }

    if (activeData?.source === "canvas" && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        dispatch(reorderFields(arrayMove(fields, oldIndex, newIndex)));
      }
    }
  }

  function handleDragCancel() {
    setActiveDrag(null);
  }

  // --- Render ---

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
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {isEditingName ? (
                <Field>
                  <Input
                    ref={nameInputRef}
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    className={INPUT_CLASS}
                    autoFocus
                  />
                </Field>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="group flex items-center gap-2 rounded-lg px-1 py-0.5 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <h2 className="truncate text-xl font-semibold text-slate-900 dark:text-white">
                    {formName}
                  </h2>
                  <svg
                    className="h-4 w-4 shrink-0 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="mt-1 flex items-center gap-3">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {fields.length} {fields.length === 1 ? "field" : "fields"}
              </p>
              <span className="text-slate-300 dark:text-slate-700">
                &middot;
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={saveStatus}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 text-sm"
                >
                  {saveStatus === "saved" ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Auto-saved
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                      <span className="text-amber-600 dark:text-amber-400">
                        Saving...
                      </span>
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* Export JSON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>
              <span className="hidden sm:inline">Export JSON</span>
            </motion.button>

            {/* Builder / Preview Toggle */}
            <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setPreviewMode(false))}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  !isPreviewMode
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Builder
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setPreviewMode(true))}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isPreviewMode
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Preview
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/forms")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800"
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
              Back
            </motion.button>
          </div>
        </motion.div>

        {/* Builder / Preview Content */}
        <AnimatePresence mode="wait">
          {isPreviewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <FormPreview formName={formName} />
            </motion.div>
          ) : (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="min-h-0 flex-1"
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <div className="flex h-full gap-4">
                  <FieldLibrary onAddField={handleAddField} />

                  <FormCanvas
                    fields={fields}
                    selectedFieldId={selectedFieldId}
                    onSelectField={handleSelectField}
                    onDeleteField={handleDeleteField}
                    onDuplicateField={handleDuplicateField}
                    onAddFirstField={() => handleAddField("text")}
                  />

                  <FieldSettings />
                </div>

                <DragOverlay dropAnimation={{ duration: 200 }}>
                  {activeDrag?.source === "library" && (
                    <DragOverlayCard type={activeDrag.type} />
                  )}
                  {activeDrag?.source === "canvas" && (
                    <DragOverlayCard
                      type={activeDrag.field.type}
                      label={activeDrag.field.label}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* JSON Export Modal */}
      <JsonExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        formName={formName}
      />
    </ProtectedLayout>
  );
}
