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
    <ScrollArea className="w-full whitespace-nowrap" data-testid="container-quick-actions">
      <div className="flex gap-2 p-1">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action)}
            className="rounded-full px-4 shrink-0 hover-elevate active-elevate-2"
            style={{
              borderColor: accentColor,
              color: accentColor
            }}
            data-testid={`button-action-${action.id}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
