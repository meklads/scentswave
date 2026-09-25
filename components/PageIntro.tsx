export function PageIntro({
  kicker,
  title,
  body,
}: {
  kicker?: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="band band-stone">
    <div className="wrap py-14 text-center md:py-20">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="serif mt-5">{title}</h1>
      {body && (
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">{body}</p>
      )}
    </div>
    </section>
  );
}
