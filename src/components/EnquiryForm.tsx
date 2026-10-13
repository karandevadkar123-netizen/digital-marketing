"use client";

import { FormEvent, useState } from "react";

const services = ["Meta Ads", "Google Ads", "Web Design", "More than one service"];
const empty = { fullName: "", phone: "", email: "", service: "", city: "", budget: "", message: "", website: "" };

const field =
  "mt-1.5 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-ink placeholder:text-steel/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function EnquiryForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!form.fullName.trim()) return setStatus({ ok: false, text: "Enter your full name." });
    if (!form.phone.trim()) return setStatus({ ok: false, text: "Enter your phone number." });

    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not send your enquiry.");
      setStatus({ ok: true, text: data.message });
      setForm(empty);
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : "Could not send your enquiry." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(4,80,138,.45)] ring-1 ring-black/5 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Full name *
          <input name="fullName" value={form.fullName} onChange={onChange} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-bold">
          Phone *
          <input name="phone" value={form.phone} onChange={onChange} autoComplete="tel" inputMode="tel" className={field} placeholder="+91 98765 43210" />
        </label>
        <label className="block text-sm font-bold">
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
        <label className="block text-sm font-bold">
          Service
          <select name="service" value={form.service} onChange={onChange} className={field}>
            <option value="">Select a service</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">
          Property city or country
          <input name="city" value={form.city} onChange={onChange} className={field} placeholder="Thane, Pune, Dubai..." />
        </label>
        <label className="block text-sm font-bold">
          Monthly ad budget
          <input name="budget" value={form.budget} onChange={onChange} className={field} placeholder="Approximate amount" />
        </label>
      </div>

      <label className="mt-5 block text-sm font-bold">
        Tell us about your property
        <textarea name="message" value={form.message} onChange={onChange} rows={4} className={field} placeholder="Project name, type of buyers you want to reach, timeline" />
      </label>

      {/* honeypot: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Website<input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full rounded-full bg-[#151515] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-black disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending..." : "Send enquiry"}
      </button>

      <p role="status" aria-live="polite" className={`mt-4 text-base font-semibold ${status ? (status.ok ? "text-green-700" : "text-red-700") : ""}`}>
        {status?.text}
      </p>
    </form>
  );
}
