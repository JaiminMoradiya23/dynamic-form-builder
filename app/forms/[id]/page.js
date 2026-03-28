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
import DragOverlayCard from "@/components/builder/DragOverlayCard";
import { getFormById, updateForm } from "@/utils/storageHelpers";
import {
  setFields,
  addField,
  removeField,
  reorderFields,
} from "@/store/slices/formSlice";
import { setSelectedField } from "@/store/slices/uiSlice";

const DEFAULT_LABELS = {
  text: "Text Input",
  email: "Email Address",
  number: "Number",
  textarea: "Long Text",
  select: "Dropdown",
  checkbox: "Checkbox",
  radio: "Radio Group",
};

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
  };
}

export default function FormBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const fields = useSelector((state) => state.form.fields);
  const selectedFieldId = useSelector((state) => state.ui.selectedFieldId);

  const [form, setForm] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [formName, setFormName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [activeDrag, setActiveDrag] = useState(null);
  const nameInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // 5px distance before drag starts — prevents accidental drags when clicking
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

    // Drop from library onto canvas
    if (activeData?.source === "library") {
      const isOverCanvas =
        over.id === "canvas" || over.data.current?.source === "canvas";
      if (isOverCanvas) {
        dispatch(addField(createFieldObject(activeData.type)));
      }
      return;
    }

    // Reorder within canvas
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
                <input
                  ref={nameInputRef}
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                  className="w-full max-w-sm rounded-lg border border-indigo-300 bg-white px-3 py-1.5 text-xl font-semibold text-slate-900 outline-none ring-2 ring-indigo-400/20 transition-all duration-200 dark:border-indigo-500/50 dark:bg-slate-800 dark:text-white dark:ring-indigo-500/20"
                />
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

          <button
            onClick={() => router.push("/forms")}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
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

        {/* 3-Panel Layout with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
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
              onAddFirstField={() => handleAddField("text")}
            />

            <FieldSettings />
          </motion.div>

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
      </div>
    </ProtectedLayout>
  );
}
