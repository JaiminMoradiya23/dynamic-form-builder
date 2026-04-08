"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Field,
  Label,
  Description,
  Input,
  Switch,
  RadioGroup,
  Radio,
} from "@headlessui/react";
import { updateField } from "@/store/slices/formSlice";
import { getFieldColor, getFieldMeta } from "@/utils/fieldConfig";

const INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 data-[focus]:border-indigo-400 data-[focus]:bg-white data-[focus]:ring-2 data-[focus]:ring-indigo-400/20 data-[hover]:border-slate-300 data-[invalid]:border-red-300 data-[invalid]:data-[focus]:border-red-400 data-[invalid]:data-[focus]:ring-red-400/20 dark:data-[focus]:bg-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:data-[focus]:border-indigo-500 dark:data-[focus]:ring-indigo-500/20 dark:data-[hover]:border-slate-600 dark:data-[invalid]:border-red-500/50 dark:data-[invalid]:data-[focus]:border-red-500 dark:data-[invalid]:data-[focus]:ring-red-500/20";

const WIDTH_OPTIONS = [
  { value: 100, label: "Full Width", icon: "100%" },
  { value: 50, label: "Half Width", icon: "50%" },
  { value: 33, label: "One Third", icon: "33%" },
];

function SectionHeading({ icon, children }) {
  return (
    <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      {icon}
      {children}
    </h4>
  );
}

function SectionDivider() {
  return <div className="border-t border-slate-100 dark:border-slate-800" />;
}

function buildValidationObject(minLen, maxLen, pat) {
  const v = {};
  const minNum = minLen === "" ? undefined : Number(minLen);
  const maxNum = maxLen === "" ? undefined : Number(maxLen);
  if (minNum != null && !isNaN(minNum) && minNum >= 0) v.minLength = minNum;
  if (maxNum != null && !isNaN(maxNum) && maxNum >= 0) v.maxLength = maxNum;
  if (pat) v.pattern = pat;
  return v;
}

