function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function buildValidation(field) {
  const rules = [];

  if (field.required) {
    rules.push(`required: "${field.label} is required"`);
  }

  const v = field.validation || {};

  if (v.minLength) {
    rules.push(
      `minLength: { value: ${v.minLength}, message: "Minimum ${v.minLength} characters" }`
    );
  }

  if (v.maxLength) {
    rules.push(
      `maxLength: { value: ${v.maxLength}, message: "Maximum ${v.maxLength} characters" }`
    );
  }

  if (v.pattern) {
    const escaped = v.pattern.replace(/\\/g, "\\\\");
    rules.push(
      `pattern: { value: /${escaped}/, message: "Invalid format" }`
    );
  }

  if (rules.length === 0) return "";
  return `{ ${rules.join(", ")} }`;
}

function indent(str, level) {
  const pad = "  ".repeat(level);
  return str
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");
}

function generateField(field) {
  const reg = buildValidation(field);
  const register = reg
    ? `{...register("${field.id}", ${reg})}`
    : `{...register("${field.id}")}`;

  const requiredMark = field.required
    ? ` <span className="text-red-500">*</span>`
    : "";

  const label = `<label className="block text-sm font-medium text-gray-700 mb-1">\n  ${field.label}${requiredMark}\n</label>`;

  const error = [
    `{errors["${field.id}"] && (`,
    `  <p className="text-red-500 text-xs mt-1">`,
    `    {errors["${field.id}"].message || "${field.label} is invalid"}`,
    `  </p>`,
    `)}`,
  ].join("\n");

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  let input = "";

  switch (field.type) {
    case "text":
    case "email":
    case "number":
      input = `<input\n  type="${field.type}"\n  ${register}\n  placeholder="${field.placeholder || ""}"\n  className="${inputClass}"\n/>`;
      break;

    case "textarea":
      input = `<textarea\n  ${register}\n  placeholder="${field.placeholder || ""}"\n  rows={4}\n  className="${inputClass} resize-none"\n/>`;
      break;

    case "select": {
      const options = (field.options || [])
        .map(
          (opt) =>
            `  <option key="${opt}" value="${opt}">${opt}</option>`
        )
        .join("\n");
      input = [
        `<select`,
        `  ${register}`,
        `  className="${inputClass}"`,
        `>`,
        `  <option value="">Select...</option>`,
        options,
        `</select>`,
      ].join("\n");
      break;
    }

    case "checkbox":
      input = [
        `<label className="inline-flex items-center gap-2 cursor-pointer">`,
        `  <input`,
        `    type="checkbox"`,
        `    ${register}`,
        `    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"`,
        `  />`,
        `  <span className="text-sm text-gray-700">${field.placeholder || field.label}</span>`,
        `</label>`,
      ].join("\n");
      break;

    case "radio": {
      const radios = (field.options || [])
        .map(
          (opt) =>
            [
              `  <label key="${opt}" className="inline-flex items-center gap-2 cursor-pointer">`,
              `    <input`,
              `      type="radio"`,
              `      value="${opt}"`,
              `      ${register}`,
              `      className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"`,
              `    />`,
              `    <span className="text-sm text-gray-700">${opt}</span>`,
              `  </label>`,
            ].join("\n")
        )
        .join("\n");
      input = `<div className="flex flex-wrap gap-4">\n${radios}\n</div>`;
      break;
    }

    default:
      input = `<input\n  type="text"\n  ${register}\n  placeholder="${field.placeholder || ""}"\n  className="${inputClass}"\n/>`;
  }

  const isCheckbox = field.type === "checkbox";
  const labelBlock = isCheckbox ? "" : `${label}\n`;

  return `<div>\n${indent(labelBlock + input + "\n" + error, 1)}\n</div>`;
}

export function generateReactComponent(form) {
  const name = toPascalCase(form.name || "MyForm") || "MyForm";
  const fields = form.fields || [];

  if (fields.length === 0) {
    return null;
  }

  const fieldJSX = fields.map((f) => indent(generateField(f), 3)).join("\n\n");

  return `import { useForm } from "react-hook-form";

export default function ${name}() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4 p-6">
${fieldJSX}

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
`;
}
