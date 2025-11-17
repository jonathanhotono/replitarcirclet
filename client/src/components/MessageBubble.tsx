import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface MessageBubbleProps {
  role: "bot" | "user";
  content: string;
  accentColor?: string;
}

export default function MessageBubble({ role, content, accentColor }: MessageBubbleProps) {
  const isBot = role === "bot";

  return (
    <div
      className={`flex gap-2 ${isBot ? "flex-row" : "flex-row-reverse"} mb-3`}
      data-testid={`message-${role}`}
    >
      {isBot && (
        <Avatar className="w-8 h-8 flex-shrink-0" data-testid="avatar-bot">
          <AvatarFallback
            className="text-white"
            style={{ backgroundColor: "#1E88E5" }}
          >
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className="rounded-2xl px-4 py-3 max-w-[80%] bg-white"
        data-testid={`bubble-${role}`}
      >
        <p className="text-sm leading-relaxed font-medium text-gray-800" data-testid="text-message-content">{content}</p>
      </div>
    </div>
  );
}