export default function FieldSettings() {
  const dispatch = useDispatch();
  const selectedFieldId = useSelector((state) => state.ui.selectedFieldId);
  const fields = useSelector((state) => state.form.fields);

  const field = useMemo(
    () => fields.find((f) => f.id === selectedFieldId) || null,
    [fields, selectedFieldId]
  );

  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState([]);
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [pattern, setPattern] = useState("");
  const [fieldWidth, setFieldWidth] = useState(100);

  const hasOptions = field?.type === "select" || field?.type === "radio";
  const supportsValidation = useMemo(
    () => ["text", "email", "number", "textarea"].includes(field?.type),
    [field?.type]
  );

  useEffect(() => {
    if (field) {
      setLabel(field.label || "");
      setPlaceholder(field.placeholder || "");
      setRequired(field.required || false);
      setOptions(field.options || []);
      setMinLength(field.validation?.minLength ?? "");
      setMaxLength(field.validation?.maxLength ?? "");
      setPattern(field.validation?.pattern ?? "");
      setFieldWidth(field.layout?.width ?? 100);
    }
  }, [field?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const dispatchUpdate = useCallback(
    (updates) => {
      if (!field) return;
      dispatch(updateField({ id: field.id, updates }));
    },
    [dispatch, field]
  );

  function handleLabelChange(e) {
    const val = e.target.value;
    setLabel(val);
    dispatchUpdate({ label: val });
  }

  function handlePlaceholderChange(e) {
    const val = e.target.value;
    setPlaceholder(val);
    dispatchUpdate({ placeholder: val });
  }

  function handleRequiredChange(val) {
    setRequired(val);
    dispatchUpdate({ required: val });
  }

  function handleWidthChange(val) {
    setFieldWidth(val);
    dispatchUpdate({ layout: { width: val } });
  }

  function handleMinLengthChange(e) {
    const val = e.target.value;
    setMinLength(val);
    dispatchUpdate({
      validation: buildValidationObject(val, maxLength, pattern),
    });
  }

  function handleMaxLengthChange(e) {
    const val = e.target.value;
    setMaxLength(val);
    dispatchUpdate({
      validation: buildValidationObject(minLength, val, pattern),
    });
  }

  function handlePatternChange(e) {
    const val = e.target.value;
    setPattern(val);
    dispatchUpdate({
      validation: buildValidationObject(minLength, maxLength, val),
    });
  }

  function handleAddOption() {
    const updated = [...options, `Option ${options.length + 1}`];
    setOptions(updated);
    dispatchUpdate({ options: updated });
  }

  function handleOptionChange(index, value) {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
    dispatchUpdate({ options: updated });
  }

  function handleRemoveOption(index) {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    dispatchUpdate({ options: updated });
  }

  if (!field) {
    return (
      <div className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Field Settings
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Configure field properties
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"
            >
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
            </motion.div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Select a field to edit
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
              Click any field on the canvas to
              <br />
              customize its properties
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const colors = getFieldColor(field.type);
  const meta = getFieldMeta(field.type);

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
          >
            {meta.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Field Settings
            </h3>
            <p className="truncate text-sm text-slate-400">{meta.label}</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex-1 space-y-6 overflow-y-auto p-6"
        >
          {/* Field Info */}
          <div>
            <SectionHeading
              icon={
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              }
            >
              Field Info
            </SectionHeading>
            <div
              className={`flex items-center gap-3 rounded-lg border border-transparent p-3 ${colors.bg}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${colors.iconBg} ${colors.text}`}
              >
                {meta.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {meta.label}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {meta.description}
                </p>
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* Basic Settings */}
          <div>
            <SectionHeading
              icon={
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              }
            >
              Basic Settings
            </SectionHeading>
            <div className="space-y-4">
              <Field>
                <Label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Label
                </Label>
                <Input
                  type="text"
                  value={label}
                  onChange={handleLabelChange}
                  className={INPUT_CLASS}
                  placeholder="Field label"
                />
              </Field>

              <Field>
                <Label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Placeholder
                </Label>
                <Input
                  type="text"
                  value={placeholder}
                  onChange={handlePlaceholderChange}
                  className={INPUT_CLASS}
                  placeholder="Placeholder text"
                />
              </Field>

              <Field className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Required
                  </Label>
                  <Description className="mt-0.5 text-xs text-slate-400">
                    Mark as mandatory
                  </Description>
                </div>
                <Switch
                  checked={required}
                  onChange={handleRequiredChange}
                  className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-all duration-200 data-[checked]:bg-indigo-500 dark:bg-slate-700"
                >
                  <span className="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow-sm ring-0 transition-all duration-200 group-data-[checked]:translate-x-5" />
                </Switch>
              </Field>
            </div>
          </div>

          <SectionDivider />

          {/* Layout - Field Width */}
          <div>
            <SectionHeading
              icon={
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
                  />
                </svg>
              }
            >
              Layout
            </SectionHeading>
            <RadioGroup
              value={fieldWidth}
              onChange={handleWidthChange}
              className="grid grid-cols-3 gap-2"
            >
              {WIDTH_OPTIONS.map((opt) => (
                <Radio
                  key={opt.value}
                  value={opt.value}
                  className="group cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition-all duration-200 hover:border-slate-300 data-[checked]:border-indigo-500 data-[checked]:bg-indigo-50 data-[checked]:ring-1 data-[checked]:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:data-[checked]:border-indigo-500 dark:data-[checked]:bg-indigo-500/10"
                >
                  <span className="block text-sm font-bold text-slate-500 transition-colors group-data-[checked]:text-indigo-600 dark:text-slate-400 dark:group-data-[checked]:text-indigo-400">
                    {opt.icon}
                  </span>
                  <span className="mt-0.5 block text-[10px] font-medium text-slate-400 transition-colors group-data-[checked]:text-indigo-500 dark:text-slate-500 dark:group-data-[checked]:text-indigo-400">
                    {opt.label}
                  </span>
                </Radio>
              ))}
            </RadioGroup>
            <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Place fields side-by-side by setting matching widths
            </p>
          </div>

          {/* Validation Settings */}
          {supportsValidation && (
            <>
              <SectionDivider />
              <div>
                <SectionHeading
                  icon={
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                      />
                    </svg>
                  }
                >
                  Validation
                </SectionHeading>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <Label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Min Length
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={minLength}
                        onChange={handleMinLengthChange}
                        className={INPUT_CLASS}
                        placeholder="0"
                      />
                    </Field>
                    <Field>
                      <Label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Max Length
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={maxLength}
                        onChange={handleMaxLengthChange}
                        className={INPUT_CLASS}
                        placeholder="∞"
                      />
                    </Field>
                  </div>

                  <Field>
                    <Label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Pattern (Regex)
                    </Label>
                    <Input
                      type="text"
                      value={pattern}
                      onChange={handlePatternChange}
                      className={`${INPUT_CLASS} font-mono text-xs`}
                      placeholder="e.g. ^[a-zA-Z]+$"
                    />
                    <Description className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                      Regular expression for input validation
                    </Description>
                  </Field>
                </div>
              </div>
            </>
          )}

          {/* Options (for select/radio) */}
          {hasOptions && (
            <>
              <SectionDivider />
              <div>
                <SectionHeading
                  icon={
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  }
                >
                  Options
                </SectionHeading>
                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {options.map((opt, idx) => (
                      <motion.div
                        key={`${field.id}-opt-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold text-slate-400 dark:text-slate-500">
                          {idx + 1}
                        </span>
                        <Input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(idx, e.target.value)
                          }
                          className={`flex-1 ${INPUT_CLASS}`}
                        />
                        <button
                          onClick={() => handleRemoveOption(idx)}
                          disabled={options.length <= 1}
                          className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
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
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {options.length === 0 && (
                    <p className="py-3 text-center text-xs text-slate-400">
                      No options yet
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddOption}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-200 py-2.5 text-xs font-medium text-indigo-500 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add option
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
