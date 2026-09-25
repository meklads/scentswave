import Link from "next/link";

export function SectionHead({
  title,
  href,
  action,
  kicker,
  layout = "center",
}: {
  title: string;
  href?: string;
  action?: string;
  kicker?: string;
  layout?: "center" | "bar";
}) {
  if (layout === "bar") {
    return (
      <div className="section-bar">
        <h2>{title}</h2>
        {href && action && (
          <Link href={href} className="section-all">
            {action}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="section-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      <span className="section-rule" aria-hidden="true" />
      {href && action && (
        <Link href={href} className="u-link mt-4">
          {action}
        </Link>
      )}
    </div>
  );
}
