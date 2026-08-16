import { Logo } from "@/components/Logo";
import { unlockSite } from "@/app/gate/actions";

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 text-center">
      <Logo variant="mark" height={56} />
      <p className="mt-8 text-[12px] tracking-[0.32em] uppercase text-[#b08a4a]">
        قريبا بالاسواق
      </p>
      <h1 className="serif mt-4 text-4xl">Scents Wave</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">موجة عطر</p>
      <form action={unlockSite} className="mt-10 w-full max-w-xs">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="كلمة السر"
          className="w-full border-0 border-b border-[var(--ink)] bg-transparent py-3 text-center outline-none"
        />
        {error && (
          <p className="mt-3 text-sm text-[var(--muted)]">كلمة السر غير صحيحة</p>
        )}
        <button type="submit" className="cta mt-8 w-full">
          دخول
        </button>
      </form>
    </div>
  );
}
