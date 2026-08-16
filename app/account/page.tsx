"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-4xl">
        {copy.account}
      </h1>
      <p className="mb-8 text-sm text-[var(--muted)]">{copy.accountHint}</p>
      <form className="space-y-3 bg-white p-6">
        <input
          type="email"
          placeholder={copy.username}
          className="w-full border border-[var(--line)] px-4 py-3"
        />
        <input
          type="password"
          placeholder={copy.password}
          className="w-full border border-[var(--line)] px-4 py-3"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> {copy.remember}
        </label>
        <button type="button" className="w-full rounded-full bg-[var(--ink)] py-3 text-white">
          {copy.login}
        </button>
        <p className="text-center text-xs text-[var(--muted)]">{copy.forgot}</p>
      </form>
    </div>
  );
}
