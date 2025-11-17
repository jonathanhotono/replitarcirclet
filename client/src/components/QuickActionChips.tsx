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
          <Button
            key={action.id}
            size="sm"
            onClick={() => onActionClick(action)}
            className="rounded-full px-4 shrink-0 text-white font-medium text-xs whitespace-nowrap"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: `2px solid ${accentColor}`,
              backdropFilter: "blur(8px)"
            }}
            data-testid={`button-action-${action.id}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-1" />
    </ScrollArea>
  );
}
