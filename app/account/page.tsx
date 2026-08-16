"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="wrap max-w-lg py-12 md:py-16">
      <p className="caps">{copy.maison}</p>
      <h1 className="serif mt-5">{copy.account}</h1>
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
        <p className="text-center text-[13px] font-medium text-[var(--muted)]">
          {copy.forgot}
        </p>
      </form>
    </div>
  );
}
