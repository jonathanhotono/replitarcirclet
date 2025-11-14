import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ObjectIndicatorProps {
  objectName: string;
  icon: string;
  accentColor: string;
}

export default function ObjectIndicator({ objectName, icon, accentColor }: ObjectIndicatorProps) {
  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-top duration-300"
      data-testid="container-object-indicator"
    >
      <Badge
        className="px-4 py-2 text-base font-semibold shadow-lg"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: `${accentColor}dd`,
          color: "white",
          border: "none"
        }}
      >
        <span className="text-xl mr-2" data-testid="text-object-icon">{icon}</span>
        <span data-testid="text-object-name">{objectName}</span>
        <CheckCircle2 className="w-5 h-5 ml-2" data-testid="icon-check" />
      </Badge>
    </div>
  );
}
