import QuickActionChips from "../QuickActionChips";
import { QuickAction } from "@shared/schema";

export default function QuickActionChipsExample() {
  const mockActions: QuickAction[] = [
    {
      id: "disposal",
      label: "What do I do?",
      response: "Empty the bin contents..."
    },
    {
      id: "location",
      label: "Collection schedule",
      response: "Collection on Tuesday..."
    },
    {
      id: "safety",
      label: "Safety info",
      response: "Always wear gloves..."
    },
    {
      id: "damaged",
      label: "Damaged bin",
      response: "Tag the bin..."
    }
  ];

  const handleActionClick = (action: QuickAction) => {
    console.log("Action clicked:", action.label);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <QuickActionChips
        actions={mockActions}
        onActionClick={handleActionClick}
        accentColor="hsl(142, 70%, 45%)"
      />
    </div>
  );
}
