"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldCard from "./FieldCard";

const WIDTH_GAP_OFFSET = {
  100: "calc(100% - 0px)",
  50: "calc(50% - 6px)",
  33: "calc(33.333% - 8px)",
};

export default function SortableFieldCard({
  field,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    data: { source: "canvas", field },
  });

  const width = field.layout?.width || 100;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 0 : "auto",
    width: WIDTH_GAP_OFFSET[width] || "100%",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FieldCard
        field={field}
        isSelected={isSelected}
        onSelect={onSelect}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />
    </div>
  );
}
