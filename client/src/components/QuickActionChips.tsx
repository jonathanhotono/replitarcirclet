import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { QuickAction } from "@shared/schema";

interface QuickActionChipsProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
  accentColor: string;
}

export default function QuickActionChips({ actions, onActionClick, accentColor }: QuickActionChipsProps) {
  // Sort actions so report buttons are at the end (right side)
  const sortedActions = [...actions].sort((a, b) => {
    const aIsReport = a.label.toLowerCase().includes('report');
    const bIsReport = b.label.toLowerCase().includes('report');
    if (aIsReport && !bIsReport) return 1;
    if (!aIsReport && bIsReport) return -1;
    return 0;
  });

  return (
    <ScrollArea className="w-full" data-testid="container-quick-actions">
      <div className="flex gap-2 pb-2">
        {sortedActions.map((action) => {
          const isReport = action.label.toLowerCase().includes('report');
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action)}
              className="rounded-full px-4 py-2 shrink-0 font-medium text-xs whitespace-nowrap transition-all hover:scale-105 active:scale-95"
              style={{
                background: isReport ? "#1E88E5" : "white",
                border: "2px solid #1E88E5",
                color: isReport ? "white" : "#1E88E5"
              }}
              data-testid={`button-action-${action.id}`}
            >
              {action.label}
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="h-1" />
    </ScrollArea>
  );
}
