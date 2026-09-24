"use client";

export function QtyControl({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="-">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="+">
        +
      </button>
    </div>
  );
}
