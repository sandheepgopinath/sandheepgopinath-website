"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FormattedChatMessage } from "./FormattedChatMessage";
import { trackDigitalTwin } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/recaptchaClient";

interface Message {
  role: "user" | "assistant";
  content: string;
  source?: "aws-bedrock-claude" | "offline-knowledge-base";
}

interface DigitalTwinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const SUGGESTED_CHIPS = [
  "What has Sandheep built?",
  "What is his AI experience?",
  "What are his commercial results?",
  "How does Sandheep approach product management?",
  "What books shaped his thinking?",
];

export function DigitalTwinModal({ isOpen, onClose, initialQuestion }: DigitalTwinModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Sandheep's Digital Twin. Ask me anything about his product leadership, 0→1 products, commercial outcomes, philosophy on building, or his Thinking Shelf books.",
      source: "aws-bedrock-claude",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [captchaResolved, setCaptchaResolved] = useState(false);

  const resolvedTokenRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderRecaptchaWidget = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const container = document.getElementById("recaptcha-chat-widget");
      if (container && !container.hasChildNodes()) {
        const enterprise = (
          window as unknown as {
            grecaptcha?: {
              enterprise?: {
                render?: (
                  id: string,
                  opts: {
                    sitekey: string;
                    action?: string;
                    callback?: (token: string) => void;
                    "expired-callback"?: () => void;
                    "error-callback"?: () => void;
                  }
                ) => void;
              };
            };
          }
        )?.grecaptcha?.enterprise;

        enterprise?.render?.("recaptcha-chat-widget", {
          sitekey: "6LeuPTAuAAAAAIQhXZiUnVHpfHYcW_n80J5i4Uoj",
          action: "CHAT",
          callback: (token: string) => {
            // Once resolved, immediately store token and remove the widget
            resolvedTokenRef.current = token;
            setCaptchaResolved(true);
          },
          "expired-callback": () => {
            resolvedTokenRef.current = null;
            setCaptchaResolved(false);
          },
          "error-callback": () => {
            resolvedTokenRef.current = null;
            setCaptchaResolved(false);
          },
        });
      }
    } catch (e) {
      console.warn("reCAPTCHA render error:", e);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = sessionStorage.getItem("chat_session_token");
      if (savedToken) {
        setSessionToken(savedToken);
        setIsVerified(true);
        setCaptchaResolved(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      trackDigitalTwin("open");
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
        if (!isVerified && !captchaResolved) {
          renderRecaptchaWidget();
        }
      }, 250);
    }
  }, [isOpen, isVerified, captchaResolved, renderRecaptchaWidget]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    trackDigitalTwin(textToSend ? "preset_clicked" : "message_sent", q);

    const userMessage: Message = { role: "user", content: q };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      let recaptchaToken: string | null = resolvedTokenRef.current;
      // If we don't have a resolved token and aren't verified yet, try client fetch
      if (!isVerified && !recaptchaToken) {
        recaptchaToken = await getRecaptchaToken("CHAT");
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          recaptchaToken,
          sessionToken,
        }),
      });

      const data = await res.json();

      if (res.status === 403 || data.requireVerification) {
        setIsVerified(false);
        setCaptchaResolved(false);
        setSessionToken(null);
        resolvedTokenRef.current = null;
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("chat_session_token");
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.text ||
              "Please complete the fraud defense verification below to verify you are human, then send your message again.",
            source: data.source,
          },
        ]);
        // Re-render captcha widget
        setTimeout(() => {
          renderRecaptchaWidget();
        }, 100);
        return;
      }

      // Successful verification & response
      if (data.sessionToken) {
        setSessionToken(data.sessionToken);
        setIsVerified(true);
        setCaptchaResolved(true);
        resolvedTokenRef.current = null; // Token consumed, session now active
        if (typeof window !== "undefined") {
          sessionStorage.setItem("chat_session_token", data.sessionToken);
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.text ||
            "I'm unable to retrieve that detail right now. Feel free to contact Sandheep directly at hello@sandheepgopinath.com",
          source: data.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary connection issue reaching the AI backend. Please email hello@sandheepgopinath.com.",
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

  const showCaptcha = !isVerified && !captchaResolved;

  return (
    <div
      className="fixed right-[22px] bottom-[80px] z-50 w-[min(420px,calc(100vw-30px))] h-[min(590px,calc(100svh-100px))] bg-[#f8f9f5] border border-[#cad2c9] shadow-[0_20px_50px_rgba(23,32,25,0.3)] rounded-[4px] flex flex-col overflow-hidden animate-fade-in font-sans"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Chat Head */}
      <div className="px-[18px] py-[14px] border-b border-[#e0e5dd] bg-[#eeeee9] flex justify-between items-center text-[13px] text-[#25322b]">
        <div>
          <div className="font-bold flex items-center gap-1.5">
            <span>Sandheep AI</span>
            <span className="w-2 h-2 rounded-full bg-[#52855f] animate-pulse" />
          </div>
          <small className="text-[10px] text-[#78857b] block mt-0.5">
            Interactive Digital Twin · Powered by Claude on AWS Bedrock
          </small>
        </div>
        <button
          onClick={onClose}
          title="Close chat"
          className="liquid-glass-button liquid-glass-button--icon text-[#657367] hover:text-[#111] text-[20px] leading-none"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="p-[15px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-[11px_14px] text-[12px] leading-[1.75] rounded-[3px] max-w-[92%] ${
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
                {m.source && (
                  <div className="mt-2 pt-1.5 border-t border-[#d8e0d6] flex items-center justify-between text-[10px] text-[#738276]">
                    <span>
                      {m.source === "aws-bedrock-claude" ? "Claude 3.5 Sonnet (AWS Bedrock)" : "Portfolio Knowledge"}
                    </span>
                    <a
                      href="/api/resume/download"
                      download="Sandheep_Gopinath_Resume_2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black"
                    >
                      CV PDF ↗
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-[#ecf0e9] border border-[#dce3da] text-[#556358] self-start p-[10px_14px] text-[11px] rounded-[3px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#556358] animate-bounce" />
            <span className="ml-1">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="px-[12px] py-[8px] bg-[#f2f4ef] border-t border-[#e2e7df] overflow-x-auto flex gap-1.5 scrollbar-none">
        {SUGGESTED_CHIPS.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            disabled={loading}
            className="liquid-glass-button whitespace-nowrap px-[10px] py-[5px] text-[#4c5d50] hover:text-[#1d2720] text-[10.5px] flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Checkbox Widget (Removed automatically once resolved or session verified) */}
      {showCaptcha && (
        <div
          id="recaptcha-chat-widget"
          className="border-t border-[#e2e7df] bg-[#f8faf7] flex justify-center py-2 transition-all duration-300"
          data-sitekey="6LeuPTAuAAAAAIQhXZiUnVHpfHYcW_n80J5i4Uoj"
          data-action="CHAT"
        />
      )}

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="border-t border-[#dbe2d8] p-[10px] flex gap-[8px] bg-white">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sandheep's experience or thinking..."
          disabled={loading}
          className="border border-[#ccd5ca] bg-white flex-1 min-w-0 p-[9px_12px] text-[12px] text-[#252a28] focus:outline-none focus:border-[#6f8071] rounded-[2px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="liquid-glass-button liquid-glass-button--primary text-white px-[14px] py-[8px] text-[12px] font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}
