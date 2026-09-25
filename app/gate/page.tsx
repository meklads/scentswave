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
          className="w-full border-0 border-b border-[#e6c98a]/40 bg-transparent py-3 text-center text-[#e6c98a] outline-none placeholder:text-[#d4b56a]/70"
        />
        {error && (
          <p className="mt-3 text-sm text-[#d4b56a]">كلمة السر غير صحيحة</p>
        )}
        <button type="submit" className="cta mt-8 w-full">
          دخول
        </button>
      </form>
    </div>
  );
}
