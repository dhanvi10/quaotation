"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { useQuotationStore } from "@/store/quotation-store";
import { ClauseEditor } from "./clause-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLAUSE_SNIPPETS } from "@/data/presets";
import type { ClauseItem } from "@/types/quotation";

function SortableClause({ clause, index }: { clause: ClauseItem; index: number }) {
  const updateClause = useQuotationStore((s) => s.updateClause);
  const removeClause = useQuotationStore((s) => s.removeClause);
  const duplicateClause = useQuotationStore((s) => s.duplicateClause);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: clause.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="rounded-2xl border border-border/80 bg-card shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
        <button
          type="button"
          className="touch-manipulation rounded-lg p-2 text-muted-foreground hover:bg-muted"
          {...attributes}
          {...listeners}
          aria-label="ખસેડો"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <span className="font-display text-sm font-bold text-primary">#{index + 1}</span>
        <div className="ml-auto flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => duplicateClause(clause.id)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-destructive hover:text-destructive"
            onClick={() => removeClause(clause.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <ClauseEditor
          content={clause.html}
          onChange={(html) => updateClause(clause.id, html)}
        />
      </div>
    </motion.div>
  );
}

export function ClauseList() {
  const clauses = useQuotationStore((s) => s.clauses);
  const reorderClauses = useQuotationStore((s) => s.reorderClauses);
  const addClause = useQuotationStore((s) => s.addClause);
  const updateClause = useQuotationStore((s) => s.updateClause);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = clauses.findIndex((c) => c.id === active.id);
    const newIndex = clauses.findIndex((c) => c.id === over.id);
    reorderClauses(oldIndex, newIndex);
  };

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="font-display text-xl">ક્વોટેશન પોઈન્ટ્સ</CardTitle>
        <CardDescription>ડ્રેગ કરીને ક્રમ બદલો • Rich text સંપાદન</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            onValueChange={(v) => {
              const snip = CLAUSE_SNIPPETS.find((s) => s.label === v);
              if (snip) addClause(snip.html);
            }}
          >
            <SelectTrigger className="font-gujarati">
              <SelectValue placeholder="તૈયાર લાઇન ઉમેરો…" />
            </SelectTrigger>
            <SelectContent>
              {CLAUSE_SNIPPETS.map((s) => (
                <SelectItem key={s.label} value={s.label}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" className="shrink-0 gap-2" onClick={() => addClause()}>
            <Plus className="h-4 w-4" />
            નવો પોઈન્ટ
          </Button>
        </div>

        {clauses.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-gujarati text-muted-foreground">કોઈ પોઈન્ટ નથી</p>
            <Button className="mt-4" onClick={() => addClause()}>
              પહેલો પોઈન્ટ ઉમેરો
            </Button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={clauses.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {clauses.map((clause, index) => (
                    <SortableClause key={clause.id} clause={clause} index={index} />
                  ))}
                </div>
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}
