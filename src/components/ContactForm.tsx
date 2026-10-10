"use client";

import { useState, type FormEvent } from "react";

type FormStatus =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send your message right now.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Your message was sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-neutral-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={isSubmitting}
          placeholder="Your name"
          className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-neutral-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSubmitting}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-neutral-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={isSubmitting}
          placeholder="Write your message..."
          className="w-full resize-y rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {status && (
        <p
          role="status"
          aria-live="polite"
          className={status.type === "success" ? "text-sm text-green-400" : "text-sm text-red-400"}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}

