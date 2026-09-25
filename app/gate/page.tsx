import { Logo } from "@/components/Logo";
import { unlockSite } from "@/app/gate/actions";

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-center text-[#f4efe6]">
      <Logo variant="original" height={96} />
      <p className="mt-8 text-[14px] font-medium text-[#c4a35a]">
        قريبا بالاسواق
      </p>
      <form action={unlockSite} className="mt-10 w-full max-w-xs">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="كلمة السر"
          className="w-full border-0 border-b border-white/35 bg-transparent py-3 text-center text-white outline-none placeholder:text-white/40"
        />
        {error && (
          <p className="mt-3 text-sm text-white/55">كلمة السر غير صحيحة</p>
        )}
        <button type="submit" className="cta mt-8 w-full">
          دخول
        </button>
      </form>
    </div>
  );
}
