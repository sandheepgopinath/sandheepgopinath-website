"use client";

import React from "react";

interface FormattedChatMessageProps {
  content: string;
}

export function FormattedChatMessage({ content }: FormattedChatMessageProps) {
  // Split into lines to parse lists and paragraphs
  const lines = content.split("\n");

  const renderFormattedLine = (line: string, key: number) => {
    // Process markdown links [text](url)
    const linkRegex = /\[(.*?)\]\((https?:\/\/[^\s]+|mailto:[^\s]+)\)/g;

    // Parse bold text **bold**
    const parseBoldAndLinks = (text: string) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      // First replace links
      while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563eb] hover:text-[#1d4ed8] underline font-medium"
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      // Now process bold on remaining strings
      return parts.map((part, idx) => {
        if (typeof part !== "string") return part;
        const boldSegments = part.split(/\*\*(.*?)\*\*/g);
        return (
          <React.Fragment key={idx}>
            {boldSegments.map((segment, bIdx) =>
              bIdx % 2 === 1 ? (
                <strong key={bIdx} className="font-semibold text-[#0f172a]">
                  {segment}
                </strong>
              ) : (
                segment
              )
            )}
          </React.Fragment>
        );
      });
    };

    const trimmed = line.trim();

    // Check if it's a bullet item
    if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const bulletContent = trimmed.substring(2);
      return (
        <li key={key} className="ml-4 list-disc text-[#1e293b] my-1 leading-relaxed">
          {parseBoldAndLinks(bulletContent)}
        </li>
      );
    }

    // Check if it's an empty line (spacing)
    if (trimmed === "") {
      return <div key={key} className="h-2" />;
    }

    return (
      <p key={key} className="text-[#1e293b] my-1 leading-relaxed">
        {parseBoldAndLinks(line)}
      </p>
    );
  };

  return (
    <div className="space-y-0.5 text-[13.5px] !text-[#0f172a]" style={{ color: "#0f172a" }}>
      {lines.map((line, idx) => renderFormattedLine(line, idx))}
    </div>
  );
}
