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
} from "@/components/prompt-input";
import { ContentHeader } from "@/components/sidebar/content-header";
import { useState } from "react";
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
import { sendMessage } from "@/lib/gemini/ai";
import { Response } from "@/components/response";
import { Loader } from "@/components/ai-elements/loader";
import { LockIcon } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const [model, setModel] = useState<string>(models[0].id);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendChat = async (content: string) => {
    setIsLoading(true);
    const newMessage: ChatMessage = { role: "user", content };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      setShowSuggestions(false);
      const reply = await sendMessage(updatedMessages, model);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("AI request failed:", error);
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChat(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendChat(suggestion);
    setShowSuggestions(false);
  };

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

        {showSuggestions && (
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
            <PromptInputModelSelect onValueChange={(value) => setModel(value)} value={model}>
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((m) => (
                  <PromptInputModelSelectItem key={m.id} value={m.id} disabled={!m.available}>
                    <div className="flex items-center justify-between w-full">
                      <span className={!m.available ? "text-muted-foreground" : ""}>{m.name}</span>
                      {!m.available && <LockIcon className="w-4 h-4 text-muted-foreground ml-2" />}
                    </div>
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
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
