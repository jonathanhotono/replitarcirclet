import { useState } from "react";
import ChatOverlay from "../ChatOverlay";
import { ChatMessage, QuickAction } from "@shared/schema";

export default function ChatOverlayExample() {
  const [messages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "bot",
      content: "Waste bin detected. How can I help you today?",
      timestamp: new Date()
    },
    {
      id: "2",
      role: "bot",
      content: "This is a general waste bin. Empty contents into the collection truck. Check for contamination before disposal. Ensure lid is secure after emptying.",
      timestamp: new Date()
    }
  ]);

  const quickActions: QuickAction[] = [
    {
      id: "disposal",
      label: "What do I do?",
      response: "Empty the bin..."
    },
    {
      id: "schedule",
      label: "Collection schedule",
      response: "Tuesday and Friday..."
    },
    {
      id: "safety",
      label: "Safety info",
      response: "Wear gloves..."
    }
  ];

  const handleActionClick = (action: QuickAction) => {
    console.log("Action clicked:", action.label);
  };

  const handleClose = () => {
    console.log("Chat closed");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 text-center text-muted-foreground">
        <p>Chat overlay appears at the bottom</p>
      </div>
      <ChatOverlay
        objectName="Waste Bin"
        accentColor="hsl(142, 70%, 45%)"
        messages={messages}
        quickActions={quickActions}
        onActionClick={handleActionClick}
        onClose={handleClose}
      />
    </div>
  );
}
