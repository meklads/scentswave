"use client";

import { PageIntro } from "@/components/PageIntro";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro kicker={copy.maison} title={copy.account} body={copy.accountHint} />
      <form className="mx-auto max-w-md space-y-5 px-5 pb-20">
        <input type="email" placeholder={copy.username} className="field" />
        <input type="password" placeholder={copy.password} className="field" />
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <input type="checkbox" /> {copy.remember}
        </label>
        <button type="button" className="cta mt-6 w-full">
          {copy.login}
        </button>
        <p className="text-center text-[13px] text-[var(--muted)]">{copy.forgot}</p>
      </form>
    </div>
  );
}
