"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";


import { useAppData } from "@/hooks/useAppData";
import { getData } from "@/lib/api";

// Mock API (replace with your real API call)
async function fetchHotel(hotelId: string) {
  // Example: GET /api/hotels/:id
  return {
    hotel_id: hotelId,
    name: "Test",
    table_count: 5, // ← backend should provide this
  };
}

export default function HotelQrPage() {
  const [hotel, setHotel] = React.useState<any>(null);
  const { hotelId } = useAppData();

  React.useEffect(() => {
    getData(`hotel/${hotelId}`).then((data) => setHotel(data));
  }, [hotelId]);

  const downloadQRCode = (svg: SVGSVGElement, filename: string) => {
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
      downloadLink.download = filename;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareQRCode = async (svg: SVGSVGElement, filename: string) => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const file = new File([svgBlob], filename, { type: "image/svg+xml" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${hotel.name} Table QR Code`,
          text: "Scan to place your order.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  if (!hotel) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: hotel.table_count || 5 }).map((_, idx) => {
        const tableNo = `T${idx + 1}`;
        const qrValue = `${window.location.origin}/hotel/${hotel.hotel_id}?table=${tableNo}`;
        const svgRef = React.createRef<SVGSVGElement>();

        return (
          <Card key={tableNo} className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-xl">
                Table {tableNo}
              </CardTitle>
              <CardDescription>
                Scan to order at {hotel.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white rounded-lg border">
                <QRCodeSVG
                  value={qrValue}
                  size={180}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  ref={svgRef}
                />
              </div>
              <p className="text-sm break-all text-center">{qrValue}</p>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-3">
              <Button
                onClick={() =>
                  svgRef.current && downloadQRCode(svgRef.current, `qr-${tableNo}.png`)
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  svgRef.current && shareQRCode(svgRef.current, `qr-${tableNo}.svg`)
                }
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

