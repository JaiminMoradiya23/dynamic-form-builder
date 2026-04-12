"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldCard from "./FieldCard";
import {
  clampColSpan,
  getColSpan,
  GRID_COLUMNS,
} from "@/utils/fieldLayout";

function trackWidthPx(gridEl) {
  const rect = gridEl.getBoundingClientRect();
  const styles = getComputedStyle(gridEl);
  const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
  const gaps = GRID_COLUMNS - 1;
  const tracks = rect.width - gaps * gap;
  return Math.max(tracks / GRID_COLUMNS, 1);
}

export default function SortableFieldCard({
  field,
  gridRef,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onColSpanChange,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    data: { source: "canvas", field },
  });

  const colSpan = getColSpan(field);
  const [resizePreview, setResizePreview] = useState(null);
  const displaySpan = resizePreview ?? colSpan;

  const resizeSession = useRef(null);

  const endResizeSession = useCallback(() => {
    const s = resizeSession.current;
    if (!s) return;
    window.removeEventListener("pointermove", s.onMove);
    window.removeEventListener("pointerup", s.onUp);
    window.removeEventListener("pointercancel", s.onUp);
    resizeSession.current = null;
  }, []);

  useEffect(
    () => () => {
      const s = resizeSession.current;
      if (!s) return;
      window.removeEventListener("pointermove", s.onMove);
      window.removeEventListener("pointerup", s.onUp);
      window.removeEventListener("pointercancel", s.onUp);
      resizeSession.current = null;
    },
    []
  );

  const onResizePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!onColSpanChange) return;
      const grid = gridRef?.current;
      if (!grid) return;

      endResizeSession();

      const startX = e.clientX;
      const startSpan = getColSpan(field);
      const tw = trackWidthPx(grid);

      const onMove = (ev) => {
        const delta = Math.round((ev.clientX - startX) / tw);
        setResizePreview(clampColSpan(startSpan + delta));
      };

      const onUp = (ev) => {
        endResizeSession();
        const gridEl = gridRef?.current;
        const track = gridEl ? trackWidthPx(gridEl) : tw;
        const delta = Math.round((ev.clientX - startX) / track);
        const next = clampColSpan(startSpan + delta);
        setResizePreview(null);
        if (next !== startSpan) onColSpanChange(field.id, next);
      };

      resizeSession.current = { onMove, onUp };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      setResizePreview(startSpan);
    },
    [endResizeSession, field, gridRef, onColSpanChange]
  );

  const style = {
    gridColumn: `span ${displaySpan} / span ${displaySpan}`,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative min-w-0"
      {...attributes}
    >
      <FieldCard
        field={field}
        colSpan={displaySpan}
        dragActivatorRef={setActivatorNodeRef}
        dragListeners={listeners}
        isSelected={isSelected}
        onSelect={onSelect}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />
      {onColSpanChange && (
        <button
          type="button"
          aria-label="Resize field width"
          onPointerDown={onResizePointerDown}
          className={`absolute -right-1 bottom-2 top-2 z-10 w-2.5 cursor-col-resize rounded border border-transparent transition-colors touch-none ${
            isSelected
              ? "bg-indigo-500/25 hover:bg-indigo-500/40"
              : "bg-slate-300/40 opacity-0 hover:opacity-100 group-hover:opacity-100 dark:bg-slate-600/40"
          }`}
        />
      )}
    </div>
  );
}
