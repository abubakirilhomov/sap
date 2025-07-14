import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QrReader = () => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = (result) => {
    console.log(result);
    setScannedResult(result.data);
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
      });

      scanner.current.start().catch((err) => {
        console.error("Failed to start scanner:", err);
        setQrOn(false);
      });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.");
    }
  }, [qrOn]);

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <video
        ref={videoEl}
        className="w-full h-auto rounded-lg shadow-lg"
      ></video>
      <div
        ref={qrBoxEl}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
      >
        <img
          src="https://raw.githubusercontent.com/SurajanShrestha/qr-scanner-in-react/main/src/assets/qr-frame.svg"
          alt="QR Frame"
          className="w-full h-full object-contain"
        />
      </div>
      {scannedResult && (
        <div className="absolute top-4 left-4 bg-base-100 text-base-content p-2 rounded-md shadow-md z-50">
          <p className="text-sm">
            <span className="font-bold">Scanned Result:</span> {scannedResult}
          </p>
        </div>
      )}
    </div>
  );
};

export default QrReader;