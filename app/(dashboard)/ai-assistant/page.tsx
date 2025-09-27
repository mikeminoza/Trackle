"use client";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputButton,
  PromptInputTools,
} from "@/components/prompt-input";
import ContentHeader from "@/components/sidebar/content-header";
import { useEffect, useState } from "react";
import { models } from "@/constants/ai-models";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/conversation";
import { Message, MessageContent } from "@/components/message";
import { Suggestions, Suggestion } from "@/components/suggestion";
import { suggestions } from "@/constants/ai-suggestions";
import { ChatMessage } from "@/types/ai";
import { useSendMessage } from "@/hooks/gemini/useSendMessage";
import { Response } from "@/components/response";
import { Loader } from "@/components/ai-elements/loader";
import { LockIcon, MicIcon } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useDailyChatReset } from "@/hooks/useDailyChatReset";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { toast } from "sonner";

export default function Page() {
  const { messages, addMessage } = useChatStore();
  const [model, setModel] = useState<string>(models[0].id);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [useMicrophone, setUseMicrophone] = useState(false);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser does not support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const sendMessage = useSendMessage();

  const sendChat = async (input: string) => {
    if (!input.trim()) return;
    setIsLoading(true);
    const newMessage: ChatMessage = { role: "user", content: input };
    addMessage(newMessage);

    try {
      setShowSuggestions(false);
      const fullConversation = useChatStore.getState().messages;
      const reply = await sendMessage(fullConversation, model);
      addMessage({ role: "assistant", content: reply });
    } catch (error) {
      console.error("AI request failed:", error);
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setIsLoading(false);
      setInput("");
      resetTranscript();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendChat(suggestion);
  };

  useDailyChatReset();

  return (
    <>
      <ContentHeader title="Ai Assistant" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col px-3 h-[calc(100vh-100px)]">
        <div className="flex-1 relative overflow-hidden">
          <Conversation className="absolute inset-0 flex flex-col">
            <ConversationContent className="flex-1 overflow-y-auto">
              {messages.map((m, idx) => (
                <Message key={idx} from={m.role}>
                  <MessageContent>
                    <Response key={idx}>{m.content}</Response>
                  </MessageContent>
                </Message>
              ))}
              {isLoading && (
                <Message from="assistant">
                  <MessageContent>
                    <Loader />
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>

        {showSuggestions && messages.length === 0 && (
          <Suggestions className="mt-2">
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={handleSuggestionClick}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        )}

        <PromptInput onSubmit={handleSubmit} className="mt-2 relative">
          <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputModelSelect onValueChange={(value) => setModel(value)} value={model}>
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((m) => (
                    <PromptInputModelSelectItem key={m.id} value={m.id} disabled={!m.available}>
                      <div className="flex items-center justify-between w-full">
                        <span className={!m.available ? "text-muted-foreground" : ""}>
                          {m.name}
                        </span>
                        {!m.available && (
                          <LockIcon className="w-4 h-4 text-muted-foreground ml-2" />
                        )}
                      </div>
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>

              <PromptInputButton
                onClick={() => {
                  if (listening) {
                    SpeechRecognition.stopListening();
                    toast.dismiss("mic-status");
                    toast.info("Microphone stopped", { id: "mic-status" });
                    setUseMicrophone(false);
                  } else {
                    SpeechRecognition.startListening({ continuous: true });
                    toast.dismiss("mic-status");
                    toast.loading("Microphone listening...", { id: "mic-status" });
                    setUseMicrophone(true);
                  }
                }}
                variant={useMicrophone ? "default" : "ghost"}
                disabled={isLoading}
              >
                <MicIcon size={16} className={listening ? "text-black" : ""} />
                <span className="sr-only">Microphone</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit
              className="absolute right-1 bottom-1"
              disabled={isLoading}
              status={isLoading ? "submitted" : "ready"}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </>
  );
}
