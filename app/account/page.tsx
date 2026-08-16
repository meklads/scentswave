"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="shell max-w-lg py-20 md:py-28">
      <p className="caps">{copy.maison}</p>
      <h1 className="serif mt-5 text-5xl md:text-6xl">{copy.account}</h1>
      <p className="mt-6 font-light text-[var(--muted)]">{copy.accountHint}</p>
      <form className="mt-12 space-y-5">
        <input
          type="email"
          placeholder={copy.username}
          className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none"
        />
        <input
          type="password"
          placeholder={copy.password}
          className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <input type="checkbox" /> {copy.remember}
        </label>
        <button type="button" className="cta cta-solid mt-6">
          {copy.login}
        </button>
        <p className="text-center text-[12px] tracking-[0.16em] uppercase text-[var(--muted)]">
          {copy.forgot}
        </p>
      </form>
    </div>
  );
}
