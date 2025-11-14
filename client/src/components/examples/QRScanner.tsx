import QRScanner from "../QRScanner";

export default function QRScannerExample() {
  const handleScan = (result: string) => {
    console.log("QR Code scanned:", result);
  };

  const handleClose = () => {
    console.log("Scanner closed");
  };

  return <QRScanner onScan={handleScan} onClose={handleClose} />;
}
