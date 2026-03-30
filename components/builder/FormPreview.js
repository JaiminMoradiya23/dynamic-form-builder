"use client";

import { useState, useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Field,
  Label,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

const INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 data-[focus]:border-indigo-400 data-[focus]:bg-white data-[focus]:ring-2 data-[focus]:ring-indigo-400/20 data-[hover]:border-slate-300 data-[invalid]:border-red-300 data-[invalid]:data-[focus]:border-red-400 data-[invalid]:data-[focus]:ring-red-400/20 dark:data-[focus]:bg-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:data-[focus]:border-indigo-500 dark:data-[focus]:ring-indigo-500/20 dark:data-[hover]:border-slate-600 dark:data-[invalid]:border-red-500/50 dark:data-[invalid]:data-[focus]:border-red-500 dark:data-[invalid]:data-[focus]:ring-red-500/20";

function buildRules(field) {
  const rules = {};

  if (field.required) {
    rules.required = `${field.label} is required`;
  }

  if (field.validation?.minLength != null) {
    rules.minLength = {
      value: field.validation.minLength,
      message: `Minimum ${field.validation.minLength} characters`,
    };
  }

  if (field.validation?.maxLength != null) {
    rules.maxLength = {
      value: field.validation.maxLength,
      message: `Maximum ${field.validation.maxLength} characters`,
    };
  }

  if (field.validation?.pattern) {
    try {
      rules.pattern = {
        value: new RegExp(field.validation.pattern),
        message: "Invalid format",
      };
    } catch {
      // skip invalid regex
    }
  }

  return rules;
}

function ErrorMessage({ error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-red-500 dark:text-red-400"
        >
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FieldLabel({ label, required }) {
  return (
    <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
      {required && (
        <span className="ml-1 text-red-500 dark:text-red-400">*</span>
      )}
    </Label>
  );
}

function PreviewField({ field, register, control, error }) {
  const rules = useMemo(() => buildRules(field), [field]);
  const hasError = !!error;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
      return (
        <Field as={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-2">
          <FieldLabel label={field.label} required={field.required} />
          <Input
            type={field.type}
            invalid={hasError}
            placeholder={field.placeholder || ""}
            className={INPUT_CLASS}
            {...register(field.id, rules)}
          />
          <ErrorMessage error={error} />
        </Field>
      );

    case "textarea":
      return (
        <Field as={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-2">
          <FieldLabel label={field.label} required={field.required} />
          <Textarea
            rows={4}
            invalid={hasError}
            placeholder={field.placeholder || ""}
            className={`${INPUT_CLASS} resize-none`}
            {...register(field.id, rules)}
          />
          <ErrorMessage error={error} />
        </Field>
      );

    case "select":
      return (
        <Field as={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-2">
          <FieldLabel label={field.label} required={field.required} />
          <Controller
            name={field.id}
            control={control}
            rules={rules}
            defaultValue=""
            render={({ field: controllerField }) => (
              <Listbox
                value={controllerField.value}
                onChange={controllerField.onChange}
              >
                <div className="relative">
                  <ListboxButton
                    className={`relative w-full cursor-pointer rounded-lg border py-3 pl-4 pr-10 text-left text-sm outline-none transition-all duration-200 ${hasError
                        ? "border-red-300 bg-white data-[focus]:border-red-400 data-[focus]:ring-2 data-[focus]:ring-red-400/20 dark:border-red-500/50 dark:bg-slate-800"
                        : "border-slate-200 bg-slate-50 data-[focus]:border-indigo-400 data-[focus]:bg-white data-[focus]:ring-2 data-[focus]:ring-indigo-400/20 data-[hover]:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:data-[focus]:border-indigo-500 dark:data-[focus]:ring-indigo-500/20 dark:data-[hover]:border-slate-600"
                      }`}
                  >
                    <span
                      className={
                        controllerField.value
                          ? "block truncate text-slate-900 dark:text-white"
                          : "block truncate text-slate-400 dark:text-slate-500"
                      }
                    >
                      {controllerField.value || "Select an option..."}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </span>
                  </ListboxButton>

                  <ListboxOptions
                    anchor="bottom"
                    transition
                    className="z-50 mt-1 w-[var(--button-width)] overflow-auto rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-slate-700 dark:bg-slate-800"
                  >
                    {(field.options || []).map((opt) => (
                      <ListboxOption
                        key={opt}
                        value={opt}
                        className="group flex cursor-pointer items-center gap-2 px-4 py-2.5 text-slate-900 transition-colors data-[focus]:bg-indigo-50 data-[selected]:font-medium dark:text-white dark:data-[focus]:bg-indigo-500/10"
                      >
                        <svg
                          className="h-4 w-4 text-indigo-500 opacity-0 group-data-[selected]:opacity-100"
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
                        {opt}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            )}
          />
          <ErrorMessage error={error} />
        </Field>
      );

    case "checkbox":
      return (
        <Field as={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-2">
          <Controller
            name={field.id}
            control={control}
            rules={
              field.required
                ? {
                  validate: (v) =>
                    v === true || `${field.label} is required`,
                }
                : {}
            }
            defaultValue={false}
            render={({ field: controllerField }) => (
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors data-[hover]:border-slate-300 dark:border-slate-700 dark:bg-slate-800">
                <Checkbox
                  checked={controllerField.value || false}
                  onChange={controllerField.onChange}
                  className={`group flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${hasError
                      ? "border-red-300 bg-white dark:border-red-500/50 dark:bg-slate-900"
                      : "border-slate-300 bg-white data-[checked]:border-indigo-500 data-[checked]:bg-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:data-[checked]:border-indigo-500 dark:data-[checked]:bg-indigo-500"
                    }`}
                >
                  <svg
                    className="h-3.5 w-3.5 stroke-white opacity-0 transition-opacity group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <Label className="cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500 dark:text-red-400">
                      *
                    </span>
                  )}
                </Label>
              </div>
            )}
          />
          <ErrorMessage error={error} />
        </Field>
      );

    case "radio":
      return (
        <Field as={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-2">
          <FieldLabel label={field.label} required={field.required} />
          <Controller
            name={field.id}
            control={control}
            rules={rules}
            defaultValue=""
            render={({ field: controllerField }) => (
              <RadioGroup
                value={controllerField.value}
                onChange={controllerField.onChange}
                className="space-y-2"
              >
                {(field.options || []).map((opt) => (
                  <Field
                    key={opt}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Radio
                      value={opt}
                      className={`group flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${hasError
                          ? "border-red-300 bg-white dark:border-red-500/50 dark:bg-slate-900"
                          : "border-slate-300 bg-white data-[checked]:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:data-[checked]:border-indigo-500"
                        }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 opacity-0 transition-opacity group-data-[checked]:opacity-100" />
                    </Radio>
                    <Label className="text-sm text-slate-700 dark:text-slate-300">
                      {opt}
                    </Label>
                  </Field>
                ))}
              </RadioGroup>
            )}
          />
          <ErrorMessage error={error} />
        </Field>
      );

    default:
      return null;
  }
}

export default function FormPreview({ formName }) {
  const fields = useSelector((state) => state.form.fields);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  function onSubmit(data) {
    console.log("Form submitted:", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  if (fields.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <svg
              className="h-7 w-7 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No fields to preview
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-400 dark:text-slate-500">
            Switch to Builder mode and add some fields first
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-auto py-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Form Title */}
          <div className="mb-8 border-b border-slate-100 pb-6 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {formName || "Untitled Form"}
            </h2>
            <p className="mt-1.5 text-sm text-slate-400 dark:text-slate-500">
              {fields.length} {fields.length === 1 ? "field" : "fields"}
              {" · "}
              Fill out the form below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-x-4 gap-y-6">
              {fields.map((field) => {
                const w = field.layout?.width || 100;
                const widthMap = { 100: "100%", 50: "calc(50% - 8px)", 33: "calc(33.333% - 11px)" };
                return (
                  <div key={field.id} style={{ width: widthMap[w] || "100%" }}>
                    <PreviewField
                      field={field}
                      register={register}
                      control={control}
                      error={errors[field.id]}
                    />
                  </div>
                );
              })}
            </div>

            {/* Submit Area */}
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md disabled:opacity-60"
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
                Submit
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  reset();
                  setSubmitted(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                Reset
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Submitted! Check console.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
