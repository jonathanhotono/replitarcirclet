import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { QuickAction } from "@shared/schema";

interface QuickActionChipsProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
  accentColor: string;
}

export default function QuickActionChips({ actions, onActionClick, accentColor }: QuickActionChipsProps) {
  return (
    <ScrollArea className="w-full" data-testid="container-quick-actions">
      <div className="flex gap-2 pb-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action)}
            className="rounded-full px-4 py-2 shrink-0 font-medium text-xs whitespace-nowrap bg-white transition-all hover:scale-105 active:scale-95"
            style={{
              border: "2px solid #1E88E5",
              color: "#1E88E5"
            }}
            data-testid={`button-action-${action.id}`}
          >
            {action.label}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-1" />
    </ScrollArea>
  );
}
