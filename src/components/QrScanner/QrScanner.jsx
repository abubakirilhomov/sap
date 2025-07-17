import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess, validateQr }) => {
  const [error, setError] = useState(null);
  const [cameraId, setCameraId] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const html5QrCodeRef = useRef(null);

  const config = { fps: 15, qrbox: { width: 300, height: 300 } };
  useEffect(() => {

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setCameras(devices);
          setCameraId(devices[0].id);
          startScanning(devices[0].id);
        } else {
          setError("Камеры не найдены.");
        }
      })
      .catch((err) => {
        setError("Ошибка доступа к камерам: " + err.message);
      });

    return () => {
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch((err) => console.error("Ошибка остановки:", err));
      }
    };
  }, []);

  const startScanning = (selectedCameraId) => {
    if (html5QrCodeRef.current && !isScanning) {
      setIsScanning(true);
      html5QrCodeRef.current
        .start(
          { deviceId: { exact: selectedCameraId } },
          config,
          (decodedText) => {
            setScanResult(decodedText);
            if (validateQr && typeof validateQr === "function") {
              const isValid = validateQr(decodedText);
              if (isValid) {
                onScanSuccess(decodedText);
              } else {
                setError("Недействительный QR-код для этого события.");
              }
            } else {
              onScanSuccess(decodedText);
            }
          },
          (errorMessage) => {
            setError(errorMessage);
            setIsScanning(false);
          }
        )
        .catch((err) => {
          setError("Ошибка запуска сканирования: " + err.message);
          setIsScanning(false);
        });
    }
  };

  const switchCamera = (newCameraId) => {
    if (html5QrCodeRef.current && isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setCameraId(newCameraId);
          startScanning(newCameraId);
        })
        .catch((err) => setError("Ошибка переключения камеры: " + err.message));
    } else if (!isScanning) {
      setCameraId(newCameraId);
      startScanning(newCameraId);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Сканер для входа на ивент</h2>
      <div id="qr-reader" style={{ width: "100%", height: "300px" }} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {scanResult && (
        <p className="mt-2 text-green-600">Скан выполнен: {scanResult}</p>
      )}
      {cameras.length > 1 && (
        <select
          className="mt-2 p-2 border rounded w-full"
          value={cameraId}
          onChange={(e) => switchCamera(e.target.value)}
        >
          {cameras.map((cam) => (
            <option key={cam.id} value={cam.id}>
              {cam.label || `Камера ${cam.id}`}
            </option>
          ))}
        </select>
      )}
      {!isScanning && cameraId && (
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
          onClick={() => startScanning(cameraId)}
        >
          Запустить сканер
        </button>
      )}
    </div>
  );
};

export default QrScanner;