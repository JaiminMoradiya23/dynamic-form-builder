/** 12-column grid layout for form fields (builder + preview). */

const COLS = 12;

/** @param {{ layout?: { colSpan?: number; width?: number } } | null | undefined} field */
export function getColSpan(field) {
  const layout = field?.layout;
  if (layout == null) return COLS;
  if (typeof layout.colSpan === "number" && !Number.isNaN(layout.colSpan)) {
    return clampColSpan(layout.colSpan);
  }
  const w = layout.width;
  if (w === 50) return 6;
  if (w === 33) return 4;
  return COLS;
}

export function clampColSpan(n) {
  return Math.min(COLS, Math.max(1, Math.round(Number(n)) || COLS));
}

export const GRID_COLUMNS = COLS;
