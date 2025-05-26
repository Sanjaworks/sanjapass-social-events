
import { useState, useRef } from 'react';

interface QRCodeScannerOptions {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export const useQRCodeScanner = ({ onScan, onError }: QRCodeScannerOptions) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      
      // Solicitar acesso à câmera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment' // Câmera traseira
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Simular detecção de QR Code para demonstração
      // Em uma implementação real, você usaria uma biblioteca como jsQR
      setTimeout(() => {
        onScan('MOCK_QR_CODE_' + Date.now());
        stopScanning();
      }, 3000);
      
    } catch (error) {
      setIsScanning(false);
      onError?.('Erro ao acessar a câmera. Verifique as permissões.');
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return {
    isScanning,
    videoRef,
    startScanning,
    stopScanning
  };
};
