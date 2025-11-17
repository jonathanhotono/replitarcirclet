import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Syringe, Dog } from "lucide-react";
import QRScanner from "@/components/QRScanner";
import CameraView from "@/components/CameraView";
import ObjectIndicator from "@/components/ObjectIndicator";
import ChatOverlay from "@/components/ChatOverlay";
import { getObjectByQRCode } from "@/lib/objectData";
import { ChatMessage, ObjectData, QuickAction } from "@shared/schema";
import logoUrl from "@assets/generated_images/Circle_T_transparent_logo_8f632cde.png";

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [detectedObject, setDetectedObject] = useState<ObjectData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  const handleScan = (qrCode: string) => {
    console.log("QR Code scanned:", qrCode);
    const object = getObjectByQRCode(qrCode);
    
    if (object) {
      setDetectedObject(object);
      setShowScanner(false);
      setShowCamera(true);
      setMessages([
        {
          id: "1",
          role: "bot",
          content: object.greeting,
          timestamp: new Date()
        }
      ]);
    } else {
      console.error("Unknown object QR code");
    }
  };

  const handleActionClick = (action: QuickAction) => {
    console.log("Quick action clicked:", action.label);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "bot",
        content: action.response,
        timestamp: new Date()
      }
    ]);
  };

  const handleCloseChat = () => {
    setDetectedObject(null);
    setMessages([]);
    setShowCamera(false);
  };

  const startQuickDemo = (objectType: string) => {
    const object = getObjectByQRCode(objectType);
    if (object) {
      setDetectedObject(object);
      setShowCamera(true);
      setMessages([
        {
          id: "1",
          role: "bot",
          content: object.greeting,
          timestamp: new Date()
        }
      ]);
    }
  };

  if (showScanner) {
    return <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />;
  }

  if (detectedObject && showCamera) {
    return (
      <CameraView showCamera={true}>
        <ObjectIndicator
          objectName={detectedObject.name}
          icon={detectedObject.icon}
          accentColor={detectedObject.accentColor}
        />
        <ChatOverlay
          objectName={detectedObject.name}
          accentColor={detectedObject.accentColor}
          messages={messages}
          quickActions={detectedObject.quickActions}
          onActionClick={handleActionClick}
          onClose={handleCloseChat}
        />
      </CameraView>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header Card */}
        <div 
          className="rounded-3xl p-8 text-center"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div className="flex justify-center mb-6">
            <img 
              src={logoUrl} 
              alt="Circle T Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32"
              data-testid="img-logo"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3" data-testid="text-app-title">
            Council AR Assistant
          </h1>
          <p className="text-gray-300 text-lg" data-testid="text-app-description">
            Smart Object Recognition & Guidance System
          </p>
        </div>

        {/* Main Action Card */}
        <div 
          className="rounded-3xl p-8"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Button
            size="lg"
            className="w-full h-16 text-xl font-semibold"
            onClick={() => setShowScanner(true)}
            data-testid="button-scan-qr"
          >
            <QrCode className="w-7 h-7 mr-3" />
            Scan QR Code
          </Button>
        </div>

        {/* Demo Grid */}
        <div 
          className="rounded-3xl p-6"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4 text-center" data-testid="text-demo-label">
            Quick Demo
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center">
            Test without QR codes
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Graffiti Card */}
            <button
              className="rounded-2xl p-6 text-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(147, 51, 234, 0.15)",
                border: "1px solid rgba(147, 51, 234, 0.3)",
                backdropFilter: "blur(10px)"
              }}
              onClick={() => startQuickDemo("graffiti")}
              data-testid="button-demo-graffiti"
            >
              <div className="text-5xl mb-3">🎨</div>
              <div className="text-white font-semibold text-lg mb-1">Graffiti</div>
              <div className="text-purple-300 text-sm">Removal & Reporting</div>
            </button>

            {/* Syringe Card */}
            <button
              className="rounded-2xl p-6 text-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(249, 115, 22, 0.15)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
                backdropFilter: "blur(10px)"
              }}
              onClick={() => startQuickDemo("syringe")}
              data-testid="button-demo-syringe"
            >
              <div className="flex justify-center mb-3">
                <Syringe className="w-12 h-12 text-orange-400" />
              </div>
              <div className="text-white font-semibold text-lg mb-1">Syringe</div>
              <div className="text-orange-300 text-sm">Safe Disposal</div>
            </button>

            {/* Dog Waste Card */}
            <button
              className="rounded-2xl p-6 text-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(180, 83, 9, 0.15)",
                border: "1px solid rgba(180, 83, 9, 0.3)",
                backdropFilter: "blur(10px)"
              }}
              onClick={() => startQuickDemo("dog-poop")}
              data-testid="button-demo-dog-poop"
            >
              <div className="flex justify-center mb-3">
                <Dog className="w-12 h-12 text-amber-600" />
              </div>
              <div className="text-white font-semibold text-lg mb-1">Dog Waste</div>
              <div className="text-amber-400 text-sm">Cleanup Guide</div>
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div 
          className="rounded-3xl p-6 text-center"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          <p className="text-sm text-gray-400" data-testid="text-instructions">
            For full QR demo: Print codes with text "graffiti", "syringe", or "dog-poop"
          </p>
        </div>
      </div>
    </div>
  );
}
