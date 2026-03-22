const STORAGE_KEY = "forms";

export function getForms() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveForms(forms) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

export function getFormById(formId) {
  return getForms().find((f) => f.id === formId) || null;
}

export function createForm({ name }) {
  const forms = getForms();
  const now = Date.now();
  const newForm = {
    id: crypto.randomUUID(),
    name: name.trim(),
    fields: [],
    createdAt: now,
    updatedAt: now,
  };
  forms.unshift(newForm);
  saveForms(forms);
  return newForm;
}

export function deleteForm(formId) {
  const forms = getForms().filter((f) => f.id !== formId);
  saveForms(forms);
  return forms;
}

export function duplicateForm(formId) {
  const forms = getForms();
  const source = forms.find((f) => f.id === formId);
  if (!source) return forms;

  const now = Date.now();
  const copy = {
    ...source,
    id: crypto.randomUUID(),
    name: `${source.name} (Copy)`,
    fields: source.fields.map((field) => ({
      ...field,
      id: crypto.randomUUID(),
    })),
    createdAt: now,
    updatedAt: now,
  };

  const index = forms.findIndex((f) => f.id === formId);
  forms.splice(index + 1, 0, copy);
  saveForms(forms);
  return copy;
}

export function updateForm(formId, updates) {
  const forms = getForms();
  const index = forms.findIndex((f) => f.id === formId);
  if (index === -1) return null;

  forms[index] = {
    ...forms[index],
    ...updates,
    updatedAt: Date.now(),
  };
  saveForms(forms);
  return forms[index];
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
