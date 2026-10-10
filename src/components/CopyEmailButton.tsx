"use client";
import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
      aria-label={`Copy ${email}`}
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}