export const FIELD_COLORS = {
  text: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500",
    ring: "ring-blue-400/20 dark:ring-blue-500/10",
    accent: "bg-blue-500",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-500/10",
    hoverBorder: "hover:border-blue-200 dark:hover:border-blue-500/30",
    selectedBg: "bg-blue-50/60 dark:bg-blue-500/10",
    selectedBorder: "border-blue-400 dark:border-blue-500/50",
  },
  email: {
    bg: "bg-purple-50 dark:bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500",
    ring: "ring-purple-400/20 dark:ring-purple-500/10",
    accent: "bg-purple-500",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-500/10",
    hoverBorder: "hover:border-purple-200 dark:hover:border-purple-500/30",
    selectedBg: "bg-purple-50/60 dark:bg-purple-500/10",
    selectedBorder: "border-purple-400 dark:border-purple-500/50",
  },
  number: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500",
    ring: "ring-orange-400/20 dark:ring-orange-500/10",
    accent: "bg-orange-500",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-500/10",
    hoverBorder: "hover:border-orange-200 dark:hover:border-orange-500/30",
    selectedBg: "bg-orange-50/60 dark:bg-orange-500/10",
    selectedBorder: "border-orange-400 dark:border-orange-500/50",
  },
  textarea: {
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500",
    ring: "ring-cyan-400/20 dark:ring-cyan-500/10",
    accent: "bg-cyan-500",
    hoverBg: "hover:bg-cyan-50 dark:hover:bg-cyan-500/10",
    hoverBorder: "hover:border-cyan-200 dark:hover:border-cyan-500/30",
    selectedBg: "bg-cyan-50/60 dark:bg-cyan-500/10",
    selectedBorder: "border-cyan-400 dark:border-cyan-500/50",
  },
  select: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    ring: "ring-emerald-400/20 dark:ring-emerald-500/10",
    accent: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
    hoverBorder: "hover:border-emerald-200 dark:hover:border-emerald-500/30",
    selectedBg: "bg-emerald-50/60 dark:bg-emerald-500/10",
    selectedBorder: "border-emerald-400 dark:border-emerald-500/50",
  },
  checkbox: {
    bg: "bg-pink-50 dark:bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500",
    ring: "ring-pink-400/20 dark:ring-pink-500/10",
    accent: "bg-pink-500",
    hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-500/10",
    hoverBorder: "hover:border-pink-200 dark:hover:border-pink-500/30",
    selectedBg: "bg-pink-50/60 dark:bg-pink-500/10",
    selectedBorder: "border-pink-400 dark:border-pink-500/50",
  },
  radio: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    ring: "ring-indigo-400/20 dark:ring-indigo-500/10",
    accent: "bg-indigo-500",
    hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-500/10",
    hoverBorder: "hover:border-indigo-200 dark:hover:border-indigo-500/30",
    selectedBg: "bg-indigo-50/60 dark:bg-indigo-500/10",
    selectedBorder: "border-indigo-400 dark:border-indigo-500/50",
  },
};

export const FIELD_TYPES = [
  {
    type: "text",
    label: "Text Input",
    description: "Single line text field",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.2 48.2 0 0 0 5.887-.37c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    type: "email",
    label: "Email",
    description: "Email address input",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    type: "number",
    label: "Number",
    description: "Numeric value input",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
      </svg>
    ),
  },
  {
    type: "textarea",
    label: "Textarea",
    description: "Multi-line text area",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    type: "select",
    label: "Select",
    description: "Dropdown select menu",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    ),
  },
  {
    type: "checkbox",
    label: "Checkbox",
    description: "Boolean toggle check",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    type: "radio",
    label: "Radio",
    description: "Single choice from options",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
      </svg>
    ),
  },
];

export function getFieldColor(type) {
  return FIELD_COLORS[type] || FIELD_COLORS.text;
}

export function getFieldMeta(type) {
  return FIELD_TYPES.find((f) => f.type === type) || FIELD_TYPES[0];
}
