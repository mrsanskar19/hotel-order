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
import { Download, RefreshCcw, Share2 } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { getData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Single QR Card component
 */
function QRCard({ hotel, tableNo }: { hotel: any; tableNo: number }) {
  const [qrValue, setQrValue] = React.useState(
    `${window.location.origin}/hotel/${hotel.hotel_id}?table_id=${tableNo}`
  );
  const svgRef = React.useRef<SVGSVGElement>(null);

  // regenerate only this QR
  const regenerate = () => {
    setQrValue(
      `${window.location.origin}/hotel/${hotel.hotel_id}?table_id=${tableNo}&key=${Date.now()}`
    );
  };

  const downloadQRCode = (svg: SVGSVGElement, filename: string) => {
    const svgData = new XMLSerializer().serializeToString(svg);

    // add border wrapper
    const borderedSvg = svgData.replace(
      "<svg",
      `<svg style="border:4px solid #000; border-radius:12px; background:#fff;"`
    );

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename;
      link.href = pngFile;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(borderedSvg);
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

  return (
    <Card className="rounded-2xl shadow-md border border-purple-100 bg-gradient-to-b from-purple-50 to-white">
      <CardHeader className="text-center p-3">
        <CardTitle className="font-semibold text-lg text-purple-800">
          Table {tableNo}
        </CardTitle>
        <CardDescription className="text-xs text-purple-600">
          Scan to order at {hotel.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-2">
        <div className="p-3 bg-white rounded-xl border shadow-sm">
          <QRCodeSVG
            value={qrValue}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={false}
            ref={svgRef}
          />
        </div>
        <p className="text-[11px] text-center text-muted-foreground break-all px-2">
          {qrValue}
        </p>
      </CardContent>

      <CardFooter className="flex justify-center gap-2">
        <Button
          size="sm"
          onClick={() =>
            svgRef.current && downloadQRCode(svgRef.current, `qr-${tableNo}.png`)
          }
        >
          <Download className="mr-1 h-4 w-4" /> Download
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            svgRef.current && shareQRCode(svgRef.current, `qr-${tableNo}.svg`)
          }
        >
          <Share2 className="mr-1 h-4 w-4" /> Share
        </Button>
        <Button size="sm" variant="ghost" onClick={regenerate}>
          <RefreshCcw className="mr-1 h-4 w-4" /> Regenerate
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Main QR Page
 */
export default function HotelQrPage() {
  const [hotel, setHotel] = React.useState<any>(null);
  const { hotelIdAdmin } = useAppData();

  React.useEffect(() => {
    getData(`hotel/${hotelIdAdmin}`).then((data) => setHotel(data));
  }, [hotelIdAdmin]);

  if (!hotel) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card key={idx} className="shadow-sm rounded-2xl p-4">
            <CardHeader>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </CardHeader>
            <CardContent className="flex justify-center">
              <Skeleton className="h-40 w-40 rounded-xl" />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: hotel.table_count || 5 }).map((_, idx) => (
        <QRCard key={idx} hotel={hotel} tableNo={idx + 1} />
      ))}
    </div>
  );
}

