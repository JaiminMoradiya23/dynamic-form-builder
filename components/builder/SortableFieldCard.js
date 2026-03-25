"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldCard from "./FieldCard";

export default function SortableFieldCard({
  field,
  isSelected,
  onSelect,
  onDelete,
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 0 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FieldCard
        field={field}
        isSelected={isSelected}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
}
