"use client";

import React, { useState } from "react";
import { Lock, CheckCircle2, Copy, Check } from "lucide-react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QRCodeProps {
  isSubmitted: boolean;
  qrValue: string;
}

export default function FinishQRCode({ isSubmitted, qrValue }: QRCodeProps) {
  const [copied, setCopied] = useState(false);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrValue)}`;

  const handleCopy = () => {
    if (!isSubmitted) return;
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-500 w-full max-w-sm mx-auto",
      isSubmitted ? "border-primary/50 shadow-sm" : "opacity-90"
    )}>
      <CardContent className="p-4 space-y-3">
        {/* Header Row: Compact Badge & Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSubmitted && <CheckCircle2 className="w-4 h-4 text-primary animate-in zoom-in" />}
            <span className="text-sm font-semibold leading-none">Submission Code</span>
          </div>
          <Badge variant={isSubmitted ? "default" : "secondary"} className="h-5 px-1.5 text-[10px] uppercase">
            {isSubmitted ? "Ready" : "Locked"}
          </Badge>
        </div>

        {/* QR Section: Reduced from 40 to 32 (128px) */}
        <div className="flex justify-center">
          <div className={cn(
            "relative p-2 rounded-lg border transition-all duration-700 bg-white",
            isSubmitted ? "border-primary/30 scale-100" : "border-muted"
          )}>
            <div className="relative w-32 h-32 overflow-hidden rounded-sm">
              <img
                src={qrImageUrl}
                alt="QR Code"
                className={cn(
                  "w-full h-full transition-all duration-1000",
                  isSubmitted ? "blur-0 opacity-100 grayscale-0" : "blur-lg opacity-20 grayscale"
                )}
              />
              
              {isSubmitted && (
                <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-[scan_2s_ease-in-out_infinite]" />
              )}

              {!isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/10">
                  <Lock className="w-6 h-6 text-muted-foreground/50" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer: Compact Button & ID */}
        <div className="space-y-2">
          <Button 
            variant="secondary" 
            size="sm"
            className="w-full h-8 text-xs gap-2" 
            disabled={!isSubmitted}
            onClick={handleCopy}
          >
            {copied ? (
              <><Check className="w-3 h-3 text-primary" /> Copied</>
            ) : (
              <><Copy className="w-3 h-3" /> Copy Link</>
            )}
          </Button>
          <p className="text-[9px] text-muted-foreground text-center truncate px-2">
            ID: {isSubmitted ? qrValue.split('/').pop() : "••••••••••••"}
          </p>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; }
        }
      `}</style>
    </Card>
  );
}