"use client";

import React, { useState, useRef, useEffect } from "react";
import { FormattedChatMessage } from "./FormattedChatMessage";
import { trackDigitalTwin } from "@/lib/analytics";
import { initAppCheck } from "@/lib/firebase";
import { askDigitalTwinApi, DigitalTwinMessage } from "@/lib/digitalTwin";

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
  "What differentiates Sandheep as a product leader?",
  "What business impact has he created?",
  "What is his experience with AI and machine learning?",
  "How does he approach product strategy and prioritization?",
  "What types of product management roles is he suitable for?",
];

const INITIAL_GREETING: DisplayMessage = {
  role: "assistant",
  content:
    "Hello! I am Sandheep's AI-powered digital twin. Ask me anything about his product leadership, 0→1 products, commercial outcomes, AI/ML initiatives, or his building philosophy.",
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
      initAppCheck();
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
      // 1. Call AWS Digital Twin API protected by Firebase App Check
      const response = await askDigitalTwinApi(q, apiHistory);

      if (response.status === "network_error") {
        // Fallback to Next.js server route if client-side CORS / network is temporarily blocked
        const fallbackRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const fallbackData = await fallbackRes.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              fallbackData.text ||
              "I encountered a temporary issue. Feel free to contact Sandheep at hello@sandheepgopinath.com",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
          requestId: response.request_id,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary connection issue. Please feel free to email Sandheep directly at hello@sandheepgopinath.com.",
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
      className="fixed right-[22px] bottom-[80px] z-50 w-[min(460px,calc(100vw-30px))] h-[min(620px,calc(100svh-100px))] bg-[#f8f9f5] border border-[#cad2c9] shadow-[0_20px_50px_rgba(23,32,25,0.3)] rounded-[6px] flex flex-col overflow-hidden animate-fade-in font-sans"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-[18px] py-[13px] border-b border-[#e0e5dd] bg-[#eeeee9] flex justify-between items-center text-[13px] text-[#25322b]">
        <div>
          <div className="font-bold flex items-center gap-2">
            <span>Sandheep AI</span>
            <span className="w-2 h-2 rounded-full bg-[#52855f] animate-pulse" />
            <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-[#e1e7de] text-[#4d6051]">
              App Check Verified
            </span>
          </div>
          <small className="text-[10px] text-[#78857b] block mt-0.5">
            Interactive Digital Twin · Powered by Amazon Bedrock
          </small>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNewConversation}
            title="Start new conversation"
            className="liquid-glass-button text-[11px] px-2 py-1 text-[#5b6e5f] hover:text-[#1d2720]"
          >
            New Chat
          </button>
          <button
            onClick={onClose}
            title="Close chat"
            className="liquid-glass-button liquid-glass-button--icon text-[#657367] hover:text-[#111] text-[18px] leading-none px-2 py-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-[15px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-[12px_15px] text-[12px] leading-[1.75] rounded-[4px] max-w-[92%] ${
              m.role === "user"
                ? "bg-[#2c3a31] text-white self-end"
                : "bg-[#ecf0e9] text-[#252a28] self-start border border-[#dce3da]"
            }`}
          >
            {m.role === "user" ? (
              <p className="whitespace-pre-wrap">{m.content}</p>
            ) : (
              <div>
                <FormattedChatMessage content={m.content} />

                {/* Sources pill list if returned */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#d8e0d6] text-[10px] text-[#6b7c6e]">
                    <span className="font-medium">Sources: </span>
                    {m.sources.join(" · ")}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-[#ecf0e9] border border-[#dce3da] text-[#556358] self-start p-[10px_14px] text-[11px] rounded-[4px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce" />
            <span className="ml-1">Consulting knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      <div className="px-[12px] py-[8px] bg-[#f2f4ef] border-t border-[#e2e7df] overflow-x-auto flex gap-1.5 scrollbar-none">
        {STARTER_QUESTIONS.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            disabled={loading}
            className="liquid-glass-button whitespace-nowrap px-[10px] py-[5px] text-[#4c5d50] hover:text-[#1d2720] text-[11px] flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-[#dbe2d8] p-[10px] flex gap-[8px] bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          maxLength={1500}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sandheep's experience or thinking..."
          disabled={loading}
          className="border border-[#ccd5ca] bg-white flex-1 min-w-0 p-[9px_12px] text-[12px] text-[#252a28] focus:outline-none focus:border-[#6f8071] rounded-[3px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="liquid-glass-button liquid-glass-button--primary text-white px-[15px] py-[8px] text-[12px] font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
