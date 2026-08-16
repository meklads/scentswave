"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
      <div className="lux py-16">
        <h1 className="display mb-3 text-5xl">
          {copy.account}
        </h1>
      <p className="mb-8 text-sm text-[var(--muted)]">{copy.accountHint}</p>
      <form className="max-w-md space-y-3">
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
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> {copy.remember}
        </label>
        <button type="button" className="btn btn-dark mt-4 w-full">
          {copy.login}
        </button>
        <p className="text-center text-xs text-[var(--muted)]">{copy.forgot}</p>
      </form>
    </div>
  );
}
