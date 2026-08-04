interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="my-2">
      <p className="text-sm uppercase tracking-[0.35em] text-brand-300">{title}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{description}</h2>
    </div>
  );
}
