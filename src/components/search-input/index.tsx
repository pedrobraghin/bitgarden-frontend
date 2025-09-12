"use client";

import { ChangeEvent, useCallback, useEffect, useRef } from "react";

interface SearchInputProps {
  onChange?: (text: string) => void;
  onEnter?: () => void;
}

export function SearchInput({ onChange, onEnter }: Readonly<SearchInputProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && e.target instanceof HTMLElement) {
        const tag = e.target.tagName.toLowerCase();
        if (
          tag !== "input" &&
          tag !== "textarea" &&
          !e.target.isContentEditable
        ) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnter?.();
      }
    },
    [onEnter]
  );

  return (
    <input
      type="text"
      placeholder="Aperte / para digitar"
      className="border border-neutral-200/50 rounded-lg px-4 py-2 w-full"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
}
