"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, FileText, Send, Sparkles, X } from "lucide-react";
import { FormattedChatMessage } from "./FormattedChatMessage";
import { trackDigitalTwin } from "@/lib/analytics";
import { getAppCheckInstance } from "@/lib/firebase";
import { askDigitalTwin, DigitalTwinMessage } from "@/lib/digitalTwin";

interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  requestId?: string;
}

interface DigitalTwinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const STARTER_QUESTIONS = [
  { icon: "💡", text: "What differentiates Sandheep as a product leader?" },
  { icon: "📊", text: "What business impact has he created?" },
  { icon: "💼", text: "What is his experience with AI and machine learning?" },
  { icon: "🎯", text: "How does he approach product strategy and prioritization?" },
  { icon: "🚀", text: "What types of product management roles is he suitable for?" },
];

const INITIAL_GREETING: DisplayMessage = {
  role: "assistant",
  content:
    "Hello! I am Sandheep's AI powered Digital twin! Ask me anything about his professional experience and I would be happy to help you!",
};

export function DigitalTwinModal({ isOpen, onClose, initialQuestion }: DigitalTwinModalProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      trackDigitalTwin("open");
      try {
        getAppCheckInstance();
      } catch {
        // App Check browser init
      }
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleNewConversation = () => {
    setMessages([INITIAL_GREETING]);
    setInput("");
    trackDigitalTwin("new_conversation");
  };

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    trackDigitalTwin(textToSend ? "preset_clicked" : "message_sent", q);

    const userMessage: DisplayMessage = { role: "user", content: q };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    // Format conversation history for API: last 6 messages
    const apiHistory: DigitalTwinMessage[] = messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await askDigitalTwin(q, apiHistory);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
          requestId: response.requestId,
        },
      ]);
    } catch (err: unknown) {
      console.error("AWS Digital Twin API error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "The assistant is temporarily unavailable.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuestion && isOpen) {
      handleSend(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="fixed right-[22px] bottom-[80px] z-50 w-[min(460px,calc(100vw-30px))] h-[min(640px,calc(100svh-100px))] bg-white border border-[#dce6f4] shadow-[0_20px_60px_rgba(37,99,235,0.16),0_4px_20px_rgba(15,23,42,0.08)] rounded-[24px] flex flex-col overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-[#e4ebf5] bg-gradient-to-b from-[#edf3fc] to-[#f7fafe] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src="/portrait.jpg"
              alt="Sandheep"
              className="w-[42px] h-[42px] rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#3b82f6] ring-2 ring-white" />
          </div>
          <div>
            <div className="font-bold text-[15px] text-[#0f172a] flex items-center gap-2 leading-tight">
              <span>Sandheep AI</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            </div>
            <small className="text-[12px] text-[#64748b] block mt-0.5">
              Interactive Digital Twin
            </small>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewConversation}
            title="Start new conversation"
            className="bg-white border border-[#dbe4f0] rounded-full px-3.5 py-1.5 text-[12px] font-medium text-[#1e293b] shadow-sm hover:bg-[#f8fafc] transition-colors cursor-pointer"
          >
            New Chat
          </button>
          <button
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
            className="w-8 h-8 rounded-full bg-white border border-[#dbe4f0] flex items-center justify-center text-[#334155] shadow-sm hover:bg-[#f8fafc] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 flex flex-col gap-3 flex-1 overflow-y-auto bg-white">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`px-4 py-3.5 text-[13.5px] leading-[1.6] rounded-[16px] max-w-[92%] ${
              m.role === "user"
                ? "bg-[#2563eb] text-white self-end shadow-sm"
                : "bg-[#f1f5fb] text-[#1e293b] self-start border border-[#e3eaf4]"
            }`}
          >
            {m.role === "user" ? (
              <p className="whitespace-pre-wrap">{m.content}</p>
            ) : (
              <div>
                <FormattedChatMessage content={m.content} />

                {/* Sources footer if returned */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#e0e8f3] flex items-center justify-between gap-2 text-[12px] text-[#475569]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText className="w-3.5 h-3.5 flex-shrink-0 text-[#475569]" />
                      <span className="truncate">
                        Sources: {m.sources.join(" · ")}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-[#64748b]" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-[#f1f5fb] border border-[#e3eaf4] text-[#475569] self-start px-4 py-3 text-[12px] rounded-[16px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce" />
            <span className="ml-1">Consulting knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      <div className="px-3.5 py-2.5 bg-white border-t border-[#eef2f7] overflow-x-auto flex gap-2 scrollbar-none">
        {STARTER_QUESTIONS.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip.text)}
            disabled={loading}
            className="bg-[#f8fafd] hover:bg-[#eef4fc] border border-[#dce6f4] rounded-[14px] px-3 py-2 text-[12px] text-[#1e293b] flex items-center gap-2 flex-shrink-0 transition-colors cursor-pointer disabled:opacity-50"
          >
            <span className="text-[14px] leading-none">{chip.icon}</span>
            <span className="whitespace-nowrap">{chip.text}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="px-3.5 pb-3.5 pt-2 bg-white flex items-center gap-2.5"
      >
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#bfd4f2] focus-within:border-[#3b82f6] focus-within:ring-2 focus-within:ring-[#3b82f6]/15 rounded-full px-3.5 py-2 transition-all">
          <Sparkles className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            maxLength={1500}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Sandheep's experience or thinking..."
            disabled={loading}
            className="flex-1 min-w-0 bg-transparent text-[13px] text-[#0f172a] placeholder:text-[#64748b] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="w-10 h-10 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      </div>
    </div>
  );
}
