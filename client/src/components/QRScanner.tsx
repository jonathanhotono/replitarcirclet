import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 280, height: 280 }
          },
          (decodedText) => {
            scanner.stop();
            onScan(decodedText);
          },
          () => {
            // Ignore decode errors
          }
        );
        setIsScanning(true);
      } catch (err) {
        setError("Unable to access camera. Please check permissions.");
        console.error("QR Scanner error:", err);
      }
    };

    startScanner();

    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(console.error);
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div
        className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10"
        style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <span className="text-white font-semibold text-lg" data-testid="text-scanner-title">
          Scan QR Code
        </span>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="text-white hover:bg-white/20"
          data-testid="button-close-scanner"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div id="qr-reader" className="w-full max-w-md" />
        
        {!isScanning && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
              <p data-testid="text-initializing">Initializing camera...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-destructive/90 text-destructive-foreground rounded-lg p-6 text-center max-w-sm">
              <p className="mb-4" data-testid="text-error">{error}</p>
              <Button onClick={onClose} variant="outline" data-testid="button-close-error">
                Close
              </Button>
            </div>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-[280px] h-[280px]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
          </div>
        </div>
      </div>

      <div className="p-6 text-center text-white/80" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <p className="text-sm" data-testid="text-instruction">
          Point your camera at the QR code on the object
        </p>
      </div>
    </div>
  );
}
