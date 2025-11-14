import MessageBubble from "../MessageBubble";

export default function MessageBubbleExample() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-4">
      <MessageBubble
        role="bot"
        content="Waste bin detected. How can I help you today?"
        accentColor="hsl(142, 70%, 45%)"
      />
      <MessageBubble
        role="bot"
        content="This is a general waste bin. Empty contents into the collection truck. Check for contamination before disposal. Ensure lid is secure after emptying."
        accentColor="hsl(142, 70%, 45%)"
      />
    </div>
  );
}
