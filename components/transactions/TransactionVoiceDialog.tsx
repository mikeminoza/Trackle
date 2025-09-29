"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Mic, Loader2, RefreshCw } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { cn } from "@/lib/utils";

interface TransactionVoiceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (transcript: string) => void;
}

export default function TransactionVoiceDrawer({
  open,
  onOpenChange,
  onSubmit,
}: TransactionVoiceDrawerProps) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Voice transactions not supported</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    onSubmit(transcript);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      resetTranscript();
    }, 500);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded-t-2xl shadow-xl flex flex-col gap-4 px-6 md:px-80 py-6">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-lg font-semibold">
            <Mic
              className={cn("w-6 h-6", listening ? "text-red-400 animate-pulse" : "text-gray-400")}
            />
            {listening ? "Listening..." : "Paused"}
          </DrawerTitle>
          <DrawerDescription>Speak your transaction to add it quickly.</DrawerDescription>
        </DrawerHeader>

        <div className="min-h-[100px] border border-dashed rounded-lg p-3 mx-4 flex flex-col gap-2 text-center overflow-y-auto break-words">
          <span className="flex-1">
            {transcript || "Your spoken transaction will appear here..."}
          </span>
          {transcript && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetTranscript}
              className="self-end mt-1 flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
          )}
        </div>
        <DrawerFooter className="flex justify-between gap-2 mt-2">
          {!listening ? (
            <Button onClick={handleStart} className="flex items-center gap-2">
              <Mic className="w-4 h-4" /> Start
            </Button>
          ) : (
            <Button onClick={handleStop} className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Stop
            </Button>
          )}

          {transcript && (
            <Button onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
