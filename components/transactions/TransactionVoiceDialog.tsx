"use client";

import { useEffect, useState } from "react";
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
import { useVoiceTransactions } from "@/hooks/gemini/useVoiceTransactions";
import { useTransaction } from "@/lib/mutations/transaction";
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext";
import { TransactionInsert } from "@/types/db";

interface TransactionVoiceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TransactionVoiceDrawer({
  open,
  onOpenChange,
}: TransactionVoiceDrawerProps) {
  const { data: user } = useUserContext();
  const generateTransactions = useVoiceTransactions();
  const { createTransaction } = useTransaction();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    SpeechRecognition.stopListening();

    const result = await generateTransactions(transcript);
    const transactions: TransactionInsert[] = result.transactions.map((t) => ({
      ...t,
      user_id: user!.id,
    }));
    if (transactions.length === 0) {
      toast.info("No transactions generated");
    }

    await createTransaction.mutateAsync(transactions);

    setIsSubmitting(false);
    onOpenChange(false);
    resetTranscript();
  };

  // reset transactipt if the drawer is closed
  useEffect(() => {
    if (!open) {
      resetTranscript();
    }
  }, [open, resetTranscript]);

  // microphone not supported
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

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          SpeechRecognition.stopListening();
          resetTranscript();
        }
        onOpenChange(o);
      }}
    >
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
          <span className="flex-1 font-thin">
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
            <Button
              onClick={handleStart}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" /> {transcript ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              disabled={isSubmitting}
              className="flex items-center gap-2"
              variant={"destructive"}
            >
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
