export function SectionTitle({ id, children }) {
  return (
    <h2 id={id} className="text-sm font-semibold text-ink">
      {children}
    </h2>
  );
}
