'use client';

import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Share2 } from 'lucide-react';

export default function QrCodePage() {
  const [qrValue, setQrValue] = React.useState('https://gastronome-os.com/menu');
  const qrRef = React.useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "gastronome-os-qrcode.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const shareQRCode = async () => {
    if (qrRef.current) {
        const svg = qrRef.current;
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
        const file = new File([svgBlob], 'gastronome-os-qrcode.svg', {type: 'image/svg+xml'});

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'GastronomeOS Menu QR Code',
                    text: 'Scan to view our menu.',
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    }
  };


  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Menu QR Code</CardTitle>
          <CardDescription>
            Let customers scan this code to view your digital menu.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="p-4 bg-white rounded-lg border">
            <QRCodeSVG
              value={qrValue}
              size={256}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
              ref={qrRef}
            />
          </div>
          <div className="w-full grid gap-2">
            <Label htmlFor="qr-url">QR Code URL</Label>
            <Input
              id="qr-url"
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button onClick={downloadQRCode}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" onClick={shareQRCode}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
