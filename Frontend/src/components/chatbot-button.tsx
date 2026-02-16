import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { chatWithAI } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm ZUNF Medicare's AI assistant. What type of test would you like to conduct today?",
      suggestions: [
        "CBC Test",
        "Urine Routine",
        "Blood Sugar",
        "Home Sample Collection"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Open chatbot"]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = (overrideInput || input).trim();
    if (!textToSend || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: textToSend }]);
    setIsLoading(true);

    try {
      // Send the last 5 messages as history for context
      const history = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));
      const data = await chatWithAI(textToSend, history);

      let content = data?.response || "I apologize, but I'm having trouble processing your request. Please try again.";
      let suggestions: string[] = [];

      // Parse suggestions if present in the format SUGGESTIONS: option1 | option2
      const suggestionMatch = content.match(/SUGGESTIONS:\s*(.*)$/i);
      if (suggestionMatch) {
        suggestions = suggestionMatch[1].split("|").map(s => s.trim()).filter(s => s.length > 0);
        content = content.replace(/SUGGESTIONS:\s*.*$/i, "").trim();
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content, suggestions },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      if (errorMessage.includes("API key") || errorMessage.includes("configured")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "The chatbot service is currently being configured. Please contact us at 03090622004 for immediate assistance.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact us at 03090622004.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button - Blue variation using theme accent color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-6 md:right-24 z-[9999] flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-accent hover:bg-accent/90 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
        aria-label="Open chatbot"
      >
        <Bot className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-accent"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card ref={chatWindowRef} className="fixed bottom-32 md:bottom-24 right-4 md:right-6 z-[9999] w-[calc(100vw-2rem)] md:w-96 h-[500px] md:h-[600px] flex flex-col shadow-2xl border-2 border-primary/20 bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">ZUNF Medicare Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-muted transition-colors"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-foreground border border-border/50 shadow-sm"
                      }`}
                  >
                    <div
                      className="text-sm whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br />')
                      }}
                    />
                  </div>
                </div>
                {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 pb-2">
                    {message.suggestions.map((suggestion, sIndex) => (
                      <button
                        key={sIndex}
                        onClick={() => sendMessage(suggestion)}
                        disabled={isLoading}
                        className="text-[11px] md:text-xs bg-background border border-primary/20 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-1 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MessageSquare className="h-3 w-3 opacity-70 group-hover:scale-110 transition-transform" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

