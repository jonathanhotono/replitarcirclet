import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IframeChatbotProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function IframeChatbot({ url, title, onClose }: IframeChatbotProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-md">
        <h2 className="text-lg font-semibold" data-testid="text-chatbot-title">{title}</h2>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          data-testid="button-close-chatbot"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 relative">
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full border-0"
          title={title}
          allow="microphone; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          data-testid="iframe-chatbot"
        />
      </div>
    </div>
  );
}
