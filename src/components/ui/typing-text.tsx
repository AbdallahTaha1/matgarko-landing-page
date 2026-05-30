import { useEffect, useState } from "react";

interface TypingTextProps {
  words: string[];
  className?: string;
}

export function TypingText({ words, className }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1));
        if (displayText === word) {
          setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, words]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
